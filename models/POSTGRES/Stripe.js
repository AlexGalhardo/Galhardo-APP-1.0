/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/POSTGRES/Stripe.js
 */

const DateTime = require('../../helpers/DateTime');

class Stripe {
    static async createShopTransaction(userObject, transacionObject){}
    static async getUserShopTransactions(user_id){}

    static async storeSubscriptionTransaction(userObject, transacionObject){}
    static async getUserSubscriptionsTransactions(user_id){}
}

module.exports = Stripe;
