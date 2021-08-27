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
const ProfileController = require('../controllers/ProfileController');



// ---------------------- MIDDLEWARES 
const userIsNotLoggedIn = (req, res, next) => {
	if(!req.session.userID) return res.redirect('/login');
	next()
}


const userIsAlreadyLoggedIn = (req, res, next) => {
	if(req.session.userID) return res.redirect('/');
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

    .get('/plan/starter/checkout', PlansController.getViewPlanStarterCheckout)
    .post('/plan/starter/checkout', PlansController.postSubscription)

    .get('/plan/pro/checkout', PlansController.getViewPlanProCheckout)
    .post('/plan/pro/checkout', PlansController.postSubscription)

    .get('/plan/premium/checkout', PlansController.getViewPlanPremiumCheckout)
    .post('/plan/premium/checkout', PlansController.postSubscription)



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



// PROFILE CONTROLLER
    .get('/profile', userIsNotLoggedIn, ProfileController.getViewProfile)
    .post('/profile', userIsNotLoggedIn, ProfileController.updateProfile)

    .post('/profile/avatar', userIsNotLoggedIn, ProfileController.updateProfileAvatar)

    .get('/logout', userIsNotLoggedIn, ProfileController.getLogout)


module.exports = router;
