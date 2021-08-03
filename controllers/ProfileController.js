const bodyParser = require('body-parser');

const Users = require('../models/Users');

const ProfileController = {
	
	getViewProfile: async (req, res) => {
		if(!req.session.userID){
        	return res.redirect('/login');
    	}
    	let user = await Users.getUserByID(req.session.userID)
    	return res.render('pages/profile/profile', {
    		user
    	});
	},
	
	getLogout: (req, res, next) => {
		req.session.destroy((err) => {
	        next(err);
	    });
	    res.redirect('/login');
	}
}

module.exports = ProfileController;