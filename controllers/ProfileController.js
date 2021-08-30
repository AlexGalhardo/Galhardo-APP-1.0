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

// Helpers
const Upload = require('../helpers/Upload')

// Models
const Users = require('../models/JSON/Users')
const StripeModel = require('../models/JSON/Stripe')



class ProfileController {
	
	static async getViewProfile (req, res) {
    	return res.render('pages/profile/profile', {
    		user: SESSION_USER
    	});
	}
	
	static getLogout (req, res) {
		req.session.destroy((err) =>  {
			console.log(err)
	    });
	    SESSION_USER = null;
	    res.redirect('/login');
	}


    /**
     * POST /profile
     */
	static updateProfile (req, res) {
		const { username, 
				email, 
				document, 
				phone, 
				birth_date, 
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
			zipcode,
			street,
			street_number,
			neighborhood,
			state,
			city,
			country
		};

		let message = null;
		let type = null;

		if(Users.emailIsAlreadyRegistred(email)){
			type = "warning"
			message = 'This email is already registred!'
		}
		else if(email === "test@gmail.com"){
			type = "warning"
			message = "You cant update test@gmail.com!"
		} else {
			if(!Users.updateProfile(userObject)) return console.log('NOT updated Profile In JSON')
		}

		return res.render('pages/profile/profile', {
    		flash: {
    			type: type,
    			message: message
    		},
    		user: SESSION_USER
    	});
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
    static async getViewShopTransactions(req, res){
        const shopTransactions = await StripeModel.getShopTransactionsByUserID(req.session.userID)

        return res.render('pages/profile/shop_transactions', {
            user: SESSION_USER,
            shopTransactions
        })
    }


    /**
     * GET /profile/shop/transaction/:shop_transaction_id
     */
    static async getViewShopTransactionByID(req, res){
        const { shop_transaction_id } = req.params

        const shopTransaction = await StripeModel.getShopTransactionByID(shop_transaction_id)

        return res.render('pages/profile/subs_transaction', {
            user: SESSION_USER,
            shopTransaction
        })
    }



    /**
     * GET /profile/subscriptions/transactions
     */
    static async getViewSubscriptionsTransactions(req, res){
        const subsTransactions = await StripeModel.getSubsTransactionsByUserID(req.session.userID)

        return res.render('pages/profile/shop_transactions', {
            user: SESSION_USER,
            subsTransactions
        })
    }



    /**
     * GET /profile/subscription/transaction/:subs_transaction_id
     */
    static async getViewSubscriptionTransactionByID(req, res){
        const { subs_transaction_id } = req.params

        const subsTransaction = await StripeModel.getSubsTransactionByID()

        return res.render('pages/profile/subs_transaction', {
            user: SESSION_USER
        })
    }
}

module.exports = ProfileController;
