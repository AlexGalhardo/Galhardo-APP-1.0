/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/api/admin/stripe
 */


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

// HELPERS
const DateTime = require('../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../models/${process.env.APP_DATABASE}/Stripe`)




class APIAdminStripeController {

    // ------------------------ STRIPE CUSTOMERS -------------------------------------

    /**
     * http://localhost:3000/api/admin/stripe/customers/listAll 
     */
	static async getCustomersListAll(req, res) {
		try {
	        const { limit } = req.params

	        let customers = await stripe.customers.list({
				limit
			});

            return res.json({
                customers
            });	        
	    }
	    catch(err){
	        return res.json({
                error: err
            })
	    }
	}


    /**
     * http://localhost:3000/api/admin/stripe/customers/retrieve/:customer_id 
     */
    static async getRetrieveCustomer(req, res) {
        try {
            const { customer_id } = req.params

            const customer = await stripe.customers.retrieve(
                customer_id
            );

            return res.json({
                customer
            });            
        }
        catch(err){
            return res.json({
                status: 'ERROR: something went wrong'
            })
        }
    }



    /**
     * http://localhost:3000/api/admin/stripe/customers/create
     */
    static async postCreateStripeCustomer(req, res) {
        try {
            const { name, email } = req.body

            let customer = await stripe.customers.create({
                name,
                email
            });

            return res.json({
                customer
            });            
        }
        catch(err){
            return res.json({
                status: 'ERROR: Customer NOT created'
            })
        }
    }



    /**
     * http://localhost:3000/api/admin/stripe/customers/update/:customer_id 
     */
    static async patchStripeCustomer(req, res) {
        try {
            const { customer_id } = req.params
            const { name, email } = req.body

            const customer = await stripe.customers.update(
                customer_id,
                {
                    name,
                    email
                }
            );

            return res.json({
                customer
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * http://localhost:3000/api/admin/stripe/customers/delete/:customer_id 
     */
    static async deleteStripeCustomer(req, res) {
        try {
            const { customer_id } = req.params

            if(customer_id == "cus_K15RnWHRhUA0HF" || customer_id == 'cus_K3keRif5hEPSI2'){
                return res.json({
                    status: "You can't delete TEST JACK or ADMIN CUSTOMER"
                })
            }

            const customerDeleted = await stripe.customers.del(
                customer_id
            );

            return res.json({
                customerDeleted
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }





    // ------------------------ STRIPE CARDS -------------------------------------
    /**
     * GET http://localhost:3000/api/admin/stripe/cards/listAll
     */
    static async getCardsListAll(req, res) {
        try {
            const { customer_id, limit } = req.body

            let cards = await stripe.customers.listSources(
              customer_id,
              {object: 'card', limit}
            );

            return res.json({
                cards
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }


    /**
     * GET http://localhost:3000/api/admin/stripe/cards/retrieve
     */
    static async getRetrieveCard(req, res) {
        try {
            const { customer_id, card_id } = req.body

            const card = await stripe.customers.retrieveSource(
                customer_id,
                card_id
            );

            return res.json({
                card
            });            
        }
        catch(err){
            return res.json({
                status: 'ERROR: something went wrong'
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/cards/create
     */
    static async postCreateStripeCard(req, res) {
        try {
            const { customer_id, 
                    card_holder_name, 
                    card_number, 
                    card_exp_month, 
                    card_exp_year, 
                    card_cvc } = req.body

            // create credit card token
            const creditCardToken = await stripe.tokens.create({
              card: {
                number: card_number,
                exp_month: card_exp_month,
                exp_year: card_exp_year,
                cvc: card_cvc,
              },
            });

            // create credit card in customer
            const cardCreated = await stripe.customers.createSource(
                customer_id,
                {source: creditCardToken.id},
            );

            cardCreated.token_id = creditCardToken.id

            return res.json({
                cardCreated
            });            
        }
        catch(err){
            return res.json({
                status: 'ERROR: Customer Card NOT created'
            })
        }
    }



    /**
     * PATCH http://localhost:3000/api/admin/stripe/cards/update
     */
    static async patchStripeCard(req, res) {
        try {
            const { customer_id, card_id, card_holder_name } = req.body

            const cardUpdated = await stripe.customers.updateSource(
                customer_id,
                card_id,
                {name: card_holder_name }
            );

            return res.json({
                cardUpdated
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * DELETE http://localhost:3000/api/admin/stripe/cards/delete
     */
    static async deleteStripeCard(req, res) {
        try {
            const { customer_id, card_id } = req.body

            const cardDeleted = await stripe.customers.deleteSource(
              customer_id,
              card_id
            );

            return res.json({
                cardDeleted
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }








    // ------------------------ STRIPE CHARGES -------------------------------------
    
    /**
     * GET  http://localhost:3000/api/admin/stripe/charges/listAll/:limit
     */
    static async getChargesListAll(req, res) {
        try {
            const { limit } = req.params

            const charges = await stripe.charges.list({
              limit: 10
            });

            charges.data.forEach(function(charge){
                charge.created = DateTime.getDateTime(charge.created);
            })

            return res.json({
                charges
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * GET  http://localhost:3000/api/admin/stripe/charges/retrieve
     */
    static async getRetrieveCharge(req, res) {
        try {
            const { charge_id } = req.body
        
            const charge = await stripe.charges.retrieve(
                charge_id
            );

            charge.created = DateTime.getDateTime(charge.created); 

            return res.json({
                charge
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }


    /**
     * POST  http://localhost:3000/api/admin/stripe/charges/create
     */
    static async postCreateCharge(req, res) {
        try {
            const { 
                amount,
                currency,
                customer_card_id, 
                customer_id, 
                description } = req.body

            const charge = await stripe.charges.create({
                amount,
                currency,
                description,
                source: customer_card_id,
                customer: customer_id
            });

            charge.created = DateTime.getDateTime(charge.created); 
            charge.amount = (charge.amount / 100).toFixed(2)

            res.json({
                charge
            })
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }







    // ------------------------ STRIPE PRODUCTS -------------------------------------
    /**
     * GET http://localhost:3000/api/admin/stripe/products/listAll/:limit
     */
    static async getProductsListAll(req, res) {
        try {
            const { limit } = req.params

            const products = await stripe.products.list({
                limit
            });

            products.data.forEach(function(product){
                product.created = DateTime.getDateTime(product.created)
            })

            return res.json({
                products
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }


    /**
     * GET http://localhost:3000/api/admin/stripe/products/retrieve
     */
    static async getRetrieveProduct(req, res) {
        try {
            const { product_id }  = req.body

            const product = await stripe.products.retrieve(
                product_id
            );

            product.created = DateTime.getDateTime(product.created);
            product.updated = DateTime.getDateTime(product.updated);

            return res.json({
                product
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/products/create
     */
    static async postCreateStripeProduct(req, res) {
        try {
            const { product_name } = req.body
        
            const product = await stripe.products.create({
                  name: product_name,
            });

            product.created = DateTime.getDateTime(product.created);

            return res.json({
                product
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * PATCH http://localhost:3000/api/admin/stripe/products/update
     */
    static async patchStripeProduct(req, res) {
        try {
            const { product_id,
                    description,
                    name } = req.body

            // CAN'T UPDATE STARTER, PRO AND PREMIUM PLANS
            if(product_id == "prod_JxIQjuKdjaZdHk" 
                || product_id == 'prod_K3lKQhFCjPAEmt' 
                || product_id == 'prod_K2lN2CO9llTt02'){
                return res.json({
                    error: "You can't update this product!"
                })
            }

            const product = await stripe.products.update(
                product_id,
                description,
                name
            );

            product.created = DateTime.getDateTime(product.created);
            product.updated = DateTime.getDateTime(product.updated);

            return res.json({
                product
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * DELETE http://localhost:3000/api/admin/stripe/products/delete
     */
    static async deleteStripeProduct(req, res) {
        try {
            let { product_id } = req.body

            // CAN'T DELETE STARTER, PRO AND PREMIUM PLANS
            if(product_id == "prod_JxIQjuKdjaZdHk" 
                || product_id == 'prod_K3lKQhFCjPAEmt' 
                || product_id == 'prod_K2lN2CO9llTt02'){
                return res.json({
                    error: "You can't delete this product!"
                })
            }

            const productDeleted = await stripe.products.del(
                  product_id
            );

            return res.json({
                productDeleted
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }







    // ------------------------ STRIPE PRICES -------------------------------------
    /**
     * GET http://localhost:3000/api/admin/stripe/prices/listAll/:limit
     */
    static async getPricesListAll(req, res) {
        try {
            const { limit } = req.params

            const prices = await stripe.prices.list({
                limit
            });

            prices.data.forEach(function(price){
                price.created = DateTime.getDateTime(price.created);
            })

            return res.json({
                prices
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }


    /**
     * GET http://localhost:3000/api/admin/stripe/prices/retrieve
     */
    static async getRetrievePrice(req, res) {
        try {
            const { price_id } = req.body
        
            const price = await stripe.prices.retrieve(
                  price_id
            );

            price.created = DateTime.getDateTime(price.created);

            return res.json({
                price
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/prices/create
     */
    static async postCreatePrice(req, res) {
        try {
            const { amount,
                    currency,
                    recurring,
                    product_id } = req.body
        
            const price = await stripe.prices.create({
                  unit_amount: amount,
                  currency: currency,
                  recurring: {interval: recurring},
                  product: product_id
            });

            price.created = DateTime.getDateTime(price.created);

            return res.json({
                price
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }






    // ------------------------ STRIPE PLANS -------------------------------------
    /**
     * GET http://localhost:3000/api/admin/stripe/plans/listAll/:limit
     */
    static async getPlansListAll(req, res) {
        try {
            const { limit } = req.params

            const plans = await stripe.plans.list({limit});

            plans.data.forEach(function(plan){
                plan.created = DateTime.getDateTime(plan.created);
            })

            return res.json({
                plans
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * GET http://localhost:3000/api/admin/stripe/plans/retrieve
     */
    static async getRetrievePlan(req, res) {
        try {
            let { price_id } = req.body
        
            const plan = await stripe.plans.retrieve(
                price_id
            );

            plan.created = DateTime.getDateTime(plan.created);

            return res.json({
                plan
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/plans/create
     */
    static async postCreatePlan(req, res) {
        try {
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

            return res.json({
                plan
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * DELETE http://localhost:3000/api/admin/stripe/plans/delete
     */
    static async deletePlan(req, res) {
        try {
            const { price_id } = req.body
            
            const planDeleted = await stripe.plans.del(
                price_id
            );

            return res.json({
                planDeleted
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }





    // ------------------------ STRIPE SUBSCRIPTIONS -------------------------------------
    /**
     * GET http://localhost:3000/api/admin/stripe/subscriptions/listAll/:limit
     */
    static async getSubscriptionsListAll(req, res) {
        try {
            const { limit } = req.params

            const subscriptions = await stripe.subscriptions.list({
                limit
            });

            subscriptions.data.forEach(function(subs){
                subs.created = DateTime.getDateTime(subs.created)
                subs.current_period_start = DateTime.getDateTime(subs.current_period_start)
                subs.current_period_end = DateTime.getDateTime(subs.current_period_end)
            })

            return res.json({
                subscriptions
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * GET http://localhost:3000/api/admin/stripe/subscriptions/retrieve
     */
    static async getRetrieveSubscription(req, res) {
        try {
            let { subs_id } = req.body
        
            const subscription = await stripe.subscriptions.retrieve(
                subs_id
            );

            subscription.created = DateTime.getDateTime(subscription.created);
            subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
            subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

            return res.json({
                subscription
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/subscriptions/create
     */
    static async postCreateSubscription(req, res) {
        try {
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

            return res.json({
                subscription
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }



    /**
     * POST http://localhost:3000/api/admin/stripe/subscriptions/cancel
     */
    static async postCancelSubscription(req, res) {
        try {
            const { subs_id } = req.body
            
            const canceledSubscription = await stripe.subscriptions.del(
                subs_id
            );

            canceledSubscription.created = DateTime.getDateTime(canceledSubscription.created);
            canceledSubscription.canceled_at = DateTime.getDateTime(canceledSubscription.canceled_at);
            canceledSubscription.current_period_end = DateTime.getDateTime(canceledSubscription.current_period_end);
            canceledSubscription.current_period_start = DateTime.getDateTime(canceledSubscription.current_period_start);

            return res.json({
                canceledSubscription
            });            
        }
        catch(err){
            return res.json({
                error: err
            })
        }
    }

}

module.exports = APIAdminStripeController;
