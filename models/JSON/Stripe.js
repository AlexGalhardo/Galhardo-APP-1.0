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
                products: JSON.stringify(transactionObject.products),
                customer: transactionObject.customer,
                shipping: transactionObject.shipping,
                created_at: transactionObject.created_at
            })
            await Stripe.save(database)
        } catch(error){
            throw new Error(error)
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


    static async deleteStripeCard(user_id, stripe_card_id){
        try {

            for(let i = 0; i < database.users.length; i++){

                if(database.users[i].id === user_id){

                    if(database.users[i].stripe.card_id === stripe_card_id){

                        database.users[i].stripe.card_id = null
                        database.users[i].stripe.card_brand = null
                        database.users[i].stripe.card_last4 = null
                        database.users[i].stripe.card_exp_month = null
                        database.users[i].stripe.card_exp_year = null

                        Stripe.save(database)

                        return
                    }
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    static async cancelStripeSubscriptionRenewAtPeriodEnd(user_id, subscription_id){
        try {
            for(let i = 0; i < database.users.length; i++){

                if(database.users[i].id === user_id){

                    if(database.users[i].stripe.currently_subscription_id === subscription_id){

                        database.users[i].stripe.cancel_at_period_end = true

                        Stripe.save(database)

                        return
                    }
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Stripe;
