const fetch = require('node-fetch');
const uuid = require('uuid');

const Bcrypt = require('../../helpers/Bcrypt');
const DateTime = require('../../helpers/DateTime');

const Stripe = {

	getCustomerByID: async (id) => {
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
			`${process.env.DATABASE_JSON_URL}/stripe/customers?email=${email}`, {
  				"method": "GET"
			});

		const json = await response.json();
		
		if(json.length > 0 && json[0].email === email) return true;

		return false;
	},

	createCustomer: async (username, email, stripe_customer_id) => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/customers`, {
		    method: 'POST',
		    body:    JSON.stringify({
		    	stripe_customer_id: stripe_customer_id,
		    	name: username,
		    	email: email,
		    	created_at: DateTime.getNow(),
		    	updated_at: DateTime.getNow()
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const customerCreated = await response.json();

		console.log(customerCreated);

		if(customerCreated) return true;
		
		return false;
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
	}
};

module.exports = Stripe;