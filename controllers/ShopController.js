/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/
 */

const bodyParser = require('body-parser');

// Helpers
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

// Models
const StripeModel = require('../models/JSON/Stripe')

// Stripe
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class ShopController {

	static getViewShop (req, res)  {
	    res.render('pages/shop/shop_checkout', {
	        user: SESSION_USER,
	        shop_active: true
	    });
	}


    /**
     * GET /shop
     * POST /shop/payLog
     */
	static async postShopPayLog (req, res) {
		
		const { quantityOranges,
				quantityGrapes, 
				quantityApples,
				quantityBananas,
				customer_email,
				customer_name,
				customer_phone,
				zipcode,
				customer_street,
                customer_neighborhood,
				customer_city,
				customer_state,
                shipping_country,
                shipping_carrier,
				shipping_fee,
				total_shop_cart_amount,
				card_number,
				card_exp_month,
				card_exp_year,
				card_cvc } = req.body;

		// generate card token
		const cardToken = await stripe.tokens.create({
		 	card: {
		    	number: card_number,
		   		exp_month: card_exp_month,
		    	exp_year: card_exp_year,
		    	cvc: card_cvc,
		  	},
		});

		// create shop cart credit card charge
		const shopCardCharge = await stripe.charges.create({
			amount: parseInt(total_shop_cart_amount * 100),
		  	currency: 'usd',
		  	source: cardToken.id,
		  	description: "Shop cart itens",
		  	receipt_email: customer_email
		});

		const shopTransactionObject = {
            transaction_id: shopCardCharge.id,
            total_amount: total_shop_cart_amount,
            payment_method: shopCardCharge.source,
            currency: shopCardCharge.currency,
            paid: shopCardCharge.paid,
            products_amount:2700,
            products: [
                {
                    quantity: quantityOranges,
                    name: 'Oranges',
                    total: parseFloat(quantityOranges * 0.49).toFixed(2)
                },
                {
                    quantity: quantityGrapes,
                    name: 'Grapes',
                    total: parseFloat(quantityGrapes * 0.99).toFixed(2)
                },
                {
                    quantity: quantityApples,
                    name: 'Apples',
                    total: parseFloat(quantityApples * 1.99).toFixed(2)
                },
                {
                    quantity: quantityBananas,
                    name: 'Bananas',
                    total: parseFloat(quantityBananas * 2.99).toFixed(2)
                },
            ],
            customer: {
                id: req.session.userID,
                stripe_id: SESSION_USER.stripe.customer_id,
                email: customer_email,
                name: customer_name
            },
            shipping: {
                address_zipcode: zipcode,
                address_street: customer_street,
                address_street_number: 42,
                address_neighborhood: customer_neighborhood,
                address_city: customer_city,
                address_state: customer_state,
                address_country: "Brazil",
                carrier: "Correios",
                fee: shipping_fee
            },
            created_at: DateTime.getNow()
        }

        await StripeModel.createShopTransaction(shopTransactionObject)
		await NodeMailer.sendEmailShopTransaction(shopTransactionObject)
		
		return res.render('pages/shop/shopPayLog', {
			flash: {
				type: 'success',
				message: 'Shop Transaction Created with Success!'
			},
			shopCardCharge,
			shopTransactionObject,
			user: SESSION_USER,
			shop_active: true
		});
	}

};

module.exports = ShopController;
