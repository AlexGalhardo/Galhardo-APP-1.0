/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Stripe.js
 */

const fs = require('fs-extra')
const database = require('../../config/json_database');


// Helpers
const DateTime = require('../../helpers/DateTime');



class Stripe {

    static save(database){
        fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
            if (error) {
                throw new Error(error);
            }
        });
    }



    static async createShopTransaction(transactionObject){
        try {
            database.stripe.shop_transactions.push({
                transaction_id: transactionObject.id,
                total_amount: transactionObject.total_amount,
                payment_method: transactionObject.payment_method,
                currency: transactionObject.currency,
                paid: transactionObject.paid,
                products_amount: transactionObject.products_amount,
                products: transactionObject.products,
                customer: transactionObject.customer,
                shipping: transactionObject.shipping,
                created_at: transactionObject.created_at
            })
            Stripe.save(database)
        } catch(err){
            throw new Error('Shop Transaction not created in database!')
        }
    }


    static async getShopTransactionsByUserID(user_id){}
    static async getShopTransactionByID(transaction_id){}

	static async createSubscription(userObject, transactionObject){
        try {
            database.stripe.shop_transactions.push(transactionObject)
            database.stripe.shop_transactions.push()
            await Stripe.save(database)
        } catch(err){
            throw new Error('Subscription Transaction not created in database!')
        }
    }
    static async getSubsTransactionsByUserID(user_id){}
    static async getSubsTransactionByID(transaction_id){}
}

module.exports = Stripe;
