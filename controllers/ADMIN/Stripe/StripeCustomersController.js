/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/customers
 */


const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);


class StripeCustomersController {

	static getViewCreate(req, res) {
		return res.render('pages/admin/stripe/customers/create', {
			user: SESSION_USER
		});	
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/customers/retrieve', {
			user: SESSION_USER
		});
	} 

	static getViewUpdate (req, res) {
		return res.render('pages/admin/stripe/customers/update', {
			user: SESSION_USER
		});	
	}
	
	static getViewDelete (req, res) {
		return res.render('pages/admin/stripe/customers/delete', {
			user: SESSION_USER
		});	
	}

	static async getViewListAll (req, res) {

		let customers = await stripe.customers.list({
			limit: 20
		});

		let totalLastUsersCreated = customers.data.length;

		customers.data.forEach(function(customer){
			let date = new Date(customer.created*1000).toLocaleDateString("pt-BR")
			let time = new Date(customer.created*1000).toLocaleTimeString("pt-BR")
			customer.created = `${date} ${time}`;
		})

		res.render('pages/admin/stripe/customers/listAll', {
			totalLastUsersCreated,
			customers: customers.data,
			user: SESSION_USER
		});
	}
	
	static async postCreateCustomer (req, res) {
		let name = req.body.customer_name
		let email = req.body.customer_email		
		let customer = await stripe.customers.create({
			name: name,
			email: email
		});

		const customerCreated = await StripeModel.createCustomer(name, email, customer.id);
		
		if(!customerCreated){
			return console.log('customer not saved in json database!')
		}

		res.render('pages/admin/stripe/customers/create', {
			flash: {
				type: 'success',
				message: 'Stripe Customer Created With Success!'
			},
			customer
		});
	}

	static async postRetrieveCustomer (req, res) {
		let customer_id = req.body.customer_id;
		console.log(customer_id)
		const customer = await stripe.customers.retrieve(
			customer_id
		);

		res.render('pages/admin/stripe/customers/retrieve', {
			flash: {
				type: 'success',
				message: 'Customer ID Valid!'
			},
			customer
		});
	}
	
	static async postUpdateCustomer (req, res) {
		let customer_id = req.body.customer_id;
		let name = req.body.customer_name;
		let email = req.body.customer_email;

		const customer = await stripe.customers.update(
  			customer_id,
  			{
  				name,
  				email
  			}
		);

		res.render('pages/admin/stripe/customers/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer
		});
	}

	static async postDeleteCustomer (req, res) {
		let customer_id = req.body.customer_id;

		if(customer_id == "cus_K15RnWHRhUA0HF"){
			res.render('pages/admin/stripe/customers/delete', {
				flash: {
					type: 'warning',
					message: "You can't delete the user test!"
				}
			});
			return
		}

		const customerDeleted = await stripe.customers.del(
  			customer_id
		);

		res.render('pages/admin/stripe/customers/delete', {
			flash: {
				type: 'success',
				message: 'Customer DELETED!'
			},
			customer: customerDeleted
		});
	}
};

module.exports = StripeCustomersController;
