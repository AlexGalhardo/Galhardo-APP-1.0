/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/subscriptions
 */

const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripeSubscriptionsController  {
	
	static getViewCreate (req, res) {
		res.render('pages/admin/stripe/subscriptions/create', {
			user: SESSION_USER
		});
	}
	
	static async postCreateSubscription (req, res) {
		const { customer_id, plan_id } = req.body

		const subscription = await stripe.subscriptions.create({
  			customer: customer_id,
  			items: [
    			{price: plan_id},
  			],
		});

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/admin/stripe/subscriptions/create', {
			flash: {
				type: 'success',
				message: 'SUBSCRIPTION Created With Success!'
			},
			subscription,
			user: SESSION_USER
		});
	}

	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/subscriptions/retrieve', {
			user: SESSION_USER
		});
	}

	static async postRetrieveSubscription (req, res) {
		let { subs_id } = req.body
		
		const subscription = await stripe.subscriptions.retrieve(
			subs_id
		);

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/admin/stripe/subscriptions/retrieve', {
			flash: {
				type: 'success',
				message: 'Subscription Exists!'
			},
			subscription,
			user: SESSION_USER
		});
	}
	
	static getViewUpdate(req, res) {
		res.render('pages/admin/stripe/subscriptions/update', {
			user: SESSION_USER
		});
	}
	
	static async postUpdateSubscription (req, res) {
		const customer = await stripe.customers.update(
  			customer_id,
  			{
  				name,
  				email
  			}
		);

		res.render('pages/admin/stripe/subscriptions/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer,
			user: SESSION_USER
		});
	}
	
	static getViewCancel (req, res) {
		res.render('pages/admin/stripe/subscriptions/cancel', {
			user: SESSION_USER
		});
	}
	
	static async postCancelSubscription (req, res) {
		const subs_id = req.body.subs_id;

		if(subs_id == "sub_Jy4iOLKMWVoWzr"){
			res.render('pages/admin/stripe/subscriptions/cancel', {
				flash: {
					type: 'warning',
					message: "You can't cancel this subscription!"
				},
				user: SESSION_USER
			});
			return
		}
		
		const canceledSubscription = await stripe.subscriptions.del(
  			subs_id
		);

		canceledSubscription.created = DateTime.getDateTime(canceledSubscription.created);
		canceledSubscription.canceled_at = DateTime.getDateTime(canceledSubscription.canceled_at);
		canceledSubscription.current_period_end = DateTime.getDateTime(canceledSubscription.current_period_end);
		canceledSubscription.current_period_start = DateTime.getDateTime(canceledSubscription.current_period_start);

		res.render('pages/admin/stripe/subscriptions/cancel', {
			flash: {
				type: 'success',
				message: 'SUBSCRIPTION CANCELED!'
			},
			subscription: canceledSubscription,
			user: SESSION_USER
		});
	}
	
	static async getViewListAll (req, res) {
		const subscriptions = await stripe.subscriptions.list({
  			limit: 10,
		});

		let lastSubsCreated = subscriptions.data.length;

		subscriptions.data.forEach(function(subs){
			subs.created = DateTime.getDateTime(subs.created)
			subs.current_period_start = DateTime.getDateTime(subs.current_period_start)
			subs.current_period_end = DateTime.getDateTime(subs.current_period_end)
		})

		res.render('pages/admin/stripe/subscriptions/listAll', {
			lastSubsCreated,
			subscriptions: subscriptions.data,
			user: SESSION_USER
		});
	}
};

module.exports = StripeSubscriptionsController;
