const bodyParser = require('body-parser')

const StripeModel = require('../models/JSON/Stripe');

const stripe = require('stripe')('sk_test_IVPNgFWhBStx7kngLOXZHzW0');

const CustomersController = {
	getViewCreate: (req, res) => {
		res.render('pages/customers/create');
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/customers/retrieve');
	},
	getViewUpdate: (req, res) => {
		res.render('pages/customers/update');
	},
	getViewDelete: (req, res) => {
		res.render('pages/customers/delete');
	},
	getViewListAll: async (req, res) => {
		let customers = await stripe.customers.list({
			limit: 20
		});

		let lastUsersCreated = customers.data.length;

		customers.data.forEach(function(customer){
			let date = new Date(customer.created*1000).toLocaleDateString("pt-BR")
			let time = new Date(customer.created*1000).toLocaleTimeString("pt-BR")
			customer.created = `${date} ${time}`;
		})

		res.render('pages/customers/listAll', {
			lastUsersCreated,
			customers: customers.data,
		});
	},
	postCreateCustomer: async (req, res) => {
		let name = req.body.customer_name
		let email = req.body.customer_email		
		let customer = await stripe.customers.create({
			name: name,
			email: email
		});

		console.log(customer);
		const customerCreated = await StripeModel.createCustomer(name, email, customer.id);
		console.log(customerCreated)
		if(!customerCreated){
			return console.log('customer not saved in json database!')
		}

		res.render('pages/customers/create', {
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

		res.render('pages/customers/retrieve', {
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

		res.render('pages/customers/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer
		});
	},
	postDeleteCustomer: async (req, res) => {
		let customer_id = req.body.customer_id;

		if(customer_id == "cus_Jy49RB199LvElV"){
			res.render('pages/customers/delete', {
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

		res.render('pages/customers/delete', {
			flash: {
				type: 'success',
				message: 'Customer DELETED!'
			},
			customer: customerDeleted
		});
	}
};

module.exports = CustomersController;