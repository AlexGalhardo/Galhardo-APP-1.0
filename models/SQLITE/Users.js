/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/SQLITE/Users.js
 */

const DateTime = require('../../helpers/DateTime');

class Users {
	static getAllUsers () {}
    static getUserByID(user_id) {}
    static getUserByEmail(email) {}
    static verifyIfAdminByID(user_id) {}
    static emailIsAlreadyRegistred(email){}
    static verifyConfirmEmailToken (email, token) {}
    static verifyIfEmailIsConfirmed (email) {}
    static async verifyLogin(email, password){}
    static async registerUser (userObject) {}
    static storeResetPasswordToken(email, reset_password_token){}
    static resetPasswordTokenIsValid(email, resetPasswordToken){}
    static async updateProfile(userObject){}
    static updateAvatarName(avatarName, user_id){}
    static async deleteProfile(email, password){}
    static createStripeCustomer(user_id, customer_id){}
    static createStripeCard(user_id, card_token_id, card_id){}
    static createStripeSubscription(user_id, subscriptionObject){}
    static verifyLoginGitHub(github_id, email, avatar){}
    static verifyLoginGoogle(google_id, email, avatar){}
    static verifyLoginFacebook(facebook_id, email){}
}

module.exports = Users;
