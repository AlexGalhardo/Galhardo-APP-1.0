/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 *
 * ./controllers/AuthController.js
 * 
 * http://localhost:3000/login
 * http://localhost:3000/register
 * http://localhost:3000/forgetPassword
 * http://localhost:3000/resetPassword
 * http://localhost:3000/confirmEmail
 */



const bodyParser = require('body-parser');
const { validationResult } = require("express-validator");
const queryString = require('query-string');
const axios = require('axios');
const fetch = require('node-fetch');
const randomToken = require('rand-token');


const DateTime = require('../helpers/DateTime');
const Bcrypt = require('../helpers/Bcrypt');
const NodeMailer = require('../helpers/NodeMailer');
const URL = require('../helpers/URL');


const Users = require('../models/JSON/Users');
// const Users = require('../models/MONGODB/Users');
// const Users = require('../models/MYSQL/Users');
// const Users = require('../models/POSTGRES/Users');
// const Users = require('../models/SQLITE/Users');




class AuthController {


    static async getViewLogin (req, res){
        const facebookLoginURL = await URL.getFacebookURL()
        res.render('pages/auth/login', {
            FacebookLoginURL: facebookLoginURL,
            GitHubLoginURL: URL.getGitHubURL,
            GoogleLoginURL: URL.getGoogleURL
        });
    }


    static async postLogin (req, res, next){
        const errors = validationResult(req);
        const { email, password } = req.body;

        if (!errors.isEmpty()) {
            return res.render('pages/auth/login', {
                flash: {
                    type: "warning",
                    message: errors.array()[0].msg,
                }
            });
        }

        try {

            const confirmedEmail = await Users.verifyIfEmailIsConfirmed(email)
            if(!confirmedEmail){
                return res.render('pages/auth/login', {
                    flash: {
                        type: "warning",
                        message: "You need to confirm your email!"
                    }
                });
            }

            const userObject = await Users.verifyLogin(email, password)

            if(!userObject){
                return res.render('pages/auth/login', {
                    flash: {
                        type: "warning",
                        message: "Email OR Password Inválid!"
                    }
                });
            }

            req.session.userID = userObject.id
            global.SESSION_USER = userObject
            return res.redirect('/');
        }
        catch (error) {
            return res.render('pages/auth/login', {
                flash: {
                    type: "warning",
                    message: `Error: ${error}`
                }
            });
        }
    }


    static getViewRegister (req, res){
        return res.render('pages/auth/register');
    }


    static verifyIfConfirmEmailURLIsValid (req, res){
        const { email, token } = req.params;

        const confirmEmailValid = Users.verifyConfirmEmailToken(email, token)

        if(confirmEmailValid){
            return res.render('pages/auth/login', {
                flash: {
                    type: 'Success',
                    message: 'Email Confirmed!'
                }
            })
        }

        return res.redirect('/login')
    }

    static postRegister (req, res, next){
        const errors = validationResult(req);

        const { username,
                email,
                password,
                confirm_password,
                github_id,
                facebook_id,
                google_id } = req.body;

        if (!errors.isEmpty()) {
            return res.render('pages/auth/register', {
                flash: {
                    type: "warning",
                    message: errors.array()[0].msg
                }
            });
        }

        try {

            const confirm_email_token = randomToken.generate(16)

            const userObject = {
                username,
                email,
                password,
                github_id,
                facebook_id,
                google_id,
                confirm_email_token
            };

            const userRegistred = Users.register(userObject)

            if(!userRegistred){
                return res.render("pages/auth/register", {
                    flash: {
                        type: "warning",
                        message: "User not saved in JSON database!"
                    }
                });
            }

            NodeMailer.sendConfirmEmailToken(email, confirm_email_token)

            return res.render("pages/auth/register", {
                flash: {
                    type: "success",
                    message: 'Account Created! Confirm your email by clicking the link send to your email inbox!'
                }
            });

        } catch (error) {
            return res.render("pages/auth/register", {
                flash: {
                    type: "danger",
                    message: `Error: ${error}`
                }
            });
        }
    }


    static getViewForgetPassword(req, res){
        return res.render('pages/auth/forgetPassword');
    }


    static postForgetPassword (req, res){
        const { email } = req.body;
        const reset_password_token = randomToken.generate(16);

        const resetPasswordTokenCreated = Users.createResetPasswordToken(email, reset_password_token);

        NodeMailer.sendForgetPassword(email, reset_password_token);

        if(!resetPasswordTokenCreated){
            return res.redirect('/login')
        }

        return res.render('pages/auth/forgetPassword', {
            flash: {
                type: "success",
                message: `If this email exists, we'll send a link to this email to recover password!`
            }
        });
    }


