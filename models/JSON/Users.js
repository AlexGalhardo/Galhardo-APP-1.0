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
        
        if(
          database.users[i].email === email 
          && 
          database.users[i].confirm_email_token === token)
        {

          database.users[i].confirmed_email = true;
          // database.users[i].confirm_email_token = null;
          Users.save(database, 'ERROR verifyConfirmEmailToken: ')
        }

        return false
      }
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

  static async registerUser (username, email, password, confirm_password, confirm_email_token) {
    try {
      
      if(Users.emailIsAlreadyRegistred(email)) return false

      const passwordHash = await Bcrypt.cryptPassword(password)

      database.users.push({
        id: uuid.v4(),
        name: username,
        email: email,
        confirmed_email: false,
        confirm_email_token: confirm_email_token,
        password: passwordHash,
        reset_password_token: null,
        admin: false,
        avatar: "avatar.png",
        document: null,
        phone: null,
        birth_date: null,
        google_id: null,
          github_id: null,
          facebook_id: null,
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
            currently_subscription_name: null,
            subscription_start: null, 
            subscription_end: null,
            subscription_automatically_renew: false
        },
        created_at: DateTime.getNow(),
        updated_at: DateTime.getNow()
      })

      Users.save(database, 'error register user: ')

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
          
          database.users[i].name = userObject.username
          database.users[i].email = userObject.email
          database.users[i].document = userObject.document
          database.users[i].phone = userObject.phone
          database.users[i].birth_date = userObject.birth_date
          database.users[i].address.zipcode = userObject.zipcode
          database.users[i].address.street = userObject.street
          database.users[i].address.street_number = userObject.street_number
          database.users[i].address.neighborhood = userObject.neighborhood
          database.users[i].address.city = userObject.city
          database.users[i].address.state = userObject.state
          database.users[i].address.country = userObject.country
          database.users[i].updated_at = DateTime.getNow()
          
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
}

module.exports = Users;
