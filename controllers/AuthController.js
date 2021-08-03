const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");

const MySQL = require("../mysql");

const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');
const NodeMailer = require('../helpers/NodeMailer');

const Users = require('../models/Users');



const AuthController = {
	
	getViewLogin: (req, res) => {
		if(req.session.userID){
        	return res.redirect('/profile');
    	}
		res.render('pages/auth/login');
	},
	
	postLogin: async (req, res, next) => {
		const errors = validationResult(req);
	    const { email, password } = req.body;

	    if (!errors.isEmpty()) {
	        return res.render('pages/auth/login', {
	        	flash: {
	        		type: "warning",
	           		message: errors.array()[0].msg,
	        	}
	        });
	    }

	    try {

	    	let userID = await Users.postLogin(email, password);
	        
	        if(!userID){
	        	return res.render('pages/auth/login', {
	        		flash: {
	        			type: "warning",
	        			message: "Invalid email or/and password!"
	        		}
	            });
	        }

	        req.session.userID = userID;
	        console.log("req.session.userID setado é: " + req.session.userID);
	        return res.redirect('/');
	    }
	    catch (e) {
	        next(e);
	    }
	},
	
	getViewRegister: (req, res) => {
		if(req.session.userID){
        	return res.redirect('/profile');
    	}
		res.render('pages/auth/register');
	},

	postRegister: async (req, res, next) => {
		const errors = validationResult(req);
	    const { username, email, password, confirm_password } = req.body;

	    console.log(username, email, password, confirm_password);

	    if (!errors.isEmpty()) {
	        return res.render('pages/auth/register', {
	        	flash: {
	        		type: "warning",
	        		message: errors.array()[0].msg
	        	}
	        });
	    }

	    try {

	    	let emailValid = await Users.emailIsAlreadyRegistred(email);
	    	if(emailValid){
	    		return res.render('pages/auth/register', {
	            	flash: {
	            		type: "warning",
	            		message: 'This email is already registred!'
	            	}
	            });
	    	}

	        if(password !== confirm_password){
            	return res.render('pages/auth/register', {
	            	flash: {
	            		type: "warning",
	            		message: 'Password and confirm password not equal!'
	            	}
	            });
        	}

        	if(!Users.registerUser(username, email, password)){
        		return res.render('pages/auth/register', {
	            	flash: {
	            		type: "warning",
	            		message: 'Registration failed!'
	            	}
	            });
        	}
	        
	        return res.render("pages/auth/register", {
	            flash: {
            		type: "success",
            		message: 'Account Created!'
            	}
	        });

	    } catch (e) {
	        next(e);
	    }
	},
	
	getViewForgetPassword: (req, res) => {
		if(req.session.userID){
        	return res.redirect('/profile');
    	}
		res.render('pages/auth/forgetPassword');
	},
	
	postForgetPassword: async (req, res) => {
		const email = req.body.email;

		NodeMailer.postForgetPassword(email);

		res.render('pages/auth/forgetPassword', {
			flash: {
				type: "success",
				message: "If this email exists, we'll send a link to this email to recover password!"
			}
		});
	},
	
	getViewResetPassword: (req, res) => {
		if(req.session.userID){
        	return res.redirect('/profile');
    	}

		const email = req.params.email;
		const token = req.params.token;

		console.log(email, token);

		if(!email || !token){
			return res.redirect('/forgetPassword');
		}

		if(!Users.passwordResetTokenIsValid(email, token)){
			return res.redirect('/forgetPassword');
		}

		res.render('pages/auth/resetPassword', {
			email
		});
	},

	postResetPassword: async (req, res) => {
		const email = req.body.email;
		const newPassword = req.body.new_password;
		const confirmNewPassword = req.body.confirm_new_password;

		console.log(email, newPassword, confirmNewPassword);

		if(newPassword !== confirmNewPassword){
			return res.render('pages/auth/resetPassword', {
				flash: {
					type: "warning",
					message: "New password and confirm new password are not equal!"
				}
			});
		}

		if(!Users.resetPassword(email, newPassword)){
			return console.log('banco de dados não atualizou o password!');
		}

		return res.render('pages/auth/login', {
			flash: {
				type: "success",
				message: "You updated your password!"
			}
		});
	}
}

module.exports = AuthController;