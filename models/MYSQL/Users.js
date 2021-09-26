/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Users.js
 */

const { v4: uuidv4 } = require('uuid');
const randomToken = require('rand-token');

// HELPERS
const DateTime = require('../../helpers/DateTime');
const Bcrypt = require('../../helpers/Bcrypt');

// CONFIG
const MYSQL = require('../../config/mysql')


class Users {

    static async selectAll() {
        try {
            let stmt = `SELECT *
                        FROM users`;

            const [ rows ] = await MYSQL.execute(stmt)

            // return rows ? rows : null
            console.log('selectAll: ', rows ? rows : null)
        } catch(error){
            throw new Error(error)
        }
    }


    static async selectByID(user_id) {
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByID: ', rows ? rows[0] : null)

            // return rows ? rows[0] : null
        } catch(error){
            throw new Error(error)
        }
    }


    static async selectByEmail(email) {
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByEmail: ', rows ? rows[0] : null)

            // return rows ? rows[0] : null
        } catch(error){
            throw new Error(error)
        }
    }


    static async verifyIfAdminByID(user_id) {
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE id = '${user_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('verifyIfAdminByID: ', rows[0].admin ? true : false)

            // return rows[0].admin ? true : false
        } catch(error){
            throw new Error(error)
        }
    }

    static async emailAlreadyRegistred(email){
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('emailAlreadyRegistred: ', rows[0] ? true : false)

            return rows[0] ? true : false
        } catch(error){
            throw new Error(error)
        }
    }

    static async verifyConfirmEmailToken (email, confirm_email_token) {
        try {
            let stmt = `SELECT email,
                                confirm_email_token
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('verifyConfirmEmailToken: ', rows[0].confirm_email_token === confirm_email_token ? true : false)

            // return rows[0].confirm_email_token === confirm_email_token ? true : false
        } catch (error){
            throw new Error(error)
        }
    }

    static async verifyIfEmailIsConfirmed(email){
        try {
            let stmt = `SELECT email,
                                confirmed_email
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('verifyIfEmailIsConfirmed: ', rows[0].confirmed_email ? true : false)

            return rows[0] ? true : false
        } catch(error){
            throw new Error(error)
        }
    }

    static async verifyLogin(email, password){
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            const passwordValid = await Bcrypt.comparePassword(password, rows[0].password)

            console.log('verifyLogin: ', passwordValid ? rows[0] : null)

            // return passwordValid ? rows[0] : null
        } catch (error){
            throw new Error(error)
        }
    }


    static async verifyLoginGitHub(email, github_id, avatar){
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            if(rows.length > 0){
                stmt = `UPDATE users
                        SET
                            github_id = '${github_id}',
                            avatar = '${avatar}'
                        WHERE email = '${email}'`

                await MYSQL.execute(stmt);
            }

            console.log('verifyLoginGitHub: ', rows ? rows : null)

            // return rows ? rows : null
        } catch(error){
            throw new Error(error)
        }
    }


    static async verifyLoginGoogle(email, google_id, avatar){
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            if(rows.length > 0){
                stmt = `UPDATE users
                        SET
                            google_id = '${google_id}',
                            avatar = '${avatar}'
                        WHERE email = '${email}'`

                await MYSQL.execute(stmt);
            }

            console.log('verifyLoginGoogle: ', rows ? rows : null)

            // return rows ? rows : null
        } catch(error){
            throw new Error(error)
        }
    }


    static async verifyLoginFacebook(email, facebook_id){
        try {
            let stmt = `SELECT *
                        FROM users
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            if(rows.length > 0){
                stmt = `UPDATE users
                        SET
                            facebook_id = '${facebook_id}'
                        WHERE email = '${email}'`

                await MYSQL.execute(stmt);
            }

            console.log('verifyLoginFacebook: ', rows ? rows : null)

            // return rows ? rows : null
        } catch(error){
            throw new Error(error)
        }
    }


    static async updateResetPasswordToken(email){
        try {
            const reset_password_token = await randomToken.generate(24);

            let stmt = `UPDATE users
                        SET reset_password_token = '${reset_password_token}'
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updateResetPasswordToken: ', rows.affectedRows ? true : false)

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async verifyResetPasswordToken(email, reset_password_token){
        try {
            let stmt = `SELECT email,
                                reset_password_token
                        FROM users
                        WHERE email = '${email}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('verifyResetPasswordToken: ', rows[0].reset_password_token === reset_password_token ? true : false)

            // return rows[0].reset_password_token === reset_password_token ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async updateProfile(userObject){
        try {
            let stmt = `UPDATE users
                        SET
                            name = '${userObject.name}',
                            email = '${userObject.email}',
                            password = '${userObject.password}',
                            document = '${userObject.document}',
                            phone_country = '${userObject.phone_country}',
                            phone_ddd = '${userObject.phone_ddd}',
                            phone_number = '${userObject.phone_number}',
                            birthday = '${userObject.birthday}',
                            address_zipcode = '${userObject.address_zipcode}',
                            address_street = '${userObject.address_street}',
                            address_street_number = '${userObject.address_street_number}',
                            address_neighborhood = '${userObject.address_neighborhood}',
                            address_city = '${userObject.address_city}',
                            address_state = '${userObject.address_state}',
                            address_country = '${userObject.address_country}'
                        WHERE id = '${userObject.id}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updateProfile: ', rows.affectedRows ? true : false)

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async updateAvatarName(email, avatarName){
        try {
            let stmt = `UPDATE users
                        SET avatar = '${avatarName}'
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updateAvatarName: ', rows.affectedRows ? true : false)

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async deleteProfile(email, password){
        try {
            let stmt = `SELECT password
                        FROM users
                        WHERE email = '${email}'`;

            let [ rows ] = await MYSQL.execute(stmt);

            const passwordValid = await Bcrypt.comparePassword(password, rows[0].password)

            if(passwordValid) {
                stmt = `DELETE
                        FROM users
                        WHERE email = '${email}'`;

                [ rows ] = await MYSQL.execute(stmt);

                console.log('deleteProfile: ', rows.affectedRows ? true : false)

                // return rows.affectedRows ? true : false
            }

            return

        } catch(error){
            throw new Error(error)
        }
    }


    static async updatePagarmeCustomerID(email, pagarme_customer_id){
        try {
            let stmt = `UPDATE users
                        SET pagarme_customer_id = '${pagarme_customer_id}'
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updatePagarmeCustomerID: ', rows.affectedRows ? true : false)

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async updatePagarmeCard(email, cardObject){
        try {
            let stmt = `UPDATE users
                        SET
                            pagarme_card_id = '${cardObject.id}',
                            pagarme_card_brand = '${cardObject.brand}',
                            pagarme_card_first_digits = '${cardObject.first_digits}',
                            pagarme_card_last_digits = '${cardObject.last_digits}',
                            pagarme_card_expiration_date = '${cardObject.expiration_date}'
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updatePagarmeCard: ', rows.affectedRows ? true : false)

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async updatePagarmeSubscription(email, subscriptionObject){
        try {
            let stmt = `UPDATE users
                        SET
                            pagarme_currently_subscription_id = '${subscriptionObject.id}',
                            pagarme_currently_subscription_name = '${subscriptionObject.plan_name}',
                            pagarme_subscription_start = '${subscriptionObject.start}',
                            pagarme_subscription_end = '${subscriptionObject.end}',
                            pagarme_subscription_cancel_at_period_end = '${subscriptionObject.cancel_at_period_end}'
                        WHERE email = '${email}'`

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('updatePagarmeSubscription: ', rows.affectedRows ? true : false)

            return

            // return rows.affectedRows ? true : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async create(userObject) {
        try {

            const emailAlreadyRegisted = await Users.emailAlreadyRegistred(userObject.email)

            if(emailAlreadyRegisted) return console.log('Email already Registred!')

            let stmt = `INSERT INTO users
                                (id,
                                name,
                                email,
                                confirmed_email,
                                confirm_email_token,
                                password,
                                reset_password_token,
                                admin,
                                avatar,
                                document,
                                phone_country,
                                phone_ddd,
                                phone_number,
                                birthday,
                                google_id,
                                github_id,
                                facebook_id,
                                address_zipcode,
                                address_street,
                                address_street_number,
                                address_neighborhood,
                                address_city,
                                address_state,
                                address_country,
                                pagarme_customer_id,
                                pagarme_card_id,
                                pagarme_card_first_digits,
                                pagarme_card_last_digits,
                                pagarme_card_expiration_date,
                                pagarme_currently_subscription_id,
                                pagarme_currently_subscription_name,
                                pagarme_subscription_start,
                                pagarme_subscription_end,
                                pagarme_subscription_cancel_at_period_end,
                                created_at,
                                updated_at)
                    VALUES (?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            ?)`;

            const confirm_email_token = await randomToken.generate(24);
            const passwordHash = await Bcrypt.cryptPassword(userObject.password)

            const google_id = userObject.google_id || null
            const github_id = userObject.google_id || null
            const facebook_id = userObject.google_id || null

            let data = [
                uuidv4(), // id
                userObject.name, // name
                userObject.email, // email
                0, // confirmed_email
                confirm_email_token, // confirm_email_token
                passwordHash, // password
                null, // reset_password_token
                userObject.admin, // admin
                "avatar.png", // avatar
                null, // document
                null, // phone_country
                null, // phone_ddd
                null, // phone_number
                null, // birthday
                google_id, // google_id
                github_id, // github_id
                facebook_id, // facebook_id
                null, // address_zipcode,
                null, // address_street,
                null, // address_street_number,
                null, // address_neighborhood,
                null, // address_city,
                null, // addreess_state,
                null, // address_country,
                null, // pagarme_customer_id,
                null, // pagarme_card_id,
                null, // pagarme_card_first_digits,
                null, // pagarme_card_last_digits,
                null, // pagarme_card_expiration_date,
                null, // pagarme_currently_subscription_id,
                "FREE", // pagarme_currently_subscription_name,
                null, // pagarme_subscription_start,
                null, // pagarme_subscription_end,
                null, // pagarme_subscription_cancel_at_period_end,
                DateTime.getNow(), // created_at
                DateTime.getNow() // updated_at
            ];

            const [ rows ]  = await MYSQL.execute(stmt, data);

            rows.affectedRows ? console.log(`USER: ${userObject.email} CREATED!`) : console.log('USER NOT CREATED!')

            return

        } catch(error){
            throw new Error(error)
        }
    }
}

module.exports = Users;
