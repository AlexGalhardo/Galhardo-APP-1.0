const fetch = require('node-fetch');
const uuid = require('uuid');

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
		
		if(json.length > 0 && json[0].email === email) return true;

		return false;
	},

	postLogin: async (email, password) => {
		const response = await fetch(
			`${process.env.DATABASE_JSON_URL}/users?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		if(json.length > 0 && json[0].email === email){
			const passwordValid = await Bcrypt.comparePassword(password, json[0].password);
			if(passwordValid){
				return json[0].id;
			}
		}		
		
		return null;
	},

	registerUser: async (username, email, password) => {
		const passwordHash = await Bcrypt.cryptPassword(password);

		const response = await fetch(`${process.env.DATABASE_JSON_URL}/users`, {
		    method: 'POST',
		    body:    JSON.stringify({
		    	id: uuid.v4(),
		    	name: username,
		    	email: email,
		    	password: passwordHash,
		    	admin: 0,
		    	resetPasswordToken: null,
		    	created_at: DateTime.getNow(),
		    	updated_at: DateTime.getNow()
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const userRegistred = await response.json();
		
		console.log(userRegistred);
		
		return true;
	},

	createResetPasswordToken: async (recoverPasswordToken, email) => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/users/a4ff72d4-fd41-4ecf-87c1-1a87a140ea84`, {
		    method: 'PATCH',
		    body:    JSON.stringify({
		    	reset_password_token: recoverPasswordToken
		    }),
		    headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json();

		console.log(json)

		if(json) return true;

		return false;
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