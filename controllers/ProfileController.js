const bodyParser = require('body-parser')

const Upload = require('../helpers/Upload')

const Users = require('../models/JSON/Users')

class ProfileController {
	
	static async getViewProfile (req, res) {
    	return res.render('pages/profile/profile', {
    		user: SESSION_USER
    	});
	}
	
	static getLogout (req, res, next) {
		req.session.destroy((err) =>  {
			SESSION_USER = null;
	        next(err);
	    });
	    res.redirect('/login');
	}

	static updateProfile (req, res) {
		const { username, 
				email, 
				document, 
				phone, 
				birth_date, 
				zipcode, 
				street,
				street_number, 
				neighborhood,
				state,
				city,
				country
		} = req.body;

		const userObject = {
			id: req.session.userID,
			username,
			email,
			document,
			phone,
			birth_date,
			zipcode,
			street,
			street_number,
			neighborhood,
			state,
			city,
			country
		};

		let message = null;
		let type = null;

		if(Users.emailIsAlreadyRegistred(email)){
			type = "warning"
			message = 'This email is already registred!'
		}
		else if(email === "test@gmail.com"){
			type = "warning"
			message = "You cant update test@gmail.com!"
		} else {
			if(!Users.updateProfile(userObject)) return console.log('NOT updated Profile In JSON')
		}

		return res.render('pages/profile/profile', {
    		flash: {
    			type: type,
    			message: message
    		},
    		user: SESSION_USER
    	});
	}

	static updateProfileAvatar (req, res) {

		Upload.avatarProfile(req)

		res.redirect('/profile');
	}
}

module.exports = ProfileController;