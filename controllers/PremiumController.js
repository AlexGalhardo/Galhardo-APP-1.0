/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/plans
 */


// HELPERS
import DateTime from '../helpers/DateTime.js'
import NodeMailer from '../helpers/NodeMailer.js'
import TelegramBOTLogger from '../helpers/TelegramBOTLogger.js'
import Header from '../helpers/Header.js'

// MODELS
import Users from '../models/JSON/Users.js'
import PagarMEModel from '../models/JSON/PagarME.js'


// PagarME
import { PagarME } from '../helpers/PagarME.js'


class PremiumController {

	static getViewPremium(req, res) {
		return res.render('pages/premium/premium', {
            flash_warning: req.flash('warning'),
			user: SESSION_USER,
            header: Header.premium('Plano Premium RecomendaÊ')
		});
	}


    static getViewPlanPremiumCheckout (req, res) {
        return res.render('pages/premium/premium_checkout', {
            flash_warning: req.flash('warning'),
            user: SESSION_USER,
            header: Header.plans('Premium Checkout - RecomendaÊ')
        });
    }



    static getSubscriptionBanner (plan_name){
        return `
            <div class="card mb-4 rounded-3 shadow-sm text-center">
                <div class="card-header py-3 bg-info">
                    <h4 class="my-0 fw-normal">You Are PREMIUM!</h4>
                </div>

                <div class="card-body">
                    <h1 class="card-title pricing-card-title">R$ 4.99<small class="text-muted fw-light">/month</small></h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>✔️ Acesso a nossa API</li>
                        <li>✔️ Sem propagandas no site</li>
                        <li>✔️ Cancele quando quiser</li>
                        <li>✔️ Recomendações ilimitadas</li>
                        <li>✔️ Receba recomendações via email</li>
                        <li>✔️ Receba recomendações via telegram</li>
                    </ul>
                </div>

            </div>
        `
    }




    static async verifyIfUserIsAlreadyAStripeCustomer(){
        if(!SESSION_USER.stripe.customer_id){
            const stripeCustomer = await stripe.customers.create({
                description: 'Cliente criado no checkout premium',
                email: SESSION_USER.email
            });
            await Users.createStripeCustomer(SESSION_USER.id, stripeCustomer.id)
            return stripeCustomer.id
        }
        return SESSION_USER.stripe.customer_id
    }




    static async verifyIfUserAlreadyHasAStripeCardRegistred(req){
        if(!SESSION_USER.stripe.card_id){
            const { card_number,
                card_exp_year,
                card_exp_month,
                card_cvc } = req.body

            const cardToken = await stripe.tokens.create({
                 card: {
                    number: card_number,
                    exp_month: card_exp_month,
                    exp_year: card_exp_year,
                    cvc: card_cvc,
                  },
            });

            const card = await stripe.customers.createSource(
                SESSION_USER.stripe.customer_id,
                {source: cardToken.id}
            );

            const stripeCard = await Users.createStripeCard(SESSION_USER.id, cardToken.id, card)
            return stripeCard
        }

        return {
            card_token_id: SESSION_USER.stripe.card_token_id,
            card_id: SESSION_USER.stripe.card_id,
            card_brand: SESSION_USER.stripe.card_brand,
            card_last4: SESSION_USER.stripe.card_last4,
            card_exp_month: SESSION_USER.stripe.card_exp_month,
            card_exp_year: SESSION_USER.stripe.card_exp_year
        }
    }


    static async createStripeSubscription(stripe_customer_id, plan_id) {
        const subscription = await stripe.subscriptions.create({
            customer: stripe_customer_id,
            items: [
                {price: plan_id},
            ],
        });

        subscription.created = DateTime.getDateTime(subscription.created);
        subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
        subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

        return subscription
    }




    /**
     * POST /plan/<plan_name>/checkout
     * Verify if user is already a stripe customer
     * verify if user already has a stripe credit card registred
     * Verify if user is not already registred in other plan
     */
    static async postSubscription (req, res) {

        try {
            const { confirm_password } = req.body

            const validPassword = await Users.verifyPassword(SESSION_USER.id, confirm_password)

            if(!validPassword){
                req.flash('warning', 'Senha inválida!')
                return res.redirect(`/premium/checkout`)
            }

            const stripeCustomerID = await PremiumController.verifyIfUserIsAlreadyAStripeCustomer()

            const stripeCard = await PremiumController.verifyIfUserAlreadyHasAStripeCardRegistred(req)

            const subscription = await PremiumController.createStripeSubscription(stripeCustomerID, stripePlan.id)

            const subsTransactionObject = {
                created_at: DateTime.getNow(),
                transaction_id: subscription.id,
                status: subscription.status,
                payment_method: {
                    card_id: stripeCard.card_id,
                    card_brand: stripeCard.card_brand,
                    card_exp_month: stripeCard.card_exp_month,
                    card_exp_year: stripeCard.card_exp_year,
                    card_last4: stripeCard.card_last4
                },
                plan: {
                    id: process.env.PAGARME_PLAN_PREMIUM_ID,
                    name: process.env.PAGARME_PLAN_PREMIUM_NAME,
                    amount: process.env.PAGARME_PLAN_PREMIUM_AMOUNT,
                    current_period_start: subscription.current_period_start,
                    current_period_end: subscription.current_period_end,
                    cancel_at_period_end: subscription.cancel_at_period_end
                },
                customer: {
                    id: SESSION_USER.id,
                    stripe_id: SESSION_USER.pagarme.customer_id,
                    email: SESSION_USER.email,
                    name: SESSION_USER.name
                },
                stripe_request_response: JSON.stringify(subscription),
            }

            await Users.createPagarMESubscription(SESSION_USER.id, plan_name, subscription)

            await PagarMEModel.createSubscriptionTransaction(subsTransactionObject)

            await NodeMailer.sendSubscriptionTransaction(subsTransactionObject)

            await TelegramBOTLogger.logSubscriptionTransaction(subsTransactionObject)

            res.render('pages/premium/premium_log', {
                flash_success: 'Assinatura criada com sucesso!',
                subsTransactionObject,
                user: SESSION_USER,
                header: Header.plans('Premium Checkout Status - RecomendaÊ'),
                divPlanBanner: PremiumController.getSubscriptionBanner(plan_name)
            });

        } catch(error){
            throw new Error(error)
        }
	}
};

export default PremiumController;
