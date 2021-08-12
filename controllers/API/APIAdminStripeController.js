/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/api/admin/stripe
 */

const APIAdminController = require('./APIAdminController')


class APIAdminStripeController {

	static async getAdminStripeCustomersListAll(req, res, next) {
		try {
	        // if success, return admin data
	        const admin = await APIAdminController.verifyAdminAPIRequestUsingJWT(req)
	        const limit = req.params.limit

	        let customers = await stripe.customers.list({
				limit: limit
			});

            return res.json({
                customers
            });	        
	    }
	    catch(err){
	        return res.json({
                status: "ERROR",
                message: "Verify your JWT or your URL"
            });	
	    }
	}
}

module.exports = APIAdminStripeController;