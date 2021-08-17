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

// Stripe
const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class ShopController {

	static getViewShop (req, res)  {
	    res.render('pages/shop/shop_checkout', {
	        user: SESSION_USER,
	        shop_active: true
	    });
	}

	static async postShopPayLog (req, res) {
		
		const { quantityOranges,
				quantityGrapes, 
				quantityApples,
				quantityStrawberries,
				customer_email,
				customer_city,
				zipcode,
				customer_state,
				customer_street,
				customer_name,
				customer_phone,
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
			amount: parseInt(value_totalShopCart * 100),
		  	currency: 'usd',
		  	source: cardToken.id,
		  	description: JSON.stringify(shopCartItems),
		  	receipt_email: customer_email,
		  	shipping: shipping
		});

		const shopTransactionObject = {
            status: 'Success',
            customer_email: customer_email,
            amount: total_shop_cart_amount,
            transaction_id: shopCardCharge.id,
            created_at: DateTime.getNow(),
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
                    quantity: totalApples,
                    name: 'Apples',
                    total: parseFloat(quantityApples * 1.99).toFixed(2)
                },
                {
                    quantity: totalStrawberries,
                    name: 'Strawberries',
                    total: parseFloat(quantityStrawberries * 2.99).toFixed(2)
                },
            ],
            shipping: {
				address: {
					city: customer_city,
					country: "BRAZIL",
					postal_code: zipcode,
					state: customer_state,
					line1: customer_street
				},
				name: customer_name,
				phone: customer_phone,
				carrier: "CORREIOS"
			}
        }

		NodeMailer.sendEmailShopTransaction(shopTransactionObject)
		
		return res.render('pages/shop/shopPayLog', {
			flash: {
				type: 'success',
				message: 'Shop Transaction Created with Success!'
			},
			shopCardCharge,
			shopTransactionObject,
			user: SESSION_USER
		});
	}

};

module.exports = ShopController;