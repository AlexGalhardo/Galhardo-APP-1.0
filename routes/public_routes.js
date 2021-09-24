/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * PUBLIC ROUTES
 * http://localhost:3000/
 */

import dotenv from 'dotenv'
dotenv.config()

import { RecaptchaV3 } from 'express-recaptcha'

const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_ID, process.env.RECAPTCHA_SECRET, {callback:'cb'});

import csrf from 'csurf'
const csrfProtection = csrf({ cookie: true })

import RouterCache from '../helpers/RouterCache.js'

import Users from '../models/JSON/Users.js'


// INIT ROUTER
import express from 'express'
const router = express.Router()



// VIEWS CONTROLLERS
import AppController from '../controllers/AppController.js'
import BlogController from '../controllers/BlogController.js'
import ShopController from '../controllers/ShopController.js'
import PremiumController from '../controllers/PremiumController.js'
import AuthController from '../controllers/AuthController.js'


// ---------------------- MIDDLEWARES 
const userIsAlreadyLoggedIn = (req, res, next) => {
	if(req.session.userID) {
        req.flash('warning', 'Você precisa se deslogar primeiro')
        return res.redirect('/');
    }
	next()
}

const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) {
        req.flash('warning', 'Você precisa se logar primeiro')
        return res.redirect('/login');
    }
    next()
}


const verifyIfUserHasActiveSubscription = (req, res, next) => {
    if(SESSION_USER.pagarme.currently_subscription_name !== "FREE"){
        req.flash('warning', `Você já possui uma assinatura ativa! Por favor, espere até sua assinatura terminar para fazer uma nova transação!`)
        return res.redirect('/premium')
    }
    next()
}


import swaggerUI from 'swagger-ui-express'
import docs from '../docs/index.js'

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs, {explorer: true}));

router
// APP VIEWS CONTROLLER
    .get('/', AppController.getViewHome)
    .get('/books', AppController.getViewBooks)

    .get('/contato', recaptcha.middleware.render, csrfProtection, AppController.getViewContact)
    .post('/contato', recaptcha.middleware.verify, csrfProtection, AppController.postContact)

    .get('/privacidade', AppController.getViewPrivacy)

    .get('/searchGame', AppController.getSearchGameTitle)
    .get('/searchBook', AppController.getSearchBookTitle)



// BLOG VIEWS CONTROLLER
    .get('/blog', /*RouterCache(300),*/ BlogController.getViewBlog)
    .get('/blog/search', BlogController.getSearchBlogTitle)
    .get('/blog/page/:page', BlogController.getViewBlog)

    .get('/blog/:slug', /*RouterCache(300),*/ BlogController.getViewBlogPost)
    .post('/blog/:slug', BlogController.postBlogComment)

    .get('/blog/:slug/deleteComment/:comment_id', BlogController.getDeleteBlogCommentByCommentID)


// NEWSLETTER
    .get('/newsletter-confirm-email', (req, res) => {
        req.flash('success', 'Confirm your newsletter subscription by clicking in the link send to your email inbox!')
        return res.redirect('/')
    })
    .get('/newsletter-email-confirmed', (req, res) => {
        req.flash('success', 'Your newsletter subscription was confirmed! Welcome aboard :D')
        return res.redirect('/')
    })


// SHOP CONTROLLER
    .get('/shop', ShopController.getViewShop)
    .post('/shop', ShopController.postShopPayLog)



// PAGARME CHECKOUT
    .get('/pagarme/checkout/game/:game_id', AppController.getPagarMECheckoutByGameID)


// PLANS VIEWS CONTROLLER
    .get('/premium', /*RouterCache(300),*/ PremiumController.getViewPremium)

    .get('/premium/checkout', userIsNotLoggedIn, verifyIfUserHasActiveSubscription, PremiumController.getViewPlanPremiumCheckout)
    .post('/premium/checkout', userIsNotLoggedIn, PremiumController.postSubscription)



// AUTH VIEWS CONTROLLER
    .get('/login', userIsAlreadyLoggedIn, recaptcha.middleware.render, csrfProtection, AuthController.getViewLogin)
    .post('/login', userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postLogin)

    .get('/criar-conta', userIsAlreadyLoggedIn, recaptcha.middleware.render, csrfProtection, AuthController.getViewRegister)
    .post('/criar-conta', userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postRegister)

    .get('/esqueci-senha', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword)
    .post('/esqueci-senha', userIsAlreadyLoggedIn, AuthController.postForgetPassword)

    .get('/confirmar-email/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid)

    .get('/confirmar-email', AuthController.getViewResendConfirmEmailLink)
    .post('/confirmar-email', AuthController.postSendConfirmEmailLink)

    .get('/resetar-senha/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword)
    .post('/resetar-senha', userIsAlreadyLoggedIn, AuthController.postResetPassword)

    .get('/github/callback', userIsAlreadyLoggedIn, AuthController.loginGitHub)
    .get('/facebook/callback', userIsAlreadyLoggedIn, AuthController.loginFacebook)
    .get('/google/callback', userIsAlreadyLoggedIn, AuthController.loginGoogle)



export { router as publicRoutes };
