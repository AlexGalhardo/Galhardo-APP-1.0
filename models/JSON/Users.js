/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Users.js
 */

import fs from 'fs-extra'
import { v4 as uuid } from 'uuid';
import randomToken from 'rand-token';

import Bcrypt from '../../helpers/Bcrypt.js';
import DateTime from '../../helpers/DateTime.js';

import database from '../../config/json_database.js';



class Users {

    static save(database){
        fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
            if (error) {
                throw new Error(error);
            }
        });
    }


    static getAll() {
        try {
            return database.users
        } catch (error) {
            throw new Error(error)
        };
    }


    static getByID(user_id) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id == user_id) return database.users[i]
              }
            return null
        } catch (error) {
            throw new Error(error)
        }
    }


    static getUserByEmail(email) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email) return database.users[i]
            }
            return null
        } catch (error) {
            throw new Error(error)
        }
    }


    static verifyIfAdminByID(user_id) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id) {
                    if(database.users[i].admin) return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error)
        }
    }



    static emailRegistred(email){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error)
        }
    }



    static async verifyConfirmEmailToken (email, token) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(
                  database.users[i].email === email
                  &&
                  database.users[i].confirm_email_token === token){
                    database.users[i].confirmed_email = true
                    database.users[i].confirm_email_token = null
                    await Users.save(database)
                    return true
                }
            }
            return false
        }
        catch (error) {
            throw new Error(error)
        }
    }


    static async createConfirmEmailToken(email, confirmEmailToken){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    database.users[i].confirm_email_token = confirmEmailToken
                    await Users.save(database)
                    return
                }
            }
            return
        }
        catch (error) {
            throw new Error(error)
        }
    }


    static verifyIfEmailIsConfirmed (email) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email && database.users[i].confirmed_email){
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error)
        }
    }


    static async verifyLogin(email, password){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    const passwordValid = await Bcrypt.comparePassword(password, database.users[i].password)
                    if(passwordValid){
                        return database.users[i]
                    }

                }
            }
            return null
        } catch (error) {
            throw new Error(error)
        }
    }


    static async verifyPassword(user_id, password){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    const passwordValid = await Bcrypt.comparePassword(password, database.users[i].password)
                    if(passwordValid){
                        return true
                    }
                }
            }
            return false
        } catch (error) {
            throw new Error(error);
        }
    }



    static async create(userObject) {
        try {
      
            if(Users.emailRegistred(userObject.email)) return false

            const passwordHash = await Bcrypt.cryptPassword(userObject.password)

            database.users.push({
                id: uuid.v4(),
                name: userObject.username,
                email: userObject.email,
                confirmed_email: false,
                confirm_email_token: userObject.confirm_email_token,
                password: passwordHash,
                reset_password_token: null,
                admin: false,
                avatar: "avatar.png",
                document: null,
                birthday: null,
                google_id: parseInt(userObject.google_id),
                github_id: parseInt(userObject.github_id),
                facebook_id: parseInt(userObject.facebook_id),
                phone: {
                    number: null,
                    ddd: null,
                    country: null
                },
                address: {
                    zipcode: null,
                    street: null,
                    street_number: null,
                    neighborhood: null,
                    city: null,
                    state: null,
                    country: null
                },
                pagarme: {
                    customer_id: null,
                    card_id: null,
                    card_brand: null,
                    card_first_digits: null,
                    card_last_digits: null,
                    card_expiration_date: null,
                    currently_subscription_id: null,
                    currently_subscription_name: "FREE",
                    subscription_start: null,
                    subscription_end: null
                },
                created_at: DateTime.getNow(),
                updated_at: DateTime.getNow()
            })
            Users.save(database)
        } catch (error) {
            throw new Error(error);
        }
    }



    static createResetPasswordToken(email){
        try {
            const reset_password_token = randomToken.generate(24);

            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    database.users[i].reset_password_token = reset_password_token
                    Users.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }



    static resetPasswordTokenIsValid(email, resetPasswordToken){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email
                &&
                database.users[i].reset_password_token === resetPasswordToken){
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error)
        }
    }


    static async resetPassword(email, newPassword){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    const passwordHash = await Bcrypt.cryptPassword(newPassword)
                    database.users[i].password = passwordHash
                    database.users[i].reset_password_token = null
                    Users.save(database, 'error resetPassword: ')
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error)
        }
    }


    static async update(userObject){
        try {

            for(let i = 0; i < database.users.length; i++){
        
                if(database.users[i].id === SESSION_USER.id){

                    const olderPasswordValid = await Bcrypt.comparePassword(userObject.older_password, database.users[i].password)

                    if(olderPasswordValid) {
                        const passwordHash = await Bcrypt.cryptPassword(userObject.new_password)
                        database.users[i].password = passwordHash
                    }
            
                    // I need to refactor this shit code someday
                    if(userObject.name) database.users[i].name = userObject.name
                    if(userObject.new_email) database.users[i].email = userObject.new_email
                    if(userObject.document) database.users[i].document = userObject.document
                    if(userObject.phone) database.users[i].phone = userObject.phone
                    if(userObject.birthday) database.users[i].birthday = userObject.birthday
                    if(userObject.zipcode) database.users[i].address.zipcode = userObject.zipcode
                    if(userObject.street) database.users[i].address.street = userObject.street
                    if(userObject.street_number) database.users[i].address.street_number = userObject.street_number
                    if(userObject.neighborhood) database.users[i].address.neighborhood = userObject.neighborhood
                    if(userObject.city) database.users[i].address.city = userObject.city
                    if(userObject.state) database.users[i].address.state = userObject.state
                    if(userObject.country) database.users[i].address.country = userObject.country

                    database.users[i].updated_at = DateTime.getNow()

                    Users.save(database)

                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }



    static updateAvatarName(avatarName, user_id){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id == user_id){
                    database.users[i].avatar = avatarName
                    Users.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async delete(email, password){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    const passwordValid = await Bcrypt.comparePassword(password, database.users[i].password)
                    if(passwordValid){
                        database.users.splice(i, 1)
                        Users.save(database)
                        return
                    }
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static savePagarMECustomerID(user_id, pagarme_customer_id){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].pagarme.customer_id = pagarme_customer_id
                    Users.save(database)
                    return
                }
            }
            return
        } catch (error) {
            throw new Error(error)
        }
    }


    static createPagarMECard(user_id, cardObject){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].pagarme.card_id = cardObject.id
                    database.users[i].pagarme.card_brand = cardObject.brand
                    database.users[i].pagarme.card_first_digits = cardObject.first_digits
                    database.users[i].pagarme.card_last_digits = cardObject.last_digits
                    database.users[i].pagarme.card_expiration_date = cardObject.expiration_date
                    Users.save(database)
                    return
                }
            }
            return
        } catch (error) {
            throw new Error(error);
        }
    }


    static createPagarMESubscription(user_id, subscriptionObject){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].pagarme.currently_subscription_id = subscriptionObject.transaction_id
                    database.users[i].pagarme.currently_subscription_name = subscriptionObject.plan.name
                    database.users[i].pagarme.subscription_start = subscriptionObject.plan.current_period_start
                    database.users[i].pagarme.subscription_end = subscriptionObject.plan.current_period_end
                    Users.save(database)
                    return
                }
            }
            return
        } catch (error) {
            throw new Error(error)
        }
    }


    static verifyLoginGitHub(github_id, email, avatar){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email){
                    database.users[i].github_id = github_id
                    database.users[i].avatar = avatar
                    Users.save(database)
                    return database.users[i]
                }
            }
              return null
        } catch (error) {
            throw new Error(error)
        }
    }


    static verifyLoginGoogle(google_id, email, avatar){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email){
                    database.users[i].google_id = google_id
                    database.users[i].avatar = avatar
                    Users.save(database)
                    return database.users[i]
                }
            }
            return null
        } catch (error) {
            throw new Error(error)
        }
    }


    static verifyLoginFacebook(facebook_id, email){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email){
                    database.users[i].facebook_id = facebook_id
                    Users.save(database)
                    return database.users[i]
                }
            }
            return null
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default Users;
