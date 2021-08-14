const fs = require('fs')
const uuid = require('uuid');

const Bcrypt = require('../../helpers/Bcrypt');
const DateTime = require('../../helpers/DateTime');

const { JSON_DATABASE_FILE, database } = require('../../config/global');

class Users {

  static save(database, error_message){
    fs.writeFileSync(JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
      if (error) {
        console.log(`Error writing file in ${JSON_DATABASE_FILE}: `, error);
        return false
      }
    });
    return true
  }

  static getUsers () {
    try {
      return database.users
    } catch (error) {
      return console.log("ERROR getUsers: ", error);
    };
  }

  static getUserByID(user_id) {
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].id == user_id) return database.users[i]
      }
      return null
    } catch (error) {
      return console.log("ERROR getUserByID: ", error);
    }
  }

  static getUserByEmail(email) {
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email) return database.users[i]
      }
      return null
    } catch (error) {
      return console.log("ERROR getUsers: ",error);
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

  static emailIsAlreadyRegistred(email){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email){
          return true
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR emailIsAlreadyRegistred: ", error);
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
        if(database.users[i].email == email){
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

  static async registerUser (userObject) {
    try {
      
      if(Users.emailIsAlreadyRegistred(userObject.email)) return false

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
            currently_subscription_id: null,
            currently_subscription_name: "FREE",
            subscription_start: null, 
            subscription_end: null,
            subscription_automatically_renew: false
        },
        created_at: DateTime.getNow(),
        updated_at: DateTime.getNow()
      })

      Users.save(database, 'error register user: ')

      return true

    } catch (error) {
      return console.log("ERROR registerUser: ", error);
    }
  }

  static createResetPasswordToken(email, reset_password_token){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].email == email){
          database.users[i].reset_password_token = reset_password_token
          Users.save(database, 'error createResetPasswordToken: ')
          return true
        }
        return false
      }
    } catch (error) {
      return console.log("ERROR createResetPasswordToken: ", error);
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
        return false
      }
    } catch (error) {
      return console.log("ERROR passwordResetTokenIsValid: ", error);
    }
  }

  static updateProfile(userObject){
    try {
      for(let i = 0; i < database.users.length; i++){

        if(database.users[i].id == userObject.id){
          userObject.created_at = database.users[i].created_at
          userObject.updated_at = DateTime.getNow()
          datbase.users.splice(i, 1, userObject)
          Users.save(database, 'Error updateProfile: ')
          return true
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

  static createStripeCustomer(user_id, customer_id){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].id === parseInt(user_id)){
          database.users[i].stripe.customer_id = customer_id
          Users.save(database, 'Error createStripeCustomer: ')
          return true
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR createStripeCustomer: ", error);
    }
  }

  static createStripeCard(user_id, card_token_id, card_id){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].id === parseInt(user_id)){
          database.users[i].stripe.card_token_id = card_token_id
          database.users[i].stripe.card_id = card_id
          Users.save(database, 'Error createStripeCard: ')
          return true
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR createStripeCard: ", error);
    }
  }

  static createStripeSubscription(user_id, subscriptionObject){
    try {
      for(let i = 0; i < database.users.length; i++){
        if(database.users[i].id === parseInt(user_id)){
          database.users[i].stripe.currently_subscription_id = subscriptionObject.id
          database.users[i].stripe.currently_subscription_name = 'PREMIUM'
          database.users[i].stripe.subscription_start = subscriptionObject.current_period_start
          database.users[i].stripe.subscription_end = subscriptionObject.current_period_end
          database.users[i].stripe.subscription_automatically_renew = true
          Users.save(database, 'Error createStripeSubscription: ')
          return true
        }
      }
      return false
    } catch (error) {
      return console.log("ERROR createStripeSubscription: ", error);
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
