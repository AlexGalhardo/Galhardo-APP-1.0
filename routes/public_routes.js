/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * PUBLIC ROUTES
 * http://localhost:3000/
 */


const Recaptcha = require('express-recaptcha').RecaptchaV3;
const recaptcha = new Recaptcha(process.env.RECAPTCHA_ID, process.env.RECAPTCHA_SECRET ,{callback:'cb'});

const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })

const RouterCache = require('../helpers/RouterCache')

// INIT ROUTER
const router = require('express').Router()



// VIEWS CONTROLLERS
const AppController = require('../controllers/AppController');
const BlogController = require('../controllers/BlogController');
const CriptoBOTController = require('../controllers/CriptoBOTController');
const ShopController = require('../controllers/ShopController');
const PlansController = require('../controllers/PlansController');
const AuthController = require('../controllers/AuthController');


// ---------------------- MIDDLEWARES 
const userIsAlreadyLoggedIn = (req, res, next) => {
	if(req.session.userID) {
        req.flash('warning', 'You need to logout first')
        return res.redirect('/');
    }
	next()
}

const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) {
        req.flash('warning', 'You need to login first')
        return res.redirect('/login');
    }
    next()
}

const verifyIfUserHasActiveSubscription = (req, res, next) => {
    if(SESSION_USER.stripe.currently_subscription_name !== "FREE"){
        req.flash('warning', `You already have a currently plan ${SESSION_USER.stripe.currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`)
        return res.redirect('/plans')
    }
    next()
}


router
// APP VIEWS CONTROLLER
    .get('/', RouterCache(300), AppController.getViewHome)
    .get('/books', RouterCache(300), AppController.getViewBooks)

    .get('/contact', recaptcha.middleware.render, csrfProtection, AppController.getViewContact)
    .post('/contact', recaptcha.middleware.verify, csrfProtection, AppController.postContact)

    .get('/privacy', AppController.getViewPrivacy)
    .get('/criptoBOT', AppController.getViewCriptoBOT)

    .get('/searchGame', AppController.getSearchGameTitle)
    .get('/searchBook', AppController.getSearchBookTitle)

    .get('/recommend/book/:book_id/:user_id', AppController.recommendBook)
    .get('/notRecommend/book/:book_id/:user_id', AppController.dontRecommendBook)



// BLOG VIEWS CONTROLLER
    .get('/blog', BlogController.getViewBlog)
    .get('/blog/search', BlogController.getSearchBlogTitle)
    .get('/blog/page/:page', BlogController.getViewBlog)

    .get('/blog/:slug', BlogController.getViewBlogPost)
    .post('/blog/:slug', BlogController.postBlogComment)

    .get('/blog/:slug/deleteComment/:comment_id', BlogController.getDeleteBlogCommentByCommentID)



// SHOP CONTROLLER
    .get('/shop', ShopController.getViewShop)
    .post('/shop', ShopController.postShopPayLog)



// CRIPTO BOT CONTROLLER
    .post('/criptoBOT/:side/:symbol/:quantity', CriptoBOTController.postBinance)



// PLANS VIEWS CONTROLLER
    .get('/plans', PlansController.getViewPlans)

    .get('/plan/starter/checkout', userIsNotLoggedIn, verifyIfUserHasActiveSubscription, PlansController.getViewPlanStarterCheckout)
    .post('/plan/starter/checkout', userIsNotLoggedIn, PlansController.postSubscription)

    .get('/plan/pro/checkout', userIsNotLoggedIn, verifyIfUserHasActiveSubscription, PlansController.getViewPlanProCheckout)
    .post('/plan/pro/checkout', userIsNotLoggedIn, PlansController.postSubscription)

    .get('/plan/premium/checkout', userIsNotLoggedIn, verifyIfUserHasActiveSubscription, PlansController.getViewPlanPremiumCheckout)
    .post('/plan/premium/checkout', userIsNotLoggedIn, PlansController.postSubscription)



// AUTH VIEWS CONTROLLER
    .get('/login', userIsAlreadyLoggedIn, recaptcha.middleware.render, csrfProtection, AuthController.getViewLogin)
    .post('/login', userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postLogin)

    .get('/register', userIsAlreadyLoggedIn, recaptcha.middleware.render, csrfProtection, AuthController.getViewRegister)
    .post('/register', userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postRegister)

    .get('/forgetPassword', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword)
    .post('/forgetPassword', userIsAlreadyLoggedIn, AuthController.postForgetPassword)

    .get('/confirmEmail/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid)

    .get('/resetPassword/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword)
    .post('/resetPassword', userIsAlreadyLoggedIn, AuthController.postResetPassword)

    .get('/github/callback', userIsAlreadyLoggedIn, AuthController.loginGitHub)
    .get('/facebook/callback', userIsAlreadyLoggedIn, AuthController.loginFacebook)
    .get('/google/callback', userIsAlreadyLoggedIn, AuthController.loginGoogle)



module.exports = router;
