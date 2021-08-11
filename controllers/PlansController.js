const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const PlansController = {

	getViewPlans: async (req, res) => {
		res.render('pages/plans/plans', {
			user: SESSION_USER,
			plans_active: true
		});
	},

	getViewPlanPremiumCheckout: async (req, res) => {
		if(!req.session.userID){
	      	return res.render('pages/plans/plan_checkout', {
	      		flash: {
	      			type: "warning",
	      			message: "You Must Be Logued To Make A Subscription Transaction!"
	      		}
	      	})
	  	}

		res.render('pages/plans/plan_checkout', {
			user: SESSION_USER,
			plans_active: true
		});
	},

	postPlanPremiumPayLog: async (req, res) => {

		if(!req.session.userID){
        	return res.render('pages/plans/plan_checkout', {
        		flash: {
        			type: "danger",
        			message: "You Must Be Logued To Make A Subscription Transaction!"
        		}
        	})
    	}

		const customer_email = req.body.customer_email;

		// CREATE CUSTOMER AND CREDIT CARD ONLY IF NOT REGISTRED IN STRIPE YET

		// create customer
		const customer = await stripe.customers.create({
  			description: 'Customer example created to test plan premium',
  			email: customer_email
		});

		// create credit card
		const card_number = req.body.card_number;
		const card_exp_month = req.body.card_exp_month;
		const card_exp_year = req.body.card_exp_year;
		const card_cvc = req.body.card_cvc;;

		// generate card token
		const cardToken = await stripe.tokens.create({
		 	card: {
		    	number: card_number,
		   		exp_month: card_exp_month,
		    	exp_year: card_exp_year,
		    	cvc: card_cvc,
		  	},
		});

		// create credit card
		const card = await stripe.customers.createSource(
		  	customer.id,
		  	{source: cardToken.id}
		);

		// create subscription
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
		  	items: [
		    	{price: 'plan_JxJMW54dmkHkfF'}, // PLAN PREMIUM ALREADY REGISTRED
		  	],
		});

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/plans/planPayLog', {
			flash: {
				type: 'success',
				message: 'Subscription Created with Success!'
			},
			subscription,
			customer_email,
			user: SESSION_USR,
			plans_active: true
		});
	}
};

module.exports = PlansController;