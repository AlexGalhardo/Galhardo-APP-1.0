const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

const Users = require('../models/Users');

const stripe = require('stripe')('sk_test_IVPNgFWhBStx7kngLOXZHzW0');

const AppController = {
	
	getViewHome: async (req, res) => {
		let user = null;
		if(req.session.userID){
			user = await Users.getUserByID(req.session.userID)
		}
	    res.render('pages/home', {
	        user
	    });
	},

	getViewContact: (req, res) => {
		res.render('pages/contact');
	},

	postContact: async (req, res) => {
		const username = req.body.contact_username;
		const email = req.body.contact_email;
		const subject = req.body.contact_subject;
		const message = req.body.contact_message;

		console.log(username, email, subject, message)

		if(NodeMailer.postContact(username, email, subject, message)){
			res.render('pages/contact', {
				flash: {
					type: 'success',
					message: 'Message Send!'
				}
			});
			return
		}

		res.render('pages/contact', {
			flash: {
				type: 'warning',
				message: 'Error'
			}
		});
	},

	getViewPrivacy: (req, res) => {
		res.render('pages/privacy');
	},

	getViewPlanCheckout: (req, res) => {
		res.render('pages/templates/plan_checkout');
	},

	postShopPayLog: async (req, res) => {
		
		// get post input
		const quantityOranges = req.body.quantityOranges;
		const quantityGrapes = req.body.quantityGrapes;
		const quantityApples = req.body.quantityApples;
		const quantityStrawberries = req.body.quantityStrawberries;
		
		const customer_email = req.body.customer_email;
		
		const customer_city = req.body.customer_city;
		const customer_postal_code = req.body.zipcode;
		const customer_state = req.body.customer_state;
		const customer_street = req.body.customer_street;
		const customer_name = req.body.customer_name;
		const customer_phone = req.body.customer_phone;

		const shipping = {
			address: {
				city: customer_city,
				country: "BRAZIL",
				postal_code: customer_postal_code,
				state: customer_state,
				line1: customer_street
			},
			name: customer_name,
			phone: customer_phone,
			carrier: "CORREIOS"
		}

		const shopCartItems = {
			quantityOranges,
			quantityGrapes,
			quantityApples,
			quantityStrawberries,
			totalOranges: parseFloat(quantityOranges * 0.49).toFixed(2),
			totalGrapes: parseFloat(quantityGrapes * 0.99).toFixed(2),
			totalApples: parseFloat(quantityApples * 1.99).toFixed(2),
			totalStrawberries: parseFloat(quantityStrawberries * 2.99).toFixed(2)
		};

		const value_totalShopCart = req.body.value_totalShopCart;
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

		// create shop cart credit card charge
		const shopCardCharge = await stripe.charges.create({
			amount: parseInt(value_totalShopCart * 100),
		  	currency: 'usd',
		  	source: cardToken.id,
		  	description: JSON.stringify(shopCartItems),
		  	receipt_email: customer_email,
		  	shipping: shipping
		});

		shopCardCharge.created = DateTime.getDateTime(shopCardCharge.created);

		res.render('pages/templates/shopPayLog', {
			flash: {
				type: 'success',
				message: 'Shop Cart Card Charge Created with Success!'
			},
			shopCardCharge,
			shopCartItems,
			value_totalShopCart,
			customer_email,
			shipping
		});
	},
	postPlanPayLog: async (req, res) => {
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

		res.render('pages/templates/planPayLog', {
			flash: {
				type: 'success',
				message: 'Subscription Created with Success!'
			},
			subscription,
			customer_email
		});
	}
};

module.exports = AppController;