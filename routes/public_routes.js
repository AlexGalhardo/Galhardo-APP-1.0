/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * PUBLIC ROUTES
 * http://localhost:3000/
 */


// INIT EXPRESS 
const router = require('express').Router()



// VIEWS CONTROLLERS
const AppController = require('../controllers/AppController');
const BlogController = require('../controllers/BlogController');
const ShopController = require('../controllers/ShopController');
const PlansController = require('../controllers/PlansController');
const AuthController = require('../controllers/AuthController');


// ---------------------- MIDDLEWARES 
const userIsAlreadyLoggedIn = (req, res, next) => {
	if(req.session.userID) return res.redirect('/');
	next()
}

const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) return res.redirect('/login');
    next()
}



router
// APP VIEWS CONTROLLER
    .get('/', AppController.getViewHome)
    .get('/books', AppController.getViewBooks)

    .get('/contact', AppController.getViewContact)
    .post('/contact', AppController.postContact)

    .get('/privacy', AppController.getViewPrivacy)



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



// PLANS VIEWS CONTROLLER
    .get('/plans', PlansController.getViewPlans)

    .get('/plan/starter/checkout', userIsNotLoggedIn, PlansController.getViewPlanStarterCheckout)
    .post('/plan/starter/checkout', userIsNotLoggedIn, PlansController.postSubscription)

    .get('/plan/pro/checkout', userIsNotLoggedIn, PlansController.getViewPlanProCheckout)
    .post('/plan/pro/checkout', userIsNotLoggedIn, PlansController.postSubscription)

    .get('/plan/premium/checkout', userIsNotLoggedIn, PlansController.getViewPlanPremiumCheckout)
    .post('/plan/premium/checkout', userIsNotLoggedIn, PlansController.postSubscription)



// AUTH VIEWS CONTROLLER
    .get('/login', userIsAlreadyLoggedIn, AuthController.getViewLogin)
    .post('/login', userIsAlreadyLoggedIn, AuthController.postLogin)

    .get('/register', userIsAlreadyLoggedIn, AuthController.getViewRegister)
    .post('/register', userIsAlreadyLoggedIn, AuthController.postRegister)

    .get('/forgetPassword', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword)
    .post('/forgetPassword', userIsAlreadyLoggedIn, AuthController.postForgetPassword)

    .get('/confirmEmail/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid)

    .get('/resetPassword/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword)
    .post('/resetPassword', userIsAlreadyLoggedIn, AuthController.postResetPassword)

    .get('/github/callback', userIsAlreadyLoggedIn, AuthController.loginGitHub)
    .get('/facebook/callback', userIsAlreadyLoggedIn, AuthController.loginFacebook)
    .get('/google/callback', userIsAlreadyLoggedIn, AuthController.loginGoogle)



module.exports = router;
