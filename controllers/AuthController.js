/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/login
 * http://localhost:3000/register
 * http://localhost:3000/forgetPassword
 * http://localhost:3000/resetPassword
 * http://localhost:3000/confirmEmail
 */

const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");
const queryString = require('query-string');
const axios = require('axios');
const fetch = require('node-fetch');
const randomToken = require('rand-token');

const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');
const NodeMailer = require('../helpers/NodeMailer');


const Users = require('../models/JSON/Users');

const URL = require('../helpers/URL');

class AuthController {
	
	static getViewLogin (req, res){
		res.render('pages/auth/login', {
			FacebookLoginURL: URL.getFacebookURL,
			GitHubLoginURL: URL.getGitHubURL,
			GoogleLoginURL: URL.getGoogleURL
		});
	}
	
	static async postLogin (req, res, next){
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

	    	const confirmedEmail = await Users.verifyIfEmailIsConfirmed(email)
	    	if(!confirmedEmail){
	    		return res.render('pages/auth/login', {
	        		flash: {
	        			type: "warning",
	        			message: "You need to confirm your email!"
	        		}
	            });
	    	}

	    	const userObject = await Users.verifyLogin(email, password)
	        
	        if(!userObject){
	        	return res.render('pages/auth/login', {
	        		flash: {
	        			type: "warning",
	        			message: "Invalid email or/and password!"
	        		}
	            });
	        }

	        req.session.userID = userObject.id
	        global.SESSION_USER = userObject
	        return res.redirect('/');
	    }
	    catch (error) {
	        return res.render('pages/auth/login', {
        		flash: {
        			type: "warning",
        			message: `Error: ${error}`
        		}
            });
	    }
	}
	
	static getViewRegister (req, res){
		res.render('pages/auth/register');
	}

	static verifyIfConfirmEmailURLIsValid (req, res){
		const { email, token } = req.params;

		const confirmEmailValid = Users.verifyConfirmEmailToken(email, token)

		if(confirmEmailValid){
			return res.render('pages/auth/login', {
				flash: {
					type: 'Success',
					message: 'Email Confirmed!'
				}
			})
		}

		return res.redirect('/login')
	}

	static postRegister (req, res, next){
		const errors = validationResult(req);
	    const { username, email, password, confirm_password } = req.body;
	    const confirm_email_token = randomToken.generate(16)

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

	    	const responseRegisterUser = Users.registerUser(username, email, password, confirm_password, confirm_email_token)

	    	if(responseRegisterUser.error){
	    		return res.render("pages/auth/register", {
		            flash: {
	            		type: "warning",
	            		message: responseRegisterUser.message
	            	}
	        	});
	    	}

	    	NodeMailer.sendConfirmEmailToken(email, confirm_email_token)
	        
	        return res.render("pages/auth/register", {
	            flash: {
            		type: "success",
            		message: 'Account Created! Confirm your email by clicking the link send to your email inbox!'
            	}
	        });

	    } catch (error) {
	        return res.render("pages/auth/register", {
	            flash: {
            		type: "danger",
            		message: `Error: ${error}`
            	}
	        });
	    }
	}
	
	static getViewForgetPassword(req, res){
		res.render('pages/auth/forgetPassword');
	}
	
	static postForgetPassword (req, res){
		const { email } = req.body;
		const reset_password_token = randomToken.generate(16);

        const resetPasswordTokenCreated = Users.createResetPasswordToken(email, reset_password_token);

        NodeMailer.postForgetPassword(email, reset_password_token);

        if(!resetPasswordTokenCreated){
            return console.log('reset_password_token not saved in JSON DATABASE!');
        }

		return res.render('pages/auth/forgetPassword', {
			flash: {
				type: "success",
				message: `If this email exists, we'll send a link to this email to recover password!`
			}
		});
	}
	
	static getViewResetPassword (req, res){
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
	}

	static postResetPassword (req, res){
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

	static async loginFacebook (req, res){
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
	}

	static async loginGitHub (req, res){
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
	}

	static async loginGoogle (req, res){
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
	}
}

module.exports = AuthController;