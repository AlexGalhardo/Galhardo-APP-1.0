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

const express = require('express');
const router = express();


// APP CONTROLLER
router.get('/', AppController.getViewHome);

router.get('/contact', AppController.getViewContact);
router.post('/contact', AppController.postContact);

router.get('/privacy', AppController.getViewPrivacy);

router.get('/blog', AppController.getViewBlog);
router.get('/blog/:slug', AppController.getViewBlogPost);

router.get('/plan/checkout', AppController.getViewPlanCheckout);
router.post('/plan/payLog', AppController.postPlanPayLog);
router.post('/shop/payLog', AppController.postShopPayLog);



// AUTH CONTROLLER
router.get('/login', AuthController.getViewLogin);
router.post('/login', AuthController.postLogin);

router.get('/register', AuthController.getViewRegister);
router.post('/register', AuthController.postRegister);

router.get('/forgetPassword', AuthController.getViewForgetPassword);
router.post('/forgetPassword', AuthController.postForgetPassword);


router.get('/resetPassword/:email/:token', AuthController.getViewResetPassword);
router.post('/resetPassword', AuthController.postResetPassword);

// router.get('/github/callback', AuthController.loginGitHub);
// router.get('/facebook/callback', AuthController.loginFacebook);
// router.get('/google/callback', AuthController.loginGoogle);



// PROFILE CONTROLLER
router.get('/profile', ProfileController.getViewProfile);
router.get('/logout', ProfileController.getLogout);



// ADMIN Controller
router.get('/admin/create/blogPost', AdminController.getViewCreateBlogPost);
router.post('/admin/create/blogPost', AdminController.postCreateBlogPost);

router.get('/admin/update/blogPost/:slug', AdminController.getViewUpdateBlogPost);
router.post('/admin/update/blogPost/:slug', AdminController.postUpdateBlogPost);



// API CONTROLLER
// http://localhost:3000/api/v1/correios/shippingFeeAndDeadline/:zipcode
router.get('/api/v1/correios/shippingFeeAndDeadline/:zipcode', APIController.getCorreiosShippingFeeAndDeadline);

router.get('/api/v1/', APIController.getWelcome);


// CUSTOMERS CONTROLLER
router.get('/customers/create', CustomersController.getViewCreate);
router.post('/customers/create', CustomersController.postCreateCustomer);

router.get('/customers/retrieve', CustomersController.getViewRetrieve);
router.post('/customers/retrieve', CustomersController.postRetrieveCustomer);

router.get('/customers/update', CustomersController.getViewUpdate);
router.post('/customers/update', CustomersController.postUpdateCustomer);

router.get('/customers/delete', CustomersController.getViewDelete);
router.post('/customers/delete', CustomersController.postDeleteCustomer);

router.get('/customers/listAll', CustomersController.getViewListAll);



// CARDS CONTROLLER
router.get('/cards/create', CardsController.getViewCreate);
router.post('/cards/create', CardsController.postCreateCreditCard);

router.get('/cards/retrieve', CardsController.getViewRetrieve);
router.post('/cards/retrieve', CardsController.postRetrieveCard);

router.get('/cards/update', CardsController.getViewUpdate);
router.post('/cards/update', CardsController.postUpdateCard);

router.get('/cards/delete', CardsController.getViewDelete);
router.post('/cards/delete', CardsController.postDeleteCard);

router.get('/cards/listAll', CardsController.getViewListAll);
router.post('/cards/listAll', CardsController.postListAll);



// CHARGES CONTROLLER
router.get('/charges/create', ChargesController.getViewCreate);
router.post('/charges/create', ChargesController.postCreateCharge);

router.get('/charges/retrieve', ChargesController.getViewRetrieve);
router.post('/charges/retrieve', ChargesController.postRetrieveCharge);

router.get('/charges/listAll', ChargesController.getViewListAll);



// PRODUCTS CONTROLLER
router.get('/products/create', ProductsController.getViewCreate);
router.post('/products/create', ProductsController.postCreateProduct);

router.get('/products/retrieve', ProductsController.getViewRetrieve);
router.post('/products/retrieve', ProductsController.postRetrieveProduct);

router.get('/products/update', ProductsController.getViewUpdate);
router.post('/products/update', ProductsController.postUpdateProduct);

router.get('/products/delete', ProductsController.getViewDelete);
router.post('/products/delete', ProductsController.postDeleteProduct);

router.get('/products/listAll', ProductsController.getViewListAll);



// PRICES CONTROLLER
router.get('/prices/create', PricesController.getViewCreate);
router.post('/prices/create', PricesController.postCreatePrice);

router.get('/prices/retrieve', PricesController.getViewRetrieve);
router.post('/prices/retrieve', PricesController.postRetrievePrice);

router.get('/prices/listAll', PricesController.getViewListAll);



// PLANS CONTROLLER
router.get('/plans/create', PlansController.getViewCreate);
router.post('/plans/create', PlansController.postCreatePlan);

router.get('/plans/retrieve', PlansController.getViewRetrieve);
router.post('/plans/retrieve', PlansController.postRetrievePlan);

router.get('/plans/delete', PlansController.getViewDelete);
router.post('/plans/delete', PlansController.postDeletePlan);

router.get('/plans/listAll', PlansController.getViewListAll);



// SUBSCRIPTIONS CONTROLLER
router.get('/subscriptions/create', SubscriptionsController.getViewCreate);
router.post('/subscriptions/create', SubscriptionsController.postCreateSubscription);

router.get('/subscriptions/retrieve', SubscriptionsController.getViewRetrieve);
router.post('/subscriptions/retrieve', SubscriptionsController.postRetrieveSubscription);

router.get('/subscriptions/cancel', SubscriptionsController.getViewCancel);
router.post('/subscriptions/cancel', SubscriptionsController.postCancelSubscription);

router.get('/subscriptions/listAll', SubscriptionsController.getViewListAll);


module.exports = router;