const bodyParser = require('body-parser')
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const SubscriptionsController = {
	getViewCreate: (req, res) => {
		res.render('pages/stripe/subscriptions/create');
	},
	postCreateSubscription: async (req, res) => {
		const customer_id = req.body.customer_id
		const plan_id = req.body.plan_id; 

		const subscription = await stripe.subscriptions.create({
  			customer: customer_id,
  			items: [
    			{price: plan_id},
  			],
		});

		// const plan_name = plan.name;

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/stripe/subscriptions/create', {
			flash: {
				type: 'success',
				message: 'SUBSCRIPTION Created With Success!'
			},
			subscription
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/stripe/subscriptions/retrieve');
	},
	postRetrieveSubscription: async (req, res) => {
		let subs_id = req.body.subs_id;
		
		const subscription = await stripe.subscriptions.retrieve(
			subs_id
		);

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/stripe/subscriptions/retrieve', {
			flash: {
				type: 'success',
				message: 'Subscription Exists!'
			},
			subscription
		});
	},
	getViewUpdate: (req, res) => {
		res.render('pages/stripe/subscriptions/update');
	},
	postUpdateSubscription: async (req, res) => {
		const customer = await stripe.customers.update(
  			customer_id,
  			{
  				name,
  				email
  			}
		);

		res.render('pages/stripe/subscriptions/update', {
			flash: {
				type: 'success',
				message: 'Customer UPDATED!'
			},
			customer
		});
	},
	getViewCancel: (req, res) => {
		res.render('pages/stripe/subscriptions/cancel');
	},
	postCancelSubscription: async (req, res) => {
		const subs_id = req.body.subs_id;

		if(subs_id == "sub_Jy4iOLKMWVoWzr"){
			res.render('pages/stripe/subscriptions/cancel', {
				flash: {
					type: 'warning',
					message: "You can't cancel this subscription!"
				}
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

		res.render('pages/stripe/subscriptions/cancel', {
			flash: {
				type: 'success',
				message: 'SUBSCRIPTION CANCELED!'
			},
			subscription: canceledSubscription
		});
	},
	getViewListAll: async (req, res) => {
		const subscriptions = await stripe.subscriptions.list({
  			limit: 10,
		});

		let lastSubsCreated = subscriptions.data.length;

		subscriptions.data.forEach(function(subs){
			subs.created = DateTime.getDateTime(subs.created)
			subs.current_period_start = DateTime.getDateTime(subs.current_period_start)
			subs.current_period_end = DateTime.getDateTime(subs.current_period_end)
		})

		res.render('pages/stripe/subscriptions/listAll', {
			lastSubsCreated,
			subscriptions: subscriptions.data,
		});
	}
};

module.exports = SubscriptionsController;