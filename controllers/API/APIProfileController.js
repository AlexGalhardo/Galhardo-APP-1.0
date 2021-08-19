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

// JSON DATABASE
const Users = require('../../models/JSON/Users')

// MYSQL DATABASE
// const Users = require('../../models/MySQL/Users')

// MONGODB DATABASE
// const Users = require('../../models/MONGODB/Users')



class APIProfileController {

	static async postProfileLogin(req, res, next){
		try {
	        const { email, password } = req.body
	        console.log('request chegou', email, password)
	        
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
	        
	        console.log('entrou no model', userObject)
	        let user = await Users.updateProfile(userObject)
            
            return res.json({
                user
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}

	static async deleteProfile(req, res, next) {
		try {
			const { email, password } = req.body

	        let profileDeleted = await Users.deleteProfile(email, password)
	        
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