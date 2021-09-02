/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Users.js
 */

const fs = require('fs-extra')
const uuid = require('uuid');

const Bcrypt = require('../../helpers/Bcrypt');
const DateTime = require('../../helpers/DateTime');

const database = require('../../config/json_database');



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
          console.log("ERROR getAll: ", error);
          return null
        };
    }


    static getByID(user_id) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id == user_id) return database.users[i]
              }
            return null
        } catch (error) {
            console.log("ERROR getByID: ", error);
            return null
        }
    }


    static getUserByEmail(email) {
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email == email) return database.users[i]
            }
            return null
        } catch (error) {
            console.log("ERROR getUsers: ", error);
            return null
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
      return console.log("ERROR verifyIfAdminByID: ",error);
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
            console.log("ERROR emailRegistred: ", error);
            return false
        }
    }



  static verifyConfirmEmailToken (email, token) {
    try {
      
      for(let i = 0; i < database.users.length; i++){
        console.log(database.users[i].email, database.users[i].confirm_email_token)
        if(
          database.users[i].email === email 
          && 
          database.users[i].confirm_email_token === token)
        {
          console.log('entrou')
          database.users[i].confirmed_email = true
          database.users[i].confirm_email_token = null
          Users.save(database, 'ERROR verifyConfirmEmailToken: ')
          return true
        }
      }
      return false
    } 
    catch (error) {
      return console.log("ERROR verifyConfirmEmailToken: ", error);
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
      return console.log("ERROR emailIsAlreadyRegistred: ", error);
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
            return console.log("ERROR verifyLogin: ", error);
        }
    }


    static async verifyPassword(user_id, password){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    const passwordValid = await Bcrypt.comparePassword(password, database.users[i].password)
                    if(passwordValid){
                        return true
                    } else {
                        return false
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
                phone: null,
                birth_date: null,
                google_id: parseInt(userObject.google_id),
                github_id: parseInt(userObject.github_id),
                facebook_id: parseInt(userObject.facebook_id),
                address: {
                  zipcode: null,
                    street: null,
                    street_number: null,
                    neighborhood: null,
                    city: null,
                    state: null,
                    country: "BRAZIL"
                },
                  stripe: {
                    customer_id: null,
                    card_id: null,
                    card_brand: null,
                    card_last_4_digits: null,
                    card_exp_month: null,
                    card_exp_year: null,
                    currently_subscription_id: null,
                    currently_subscription_name: "FREE",
                    subscription_start: null,
                    subscription_end: null,
                    cancel_at_period_end: null
                },
                created_at: DateTime.getNow(),
                updated_at: DateTime.getNow()
            })
            Users.save(database)
        } catch (error) {
            throw new Error(error);
        }
    }



    static createResetPasswordToken(email, reset_password_token){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].email === email){
                    database.users[i].reset_password_token = reset_password_token
                    Users.save(database, 'error createResetPasswordToken: ')
                    return true
                }
            }
            return false
        } catch (error) {
            console.log("ERROR createResetPasswordToken: ", error);
            return false
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
            return console.log("ERROR passwordResetTokenIsValid: ", error);
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
            console.log("ERROR passwordResetTokenIsValid: ", error);
            return false
        }
    }


  static async updateProfile(userObject){
    try {

      for(let i = 0; i < database.users.length; i++){
        
        if(database.users[i].email === userObject.email){
          const passwordValid = await Bcrypt.comparePassword(userObject.password, database.users[i].password)
            console.log(passwordValid)
          if(passwordValid){
            console.log('PASSWORD IS VALID')
            
            // I need to refactor this shit code someday
            if(userObject.name) database.users[i].name = userObject.name
            if(userObject.new_email) database.users[i].email = userObject.new_email
            if(userObject.new_password) database.users[i].password = await Bcrypt.cryptPassword(userObject.new_password)
            if(userObject.document) database.users[i].document = userObject.document
            if(userObject.phone) database.users[i].phone = userObject.phone
            if(userObject.birth_date) database.users[i].birth_date = userObject.birth_date
            if(userObject.zipcode) database.users[i].address.zipcode = userObject.zipcode
            if(userObject.street) database.users[i].address.street = userObject.street
            if(userObject.street_number) database.users[i].address.street_number = userObject.street_number
            if(userObject.neighborhood) database.users[i].address.neighborhood = userObject.neighborhood
            if(userObject.city) database.users[i].address.city = userObject.city
            if(userObject.state) database.users[i].address.state = userObject.state
            if(userObject.country) database.users[i].address.country = userObject.country

            database.users[i].updated_at = DateTime.getNow()

            console.log(database.users[i])
            
            Users.save(database, 'Error updateProfile: ')
            
            return database.users[i]
          } else {
            return false
          }
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR updateProfile: ", error);
    }
  }



  static updateAvatarName(avatarName, user_id){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].id == user_id){
          database.users[i].avatar = avatarName
          Users.save(database, 'Error updateAvatarName: ')
          return true
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR updateAvatarName: ", error);
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
            throw new Error("ERROR delete");
        }
    }


    static createStripeCustomer(user_id, stripe_customer_id){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].stripe.customer_id = stripe_customer_id
                    Users.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error("ERROR createStripeCustomer");
        }
    }


    static createStripeCard(user_id, card_token_id, cardObject){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].stripe.card_token_id = card_token_id
                    database.users[i].stripe.card_id = cardObject.id
                    database.users[i].stripe.card_brand = cardObject.brand
                    database.users[i].stripe.card_last_4_digits = cardObject.last4
                    database.users[i].stripe.card_exp_month = cardObject.exp_month
                    database.users[i].stripe.card_exp_year = cardObject.exp_year
                    Users.save(database)
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error(error);
        }
    }


    static createStripeSubscription(user_id, plan_name, subscriptionObject){
        try {
            for(let i = 0; i < database.users.length; i++){
                if(database.users[i].id === user_id){
                    database.users[i].stripe.currently_subscription_id = subscriptionObject.id
                    database.users[i].stripe.currently_subscription_name = plan_name
                    database.users[i].stripe.subscription_start = subscriptionObject.current_period_start
                    database.users[i].stripe.subscription_end = subscriptionObject.current_period_end
                    database.users[i].stripe.cancel_at_period_end = subscriptionObject.cancel_at_period_end
                    Users.save(database, 'Error createStripeSubscription: ')
                    return true
                }
            }
            return false
        } catch (error) {
            throw new Error("ERROR createStripeSubscription");
        }
    }


  static verifyLoginGitHub(github_id, email, avatar){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email){
          database.users[i].github_id = github_id
          database.users[i].avatar = avatar
          Users.save(database, "ERROR verifyLoginGitHub: ")
          return database.users[i]
        }
      }
      return null
    } catch (error) {
      console.log("ERROR verifyLoginGitHub: ", error);
    }
  }

  static verifyLoginGoogle(google_id, email, avatar){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email){
          database.users[i].google_id = google_id
          database.users[i].avatar = avatar
          Users.save(database, "ERROR verifyLoginGoogle: ")
          return database.users[i]
        }
      }
      return null
    } catch (error) {
      console.log("ERROR verifyLoginGoogle: ", error);
    }
  }


  static verifyLoginFacebook(facebook_id, email){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email){
          database.users[i].facebook_id = facebook_id
          Users.save(database, "ERROR verifyLoginFacebook: ")
          return database.users[i]
        }
      }
      return null
    } catch (error) {
      console.log("ERROR verifyLoginFacebook: ", error);
    }
  }
}

module.exports = Users;
