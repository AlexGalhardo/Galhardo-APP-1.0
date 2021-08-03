const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");

const MySQL = require("../mysql");

const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');

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

	    /*const MySQL = await mysql2.createConnection({
		    host: process.env.MYSQL_HOST,
		    user: process.env.MYSQL_USERNAME,
		    password: process.env.MYSQL_PASSWORD,
		    database: process.env.MYSQL_DATABASE
		});*/

	    if (!errors.isEmpty()) {
	        return res.render('pages/auth/register', {
	        	flash: {
	        		type: "warning",
	        		message: errors.array()[0].msg
	        	}
	        });
	    }

	    try {
  			let [rows, fields] = await MySQL.execute(
  				"SELECT * FROM `users` WHERE `email` = ?", 
  				[email]
  			);

	        if (rows.length >= 1) {
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

	        const passwordHash = await Bcrypt.cryptPassword(password);

	        [rows] = await MySQL.execute(
	            "INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)",
	            [username, email, passwordHash]
	        );

	        if (rows.affectedRows !== 1) {
	            return res.render('pages/auth/register', {
	            	flash: {
	            		type: "warning",
	            		message: 'Registration failed!'
	            	}
	            });
	        }
	        
	        res.render("pages/auth/register", {
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
		res.render('pages/auth/forgetPassword');
	},
	
	postForgetPassword: async (req, res) => {
		const email = req.body.email;

		res.render('pages/auth/forgetPassword', {
			flash: {
				type: "success",
				message: "If this email exists, we send a link to this email to recover password!"
			}
		});
	},
	getViewResetPassword: (req, res) => {
		const email = req.params.email;
		const token = req.params.token;

		if(!email || !token){
			res.render('pages/auth/forgetPassword', {
				flash: {
					type: "warning",
					message: "Inválid URL!"
				}
			});
		}
		res.render('pages/auth/resetPassword');
	},
	postResetPassword: async (req, res) => {
		const newPassword = req.body.new_password;
		const confirmNewPassword = req.body.confirm_new_password;

		res.render('pages/auth/login', {
			flash: {
				type: "success",
				message: "You updated your password!"
			}
		});
	}
}

module.exports = AuthController;