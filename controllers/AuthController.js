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




import bodyParser from 'body-parser'
import { validationResult } from "express-validator"
import queryString from 'query-string'
import axios from 'axios'
import fetch from 'node-fetch'


// HELPERS
import DateTime from '../helpers/DateTime.js'
import Bcrypt from '../helpers/Bcrypt.js'
import NodeMailer from '../helpers/NodeMailer.js'
import URL from '../helpers/URL.js'


// MODELS
import Users from '../models/MYSQL/Users.js'



class AuthController {


    static async getViewLogin (req, res){
        const facebookLoginURL = await URL.getFacebookURL()

        return res.render('pages/auth/login', {
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
            FacebookLoginURL: facebookLoginURL,
            GitHubLoginURL: URL.getGitHubURL,
            GoogleLoginURL: URL.getGoogleURL,
            captcha: res.recaptcha,
            csrfToken: req.csrfToken()
        });
    }


    static async postLogin (req, res){

        try {

            const errors = validationResult(req);

            if (!req.recaptcha.error) {
                if (!errors.isEmpty()) {
                    req.flash('warning', `${errors.array()}`)
                    return res.redirect('/login')
                }
            } else {
                req.flash('warning', `Recaptcha inválido!`)
                return res.redirect('/login')
            }

            const { email, password } = req.body;

            const userObject = await Users.verifyLogin(email, password)

            if(userObject){

                const confirmedEmail = await Users.verifyIfEmailIsConfirmed(email)

                if(!confirmedEmail){
                    req.flash('warning', `Você precisa confirmar seu email!`)
                    return res.redirect('/login')
                }

            } else {
                req.flash('warning', `Email ou senha inválidos!`)
                return res.redirect('/login')
            }

            req.session.userID = userObject.id
            global.SESSION_USER = userObject
            req.flash('success', `Bem vindo de volta, ${global.SESSION_USER.name} :D`)
            return res.redirect('/');
        }
        catch (error) {
            throw new Error(error)
        }
    }


    static getViewRegister (req, res){
        return res.render('pages/auth/register', {
            captcha: res.recaptcha,
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
            csrfToken: req.csrfToken(),
            app_url: process.env.APP_URL
        });
    }


    static async verifyIfConfirmEmailURLIsValid (req, res){
        const { email, token } = req.params;

        const confirmEmailValid = await Users.verifyConfirmEmailToken(email, token)

        if(confirmEmailValid){
            req.flash('success', 'Email confirmado!')
            return res.redirect('/login')
        }

        return res.redirect('/login')
    }



    /**
     * Create user in DataBase
     * Send Confirm Email Token Email
     */
    static async postRegister (req, res, next){

        try {

            if (!req.recaptcha.error) {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    req.flash('warning', errors.array()[0].msg)
                    return res.redirect('/criar-conta')
                }
            } else {
                req.flash('warning', 'Recaptcha inválido!')
                return res.redirect('/criar-conta')
            }

            const { username,
                email,
                password,
                github_id,
                facebook_id,
                google_id } = req.body;

            const userObject = {
                username,
                email,
                password,
                github_id,
                facebook_id,
                google_id
            };

            await Users.create(userObject)
            await NodeMailer.sendConfirmEmailLink(email)

            req.flash('success', 'Conta criada! Confirme seu email clicando no link enviado para o seu inbox!')
            return res.redirect('/criar-conta')

        } catch (error) {
            throw new Error(error)
        }
    }


    static getViewForgetPassword(req, res){
        return res.render('pages/auth/forgetPassword');
    }


    static async postForgetPassword (req, res){
        const { email } = req.body;

        await Users.createResetPasswordToken(email);
        await NodeMailer.sendForgetPasswordLink(email);

        req.flash('success', `Se esse email existe, vamos enviar um link no seu inbox para você recuperar sua senha!`)
        return res.redirect('/esqueci-senha')
    }


    static getViewResetPassword (req, res){
        const { email, token } = req.params

        if(!email || !token){
            return res.redirect('/forgetPassword');
        }

        if(!Users.resetPasswordTokenIsValid(email, token)){
            return res.redirect('/forgetPassword');
        }

        return res.render('pages/auth/resetPassword', {
            email
        });
    }


    static postResetPassword (req, res){
        const { email, new_password } = req.body

        if(!Users.resetPassword(email, new_password)){
            return res.redirect('/forgetPassword')
        }

        req.flash('success', 'Você atualizou sua senha!')
        return res.redirect('/login')
    }


    static getViewResendConfirmEmailLink(req, res){
        return res.render('pages/auth/confirmEmail', {
            flash_success: req.flash('success')
        });
    }


    static async postSendConfirmEmailLink(req, res){
        const { email } = req.body

        const emailConfirmed = await Users.verifyIfEmailIsConfirmed(email)

        if(!emailConfirmed){
            await NodeMailer.sendConfirmEmailLink(email)
        }

        req.flash('success', "Se esse email esta registrado e não confirmado ainda, enviaremos um link no seu inbox para confirmar seu email!")
        return res.redirect('/confirmEmail')
    }


    static async loginFacebook (req, res, next){

        try {
            const url_query_code = req.query.code;

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
                req.flash('warning', 'Create Your account Linked to Your Facebook Account')
                return res.redirect('/criar-conta')
            }
            else {
                req.session.userID = userRegistred.id
                global.SESSION_USER = userRegistred
                return res.redirect('/');
            }

            return res.redirect('/login')

        } catch(error){
            throw new Error(error)
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
                req.flash('warning', 'Create Your account Linked to Your GitHub Account')
                return res.redirect('/criar-conta')
            } else {
                req.session.userID = user.id
                global.SESSION_USER = user
                return res.redirect('/');
            }
            return res.redirect('/login')
        }
        catch (error) {
            throw new Error(error)
        }
    }


    static async loginGoogle (req, res){
        const code = req.query.code;

        try {
            const { user } = await googleLogin.getUserProfile(`${code}`)

            const userRegistred = await Users.verifyLoginGoogle(user.sub, user.email, user.picture)

            if(!userRegistred){
                req.flash('warning', 'Create Your account Linked to Your Google Account')
                return res.redirect('/criar-conta')
            }
            else {
                req.session.userID = userRegistred.id
                global.SESSION_USER = userRegistred
                return res.redirect('/');
            }

            return res.redirect('/login')

        } catch(error){
            throw new Error(error)
        }
    }
}

export default AuthController;
