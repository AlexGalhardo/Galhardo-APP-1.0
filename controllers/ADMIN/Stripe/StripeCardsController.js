/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/cards
 */

const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripeCardsController {

	static getViewCreate (req, res)  {
		res.render('pages/admin/stripe/cards/create', {
			user: SESSION_USER
		});
	}

	static async postCreateCreditCard (req, res) {
		const customer_id = req.body.customer_id;
		const card_number = req.body.card_number;
		const card_exp_month = req.body.card_exp_month;
		const card_exp_year = req.body.card_exp_year;
		const card_cvc = req.body.card_cvc;
		
		// create credit card token
		const creditCardToken = await stripe.tokens.create({
		  card: {
		    number: card_number,
		    exp_month: card_exp_month,
		    exp_year: card_exp_year,
		    cvc: card_cvc,
		  },
		});

		creditCardToken.created = DateTime.getDateTime(creditCardToken.created)

		// create credit card in customer
		const card = await stripe.customers.createSource(
			customer_id,
		    {source: creditCardToken.id},
		);

		res.render('pages/admin/stripe/cards/create', {
			flash: {
				type: 'success',
				message: `Credit Card Created!`
			},
			customer_id: customer_id,
			card: creditCardToken,
			user: SESSION_USER
		});
	}

	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/cards/retrieve', {
			user: SESSION_USER
		});
	}

	static async postRetrieveCard (req, res) {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;

		const card = await stripe.customers.retrieveSource(
		  customer_id,
		  card_id
		);

		res.render('pages/admin/stripe/cards/retrieve', {
			flash: {
				type: 'success',
				message: `Credit Card Exist!`
			},
			card,
			user: SESSION_USER
		});
	}

	static getViewUpdate (req, res) {
		res.render('pages/admin/stripe/cards/update', {
			user: SESSION_USER
		});
	}
	
	static async postUpdateCard (req, res) {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;
		const card_holder_name = req.body.card_holder_name;

		if(card_id == "card_1JK82WBD6lhzYmkOTexAPcYA"){
			res.render('pages/admin/stripe/cards/update', {
				flash: {
					type: 'warning',
					message: "You can't update this card from user test!"
				}
			});
			return
		}

		const card = await stripe.customers.updateSource(
			customer_id,
		    card_id,
		    {name: card_holder_name }
		);

		res.render('pages/admin/stripe/cards/update', {
			flash: {
				type: 'success',
				message: `Credit Card UPDATED!`
			},
			card,
			user: SESSION_USER
		});
	}
	
	static getViewDelete (req, res) {
		res.render('pages/admin/stripe/cards/delete', {
			user: SESSION_USER
		});
	}
	
	static async postDeleteCard (req, res) {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;

		if(card_id == "card_1JK82WBD6lhzYmkOTexAPcYA"){
			res.render('pages/admin/stripe/cards/delete', {
				flash: {
					type: 'warning',
					message: "You can't delete this card from user test!"
				}
			});
			return
		}
		
		const cardDeleted = await stripe.customers.deleteSource(
  			customer_id,
  			card_id
		);

		res.render('pages/admin/stripe/cards/delete', {
			flash: {
				type: 'success',
				message: `Credit Card DELETED!`
			},
			card: cardDeleted,
			user: SESSION_USER
		});
	}
	
	static getViewListAll (req, res) {
		res.render('pages/admin/stripe/cards/listAll', {
			user: SESSION_USER
		});
	}
	
	static async postListAll (req, res) {
		let customer_id = req.body.customer_id;
		
		let cards = await stripe.customers.listSources(
		  	customer_id,
		  	{object: 'card', limit: 3}
		);

		let flash_message = "No cards registred for this user!";
		let flash_type = "warning";
		
		if(cards.data.length){
			flash_message = "Cards registred:"
			flash_type = "success";
		}	

		res.render('pages/admin/stripe/cards/listAll', {
			flash: {
				type: flash_type,
				message: flash_message
			},
			cards: cards.data,
			user: SESSION_USER
		});
	}
};

module.exports = StripeCardsController;
