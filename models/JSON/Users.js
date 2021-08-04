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
		    	resetPasswordToken: null,
		    	created_at: DateTime.getNow(),
		    	updated_at: DateTime.getNow()
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const userRegistred = await response.json();
		
		console.log(userRegistred);
		
		return true;
	}
};

module.exports = Users;