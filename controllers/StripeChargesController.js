const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

class StripeChargesController  {
	
	static getViewCreate (req, res)  {
		res.render('pages/stripe/charges/create', {
			user: SESSION_USER
		});
	}

	static async postCreateCharge (req, res) {
		const amount = req.body.charge_amount;
		const currency = req.body.charge_currency;
		const customer_card_id = req.body.customer_card_id;
		const customer_id = req.body.customer_id;
		const description = req.body.charge_description;

		const token = req.body.stripeToken; // Using Express

		const charge = await stripe.charges.create({
		  	amount: amount,
		  	currency: currency,
		  	description: description,
			source: customer_card_id,
			customer: customer_id
		});

		charge.created = DateTime.getDateTime(charge.created); 
		charge.amount = (charge.amount / 100).toFixed(2)

		res.render('pages/stripe/charges/create', {
			flash: {
				type: 'success',
				message: `Charge Card Success!`
			},
			charge,
			user: SESSION_USER
		});
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/stripe/charges/retrieve', {
			user: SESSION_USER
		});
	}
	
	static async postRetrieveCharge (req, res) {
		const charge_id = req.body.charge_id;
		
		const charge = await stripe.charges.retrieve(
			charge_id
		);

		charge.created = DateTime.getDateTime(charge.created); 

		res.render('pages/stripe/charges/retrieve', {
			flash: {
				type: 'success',
				message: `Charge Exists!`
			},
			charge,
			user: SESSION_USER
		});
	}

	static async getViewListAll (req, res) {
		const charges = await stripe.charges.list({
  			limit: 10
		});

		const totalCharges = charges.data.length;
		charges.data.forEach(function(charge){
			charge.created = DateTime.getDateTime(charge.created);
		})

		res.render('pages/stripe/charges/listAll', {
			charges: charges.data,
			totalCharges,
			user: SESSION_USER
		});
	}
};

module.exports = StripeChargesController;