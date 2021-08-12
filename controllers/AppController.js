const bodyParser = require('body-parser');
const NodeMailer = require('../helpers/NodeMailer');

const Games = require('../models/JSON/Games');
const Books = require('../models/JSON/Books');


const AppController = {
	
	getViewHome: async (req, res) => {
		const game = await Games.getRandomGame()

	    res.render('pages/home', {
	    	game,
	      	user: SESSION_USER
	    });
	},

	getViewBooks: async (req, res) => {
		const book = await Books.getRandomBook()

	    res.render('pages/books', {
	    	book,
	      	user: SESSION_USER
	    });
	},

	getViewContact: async (req, res) => {
		res.render('pages/contact', {
			user: SESSION_USER,
			contact_active: true,
		});
	},

	postContact: async (req, res) => {
		const { contact_username,
				contact_email,
				contact_subject,
				contact_message } = req.body;

		if(NodeMailer.postContact(contact_username, 
									contact_email, 
									contact_subject, 
									contact_message))
		{
			return res.render('pages/contact', {
				flash: {
					type: 'success',
					message: 'Message Send!'
				},
				user: SESSION_USER
			});
		}

		return res.redirect('/contact')
	},

	getViewPrivacy: async (req, res) => {
		res.render('pages/privacy', {
			user: SESSION_USER,
			privacy_active: true
		});
	},
};

module.exports = AppController;