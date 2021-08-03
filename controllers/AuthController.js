const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");
const MySQL = require("../mysql");

// Helpers
const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');

// Models
const Users = require('../models/Users');

const AuthController = {
	
	getViewLogin: (req, res) => {
		res.render('pages/auth/login');
	},
	
	postLogin: async (req, res) => {

	},
	
	getViewRegister: (req, res) => {
		res.render('pages/auth/register');
	},

	postRegister: async (req, res) => {
		const errors = validationResult(req);
	    const { username, email, password, confirmPassword } = req;

	    if (!errors.isEmpty()) {
	        return res.render('pages/auth/register', {
	        	flash: {
	        		type: "warning",
	        		message: errors.array()[0].msg
	        	}
	        });
	    }

	    try {
	        const [row] = await MySQL.execute(
	            "SELECT * FROM `users` WHERE `email`=?",
	            [email]
	        );

	        if (row.length >= 1) {
	            return res.render('pages/auth/register', {
	            	flash: {
	            		type: "warning",
	            		message: 'This email is already registred!'
	            	}
	            });
	        }

	        const passwordHash = await Bcrypt.cryptPassword(password);

	        const [rows] = await mysql.execute(
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
	        
	        res.render("pages/auth/login", {
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