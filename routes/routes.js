const Logger = require('../config/winston');

// STRIPE CONTROLLERS
const StripeCustomersController = require('../controllers/StripeCustomersController');
const StripeCardsController = require('../controllers/StripeCardsController');
const StripeChargesController = require('../controllers/StripeChargesController');
const StripePlansController = require('../controllers/StripePlansController');
const StripeSubscriptionsController = require('../controllers/StripeSubscriptionsController');
const StripeProductsController = require('../controllers/StripeProductsController');
const StripePricesController = require('../controllers/StripePricesController');

// CONTROLLERS
const AppController = require('../controllers/AppController');
const BlogController = require('../controllers/BlogController');
const ShopController = require('../controllers/ShopController');
const PlansController = require('../controllers/PlansController');
const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');

const AdminController = require('../controllers/AdminController');
const APIController = require('../controllers/APIController');


// INIT EXPRESS 
const express = require('express');
const router = express();


// MIDDLEWARES
const isAdmin = (req, res, next) => {
	if(SESSION_USER && !SESSION_USER.admin || !SESSION_USER){
		return res.redirect('/')
	}
	next()
}

const userIsNotLoggedIn = (req, res, next) => {
	if(!req.session.userID){
        return res.redirect('/login');
    }
	next()
}

const userIsAlreadyLoggedIn = (req, res, next) => {
	if(req.session.userID){
        return res.redirect('/');
    }
	next()
}


// Test Logger
router.get('/logger', (req, res) => {
  Logger.error("This is an error log");
  Logger.warn("This is a warn log");
  Logger.info("This is a info log");
  Logger.http("This is a http log");
  Logger.debug("This is a debug log");

  res.send("Logger tested");
});


// APP CONTROLLER
router.get('/', AppController.getViewHome);
router.get('/books', AppController.getViewBooks);

router.get('/contact', AppController.getViewContact);
router.post('/contact', AppController.postContact);

router.get('/privacy', AppController.getViewPrivacy);



// BLOG CONTROLLER
router.get('/blog', BlogController.getViewBlog);
router.get('/blog/search', BlogController.getSearchBlogTitle);
router.get('/blog/page/:page', BlogController.getViewBlog);

router.get('/blog/:slug', BlogController.getViewBlogPost);
router.post('/blog/:slug', BlogController.postBlogComment);



// SHOP CONTROLLER
router.get('/shop', ShopController.getViewShop);
router.post('/shop', ShopController.postShopPayLog);



// PLANS CONTROLLER
router.get('/plans', PlansController.getViewPlans);

// router.get('/plans/starter/checkout', PlansController.getViewPlanStarterCheckout);
// router.post('/plan/starter/checkout', PlansController.postPlanStarterPayLog);

// router.get('/plans/pro/checkout', PlansController.getViewPlanProCheckout);
// router.post('/plan/pro/checkout', PlansController.postPlanProPayLog);

router.get('/plans/premium/checkout', PlansController.getViewPlanPremiumCheckout);
router.post('/plan/premium/checkout', PlansController.postPlanPremiumPayLog);



// AUTH CONTROLLER
router.get('/login', userIsAlreadyLoggedIn, AuthController.getViewLogin);
router.post('/login', AuthController.postLogin);

router.get('/register', userIsAlreadyLoggedIn, AuthController.getViewRegister);
router.post('/register', AuthController.postRegister);

router.get('/forgetPassword', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword);
router.post('/forgetPassword', AuthController.postForgetPassword);

