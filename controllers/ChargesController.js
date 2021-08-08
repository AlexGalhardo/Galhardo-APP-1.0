const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const ChargesController = {
	getViewCreate: (req, res) => {
		res.render('pages/charges/create');
	},
	postCreateCharge: async (req, res) => {
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

		res.render('pages/charges/create', {
			flash: {
				type: 'success',
				message: `Charge Card Success!`
			},
			charge
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/charges/retrieve');
	},
	postRetrieveCharge: async (req, res) => {
		const charge_id = req.body.charge_id;
		
		const charge = await stripe.charges.retrieve(
			charge_id
		);

		charge.created = DateTime.getDateTime(charge.created); 

		res.render('pages/charges/retrieve', {
			flash: {
				type: 'success',
				message: `Charge Exists!`
			},
			charge
		});
	},
	getViewListAll: async (req, res) => {
		const charges = await stripe.charges.list({
  			limit: 10
		});

		const totalCharges = charges.data.length;
		charges.data.forEach(function(charge){
			charge.created = DateTime.getDateTime(charge.created);
		})

		res.render('pages/charges/listAll', {
			charges: charges.data,
			totalCharges
		});
	}
};

module.exports = ChargesController;