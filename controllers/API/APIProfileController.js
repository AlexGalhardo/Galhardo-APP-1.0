/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/profile
 */

const bodyParser = require('body-parser')


// MODEL
const Users = require(`../../models/${process.env.APP_DATABASE}/Users`)




class APIProfileController {

	static async postProfileLogin(req, res, next){
		try {
	        const { email, password } = req.body
	        
	        const user = await Users.verifyLogin(email, password)
            
            return res.json({
                user
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}

	static async updateProfile(req, res, next){
		try {
			const { name,
					email,
					new_email,
					password,
					new_password,
					document,
					phone,
					birth_date,
					zipcode,
					street,
					street_number,
					neighborhood,
					city,
					state,
					country } = req.body

			const userObject = {
				name,
				email,
				new_email,
				password,
				new_password,
				document,
				phone,
				birth_date,
				zipcode,
				street,
				street_number,
				neighborhood,
				city,
				state,
				country
			}
	        
	        let user = await Users.update(userObject)
	        if(user){
	        	return res.json({
	                user
	            });		
	        }
            return res.json({
                error: 'Some error found. User not found or password is invalid!'
            });	           
	    }
	    catch(err){
	        next(err);
	    }
	}

	static async deleteProfile(req, res, next) {
		try {
			const { email, password } = req.body

	        let profileDeleted = await Users.delete(email, password)
	        
	        if(profileDeleted){
	        	return res.json({
	                status: `Profile ${email} deleted!`
	            });	 
	        }
            
            return res.json({
            	status: "Profile NOT deleted! Some error occurred!"
            })
	    }
	    catch(err){
	        next(err);
	    }
	}
}

module.exports = APIProfileController;
