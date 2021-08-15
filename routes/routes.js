const Logger = require('../config/winston');

// ADMIN VIEW STRIPE CONTROLLERS
const StripeCustomersController = require('../controllers/Stripe/StripeCustomersController');
const StripeCardsController = require('../controllers/Stripe/StripeCardsController');
const StripeChargesController = require('../controllers/Stripe/StripeChargesController');
const StripePlansController = require('../controllers/Stripe/StripePlansController');
const StripeSubscriptionsController = require('../controllers/Stripe/StripeSubscriptionsController');
const StripeProductsController = require('../controllers/Stripe/StripeProductsController');
const StripePricesController = require('../controllers/Stripe/StripePricesController');


// VIEWS CONTROLLERS
const AppController = require('../controllers/AppController');
const BlogController = require('../controllers/BlogController');
const ShopController = require('../controllers/ShopController');
const PlansController = require('../controllers/PlansController');
const AuthController = require('../controllers/AuthController');
const ProfileController = require('../controllers/ProfileController');
const AdminController = require('../controllers/AdminController');


// API CONTROLLERS
const APIController = require('../controllers/API/APIController');
const APIPublicController = require('../controllers/API/APIPublicController');
const APIAdminController = require('../controllers/API/APIAdminController');
const APIAdminBlogController = require('../controllers/API/APIAdminBlogController');
const APIAdminGameController = require('../controllers/API/APIAdminGameController');
const APIAdminBookController = require('../controllers/API/APIAdminBookController');
const APIAdminStripeController = require('../controllers/API/APIAdminStripeController');


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
router.post('/login', AuthController.postLogin);

router.get('/register', userIsAlreadyLoggedIn, AuthController.getViewRegister);
router.post('/register', AuthController.postRegister);

router.get('/forgetPassword', userIsAlreadyLoggedIn, AuthController.getViewForgetPassword);
router.post('/forgetPassword', AuthController.postForgetPassword);

router.get('/confirmEmail/:email/:token', AuthController.verifyIfConfirmEmailURLIsValid);

router.get('/resetPassword/:email/:token', userIsAlreadyLoggedIn, AuthController.getViewResetPassword);
router.post('/resetPassword', AuthController.postResetPassword);

router.get('/github/callback', AuthController.loginGitHub);
router.get('/facebook/callback', AuthController.loginFacebook);
router.get('/google/callback', AuthController.loginGoogle);



// PROFILE CONTROLLER
router.get('/profile', userIsNotLoggedIn, ProfileController.getViewProfile);
router.post('/profile', ProfileController.updateProfile);

router.post('/profile/avatar', ProfileController.updateProfileAvatar);

router.get('/logout', userIsNotLoggedIn, ProfileController.getLogout);






// ********************** ADMIN VIEW CONTROLLERS
router.get('/admin/create/blogPost', isAdmin, AdminController.getViewCreateBlogPost);
router.post('/admin/create/blogPost', isAdmin, AdminController.postCreateBlogPost);

router.get('/admin/update/blogPost/:blog_id', isAdmin, AdminController.getViewUpdateBlogPost);
router.post('/admin/update/blogPost/:blog_id', isAdmin, AdminController.postUpdateBlogPost);

router.post('/admin/delete/blogPost/:blog_id', isAdmin, AdminController.postDeleteBlogPost);

router.get('/admin/create/game', isAdmin, AdminController.getViewCreateGame);
router.post('/admin/create/game', isAdmin, AdminController.postCreateGame);

router.get('/admin/update/game/:game_id', isAdmin, AdminController.getViewUpdateGame);
router.post('/admin/update/game/:game_id', isAdmin, AdminController.postUpdateGame);

router.post('/admin/delete/game/:game_id', isAdmin, AdminController.postDeleteGame);

router.get('/admin/create/book', isAdmin, AdminController.getViewCreateBook);
router.post('/admin/create/book', isAdmin, AdminController.postCreateBook);

