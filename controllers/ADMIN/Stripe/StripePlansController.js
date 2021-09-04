/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/plans
 */

const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripePlansController {
	
	static getViewCreate (req, res) {
		return res.render('pages/admin/stripe/plans/create', {
			user: SESSION_USER
		});
	}

	static async postCreatePlan (req, res) {
		const { amount,
				currency,
				interval,
				product_id } = req.body
		
		const plan = await stripe.plans.create({
			amount,
			currency,
		  	interval,
		  	product: product_id
		});

		const product = await stripe.products.retrieve(
  			product_id
		);

		plan.created = DateTime.getDateTime(plan.created);
		plan.amount = (plan.amount/100).toFixed(2)

		res.render('pages/admin/stripe/plans/create', {
			flash: {
				type: 'success',
				message: 'Plan Created With Success!'
			},
			plan,
			plan_name: product.name,
			user: SESSION_USER
		});
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/plans/retrieve', {
			user: SESSION_USER
		});
	}

	static async postRetrievePlan (req, res) {
		let plan_id = req.body.plan_id;
		
		const plan = await stripe.plans.retrieve(
  			plan_id
		);

		plan.created = DateTime.getDateTime(plan.created);

		res.render('pages/admin/stripe/plans/retrieve', {
			flash: {
				type: 'success',
				message: 'Plan ID Valid!'
			},
			plan,
			user: SESSION_USER
		});
	}
	
	static getViewUpdate (req, res) {
		res.render('pages/admin/stripe/plans/update', {
			user: SESSION_USER
		});
	}

	static async postUpdatePlan (req, res) {
		const customer = await stripe.customers.update(
  			customer_id,
  			{
  				name,
  				email
  			}
		);

		res.render('pages/admin/stripe/plans/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer,
			user: SESSION_USER
		});
	}
	
	static getViewDelete (req, res) {
		res.render('pages/admin/stripe/plans/delete', {
			user: SESSION_USER
		});
	}

	static async postDeletePlan (req, res) {
		const plan_id = req.body.plan_id.trim()
		const planDeleted = await stripe.plans.del(
  			plan_id
		);

		res.render('pages/admin/stripe/plans/delete', {
			flash: {
				type: 'success',
				message: 'Plan DELETED!'
			},
			plan: planDeleted,
			user: SESSION_USER
		});
	}
	
	static async getViewListAll (req, res)  {
		const plans = await stripe.plans.list({limit: 10});

		let lastPlansCreated = plans.data.length;

		plans.data.forEach(function(plan){
			plan.created = DateTime.getDateTime(plan.created);
		})

		res.render('pages/admin/stripe/plans/listAll', {
			lastPlansCreated,
			plans: plans.data,
			user: SESSION_USER
		});
	}
};

module.exports = StripePlansController;