router.get('/confirmEmail/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid);

router.get('/resetPassword/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword);
router.post('/resetPassword', AuthController.postResetPassword);

// router.get('/github/callback', AuthController.loginGitHub);
// router.get('/facebook/callback', AuthController.loginFacebook);
// router.get('/google/callback', AuthController.loginGoogle);



// PROFILE CONTROLLER
router.get('/profile', userIsNotLoggedIn, ProfileController.getViewProfile);
router.post('/profile', ProfileController.updateProfile);

router.post('/profile/avatar', ProfileController.updateProfileAvatar);

router.get('/logout', userIsNotLoggedIn, ProfileController.getLogout);



// ADMIN Controller
router.get('/admin/create/blogPost', AdminController.getViewCreateBlogPost);
router.post('/admin/create/blogPost', AdminController.postCreateBlogPost);

router.get('/admin/update/blogPost/:slug', AdminController.getViewUpdateBlogPost);
router.post('/admin/update/blogPost/:slug', AdminController.postUpdateBlogPost);

// router.get('/admin/create/game', AdminController.getViewCreateGame);
// router.post('/admin/create/game', AdminController.postCreateGame);

// router.get('/admin/update/game/:title', AdminController.getViewUpdateGame);
// router.post('/admin/update/game/:title', AdminController.postUpdateGame);

// router.get('/admin/create/book', AdminController.getViewCreateBook);
// router.post('/admin/create/book', AdminController.postCreateBlogPost);

// router.get('/admin/update/book/:title', AdminController.getViewUpdateBook);
// router.post('/admin/update/book/:title', AdminController.postUpdateBook);



// API CONTROLLER
// http://localhost:3000/api/v1/correios/shippingFeeAndDeadline/:zipcode
router.get('/api/v1/correios/shippingFeeAndDeadline/:zipcode', APIController.getCorreiosShippingFeeAndDeadline);

router.get('/api/v1/', APIController.getWelcome);


// CUSTOMERS CONTROLLER
router.get('/stripe/customers/create', isAdmin, StripeCustomersController.getViewCreate);
router.post('/stripe/customers/create', StripeCustomersController.postCreateCustomer);

router.get('/stripe/customers/retrieve', isAdmin, StripeCustomersController.getViewRetrieve);
router.post('/stripe/customers/retrieve', StripeCustomersController.postRetrieveCustomer);

router.get('/stripe/customers/update', isAdmin, StripeCustomersController.getViewUpdate);
router.post('/stripe/customers/update', StripeCustomersController.postUpdateCustomer);

router.get('/stripe/customers/delete', isAdmin, StripeCustomersController.getViewDelete);
router.post('/stripe/customers/delete', StripeCustomersController.postDeleteCustomer);

router.get('/stripe/customers/listAll', isAdmin, StripeCustomersController.getViewListAll);



// CARDS CONTROLLER
router.get('/stripe/cards/create', isAdmin, StripeCardsController.getViewCreate);
router.post('/stripe/cards/create', StripeCardsController.postCreateCreditCard);

router.get('/stripe/cards/retrieve', isAdmin, StripeCardsController.getViewRetrieve);
router.post('/stripe/cards/retrieve', StripeCardsController.postRetrieveCard);

router.get('/stripe/cards/update', isAdmin, StripeCardsController.getViewUpdate);
router.post('/stripe/cards/update', StripeCardsController.postUpdateCard);

router.get('/stripe/cards/delete', isAdmin, StripeCardsController.getViewDelete);
router.post('/stripe/cards/delete', StripeCardsController.postDeleteCard);

router.get('/stripe/cards/listAll', isAdmin, StripeCardsController.getViewListAll);
router.post('/stripe/cards/listAll', StripeCardsController.postListAll);



// CHARGES CONTROLLER
router.get('/stripe/charges/create', isAdmin, StripeChargesController.getViewCreate);
router.post('/stripe/charges/create', StripeChargesController.postCreateCharge);

router.get('/stripe/charges/retrieve', isAdmin, StripeChargesController.getViewRetrieve);
router.post('/stripe/charges/retrieve', StripeChargesController.postRetrieveCharge);

router.get('/stripe/charges/listAll', isAdmin, StripeChargesController.getViewListAll);



// PRODUCTS CONTROLLER
router.get('/stripe/products/create', isAdmin, StripeProductsController.getViewCreate);
router.post('/stripe/products/create', StripeProductsController.postCreateProduct);

router.get('/stripe/products/retrieve', isAdmin, StripeProductsController.getViewRetrieve);
router.post('/stripe/products/retrieve', StripeProductsController.postRetrieveProduct);

router.get('/stripe/products/update', isAdmin, StripeProductsController.getViewUpdate);
router.post('/stripe/products/update', StripeProductsController.postUpdateProduct);

router.get('/stripe/products/delete', isAdmin, StripeProductsController.getViewDelete);
router.post('/stripe/products/delete', StripeProductsController.postDeleteProduct);

router.get('/stripe/products/listAll', isAdmin, StripeProductsController.getViewListAll);



// PRICES CONTROLLER
router.get('/stripe/prices/create', isAdmin, StripePricesController.getViewCreate);
router.post('/stripe/prices/create', StripePricesController.postCreatePrice);

router.get('/stripe/prices/retrieve', isAdmin, StripePricesController.getViewRetrieve);
router.post('/stripe/prices/retrieve', StripePricesController.postRetrievePrice);

router.get('/stripe/prices/listAll', isAdmin, StripePricesController.getViewListAll);



// PLANS CONTROLLER
router.get('/stripe/plans/create', isAdmin, StripePlansController.getViewCreate);
router.post('/stripe/plans/create', StripePlansController.postCreatePlan);

router.get('/stripe/plans/retrieve', isAdmin, StripePlansController.getViewRetrieve);
router.post('/stripe/plans/retrieve', StripePlansController.postRetrievePlan);

router.get('/stripe/plans/delete', isAdmin, StripePlansController.getViewDelete);
router.post('/stripe/plans/delete', StripePlansController.postDeletePlan);

router.get('/stripe/plans/listAll', isAdmin, StripePlansController.getViewListAll);



// SUBSCRIPTIONS CONTROLLER
router.get('/stripe/subscriptions/create', isAdmin, StripeSubscriptionsController.getViewCreate);
router.post('/stripe/subscriptions/create', StripeSubscriptionsController.postCreateSubscription);

router.get('/stripe/subscriptions/retrieve', isAdmin, StripeSubscriptionsController.getViewRetrieve);
router.post('/stripe/subscriptions/retrieve', StripeSubscriptionsController.postRetrieveSubscription);

router.get('/stripe/subscriptions/cancel', isAdmin, StripeSubscriptionsController.getViewCancel);
router.post('/stripe/subscriptions/cancel', StripeSubscriptionsController.postCancelSubscription);

router.get('/stripe/subscriptions/listAll', isAdmin, StripeSubscriptionsController.getViewListAll);


module.exports = router;