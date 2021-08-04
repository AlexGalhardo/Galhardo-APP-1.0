const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");
const queryString = require('query-string');
const axios = require('axios');
const fetch = require('node-fetch');

const MySQL = require("../mysql");

const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');
const NodeMailer = require('../helpers/NodeMailer');

const Users = require('../models/Users');

const URL = require('../helpers/URL');


const AuthController = {
	
	getViewLogin: (req, res) => {
		if(req.session.userID){
        	return res.redirect('/profile');
    	}
		res.render('pages/auth/login', {
			FacebookLoginURL: URL.getFacebookURL,
			GitHubLoginURL: URL.getGitHubURL,
			GoogleLoginURL: URL.getGoogleURL
		});
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
	},

	loginFacebook: async (req, res) => {
		const code = req.query.code;
		console.log(`The facebook code is: ${code}`);

		var { data } = await fetch({
		    url: 'https://graph.facebook.com/v4.0/oauth/access_token',
		    method: 'post',
		    data: {
		      client_id: process.env.FACEBOOK_CLIENT_ID,
		      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
		      redirect_uri: 'http://localhost:3000/facebook/callback',
		      grant_type: 'authorization_code',
		      code,
		    }
		});
		console.log(data, data.access_token);

		var { data } = await axios({
		    url: 'https://graph.facebook.com/me',
		    method: 'get',
		    params: {
		      fields: ['id', 'email', 'first_name', 'last_name'].join(','),
		      access_token: accesstoken,
		    },
		});
		console.log(data); // { id, email, first_name, last_name }
	  	
	  	res.render('pages/auth/login', {
	  		flash: {
	  			type: "info",
	  			message: `FACEBOOK: ${id}, ${email}`
	  		}
	  	});
	},

	loginGitHub: async (req, res) => {
		const code = req.query.code;
		console.log(`The code is: ${code}`);

		const { data } = await axios({
		    url: 'https://github.com/login/oauth/access_token',
		    method: 'get',
		    params: {
		      client_id: process.env.GITHUB_CLIENT_ID,
		      client_secret: process.env.GITHUB_CLIENT_SECRET,
		      redirect_uri: `${process.env.APP_URL}/github/callback`,
		      code,
		    },
		});
	  	
	  	const parsedData = queryString.parse(data);
	  	console.log('parsedData', parsedData); 
	  	
	  	if (parsedData.error) throw new Error(parsedData.error_description)
	  	console.log('acces token', parsedData.access_token);

		const { response } = await axios({
		    url: 'https://api.github.com/user',
		    method: 'GET',
		    headers: {
		      Authorization: `token ${parsedData.access_token}`,
		    },
		});
	  	
	  	console.log('response', response); // { id, email, name, login, avatar_url }
	  	res.render('pages/auth/login', {
	  		fash: {
	  			type: "info",
	  			message: `GITHUB: ${id}, ${email}, ${name}, ${avatar_url}`
	  		}
	  	});
	},

	loginGoogle: async (req, res) => {
		const code = req.query.code;
		console.log(`The google code is: ${code}`);

		var { data } = await axios({
		    url: `https://oauth2.googleapis.com/token`,
		    method: 'post',
		    data: {
		      client_id: process.env.GOOGLE_CLIENT_ID,
		      client_secret: process.env.GOOGLE_CLIENT_SECRET,
		      redirect_uri: 'http://localhost:3000/google/callback',
		      grant_type: 'authorization_code',
		      code,
		    }
		});
		console.log(data, data.access_token);

		var response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
		    method: 'GET',
		    headers: {
		      Authorization: `Bearer ${data.access_token}`,
		    }
		 })

	  	console.log(response); // { id, email, given_name, family_name }
	  	
	  	res.render('pages/auth/login', {
	  		flash: {
	  			type: "info",
	  			message: `GOOGLE: ${id}, ${email}`
	  		}
	  	});
	},
}

module.exports = AuthController;