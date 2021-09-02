/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MONGODB/Users.js
 */

const DateTime = require('../../helpers/DateTime');

const { Schema, model, connection, SchemaTypes } = require('mongoose')
const Bcrypt = require('../../helpers/Bcrypt');



const schema = new Schema({
	// _id: SchemaTypes.ObjectId,
	name: { type: String, required: true },
	email: { type: String, required: true },
	confirmed_email: Boolean,
	confirm_email_token: {type: String, default: null},
	password: {type: String, required: true},
	reset_password_token: {type: String, default: null},
	admin: Boolean,
	avatar: {type: String, default: null},
	document: String,
	phone: String,
	birth_date: String,
	google_id: String,
	facebook_id: String,
	github_id: String,
	address: {
		zipcode: String,
		street: String,
		street_number: Number,
		neighborhood: String,
		city: String,
		state: String,
		country: String
	},
	stripe: {
        customer_id: String,
        card_token_id: String,
        card_id: String,
        card_holder_name: String,
        card_last_4_digits: Number,
        card_exp_month: Number,
        card_exp_year: Number,
        currently_subscription_id: String,
        currently_subscription_name: String,
        subscription_start: String,
        subscription_end: String,
        subscription_automatically_renew: Boolean
    },
	created_at: String,
	updated_at: String
})

const modelName = 'Users'

const UsersSchema = (connection && connection.models[modelName]) 
?
	connection.models[modelName]
:
	model(modelName, schema)


class Users {

	static async login(email, password){
		let user = await UsersSchema.findOne({
			email
		})

		const passwordValid = await Bcrypt.comparePassword(password, user.password)
        
        if(passwordValid){
			return user
		}
		return null
	}

	static async update(userObject){
		let user = await UsersSchema.findOne({
			email: userObject.email
		})

		const passwordValid = await Bcrypt.comparePassword(userObject.password, user.password)

        if(passwordValid){
        	user.id.toString()
			user.name = userObject.name
			user.new_email = userObject.new_email
	        user.new_password = userObject.new_password
	        user.document = userObject.document
	        user.phone = userObject.phone
	        user.birth_date = userObject.birth_date
	        user.zipcode = userObject.zipcode
	        user.street = userObject.street
	        user.street_number = userObject.street_number
	        user.neighborhood = userObject.neighborhood
	        user.city = userObject.city
	        user.state = userObject.state
	        user.country = userObject.country
	        user.updated_at = DateTime.getNow()
	        console.log(user)
			
			await user.save()
			
			return user
		}
		return null
	}

	static async delete(email, password){
		let user = await UsersSchema.findOne({
			email
		})

		const passwordValid = await Bcrypt.comparePassword(password, user.password)

        if(passwordValid){
        	await UsersSchema.findOneAndDelete({"_id": user._id})
        	return true
        }
        return false
	}
}


module.exports = Users;
