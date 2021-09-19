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




    static async verifyIfUserIsAlreadyAPagarMECustomer(){
        if(!SESSION_USER.pagarme.customer_id){
            const stripeCustomer = await pagarme.customers.create({
                description: 'Cliente criado no checkout premium',
                email: SESSION_USER.email
            });
            await Users.createStripeCustomer(SESSION_USER.id, stripeCustomer.id)
            return stripeCustomer.id
        }
        return SESSION_USER.pagarme.customer_id
    }




    static async verifyIfUserAlreadyHasAPagarMECardRegistred(req){
        if(!SESSION_USER.pagarme.card_id){
            const { holder_name,
                    card_number,
                    card_exp_year,
                    card_exp_month,
                    card_cvc } = req.body

            const cardObject = {
                card_number,
                card_holder_name: holder_name,
                card_expiration_date: `${card_exp_month}${card_exp_year}`,
                card_cvv: card_cvc
            }

            const pagarMeCardCreated = await PagarME.createCreditCard(cardObject)
            await Users.createPagarMECard(SESSION_USER.id, pagarMeCardCreated)
            return pagarMeCardCreated
        }

        return {
            card_id: SESSION_USER.pagarme.card_id,
            card_brand: SESSION_USER.pagarme.card_brand,
            card_last_digits: SESSION_USER.pagarme.card_last_digits,
            card_expiration_date: SESSION_USER.pagarme.card_expiration_date
        }
    }


    static async createPagarMESubscription() {
        const subscription = await PagarME.createSubscription(SESSION_USER)

        subscription.date_created = DateTime.getDateTime(subscription.date_created);
        subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
        subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

        return subscription
    }




    /**
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

            const pagarMECustomerID = await PremiumController.verifyIfUserIsAlreadyAPagarMECustomer()

            const pagarMECard = await PremiumController.verifyIfUserAlreadyHasAPagarMECardRegistred(req)

            const subscription = await PremiumController.createPagarMESubscription()

            const subsTransactionObject = {
                created_at: DateTime.getNow(),
                transaction_id: subscription.id,
                status: subscription.status,
                payment_method: {
                    card_id: pagarMECard.card_id,
                    card_brand: pagarMECard.card_brand,
                    card_exp_month: pagarMECard.card_exp_month,
                    card_exp_year: pagarMECard.card_exp_year,
                    card_last4: pagarMECard.card_last4
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
                    pagarme_id: SESSION_USER.pagarme.customer_id,
                    email: SESSION_USER.email,
                    name: SESSION_USER.name
                }
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
