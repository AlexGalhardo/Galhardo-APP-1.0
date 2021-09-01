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
                transaction_id: transactionObject.transaction_id,
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


    static async getShopTransactionsByUserID(user_id){
        try {
            const userShopTransactions = database.stripe.shop_transactions.filter(shopTransaction => shopTransaction.customer.id === user_id
            )
            return userShopTransactions.reverse()
        } catch (error) {
            throw new Error(error);
        }
    }



    static async getShopTransactionByID(transaction_id){
        try {
            for(let i = 0; i < database.stripe.shop_transactions.length; i++){
                if(database.stripe.shop_transactions[i].transaction_id === transaction_id){
                    return database.stripe.shop_transactions[i]
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }



	static async createSubscriptionTransaction(SubsTransactionObject){
        try {
            database.stripe.subscriptions_transactions.push(SubsTransactionObject)
            await Stripe.save(database)
        } catch(error){
            throw new Error(error)
        }
    }



    static async getSubsTransactionsByUserID(user_id){
        try {
            const userSubsTransactions = database.stripe.subscriptions_transactions.filter(subsTransaction => subsTransaction.customer.id === user_id
            )
            return userSubsTransactions.reverse()
        } catch (error) {
            throw new Error(error);
        }
    }



    static async getSubsTransactionByID(transaction_id){
        try {
            for(let i = 0; i < database.stripe.subscriptions_transactions.length; i++){
                if(database.stripe.subscriptions_transactions[i].transaction_id === transaction_id){
                    return database.stripe.subscriptions_transactions[i]
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Stripe;
