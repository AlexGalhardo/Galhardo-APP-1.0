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

// helpers
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

// models
const Users = require('../models/JSON/Users');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const plan_premium = 'plan_JxJMW54dmkHkfF';



class PlansController {

	static getViewPlans (req, res) {
		res.render('pages/plans/plans', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}

	static async createStripeSubscription(customer_id, plan_id) {
		const subscription = await stripe.subscriptions.create({
			customer: customer_id,
		  	items: [
		    	{price: plan_id},
		  	],
		});

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		// save transaction into JSON database
		const subsSaved = await Users.createStripeSubscription(SESSION_USER.id, subscription)
	
		return subscription
	}

	static async createStripeCard(customer_id, 
									card_number, 
									card_exp_month, 
									card_exp_year, 
									card_cvc) {
		const cardToken = await stripe.tokens.create({
		 	card: {
		    	number: card_number,
		   		exp_month: card_exp_month,
		    	exp_year: card_exp_year,
		    	cvc: card_cvc,
		  	},
		});

		const card = await stripe.customers.createSource(
		  	customer_id,
		  	{source: cardToken.id}
		);

		// save transaction into JSON database
		const cardSaved = await Users.createStripeCard(SESSION_USER.id, cardToken.id, card.id)

		return card
	}

	static async verifySubscription(req){
		const { customer_stripe_card_id,
				customer_email, 
				card_number, 
				card_exp_year,
				card_exp_month,
				card_cvc } = req.body

		
		// IF CUSTOMER IS ALREADY REGISTRED IN STRIPE AND HAVE A CREDIT CARD
		if(customer_stripe_card_id){
			const subscription = await PlansController.createStripeSubscription(SESSION_USER.stripe.customer_id, 'plan_JxJMW54dmkHkfF')

			return subscription
		} 
		
		// CUSTOMER IS REGISTRED IN STRIPE, BUT NOT HAVE A CREDIT CARD REGISTRED YET
		else if(SESSION_USER.stripe.customer_id){

			const cardCreated = await PlansController.createStripeCard(
					SESSION_USER.stripe.customer_id, 
					card_number, 
					card_exp_month, 
					card_exp_year, 
					card_cvc
				)

			const subscription = 
				await PlansController.createStripeSubscription(
					SESSION_USER.stripe.customer_id, 
					'plan_JxJMW54dmkHkfF'
				)

			return subscription
		}

		// NEED TO REGISTER CUSTOMER AND CREDIT CARD IN STRIPE
		else {
			const customer = await stripe.customers.create({
	  			description: 'Customer created in Subscription checkout!',
	  			email: customer_email
			});

			// save customer into json database
			const customerSaved = await Users.createStripeCustomer(SESSION_USER.id, customer.id)

			const cardCreated = await PlansController.createStripeCard(
					customer.id, 
					card_number, 
					card_exp_month, 
					card_exp_year, 
					card_cvc
				)

			const subscription = 
				await PlansController.createStripeSubscription(
					customer.id, 
					'plan_JxJMW54dmkHkfF'
				)

			return subscription
		}
	}

	static async getViewPlanStarterCheckout (req, res) {
		if(!req.session.userID){
			return res.redirect('/login')
	  	}

	  	if(SESSION_USER.stripe.currently_subscription_name !== "FREE"){
    		return res.render('pages/plans/plans', {
        		flash: {
        			type: "warning",
        			message: `You already have a currently plan ${SESSION_USER.stripe.currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`
        		},
        		user: SESSION_USER,
				navbar_plans_active: true,
        	})
    	}

		return res.render('pages/plans/starter_checkout', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}


	static async getViewPlanProCheckout (req, res) {
		if(!req.session.userID){
			return res.redirect('/login')
	  	}

	  	if(SESSION_USER.stripe.currently_subscription_name !== "FREE"){
    		return res.render('pages/plans/plans', {
        		flash: {
        			type: "warning",
        			message: `You already have a currently plan ${SESSION_USER.stripe.currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`
        		},
        		user: SESSION_USER,
				navbar_plans_active: true,
        	})
    	}

		return res.render('pages/plans/pro_checkout', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}


	static async getViewPlanPremiumCheckout (req, res) {
		if(!req.session.userID){
			return res.redirect('/login')
	  	}

	  	if(SESSION_USER.stripe.currently_subscription_name !== "FREE"){
    		return res.render('pages/plans/plans', {
        		flash: {
        			type: "warning",
        			message: `You already have a currently plan ${SESSION_USER.stripe.currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`
        		},
        		user: SESSION_USER,
				navbar_plans_active: true,
        	})
    	}

		return res.render('pages/plans/premium_checkout', {
			user: SESSION_USER,
			navbar_plans_active: true
		});
	}

	static getSubscriptionBanner (plan_name){
		if(plan_name === 'starter'){
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
    	else if(plan_name === 'pro'){
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

	static async postSubscription (req, res) {

		const { plan_name } = req.body 

		if(!req.session.userID){
        	return res.render('pages/plans/planPayLog', {
        		flash: {
        			type: "danger",
        			message: "You Must Be Logued To Make A Subscription Transaction!"
        		}
        	})
    	}

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

    	const subscription = await PlansController.verifySubscription(req)

    	const subsTransactionObject = {
    		status: 'Success',
            plan_name: plan_name,
            transaction_id: subscription.id,
            subs_start: subscription.current_period_start,
            subs_end: subscription.current_period_end
    	}

    	console.log('entrou nodemailer', subsTransactionObject)

    	NodeMailer.sendEmailSubscriptionTransaction(subsTransactionObject)

		res.render('pages/plans/planPayLog', {
			flash: {
				type: 'success',
				message: 'Subscription Created with Success!'
			},
			subscription,
			user: SESSION_USER,
			navbar_plans_active: true,
			divPlanBanner: PlansController.getSubscriptionBanner(plan_name)
		});
	}
};

module.exports = PlansController;