router.get('/admin/update/book/:book_id', isAdmin, AdminController.getViewUpdateBook);
router.post('/admin/update/book/:book_id', isAdmin, AdminController.postUpdateBook);

router.post('/admin/delete/book/:book_id', isAdmin, AdminController.postDeleteBook);







// *************************** API CONTROLLERS

// INTRODUCTION
router.get('/api', APIController.getWelcomeToAPI);
router.get('/api/public', APIController.getPublicEndpoints);
router.get('/api/admin', APIController.getAdminEndpoints);

// PUBLIC
router.get('/api/public/blog', APIPublicController.getPublicBlog);
router.get('/api/public/blog/:blog_id', APIPublicController.getPublicBlogPostByID);

router.get('/api/public/games', APIPublicController.getPublicGames);
router.get('/api/public/games/:game_id', APIPublicController.getPublicGameByID);

router.get('/api/public/books', APIPublicController.getPublicBooks);
router.get('/api/public/books/:book_id', APIPublicController.getPublicBookByID);

// ADMIN
router.post('/api/admin/login', APIAdminController.postAdminLogin);
router.post('/api/admin/test', APIAdminController.postAdminTest);

// ADMIN BLOG
// router.post('/api/admin/blog/create', APIAdminBlogController.postAdminBlogCreate);
// router.put('/api/admin/blog/update/:blog_id', APIAdminBlogController.putAdminBlogUpdate);
// router.delete('/api/admin/blog/delete/:blog_id', APIAdminBlogController.deleteAdminBlogDelete);

// ADMIN GAMES
// router.post('/api/admin/game/create', APIAdminGameController.postAdminGameCreate);
// router.put('/api/admin/game/update/:blog_id', APIAdminGameController.putAdminGameUpdate);
// router.delete('/api/admin/game/delete/:blog_id', APIAdminGameController.deleteAdminGameDelete);

// ADMIN BOOKS
// router.post('/api/admin/book/create', APIAdminBookController.postAdminBookCreate);
// router.put('/api/admin/book/update/:blog_id', APIController.putAdminBookUpdate);
// router.delete('/api/admin/book/delete/:blog_id', APIController.deleteAdminBookDelete);

// ADMIN STRIPE
router.get('/api/admin/stripe/customers/listAll/:limit', APIAdminStripeController.getAdminStripeCustomersListAll)








// *************************** STRIPE CONTROLLERS

// CUSTOMERS CONTROLLER
router.get('/stripe/customers/create', isAdmin, StripeCustomersController.getViewCreate);
router.post('/stripe/customers/create', isAdmin, StripeCustomersController.postCreateCustomer);

router.get('/stripe/customers/retrieve', isAdmin, StripeCustomersController.getViewRetrieve);
router.post('/stripe/customers/retrieve', isAdmin, StripeCustomersController.postRetrieveCustomer);

router.get('/stripe/customers/update', isAdmin, StripeCustomersController.getViewUpdate);
router.post('/stripe/customers/update', isAdmin, StripeCustomersController.postUpdateCustomer);

router.get('/stripe/customers/delete', isAdmin, StripeCustomersController.getViewDelete);
router.post('/stripe/customers/delete', isAdmin, StripeCustomersController.postDeleteCustomer);

router.get('/stripe/customers/listAll', isAdmin, StripeCustomersController.getViewListAll);





// CARDS CONTROLLER
router.get('/stripe/cards/create', isAdmin, StripeCardsController.getViewCreate);
router.post('/stripe/cards/create', isAdmin, StripeCardsController.postCreateCreditCard);

router.get('/stripe/cards/retrieve', isAdmin, StripeCardsController.getViewRetrieve);
router.post('/stripe/cards/retrieve', isAdmin, StripeCardsController.postRetrieveCard);

router.get('/stripe/cards/update', isAdmin, StripeCardsController.getViewUpdate);
router.post('/stripe/cards/update', isAdmin, StripeCardsController.postUpdateCard);

