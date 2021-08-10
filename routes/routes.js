// STRIPE CONTROLLERS
const CustomersController = require('../controllers/CustomersController');
const CardsController = require('../controllers/CardsController');
const ChargesController = require('../controllers/ChargesController');
const PlansController = require('../controllers/PlansController');
const SubscriptionsController = require('../controllers/SubscriptionsController');
const ProductsController = require('../controllers/ProductsController');
const PricesController = require('../controllers/PricesController');

// CONTROLLERS
const AppController = require('../controllers/AppController');
const APIController = require('../controllers/APIController');
const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');
const AdminController = require('../controllers/AdminController');

const Logger = require('../config/winston');

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

router.get('/shop', AppController.getViewShop);
router.post('/shop', AppController.postShopPayLog);

router.get('/contact', AppController.getViewContact);
router.post('/contact', AppController.postContact);

router.get('/privacy', AppController.getViewPrivacy);

router.get('/blog', AppController.getViewBlog);
router.get('/blog/search', AppController.getSearchBlogTitle);
router.get('/blog/page/:page', AppController.getViewBlog);

router.get('/blog/:slug', AppController.getViewBlogPost);
router.post('/blog/:slug', AppController.postBlogComment);


router.get('/plans', AppController.getViewPlans);
router.get('/plans/premium/checkout', AppController.getViewPlanCheckout);
router.post('/plan/premium/checkout', AppController.postPlanPayLog);


router.get('/stripe', AppController.getViewStripe);



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
router.get('/stripe/customers/create', isAdmin, CustomersController.getViewCreate);
router.post('/stripe/customers/create', CustomersController.postCreateCustomer);

router.get('/stripe/customers/retrieve', CustomersController.getViewRetrieve);
router.post('/stripe/customers/retrieve', CustomersController.postRetrieveCustomer);

router.get('/stripe/customers/update', isAdmin, CustomersController.getViewUpdate);
router.post('/stripe/customers/update', CustomersController.postUpdateCustomer);

router.get('/stripe/customers/delete', isAdmin, CustomersController.getViewDelete);
router.post('/stripe/customers/delete', CustomersController.postDeleteCustomer);

router.get('/stripe/customers/listAll', CustomersController.getViewListAll);



// CARDS CONTROLLER
router.get('/stripe/cards/create', isAdmin, CardsController.getViewCreate);
router.post('/stripe/cards/create', CardsController.postCreateCreditCard);

router.get('/stripe/cards/retrieve', CardsController.getViewRetrieve);
router.post('/stripe/cards/retrieve', CardsController.postRetrieveCard);

router.get('/stripe/cards/update', isAdmin, CardsController.getViewUpdate);
router.post('/stripe/cards/update', CardsController.postUpdateCard);

router.get('/stripe/cards/delete', isAdmin, CardsController.getViewDelete);
router.post('/stripe/cards/delete', CardsController.postDeleteCard);

router.get('/stripe/cards/listAll', CardsController.getViewListAll);
router.post('/stripe/cards/listAll', CardsController.postListAll);



// CHARGES CONTROLLER
router.get('/stripe/charges/create', isAdmin, ChargesController.getViewCreate);
router.post('/stripe/charges/create', ChargesController.postCreateCharge);

router.get('/stripe/charges/retrieve', ChargesController.getViewRetrieve);
router.post('/stripe/charges/retrieve', ChargesController.postRetrieveCharge);

router.get('/stripe/charges/listAll', ChargesController.getViewListAll);



// PRODUCTS CONTROLLER
router.get('/stripe/products/create', isAdmin, ProductsController.getViewCreate);
router.post('/stripe/products/create', ProductsController.postCreateProduct);

router.get('/stripe/products/retrieve', ProductsController.getViewRetrieve);
router.post('/stripe/products/retrieve', ProductsController.postRetrieveProduct);

router.get('/stripe/products/update', isAdmin, ProductsController.getViewUpdate);
router.post('/stripe/products/update', ProductsController.postUpdateProduct);

router.get('/stripe/products/delete', isAdmin, ProductsController.getViewDelete);
router.post('/stripe/products/delete', ProductsController.postDeleteProduct);

router.get('/stripe/products/listAll', ProductsController.getViewListAll);



// PRICES CONTROLLER
router.get('/stripe/prices/create', isAdmin, PricesController.getViewCreate);
router.post('/stripe/prices/create', PricesController.postCreatePrice);

router.get('/stripe/prices/retrieve', PricesController.getViewRetrieve);
router.post('/stripe/prices/retrieve', PricesController.postRetrievePrice);

router.get('/stripe/prices/listAll', PricesController.getViewListAll);



// PLANS CONTROLLER
router.get('/stripe/plans/create', isAdmin, PlansController.getViewCreate);
router.post('/stripe/plans/create', PlansController.postCreatePlan);

router.get('/stripe/plans/retrieve', PlansController.getViewRetrieve);
router.post('/stripe/plans/retrieve', PlansController.postRetrievePlan);

router.get('/stripe/plans/delete', isAdmin, PlansController.getViewDelete);
router.post('/stripe/plans/delete', PlansController.postDeletePlan);

router.get('/stripe/plans/listAll', PlansController.getViewListAll);



// SUBSCRIPTIONS CONTROLLER
router.get('/stripe/subscriptions/create', isAdmin, SubscriptionsController.getViewCreate);
router.post('/stripe/subscriptions/create', SubscriptionsController.postCreateSubscription);

router.get('/stripe/subscriptions/retrieve', SubscriptionsController.getViewRetrieve);
router.post('/stripe/subscriptions/retrieve', SubscriptionsController.postRetrieveSubscription);

router.get('/stripe/subscriptions/cancel', isAdmin, SubscriptionsController.getViewCancel);
router.post('/stripe/subscriptions/cancel', SubscriptionsController.postCancelSubscription);

router.get('/stripe/subscriptions/listAll', SubscriptionsController.getViewListAll);


module.exports = router;