    static getViewResetPassword (req, res){
        const { email, token } = req.params

        if(!email || !token){
            return res.redirect('/forgetPassword');
        }

        if(!Users.resetPasswordTokenIsValid(email, token)){
            return res.redirect('/forgetPassword');
        }

        res.render('pages/auth/resetPassword', {
            email
        });
    }


    static postResetPassword (req, res){
        const { email, newPassword } = req.body

        if(!Users.resetPassword(email, newPassword)){
            console.log('New Password not updated in database!');
            return res.redirect('/forgetPassword')
        }

        return res.render('pages/auth/login', {
            flash: {
                type: "success",
                message: "You updated your password!"
            }
        });
    }



    static async loginFacebook (req, res, next){
        const url_query_code = req.query.code;

        try {
            const token = await facebookLogin.getAccessToken({
              code: `${url_query_code}`,
              fbAppID: process.env.FACEBOOK_CLIENT_ID,
              fbAppSecret: process.env.FACEBOOK_CLIENT_SECRET,
              redirectURI: process.env.FACEBOOK_CALLBACK_URL
            })

            const facebookUser = await facebookLogin.getUserProfile({
              accessToken: `${token.access_token}`,
              fields: ["id","name","email"]
            })

            const userRegistred = await Users.verifyLoginFacebook(facebookUser.id, facebookUser.email)

            if(!userRegistred){
                return res.render('pages/auth/register', {
                    flash: {
                        type: "warning",
                        message: "Create Your account Linked to Your Facebook Account"
                    },
                    name: facebookUser.name,
                    email: facebookUser.email,
                    email_readonly: true,
                    facebook_id: facebookUser.id
                });
            }
            else {
                req.session.userID = userRegistred.id
                global.SESSION_USER = userRegistred
                return res.redirect('/');
            }

            return res.redirect('/login')

        } catch(error){
            return res.render('pages/auth/login', {
                flash: {
                    type: "warning",
                    message: `Error: ${error}`
                }
            });
        }
    }


    static async loginGitHub (req, res){
        const code = req.query.code;

        try {

            const { data } = await axios({
                url: 'https://github.com/login/oauth/access_token',
                method: 'get',
                params: {
                  client_id: process.env.GITHUB_CLIENT_ID,
                  client_secret: process.env.GITHUB_CLIENT_SECRET,
                  redirect_uri: process.env.GITHUB_CALLBACK_URL,
                  code
                }
            });

            const parsedData = queryString.parse(data);

            if (parsedData.error) throw new Error(parsedData.error_description)

            const response = await axios({
                url: 'https://api.github.com/user',
                method: 'GET',
                headers: {
                  Authorization: `token ${parsedData.access_token}`,
                },
            });

            const user = await Users.verifyLoginGitHub(response.data.id, response.data.email, response.data.avatar_url)

            if(!user){
                return res.render('pages/auth/register', {
                    flash: {
                        type: "warning",
                        message: "Create Your account Linked to Your GitHub"
                    },
                    name: response.data.name,
                    email: response.data.email,
                    email_readonly: true,
                    github_id: response.data.id
                });
            } else {
                req.session.userID = user.id
                global.SESSION_USER = user
                return res.redirect('/');
            }
            return res.redirect('/login')
        }
        catch (error) {
            return res.render('pages/auth/login', {
                flash: {
                    type: "warning",
                    message: `Error: ${error}`
                }
            });
        }
    }


    static async loginGoogle (req, res){
        const code = req.query.code;

        try {
            const { user } = await googleLogin.getUserProfile(`${code}`)

            const userRegistred = await Users.verifyLoginGoogle(user.sub, user.email, user.picture)

            if(!userRegistred){
                return res.render('pages/auth/register', {
                    flash: {
                        type: "warning",
                        message: "Create Your account Linked to Your Google Account"
                    },
                    name: user.name,
                    email: user.email,
                    email_readonly: true,
                    google_id: user.id
                });
            }
            else {
                req.session.userID = userRegistred.id
                global.SESSION_USER = userRegistred
                return res.redirect('/');
            }

            return res.redirect('/login')

        } catch(error){
            return res.render('pages/auth/login', {
                flash: {
                    type: "warning",
                    message: `Error: ${error}`
                }
            });
        }
    }
}

module.exports = AuthController;
