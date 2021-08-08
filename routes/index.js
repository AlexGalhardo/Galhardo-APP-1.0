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


router.get('/plans', AppController.getViewPlans);
router.get('/plans/premium/checkout', AppController.getViewPlanCheckout);
router.post('/plan/premium/checkout', AppController.postPlanPayLog);


router.get('/stripe', AppController.getViewStripe);



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
router.post('/profile', ProfileController.updateProfile);

router.post('/profile/avatar', ProfileController.updateProfileAvatar);

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
router.get('/stripe/customers/create', CustomersController.getViewCreate);
router.post('/stripe/customers/create', CustomersController.postCreateCustomer);

router.get('/stripe/customers/retrieve', CustomersController.getViewRetrieve);
router.post('/stripe/customers/retrieve', CustomersController.postRetrieveCustomer);

router.get('/stripe/customers/update', CustomersController.getViewUpdate);
router.post('/stripe/customers/update', CustomersController.postUpdateCustomer);

router.get('/stripe/customers/delete', CustomersController.getViewDelete);
router.post('/stripe/customers/delete', CustomersController.postDeleteCustomer);

router.get('/stripe/customers/listAll', CustomersController.getViewListAll);



// CARDS CONTROLLER
router.get('/stripe/cards/create', CardsController.getViewCreate);
router.post('/stripe/cards/create', CardsController.postCreateCreditCard);

router.get('/stripe/cards/retrieve', CardsController.getViewRetrieve);
router.post('/stripe/cards/retrieve', CardsController.postRetrieveCard);

router.get('/stripe/cards/update', CardsController.getViewUpdate);
router.post('/stripe/cards/update', CardsController.postUpdateCard);

router.get('/stripe/cards/delete', CardsController.getViewDelete);
router.post('/stripe/cards/delete', CardsController.postDeleteCard);

router.get('/stripe/cards/listAll', CardsController.getViewListAll);
router.post('/stripe/cards/listAll', CardsController.postListAll);



// CHARGES CONTROLLER
router.get('/stripe/charges/create', ChargesController.getViewCreate);
router.post('/stripe/charges/create', ChargesController.postCreateCharge);

router.get('/stripe/charges/retrieve', ChargesController.getViewRetrieve);
router.post('/stripe/charges/retrieve', ChargesController.postRetrieveCharge);

router.get('/stripe/charges/listAll', ChargesController.getViewListAll);



// PRODUCTS CONTROLLER
router.get('/stripe/products/create', ProductsController.getViewCreate);
router.post('/stripe/products/create', ProductsController.postCreateProduct);

router.get('/stripe/products/retrieve', ProductsController.getViewRetrieve);
router.post('/stripe/products/retrieve', ProductsController.postRetrieveProduct);

router.get('/stripe/products/update', ProductsController.getViewUpdate);
router.post('/stripe/products/update', ProductsController.postUpdateProduct);

router.get('/stripe/products/delete', ProductsController.getViewDelete);
router.post('/stripe/products/delete', ProductsController.postDeleteProduct);

router.get('/stripe/products/listAll', ProductsController.getViewListAll);



// PRICES CONTROLLER
router.get('/stripe/prices/create', PricesController.getViewCreate);
router.post('/stripe/prices/create', PricesController.postCreatePrice);

router.get('/stripe/prices/retrieve', PricesController.getViewRetrieve);
router.post('/stripe/prices/retrieve', PricesController.postRetrievePrice);

router.get('/stripe/prices/listAll', PricesController.getViewListAll);



// PLANS CONTROLLER
router.get('/stripe/plans/create', PlansController.getViewCreate);
router.post('/stripe/plans/create', PlansController.postCreatePlan);

router.get('/stripe/plans/retrieve', PlansController.getViewRetrieve);
router.post('/stripe/plans/retrieve', PlansController.postRetrievePlan);

router.get('/stripe/plans/delete', PlansController.getViewDelete);
router.post('/stripe/plans/delete', PlansController.postDeletePlan);

router.get('/stripe/plans/listAll', PlansController.getViewListAll);



// SUBSCRIPTIONS CONTROLLER
router.get('/stripe/subscriptions/create', SubscriptionsController.getViewCreate);
router.post('/stripe/subscriptions/create', SubscriptionsController.postCreateSubscription);

router.get('/stripe/subscriptions/retrieve', SubscriptionsController.getViewRetrieve);
router.post('/stripe/subscriptions/retrieve', SubscriptionsController.postRetrieveSubscription);

router.get('/stripe/subscriptions/cancel', SubscriptionsController.getViewCancel);
router.post('/stripe/subscriptions/cancel', SubscriptionsController.postCancelSubscription);

router.get('/stripe/subscriptions/listAll', SubscriptionsController.getViewListAll);


module.exports = router;