const bodyParser = require('body-parser')

const stripe = require('stripe')('sk_test_IVPNgFWhBStx7kngLOXZHzW0');

const CardsController = {
	getViewCreate: (req, res) => {
		res.render('pages/cards/create');
	},
	postCreateCreditCard: async (req, res) => {
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

		let date = new Date(creditCardToken.created*1000).toLocaleDateString("pt-BR")
		let time = new Date(creditCardToken.created*1000).toLocaleTimeString("pt-BR")
		creditCardToken.created = `${date} ${time}`;

		// create credit card in customer
		const card = await stripe.customers.createSource(
			customer_id,
		    {source: creditCardToken.id},
		);

		res.render('pages/cards/create', {
			flash: {
				type: 'success',
				message: `Credit Card Created!`
			},
			customer_id: customer_id,
			card: creditCardToken,
			// card_metadata_token_id: card.metadata.token
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/cards/retrieve');
	},
	postRetrieveCard: async (req, res) => {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;

		const card = await stripe.customers.retrieveSource(
		  customer_id,
		  card_id
		);

		res.render('pages/cards/retrieve', {
			flash: {
				type: 'success',
				message: `Credit Card Exist!`
			},
			card
		});
	},
	getViewUpdate: (req, res) => {
		res.render('pages/cards/update');
	},
	postUpdateCard: async (req, res) => {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;
		const card_holder_name = req.body.card_holder_name;

		if(card_id == "card_1JK82WBD6lhzYmkOTexAPcYA"){
			res.render('pages/cards/update', {
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

		res.render('pages/cards/update', {
			flash: {
				type: 'success',
				message: `Credit Card UPDATED!`
			},
			card
		});
	},
	getViewDelete: (req, res) => {
		res.render('pages/cards/delete');
	},
	postDeleteCard: async (req, res) => {
		const customer_id = req.body.customer_id;
		const card_id = req.body.card_id;

		if(card_id == "card_1JK82WBD6lhzYmkOTexAPcYA"){
			res.render('pages/cards/delete', {
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

		res.render('pages/cards/delete', {
			flash: {
				type: 'success',
				message: `Credit Card DELETED!`
			},
			card: cardDeleted
		});
	},
	getViewListAll: (req, res) => {
		res.render('pages/cards/listAll');
	},
	postListAll: async (req, res) => {
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

		res.render('pages/cards/listAll', {
			flash: {
				type: flash_type,
				message: flash_message
			},
			cards: cards.data
		});
	}
};

module.exports = CardsController;