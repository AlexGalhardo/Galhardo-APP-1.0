/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Stripe.js
 */

import DateTime from '../../helpers/DateTime.js'

class PagarmeModel {
    static async createShopTransaction(userObject, transacionObject){}
    static async getUserShopTransactions(user_id){}

    static async storeSubscriptionTransaction(userObject, transacionObject){}
    static async getUserSubscriptionsTransactions(user_id){}
}

export default PagarmeModel
