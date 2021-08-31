/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/plans
 */

const bodyParser = require('body-parser');

// HELPERS
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

// MODELS
const Users = require('../models/JSON/Users');
// const Users = require('../models/MONGODB/Users');
// const Users = require('../models/MYSQL/Users');
// const Users = require('../models/POSTGRES/Users');
// const Users = require('../models/SQLITE/Users');

const StripeModel = require('../models/JSON/Users');
// const StripeModel = require('../models/MONGODB/Stripe');
// const StripeModel = require('../models/MYSQL/Stripe');
// const StripeModel = require('../models/POSTGRES/Stripe');
// const StripeModel = require('../models/SQLITE/Stripe');



class PlansController {

	constructor(){
        this.stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);
	}


	getViewPlans (req, res) {
		res.render('pages/plans/plans', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}


    getViewPlanStarterCheckout (req, res) {
        return res.render('pages/plans/starter_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }


    getViewPlanProCheckout (req, res) {
        return res.render('pages/plans/pro_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }


    getViewPlanPremiumCheckout (req, res) {
        return res.render('pages/plans/premium_checkout', {
            user: SESSION_USER,
            navbar_plans_active: true
        });
    }


    verifyIfUserHasActiveSubscription(){
        if(SESSION_USER.stripe.currently_subscription_name !== "FREE"){
            return res.render('pages/plans/planPayLog', {
                flash: {
                    type: "warning",
                    message: `You already have a currently plan ${SESSION_USER.stripe.currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`
                },
                user: SESSION_USER,
                navbar_plans_active: true,
            })
        }
    }

    getSubscriptionBanner (plan_name){
        if(plan_name === 'STARTER'){
            return `
            <div class="card mb-4 rounded-3 shadow-sm text-center">
                    <div class="card-header py-3 bg-warning">
                        <h4 class="my-0 fw-normal">You Are STARTER!</h4>
                    </div>

                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">$ 4.99<small class="text-muted fw-light">/month</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>✔️ Support via Telegram/WhatsApp</li>
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
                        <h1 class="card-title pricing-card-title">$ 4.99<small class="text-muted fw-light">/month</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            <li>✔️ Support via Telegram/WhatsApp</li>
                            <li>✔️ Ilimited Recomendations</li>
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




    async verifyIfUserIsAlreadyAStripeCustomer(){
        const customer = await this.stripe.customers.create({
            description: 'Customer created in Subscription checkout!',
            email: customer_email
        });
        await Users.createStripeCustomer(SESSION_USER.id, customer.id)
        return customer
    }




    async verifyIfUserAlreadyHasAStripeCardRegistred(req){
        if(!SESSION_USER.stripe.card_id){
            const { card_number,
                card_exp_year,
                card_exp_month,
                card_cvc } = req.body

            const cardToken = await this.stripe.tokens.create({
                 card: {
                    number: card_number,
                    exp_month: card_exp_month,
                    exp_year: card_exp_year,
                    cvc: card_cvc,
                  },
            });

            const card = await this.stripe.customers.createSource(
                SESSION_USER.stripe.customer_id,
                {source: cardToken.id}
            );

            await Users.createStripeCard(SESSION_USER.id, cardToken.id, card.id)

            return card
        }

        return SESSION_USER.stripe.card_id
    }



    getStripePlanID(){
        return {
            STARTER: process.env.STRIPE_PLAN_STARTER_PRODUCT_ID,
            PRO: process.env.STRIPE_PLAN_PRO_PRODUCT_ID,
            PREMIUM:  process.env.STRIPE_PLAN_PREMIUM_PRODUCT_ID
        }
    }



    async createStripeSubscription(stripe_customer_id, plan_id) {
        const subscription = await this.stripe.subscriptions.create({
            customer: stripe_customer_id,
            items: [
                {price: plan_id},
            ],
        });

        subscription.created = DateTime.getDateTime(subscription.created);
        subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
        subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

        await Users.createStripeSubscription(SESSION_USER.id, subscription)
        await StripeModel.createSubscription(SESSION_USER, subscription)

        return subscription
    }




    /**
     * POST /plan/<plan_name>/checkout
     * Verify if user is a already a stripe customer
     * verify if user already has a stripe credit card registred
     * Verify if user is not already registred in other plan
     */
	async postSubscription (req, res) {

        // if false, continue
        // await this.verifyIfUserHasActiveSubscription()

        let stripe_customer = await this.verifyIfUserIsAlreadyAStripeCustomer()

        let stripe_card = await this.verifyIfUserAlreadyHasAStripeCardRegistred(req)

        const { plan_name } = req.body
        let stripe_plan_id = await this.getStripePlanID()[plan_name];

        let subscription = await this.createStripeSubscription(stripe_customer.id, stripe_plan_id)

        const subsTransactionObject = {
            transaction_id: transactionObject.id,
            payment_method: payment_method,
            currency: subscription.currency,
            paid: subscription.paid,
            subs_period_start: subscription.period_start,
            subs_period_end: subscription.period_end,
            plan: {
                id: stripe_plan_id,
                name: plan_name,
                amount: 499
            },
            customer: {
                id: SESSION_USER.id,
                stripe_id: SESSION_USER.stripe.customer_id,
                email: SESSION_USER.email,
                name: SESSION_USER.name
            },
            stripe_request_response: transactionObject.stripe_request_response,
            created_at: transactionObject.created_at
        }

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
			divPlanBanner: this.getSubscriptionBanner(plan_name)
		});
	}
};

module.exports = new PlansController();
