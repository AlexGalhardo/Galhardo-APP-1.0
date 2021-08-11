const fetch = require('node-fetch');
const uuid = require('uuid');
const randomToken = require('rand-token');

const Bcrypt = require('../../helpers/Bcrypt');
const DateTime = require('../../helpers/DateTime');


const Users = {

	getUserByID: async (id) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?id=${id}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		if(json.length > 0 && json[0].id === id) return json[0];

		return null;
	},

	emailIsAlreadyRegistred: async (email) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		return (json.length > 0 && json[0].email === email) ? true : false
	},

	verifyConfirmEmailToken: async (email, token) => {
		
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();

		if(json.length > 0 && json[0].confirm_email_token === token){
			
			const responsePatch = await fetch(
				`${process.env.DATABASE_JSON_URL}/users/${json[0].id}`, {
	  				method: 'PATCH',
				    body:    JSON.stringify({
				        "confirmed_email": true,
				        "confirm_email_token": null,
				    }),
				    headers: { 'Content-Type': 'application/json' },
				});

			const jsonPatch = await responsePatch.json();
			console.log('json patch confirmed_email', jsonPatch)

			if(jsonPatch) return true;
			return false;
		}
	},

	verifyIfEmailIsConfirmed: async (email) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		return json[0].confirmed_email ? true : false
	},

	/**
	 * If true, Return User ID
	 * else, return null
	 */
	verifyLogin: async (email, password) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		if(json.length > 0 && json[0].email === email){
			const passwordValid = await Bcrypt.comparePassword(password, json[0].password)
			
			return passwordValid ? json[0].id : null
		}		
	},

	/**
	 * string username, email, password
	 * Return true or false
	 */
	registerUser: async (username, email, password, confirm_password, confirm_email_token) => {

		let emailExists = await Users.emailIsAlreadyRegistred(email);
    	if(emailExists){
    		return objectResponse = {
    			error: true,
    			message: "Email already registred!"
    		}
    	}

    	if(password !== confirm_password){
        	return objectResponse = {
    			error: true,
    			message: "Password and confirm password not equal!"
    		}
    	}

		const passwordHash = await Bcrypt.cryptPassword(password)
		

		const userResgitred = await fetch(`${process.env.DATABASE_JSON_URL}/users`, {
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json' },
		    body:    JSON.stringify({
		    	id: uuid.v4(),
		    	name: username,
		    	email: email,
		    	confirmed_email: false,
		    	confirm_email_token: confirm_email_token,
		    	password: passwordHash,
		    	reset_password_token: null,
		    	admin: false,
		    	avatar: "avatar.png",
		    	document: null,
		    	phone: null,
		    	birth_date: null,
		    	google_id: null,
      			github_id: null,
      			facebook_id: null,
		    	address: {
		    		zipcode: null,
			        street: null,
			        street_number: null,
			        neighborhood: null,
			        city: null,
			        state: null,
			        country: "BRAZIL"
		    	},
      			stripe: {
			        customer_id: null,
			        card_id: null,
			        currently_subscription_id: null,
			        currently_subscription_name: null,
			        subscription_start: null, 
			        subscription_end: null,
			        subscription_automatically_renew: false
			    },
		    	created_at: DateTime.getNow(),
		    	updated_at: DateTime.getNow()
		    })
		});

		return userResgitred
			? 
			objectResponse = {
				error: false,
	    		message: "User Registred!"
			} 
			: 
			objectResponse = {
				error: true,
	    		message: "User not registred in JSON Database"
			}
	},

	createResetPasswordToken: async (email, reset_password_token) => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
		    method: 'PATCH',
		    body:    JSON.stringify({
		    	reset_password_token
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const json = await response.json();

		return json ? true : false
	},

	passwordResetTokenIsValid: async (email, resetPasswordToken) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}&reset_password_token=${resetPasswordToken}`, {
  				"method": "GET"
			});

		const json = await response.json();
		console.log(json);

		if(json) return true;

		return false;
	},

	updateProfile: async (user) => {

		const response = await fetch(`${process.env.DATABASE_JSON_URL}/users/${user.id}`, {
		    method: 'PATCH',
		    body:    JSON.stringify({
		    	name: user.username,
		    	email: user.email,
		    	document: user.document,
		    	phone: user.phone,
		    	birth_date: user.birth_date,
		    	address: {
		    		zipcode: user.zipcode,
		    		street: user.street,
		    		street_number: user.street_number,
		    		neighborhood: user.neighborhood,
		    		city: user.city,
		    		state: user.state,
		    		country: user.country
		    	},
		    	updated_at: DateTime.getNow() 
		    }),
		    headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json();

		console.log(json)

		if(json) return true;

		return false;
	},

	updateAvatarName: async (avatarName, user_id) => {

		const response = await fetch(`${process.env.DATABASE_JSON_URL}/users/${user_id}`, {
		    method: 'PATCH',
		    body:    JSON.stringify({
		    	avatar: `${user_id}_${avatarName}`,
		    	updated_at: DateTime.getNow() 
		    }),
		    headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json();

		console.log(json)

		if(json) return true;

		return false;
	}
};

module.exports = Users;