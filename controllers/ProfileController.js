const bodyParser = require('body-parser');
const formidable = require('formidable');
var fs = require('fs');

const Users = require('../models/JSON/Users');

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
			SESSION_USER = null
	        next(err);
	    });
	    res.redirect('/login');
	},

	updateProfile: async(req, res) => {
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

		const updatedProfileInJSON = await Users.updateProfile(userObject);

		if(!updatedProfileInJSON){
			return console.log('NOT updatedProfileInJSON')
		}

		let user = await Users.getUserByID(req.session.userID)
		return res.render('pages/profile/profile', {
    		flash: {
    			type: "success",
    			message: "Profile Updated!"
    		},
    		user
    	});
	},

	updateProfileAvatar: async (req, res) => {

		const { avatar } = req.body

		var form = new formidable.IncomingForm();

		form.parse(req, function (err, fields, files) {
	    	var oldpath = files.avatar.path;
	      	
	      	var newpath = `${APP_ROOT_PATH}/public/uploads/avatars/${req.session.userID}_${files.avatar.name}`;
	      	
	      	fs.rename(oldpath, newpath, function (err) {
	        	if (err) throw err;
	        })

	        Users.updateAvatarName(files.avatar.name, req.session.userID);
	    });

		res.redirect('/profile');
	}
}

module.exports = ProfileController;