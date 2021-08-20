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
const express = require('express');
const router = express.Router();


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



// APP VIEWS CONTROLLER
router.get('/', AppController.getViewHome);
router.get('/books', AppController.getViewBooks);

router.get('/contact', AppController.getViewContact);
router.post('/contact', AppController.postContact);

router.get('/privacy', AppController.getViewPrivacy);



// BLOG VIEWS CONTROLLER
router.get('/blog', BlogController.getViewBlog);
router.get('/blog/search', BlogController.getSearchBlogTitle);
router.get('/blog/page/:page', BlogController.getViewBlog);

router.get('/blog/:slug', BlogController.getViewBlogPost);
router.post('/blog/:slug', BlogController.postBlogComment);

router.get('/blog/:slug/deleteComment/:comment_id', BlogController.getDeleteBlogCommentByCommentID)



// SHOP CONTROLLER
router.get('/shop', ShopController.getViewShop);
router.post('/shop', ShopController.postShopPayLog);



// PLANS VIEWS CONTROLLER
router.get('/plans', PlansController.getViewPlans);

router.get('/plan/starter/checkout', PlansController.getViewPlanStarterCheckout);
router.post('/plan/starter/checkout', PlansController.postSubscription);

router.get('/plan/pro/checkout', PlansController.getViewPlanProCheckout);
router.post('/plan/pro/checkout', PlansController.postSubscription);

router.get('/plan/premium/checkout', PlansController.getViewPlanPremiumCheckout);
router.post('/plan/premium/checkout', PlansController.postSubscription);



// AUTH VIEWS CONTROLLER
router.get('/login', userIsAlreadyLoggedIn, AuthController.getViewLogin);
router.post('/login', userIsAlreadyLoggedIn, AuthController.postLogin);

router.get('/register', userIsAlreadyLoggedIn, AuthController.getViewRegister);
router.post('/register', userIsAlreadyLoggedIn, AuthController.postRegister);

router.get('/forgetPassword', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword);
router.post('/forgetPassword', userIsAlreadyLoggedIn, AuthController.postForgetPassword);

router.get('/confirmEmail/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid);

router.get('/resetPassword/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword);
router.post('/resetPassword', userIsAlreadyLoggedIn, AuthController.postResetPassword);

router.get('/github/callback', userIsAlreadyLoggedIn, AuthController.loginGitHub);
router.get('/facebook/callback', userIsAlreadyLoggedIn, AuthController.loginFacebook);
router.get('/google/callback', userIsAlreadyLoggedIn, AuthController.loginGoogle);



// PROFILE CONTROLLER
router.get('/profile', userIsNotLoggedIn, ProfileController.getViewProfile);
router.post('/profile', userIsNotLoggedIn, ProfileController.updateProfile);

router.post('/profile/avatar', userIsNotLoggedIn, ProfileController.updateProfileAvatar);

router.get('/logout', userIsNotLoggedIn, ProfileController.getLogout);


module.exports = router;
