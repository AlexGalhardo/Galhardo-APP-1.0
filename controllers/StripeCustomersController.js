const bodyParser = require('body-parser')

const StripeModel = require('../models/JSON/Stripe');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);


const CustomersController = {

	getViewCreate: (req, res) => {
		return res.render('pages/stripe/customers/create', {
			user: SESSION_USER
		});	
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/stripe/customers/retrieve', {
			user: SESSION_USER
		});
	},
	getViewUpdate: (req, res) => {
		return res.render('pages/stripe/customers/update', {
			user: SESSION_USER
		});	
	},
	
	getViewDelete: (req, res) => {
		return res.render('pages/stripe/customers/delete', {
			user: SESSION_USER
		});	
	},

	getViewListAll: async (req, res) => {

		let customers = await stripe.customers.list({
			limit: 20
		});

		let totalLastUsersCreated = customers.data.length;

		customers.data.forEach(function(customer){
			let date = new Date(customer.created*1000).toLocaleDateString("pt-BR")
			let time = new Date(customer.created*1000).toLocaleTimeString("pt-BR")
			customer.created = `${date} ${time}`;
		})

		res.render('pages/stripe/customers/listAll', {
			totalLastUsersCreated,
			customers: customers.data,
			user: SESSION_USER
		});
	},
	
	postCreateCustomer: async (req, res) => {
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

		res.render('pages/stripe/customers/create', {
			flash: {
				type: 'success',
				message: 'Stripe Customer Created With Success!'
			},
			customer
		});
	},
	postRetrieveCustomer: async (req, res) => {
		let customer_id = req.body.customer_id;
		console.log(customer_id)
		const customer = await stripe.customers.retrieve(
			customer_id
		);

		res.render('pages/stripe/customers/retrieve', {
			flash: {
				type: 'success',
				message: 'Customer ID Valid!'
			},
			customer
		});
	},
	postUpdateCustomer: async (req, res) => {
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

		res.render('pages/stripe/customers/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer
		});
	},
	postDeleteCustomer: async (req, res) => {
		let customer_id = req.body.customer_id;

		if(customer_id == "cus_K15RnWHRhUA0HF"){
			res.render('pages/stripe/customers/delete', {
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

		res.render('pages/stripe/customers/delete', {
			flash: {
				type: 'success',
				message: 'Customer DELETED!'
			},
			customer: customerDeleted
		});
	}
};

module.exports = CustomersController;