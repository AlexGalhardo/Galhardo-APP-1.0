/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/PagarmeModel.js
 */

// HELPERS
const DateTime = require('../../helpers/DateTime');

// CONFIG
const MYSQL = require('../../config/mysql');



class PagarmeModel {

    static async createShopTransaction(shopTransactionObject) {
        try {
            let stmt = `INSERT INTO pagarme_shop_transactions
                                (transaction_id,
                                total_amount,
                                payment_card_id,
                                payment_card_brand,
                                payment_card_first_digits,
                                payment_card_last_digits,
                                payment_card_expiration_date,
                                currency,
                                status,
                                products_amount,
                                products,
                                customer_id,
                                customer_pagarme_id,
                                customer_email,
                                customer_phone,
                                customer_name,
                                shipping_zipcode,
                                shipping_street,
                                shipping_street_number,
                                shipping_neighborhood,
                                shipping_city,
                                shipping_state,
                                shipping_country,
                                shipping_carrier,
                                shipping_fee,
                                shipping_deadline,
                                created_at)
                    VALUES (?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?)`;

            let data = [
                shopTransactionObject.transaction_id,
                shopTransactionObject.total_amount,
                shopTransactionObject.payment_card_id,
                shopTransactionObject.payment_card_brand,
                shopTransactionObject.payment_card_first_digits,
                shopTransactionObject.payment_card_last_digits,
                shopTransactionObject.payment_card_expiration_date,
                shopTransactionObject.currency,
                shopTransactionObject.status,
                shopTransactionObject.products_amount,
                shopTransactionObject.products,
                shopTransactionObject.customer_id,
                shopTransactionObject.customer_pagarme_id,
                shopTransactionObject.customer_email,
                shopTransactionObject.customer_phone,
                shopTransactionObject.customer_name,
                shopTransactionObject.shipping_zipcode,
                shopTransactionObject.shipping_street,
                shopTransactionObject.shipping_street_number,
                shopTransactionObject.shipping_neighborhood,
                shopTransactionObject.shipping_city,
                shopTransactionObject.shipping_state,
                shopTransactionObject.shipping_country,
                shopTransactionObject.shipping_carrier,
                shopTransactionObject.shipping_fee,
                shopTransactionObject.shipping_deadline,
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`Shop Transaction Created!`) : console.log('Shop Transaction NOT Created')

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async createSubscriptionTransaction(subscriptionTransactionObject) {
        try {
            let stmt = `INSERT INTO pagarme_subs_transactions
                                (transaction_id,
                                status,
                                payment_card_id,
                                payment_card_brand,
                                payment_card_first_digits,
                                payment_card_last_digits,
                                payment_card_expiration_date,
                                payment_currency,
                                plan_id,
                                plan_name,
                                plan_amount,
                                plan_current_period_start,
                                plan_current_period_end,
                                customer_id,
                                customer_pagarme_id,
                                customer_name,
                                customer_email,
                                customer_phone,
                                created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let data = [
                subscriptionTransactionObject.transaction_id,
                subscriptionTransactionObject.status,
                subscriptionTransactionObject.payment_card_id,
                subscriptionTransactionObject.payment_card_brand,
                subscriptionTransactionObject.payment_card_first_digits,
                subscriptionTransactionObject.payment_card_last_digits,
                subscriptionTransactionObject.payment_card_expiration_date,
                subscriptionTransactionObject.payment_currency,
                subscriptionTransactionObject.plan_id,
                subscriptionTransactionObject.plan_name,
                subscriptionTransactionObject.plan_amount,
                subscriptionTransactionObject.plan_current_period_start,
                subscriptionTransactionObject.plan_current_period_end,
                subscriptionTransactionObject.customer_id,
                subscriptionTransactionObject.customer_pagarme_id,
                subscriptionTransactionObject.customer_name,
                subscriptionTransactionObject.customer_email,
                subscriptionTransactionObject.customer_phone,
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`Subscription Transaction Created!`) : console.log('Subscription Transaction NOT Created')

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async selectAllShopTransactionsFromUserID(user_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_shop_transactions
                        WHERE customer_id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectAllShopTransactionsFromUserID: ', rows) : null

            // return rows ? rows : false

        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectShopTransactionsByID(shop_transaction_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_shop_transactions
                        WHERE transaction_id = '${shop_transaction_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectShopTransactionsByID: ', rows) : null

            // return rows ? rows : false

        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectAllSubscriptionsTransactionsFromUserID(user_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_subs_transactions
                        WHERE customer_id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectAllSubscriptionsTransactionsFromUserID: ', rows) : null

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectSubscriptionTransactionsByID(subs_transaction_id)  {
        try {
            let stmt = `SELECT *
                        FROM pagarme_subs_transactions
                        WHERE transaction_id = '${subs_transaction_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log('selectSubscriptionTransactionsByID: ', rows) : null

            // return rows ? rows : false

        } catch (error) {
            throw new Error(error);
        };
    }

}

module.exports = PagarmeModel;
