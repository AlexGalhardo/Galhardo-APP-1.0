const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')('sk_test_IVPNgFWhBStx7kngLOXZHzW0');

const PlansController = {
	getViewCreate: (req, res) => {
		res.render('pages/plans/create');
	},
	postCreatePlan: async (req, res) => {
		const amount = req.body.plan_amount;
		const currency = req.body.plan_currency;	
		const interval = req.body.plan_interval;
		const product_id = req.body.product_id;
		
		const plan = await stripe.plans.create({
			amount: amount,
			currency: currency,
		  	interval: interval,
		  	product: product_id
		});

		const product = await stripe.products.retrieve(
  			product_id
		);

		plan.created = DateTime.getDateTime(plan.created);
		plan.amount = (plan.amount/100).toFixed(2)

		res.render('pages/plans/create', {
			flash: {
				type: 'success',
				message: 'Plan Created With Success!'
			},
			plan,
			plan_name: product.name
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/plans/retrieve');
	},
	postRetrievePlan: async (req, res) => {
		let plan_id = req.body.plan_id;
		
		const plan = await stripe.plans.retrieve(
  			plan_id
		);

		plan.created = DateTime.getDateTime(plan.created);

		res.render('pages/plans/retrieve', {
			flash: {
				type: 'success',
				message: 'Plan ID Valid!'
			},
			plan
		});
	},
	getViewUpdate: (req, res) => {
		res.render('pages/plans/update');
	},
	postUpdatePlan: async (req, res) => {
		const customer = await stripe.customers.update(
  			customer_id,
  			{
  				name,
  				email
  			}
		);

		res.render('pages/plans/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer
		});
	},
	getViewDelete: (req, res) => {
		res.render('pages/plans/delete');
	},
	postDeletePlan: async (req, res) => {
		const plan_id = req.body.plan_id.trim()
		const planDeleted = await stripe.plans.del(
  			plan_id
		);

		res.render('pages/plans/delete', {
			flash: {
				type: 'success',
				message: 'Plan DELETED!'
			},
			plan: planDeleted
		});
	},
	getViewListAll: async (req, res) => {
		const plans = await stripe.plans.list({limit: 10});

		let lastPlansCreated = plans.data.length;

		plans.data.forEach(function(plan){
			plan.created = DateTime.getDateTime(plan.created);
		})

		res.render('pages/plans/listAll', {
			lastPlansCreated,
			plans: plans.data,
		});
	}
};

module.exports = PlansController;