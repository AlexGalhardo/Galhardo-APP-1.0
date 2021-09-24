/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/PagarME.js
 */

import fs from 'fs-extra'
import database from '../../config/json_database.js'


// Helpers
import DateTime from '../../helpers/DateTime.js'



class PagarmeModel {

    static save(database){
        fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
            if (error) {
                throw new Error(error);
            }
        });
    }

    static async createShopTransaction(transactionObject){
        try {
            database.pagarme.shop_transactions.push({
                transaction_id: transactionObject.transaction_id,
                total_amount: transactionObject.total_amount,
                payment_method: transactionObject.payment_method,
                currency: transactionObject.currency,
                status: transactionObject.status,
                products_amount: transactionObject.products_amount,
                products: transactionObject.products,
                customer: transactionObject.customer,
                shipping: transactionObject.shipping,
                created_at: transactionObject.created_at
            })
            await PagarME.save(database)
            return
        } catch(error){
            throw new Error(error)
        }
    }


    static async getShopTransactionsByUserID(user_id){
        try {
            const userShopTransactions = database.pagarme.shop_transactions.filter(shopTransaction => shopTransaction.customer.id === user_id
            )
            return userShopTransactions.reverse()
        } catch (error) {
            throw new Error(error);
        }
    }



    static async getShopTransactionByID(transaction_id){
        try {
            for(let i = 0; i < database.pagarme.shop_transactions.length; i++){
                if(database.pagarme.shop_transactions[i].transaction_id === transaction_id){
                    return database.pagarme.shop_transactions[i]
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }



	static async createSubscriptionTransaction(SubsTransactionObject){
        try {
            database.pagarme.subscriptions_transactions.push(SubsTransactionObject)
            await PagarME.save(database)
        } catch(error){
            throw new Error(error)
        }
    }



    static async getSubsTransactionsByUserID(user_id){
        try {
            const userSubsTransactions = database.pagarme.subscriptions_transactions.filter(subsTransaction => subsTransaction.customer.id === user_id
            )
            return userSubsTransactions.reverse()
        } catch (error) {
            throw new Error(error);
        }
    }



    static async getSubsTransactionByID(transaction_id){
        try {
            for(let i = 0; i < database.pagarme.subscriptions_transactions.length; i++){
                if(database.pagarme.subscriptions_transactions[i].transaction_id === transaction_id){
                    return database.pagarme.subscriptions_transactions[i]
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default PagarmeModel;
