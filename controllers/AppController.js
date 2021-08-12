/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/
 */

const bodyParser = require('body-parser');
const NodeMailer = require('../helpers/NodeMailer');

const Games = require('../models/JSON/Games');
const Books = require('../models/JSON/Books');

class AppController {
	
	static getViewHome (req, res) {
		const game = Games.getRandomGame()

	    res.render('pages/home', {
	    	game,
	      	user: SESSION_USER
	    });
	}

	static getViewBooks (req, res){
		const book = Books.getRandomBook()

	    res.render('pages/books', {
	    	book,
	      	user: SESSION_USER
	    });
	}

	static getViewContact (req, res){
		res.render('pages/contact', {
			user: SESSION_USER,
			contact_active: true,
		});
	}

	static postContact (req, res){
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
	}

	static getViewPrivacy (req, res){
		res.render('pages/privacy', {
			user: SESSION_USER,
			privacy_active: true
		});
	}
};

module.exports = AppController;