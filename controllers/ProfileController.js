/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/profile
 */

const bodyParser = require('body-parser')

// HELPERS
const Upload = require('../helpers/Upload')
const Header = require('../helpers/Header')

// MODELS
const Users = require(`../models/${process.env.APP_DATABASE}/Users`)
const StripeModel = require(`../models/${process.env.APP_DATABASE}/Stripe`)



class ProfileController {
	

	static async getViewProfile (req, res) {
    	return res.render('pages/profile/profile', {
    		user: SESSION_USER,
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
            header: Header.profile('My Profile - Galhardo APP'),
            csrfToken: req.csrfToken()
    	});
	}
	


	static getLogout (req, res) {
		req.session.destroy((error) =>  {
			if(error) throw new Error(error)
	    });
	    SESSION_USER = null;
	    return res.redirect('/login');
	}


    /**
     * POST /profile
     */
	static async updateProfile (req, res) {
		const { username, 
				email, 
				document, 
				phone, 
				birth_date, 
                older_password,
                new_password,
				zipcode, 
				street,
				street_number, 
				neighborhood,
				state,
				city,
				country
		} = req.body;

		const userObject = {
			id: req.session.userID,
			username,
			email,
			document,
			phone,
			birth_date,
            older_password,
            new_password,
			zipcode,
			street,
			street_number,
			neighborhood,
			state,
			city,
			country
		};

		await Users.update(userObject)

        req.flash('success', 'Profile Information Updated!')
        return res.redirect('/profile')
	}


    /**
     * POST /profile/avatar
     */
	static async updateProfileAvatar(req, res) {
		await Upload.profileAvatar(req)
		res.redirect('/profile');
	}


    /**
     * GET /profile/shop/transactions
     */
    static async getViewMyShopTransactions(req, res){
        const shopTransactions = await StripeModel.getShopTransactionsByUserID(req.session.userID)

        return res.render('pages/profile/my_shop_transactions', {
            user: SESSION_USER,
            shopTransactions,
            header: Header.profile('My Shop Transactions - Galhardo APP')
        })
    }


    /**
     * GET /profile/shop/transaction/:shop_transaction_id
     */
    static async getViewShopTransactionByID(req, res){
        const { shop_transaction_id } = req.params

        const shopTransaction = await StripeModel.getShopTransactionByID(shop_transaction_id)

        return res.render('pages/profile/shop_transaction', {
            user: SESSION_USER,
            shopTransaction,
            header: Header.profile('Shop Transaction - Galhardo APP')
        })
    }



    /**
     * GET /profile/subscriptions/transactions
     */
    static async getViewMySubscriptionsTransactions(req, res){
        const subsTransactions = await StripeModel.getSubsTransactionsByUserID(req.session.userID)

        return res.render('pages/profile/my_subs_transactions', {
            user: SESSION_USER,
            subsTransactions,
            header: Header.profile('My Subscriptions Transactions - Galhardo APP')
        })
    }



    /**
     * GET /profile/subscription/transaction/:subs_transaction_id
     */
    static async getViewSubscriptionTransactionByID(req, res){
        const { subs_transaction_id } = req.params

        const subsTransaction = await StripeModel.getSubsTransactionByID(subs_transaction_id)

        return res.render('pages/profile/sub_transaction', {
            user: SESSION_USER,
            subsTransaction,
            header: Header.profile('Subs Transaction - Galhardo APP')
        })
    }


    /**
     * GET /profile/delete/stripeCard/:stripe_card_id
     */
    static async deleteStripeCard(req, res){
        const { stripe_card_id } = req.params

        await StripeModel.deleteStripeCard(SESSION_USER.id, stripe_card_id)

        req.flash('success', 'Stripe Card Deleted!')
        return res.redirect('/profile')
    }


    /**
     * GET /profile/cancel/subscription/:stripe_currently_subscription_id
     */
    static async cancelStripeSubscriptionRenewAtPeriodEnd(req, res){
        const { stripe_currently_subscription_id } = req.params

        await StripeModel.cancelStripeSubscriptionRenewAtPeriodEnd(SESSION_USER.id, stripe_currently_subscription_id)

        req.flash('success', 'Canceled Subscription Renew At Period End!')
        return res.redirect('/profile')
    }
}

module.exports = ProfileController;
