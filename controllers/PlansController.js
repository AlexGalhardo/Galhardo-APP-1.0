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
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');
const TelegramBOTLogger = require('../helpers/TelegramBOTLogger');


// MODELS
const Users = require('../models/JSON/Users');
// const Users = require('../models/MONGODB/Users');
// const Users = require('../models/MYSQL/Users');
// const Users = require('../models/POSTGRES/Users');
// const Users = require('../models/SQLITE/Users');

const StripeModel = require('../models/JSON/Stripe');
// const StripeModel = require('../models/MONGODB/Stripe');
// const StripeModel = require('../models/MYSQL/Stripe');
// const StripeModel = require('../models/POSTGRES/Stripe');
// const StripeModel = require('../models/SQLITE/Stripe');


// STRIPE
stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class PlansController {

	static getViewPlans (req, res) {
		res.render('pages/plans/plans', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}


    static getViewPlanStarterCheckout (req, res) {
        return res.render('pages/plans/starter_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }


    static getViewPlanProCheckout (req, res) {
        return res.render('pages/plans/pro_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }


    static getViewPlanPremiumCheckout (req, res) {
        return res.render('pages/plans/premium_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }



    static getSubscriptionBanner (plan_name){
        if(plan_name === 'STARTER'){
            return `
            <div class="card mb-4 rounded-3 shadow-sm text-center">
                    <div class="card-header py-3 bg-warning">
                        <h4 class="my-0 fw-bold"><i class="bi bi-award"></i> You Are STARTER!</h4>
                    </div>

                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">$ 1.99<small class="text-muted fw-light">/month</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>✔️ Support via Telegram/WhatsApp</li>
                            <li>❌ Ilimited Recomendations</li>
                            <li>❌ Get news in email</li>
                        </ul>
                    </div>

                </div>`
        }
        else if(plan_name === 'PRO'){
            return `
            <div class="card mb-4 rounded-3 shadow-sm text-center">
                    <div class="card-header py-3 bg-danger">
                        <h4 class="my-0 fw-normal">You Are PRO!</h4>
                    </div>

                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">$ 2.99<small class="text-muted fw-light">/month</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>✔️ Support via Telegram/WhatsApp</li>
                            <li>✔️ Ilimited Recomendations</li>
                            <li>❌ Get news in email</li>
                        </ul>
                    </div>

                </div>`
        }
        else {
            return `
                <div class="card mb-4 rounded-3 shadow-sm text-center">
                    <div class="card-header py-3 bg-info">
                        <h4 class="my-0 fw-normal">You Are PREMIUM!</h4>
                    </div>

                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">$ 4.99<small class="text-muted fw-light">/month</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>✔️ Support via Telegram/WhatsApp</li>
                            <li>✔️ Ilimited Recomendations</li>
                            <li>✔️ Get news in email</li>
                        </ul>
                    </div>

                </div>
            `
        }
    }




    static async verifyIfUserIsAlreadyAStripeCustomer(customer_email){
        if(!SESSION_USER.stripe.customer_id){
            const customer = await stripe.customers.create({
                description: 'Customer created in Subscription checkout!',
                email: SESSION_USER.email
            });
            await Users.createStripeCustomer(SESSION_USER.id, customer.id)
            return customer
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

            await Users.createStripeCard(SESSION_USER.id, cardToken.id, card)

            return card
        }

        return SESSION_USER.stripe.card_id
    }



    static getStripePlanID(){
        return {
            STARTER: process.env.STRIPE_PLAN_STARTER_PRICE_ID,
            PRO: process.env.STRIPE_PLAN_PRO_PRODUCT_ID,
            PREMIUM:  process.env.STRIPE_PLAN_PREMIUM_PRODUCT_ID
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
     * Verify if user is a already a stripe customer
     * verify if user already has a stripe credit card registred
     * Verify if user is not already registred in other plan
     */
    static async postSubscription (req, res) {

        try {
            const { plan_name, customer_password } = req.body

            if(!Users.verifyPassword(SESSION_USER.id, customer_password)){
                return res.render('pages/plans/plans', {
                    flash: {
                        type: "warning",
                        message: `Invalid Password!`
                    },
                    user: SESSION_USER,
                    navbar_plans_active: true,
                })
            }

            const stripe_customer_id = await PlansController.verifyIfUserIsAlreadyAStripeCustomer()

            await PlansController.verifyIfUserAlreadyHasAStripeCardRegistred(req)

            const stripe_plan_id = await PlansController.getStripePlanID()[plan_name];

            const subscription = await PlansController.createStripeSubscription(stripe_customer_id, stripe_plan_id)

            const subsTransactionObject = {
                created_at: DateTime.getNow(),
                transaction_id: subscription.id,
                status: subscription.status,
                payment_method: {
                    card_id: SESSION_USER.stripe.card_id,
                    card_brand: SESSION_USER.stripe.card_brand,
                    card_exp_month: SESSION_USER.stripe.card_exp_month,
                    card_exp_year: SESSION_USER.stripe.card_exp_year,
                    card_last4: SESSION_USER.stripe.card_last4
                },
                plan: {
                    id: stripe_plan_id,
                    name: plan_name,
                    amount: 199,
                    current_period_start: subscription.current_period_start,
                    current_period_end: subscription.current_period_end,
                    cancel_at_period_end: subscription.cancel_at_period_end
                },
                customer: {
                    id: SESSION_USER.id,
                    stripe_id: SESSION_USER.stripe.customer_id,
                    email: SESSION_USER.email,
                    name: SESSION_USER.name
                },
                stripe_request_response: JSON.stringify(subscription),
            }

            await Users.createStripeSubscription(SESSION_USER.id, plan_name, subscription)

            await StripeModel.createSubscriptionTransaction(subsTransactionObject)

            await NodeMailer.sendSubscriptionTransaction(subsTransactionObject)

            await TelegramBOTLogger.logSubscriptionTransaction(subsTransactionObject)

            res.render('pages/plans/planPayLog', {
                flash: {
                    type: 'success',
                    message: 'Subscription Created with Success!'
                },
                subsTransactionObject,
                user: SESSION_USER,
                navbar_plans_active: true,
                divPlanBanner: PlansController.getSubscriptionBanner(plan_name)
            });

        } catch(err){
            throw new Error(err)
        }
	}
};

module.exports = PlansController;