router.get('/stripe/cards/delete', isAdmin, StripeCardsController.getViewDelete);
router.post('/stripe/cards/delete', isAdmin, StripeCardsController.postDeleteCard);

router.get('/stripe/cards/listAll', isAdmin, StripeCardsController.getViewListAll);
router.post('/stripe/cards/listAll', isAdmin, StripeCardsController.postListAll);





// CHARGES CONTROLLER
router.get('/stripe/charges/create', isAdmin, StripeChargesController.getViewCreate);
router.post('/stripe/charges/create', isAdmin, StripeChargesController.postCreateCharge);

router.get('/stripe/charges/retrieve', isAdmin, StripeChargesController.getViewRetrieve);
router.post('/stripe/charges/retrieve', isAdmin, StripeChargesController.postRetrieveCharge);

router.get('/stripe/charges/listAll', isAdmin, StripeChargesController.getViewListAll);



// PRODUCTS CONTROLLER
router.get('/stripe/products/create', isAdmin, StripeProductsController.getViewCreate);
router.post('/stripe/products/create', isAdmin, StripeProductsController.postCreateProduct);

router.get('/stripe/products/retrieve', isAdmin, StripeProductsController.getViewRetrieve);
router.post('/stripe/products/retrieve', isAdmin, StripeProductsController.postRetrieveProduct);

router.get('/stripe/products/update', isAdmin, StripeProductsController.getViewUpdate);
router.post('/stripe/products/update', isAdmin, StripeProductsController.postUpdateProduct);

router.get('/stripe/products/delete', isAdmin, StripeProductsController.getViewDelete);
router.post('/stripe/products/delete', isAdmin, StripeProductsController.postDeleteProduct);

router.get('/stripe/products/listAll', isAdmin, StripeProductsController.getViewListAll);



// PRICES CONTROLLER
router.get('/stripe/prices/create', isAdmin, StripePricesController.getViewCreate);
router.post('/stripe/prices/create', isAdmin, StripePricesController.postCreatePrice);

router.get('/stripe/prices/retrieve', isAdmin, StripePricesController.getViewRetrieve);
router.post('/stripe/prices/retrieve', isAdmin, StripePricesController.postRetrievePrice);

router.get('/stripe/prices/listAll', isAdmin, StripePricesController.getViewListAll);



// PLANS CONTROLLER
router.get('/stripe/plans/create', isAdmin, StripePlansController.getViewCreate);
router.post('/stripe/plans/create', isAdmin, StripePlansController.postCreatePlan);

router.get('/stripe/plans/retrieve', isAdmin, StripePlansController.getViewRetrieve);
router.post('/stripe/plans/retrieve', isAdmin, StripePlansController.postRetrievePlan);

router.get('/stripe/plans/delete', isAdmin, StripePlansController.getViewDelete);
router.post('/stripe/plans/delete', isAdmin, StripePlansController.postDeletePlan);

router.get('/stripe/plans/listAll', isAdmin, StripePlansController.getViewListAll);



// SUBSCRIPTIONS CONTROLLER
router.get('/stripe/subscriptions/create', isAdmin, StripeSubscriptionsController.getViewCreate);
router.post('/stripe/subscriptions/create', isAdmin, StripeSubscriptionsController.postCreateSubscription);

router.get('/stripe/subscriptions/retrieve', isAdmin, StripeSubscriptionsController.getViewRetrieve);
router.post('/stripe/subscriptions/retrieve', isAdmin, StripeSubscriptionsController.postRetrieveSubscription);

router.get('/stripe/subscriptions/cancel', isAdmin, StripeSubscriptionsController.getViewCancel);
router.post('/stripe/subscriptions/cancel', isAdmin, StripeSubscriptionsController.postCancelSubscription);

router.get('/stripe/subscriptions/listAll', isAdmin, StripeSubscriptionsController.getViewListAll);


module.exports = router;