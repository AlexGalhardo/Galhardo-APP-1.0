/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/prices
 */

const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripePricesController {
	
	static getViewCreate (req, res) {
		res.render('pages/admin/stripe/prices/create', {
			user: SESSION_USER
		});
	}

	static async postCreatePrice (req, res) {
		const { price_amount,
				price_currency,
				price_recurring,
				product_id } = req.body
		
		const price = await stripe.prices.create({
  			unit_amount: price_amount,
  			currency: price_currency,
  			recurring: {interval: price_recurring},
  			product: product_id
		});

		price.created = DateTime.getDateTime(price.created);

		res.render('pages/admin/stripe/prices/create', {
			flash: {
				type: 'success',
				message: 'Price Created With Success!'
			},
			price,
			user: SESSION_USER
		});
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/prices/retrieve', {
			user: SESSION_USER
		});
	}
	
	static async postRetrievePrice (req, res) {
		const price_id = req.body.price_id;
		
		const price = await stripe.prices.retrieve(
  			price_id
		);

		price.created = DateTime.getDateTime(price.created);

		res.render('pages/admin/stripe/prices/retrieve', {
			flash: {
				type: 'success',
				message: 'Price Exists!'
			},
			price,
			user: SESSION_USER
		});
	}
	
	static async getViewListAll (req, res) {
		const prices = await stripe.prices.list({
  			limit: 10,
		});

		let lastPricesCreated = prices.data.length;

		prices.data.forEach(function(price){
			price.created = DateTime.getDateTime(price.created);
		})

		res.render('pages/admin/stripe/prices/listAll', {
			lastPricesCreated,
			prices: prices.data,
			user: SESSION_USER
		});
	}
};

module.exports = StripePricesController;
