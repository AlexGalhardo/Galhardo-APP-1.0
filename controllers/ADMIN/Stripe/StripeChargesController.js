/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/charges
 */

const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripeChargesController  {
	
	static getViewCreate (req, res)  {
		res.render('pages/admin/stripe/charges/create', {
			user: SESSION_USER
		});
	}

	static async postCreateCharge (req, res) {
		const { amount,
				currency,
				customer_card_id, 
				customer_id, 
				description,
				stripeToken } = req.body

		const charge = await stripe.charges.create({
		  	amount,
		  	currency,
		  	description,
			source: customer_card_id,
			customer: customer_id
		});

		charge.created = DateTime.getDateTime(charge.created); 
		charge.amount = (charge.amount / 100).toFixed(2)

		res.render('pages/admin/stripe/charges/create', {
			flash: {
				type: 'success',
				message: `Charge Card Success!`
			},
			charge,
			user: SESSION_USER
		});
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/charges/retrieve', {
			user: SESSION_USER
		});
	}
	
	static async postRetrieveCharge (req, res) {
		const charge_id = req.body.charge_id;
		
		const charge = await stripe.charges.retrieve(
			charge_id
		);

		charge.created = DateTime.getDateTime(charge.created); 

		res.render('pages/admin/stripe/charges/retrieve', {
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

		res.render('pages/admin/stripe/charges/listAll', {
			charges: charges.data,
			totalCharges,
			user: SESSION_USER
		});
	}
};

module.exports = StripeChargesController;
