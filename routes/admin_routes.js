/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ADMIN ROUTES
 * http://localhost:3000/admin
 */


// INIT EXPRESS 
const express = require('express');
const router = express.Router();



// ADMIN CONTROLLER
const AdminController = require('../controllers/ADMIN/AdminController');



// ADMIN VIEWS STRIPE CONTROLLERS
const StripeCustomersController = require('../controllers/ADMIN/StripeCustomersController');
const StripeCardsController = require('../controllers/ADMIN/StripeCardsController');
const StripeChargesController = require('../controllers/ADMIN/StripeChargesController');
const StripePlansController = require('../controllers/ADMIN/StripePlansController');
const StripeSubscriptionsController = require('../controllers/ADMIN/StripeSubscriptionsController');
const StripeProductsController = require('../controllers/ADMIN/StripeProductsController');
const StripePricesController = require('../controllers/ADMIN/StripePricesController');




// ---------------------- MIDDLEWARES 
const isAdmin = (req, res, next) => {
	if(SESSION_USER && !SESSION_USER.admin || !SESSION_USER){
		return res.redirect('/')
	}
	next()
}



router.get('/create/blogPost', isAdmin, AdminController.getViewCreateBlogPost);
router.post('/create/blogPost', isAdmin, AdminController.postCreateBlogPost);

router.get('/update/blogPost/:blog_id', isAdmin, AdminController.getViewUpdateBlogPost);
router.post('/update/blogPost/:blog_id', isAdmin, AdminController.postUpdateBlogPost);

router.post('/delete/blogPost/:blog_id', isAdmin, AdminController.postDeleteBlogPost);

router.get('/create/game', isAdmin, AdminController.getViewCreateGame);
router.post('/create/game', isAdmin, AdminController.postCreateGame);

router.get('/update/game/:game_id', isAdmin, AdminController.getViewUpdateGame);
router.post('/update/game/:game_id', isAdmin, AdminController.postUpdateGame);

router.post('/delete/game/:game_id', isAdmin, AdminController.postDeleteGame);

router.get('/create/book', isAdmin, AdminController.getViewCreateBook);
router.post('/create/book', isAdmin, AdminController.postCreateBook);

router.get('/update/book/:book_id', isAdmin, AdminController.getViewUpdateBook);
router.post('/update/book/:book_id', isAdmin, AdminController.postUpdateBook);

router.post('/delete/book/:book_id', isAdmin, AdminController.postDeleteBook);




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