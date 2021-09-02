/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Users.js
 */

const DateTime = require('../../helpers/DateTime');
const Bcrypt = require('../../helpers/Bcrypt');
const MYSQL = require('../../config/mysql')


class Users {


    static async getAllUsers () {
        let stmt = `SELECT * FROM users`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows : null
    }


    static async getUserByID(user_id) {
        let stmt = `SELECT * FROM users WHERE id = '${user_id}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows[0] : false
    }


    static async getUserByEmail(email) {
        let stmt = `SELECT * FROM users WHERE email = '${email}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows[0] : false
    }


    static async verifyIfAdminByID(user_id) {}


    static async emailRegistred(email){
        let stmt = `SELECT * FROM users WHERE email = '${email}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? true : false
    }


    static async verifyConfirmEmailToken (email, token) {}


    static async verifyIfEmailIsConfirmed (email) {
        let stmt = `SELECT email, confirmed_email FROM users WHERE email = '${email}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows[0].confirmed_email ? true : false
    }


    static async verifyLogin(email, password){
        let stmt = `SELECT * FROM users WHERE email = '${email}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        const passwordValid = await Bcrypt.comparePassword(password, rows[0].password)

        return passwordValid ? rows[0] : null
    }


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
