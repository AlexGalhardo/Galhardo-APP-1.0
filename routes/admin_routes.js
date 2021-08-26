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
const router = require('express').Router()


// ADMIN CONTROLLER
const AdminController = require('../controllers/ADMIN/AdminController');



// ADMIN VIEWS STRIPE CONTROLLERS
const StripeCustomersController = require('../controllers/ADMIN/Stripe/StripeCustomersController');
const StripeCardsController = require('../controllers/ADMIN/Stripe/StripeCardsController');
const StripeChargesController = require('../controllers/ADMIN/Stripe/StripeChargesController');
const StripePlansController = require('../controllers/ADMIN/Stripe/StripePlansController');
const StripeSubscriptionsController = require('../controllers/ADMIN/Stripe/StripeSubscriptionsController');
const StripeProductsController = require('../controllers/ADMIN/Stripe/StripeProductsController');
const StripePricesController = require('../controllers/ADMIN/Stripe/StripePricesController');




// ---------------------- MIDDLEWARES 
const isAdmin = (req, res, next) => {
	if(SESSION_USER && !SESSION_USER.admin || !SESSION_USER) return res.redirect('/')
	next()
}


router
    .get('/create/blogPost', isAdmin, AdminController.getViewCreateBlogPost)
    .post('/create/blogPost', isAdmin, AdminController.postCreateBlogPost)

    .get('/update/blogPost/:blog_id', isAdmin, AdminController.getViewUpdateBlogPost)
    .post('/update/blogPost/:blog_id', isAdmin, AdminController.postUpdateBlogPost)

    .post('/delete/blogPost/:blog_id', isAdmin, AdminController.postDeleteBlogPost)

    .get('/create/game', isAdmin, AdminController.getViewCreateGame)
    .post('/create/game', isAdmin, AdminController.postCreateGame)

    .get('/update/game/:game_id', isAdmin, AdminController.getViewUpdateGame)
    .post('/update/game/:game_id', isAdmin, AdminController.postUpdateGame)

    .post('/delete/game/:game_id', isAdmin, AdminController.postDeleteGame)

    .get('/create/book', isAdmin, AdminController.getViewCreateBook)
    .post('/create/book', isAdmin, AdminController.postCreateBook)

    .get('/update/book/:book_id', isAdmin, AdminController.getViewUpdateBook)
    .post('/update/book/:book_id', isAdmin, AdminController.postUpdateBook)

    .post('/delete/book/:book_id', isAdmin, AdminController.postDeleteBook)




// *************************** STRIPE CONTROLLERS

// CUSTOMERS CONTROLLER
    .get('/stripe/customers/create', isAdmin, StripeCustomersController.getViewCreate)
    .post('/stripe/customers/create', isAdmin, StripeCustomersController.postCreateCustomer)

    .get('/stripe/customers/retrieve', isAdmin, StripeCustomersController.getViewRetrieve)
    .post('/stripe/customers/retrieve', isAdmin, StripeCustomersController.postRetrieveCustomer)

    .get('/stripe/customers/update', isAdmin, StripeCustomersController.getViewUpdate)
    .post('/stripe/customers/update', isAdmin, StripeCustomersController.postUpdateCustomer)

    .get('/stripe/customers/delete', isAdmin, StripeCustomersController.getViewDelete)
    .post('/stripe/customers/delete', isAdmin, StripeCustomersController.postDeleteCustomer)

    .get('/stripe/customers/listAll', isAdmin, StripeCustomersController.getViewListAll)





// CARDS CONTROLLER
    .get('/stripe/cards/create', isAdmin, StripeCardsController.getViewCreate)
    .post('/stripe/cards/create', isAdmin, StripeCardsController.postCreateCreditCard)

    .get('/stripe/cards/retrieve', isAdmin, StripeCardsController.getViewRetrieve)
    .post('/stripe/cards/retrieve', isAdmin, StripeCardsController.postRetrieveCard)

    .get('/stripe/cards/update', isAdmin, StripeCardsController.getViewUpdate)
    .post('/stripe/cards/update', isAdmin, StripeCardsController.postUpdateCard)

    .get('/stripe/cards/delete', isAdmin, StripeCardsController.getViewDelete)
    .post('/stripe/cards/delete', isAdmin, StripeCardsController.postDeleteCard)

    .get('/stripe/cards/listAll', isAdmin, StripeCardsController.getViewListAll)
    .post('/stripe/cards/listAll', isAdmin, StripeCardsController.postListAll)





// CHARGES CONTROLLER
    .get('/stripe/charges/create', isAdmin, StripeChargesController.getViewCreate)
    .post('/stripe/charges/create', isAdmin, StripeChargesController.postCreateCharge)

    .get('/stripe/charges/retrieve', isAdmin, StripeChargesController.getViewRetrieve)
    .post('/stripe/charges/retrieve', isAdmin, StripeChargesController.postRetrieveCharge)

    .get('/stripe/charges/listAll', isAdmin, StripeChargesController.getViewListAll)



// PRODUCTS CONTROLLER
    .get('/stripe/products/create', isAdmin, StripeProductsController.getViewCreate)
    .post('/stripe/products/create', isAdmin, StripeProductsController.postCreateProduct)

    .get('/stripe/products/retrieve', isAdmin, StripeProductsController.getViewRetrieve)
    .post('/stripe/products/retrieve', isAdmin, StripeProductsController.postRetrieveProduct)

    .get('/stripe/products/update', isAdmin, StripeProductsController.getViewUpdate)
    .post('/stripe/products/update', isAdmin, StripeProductsController.postUpdateProduct)

    .get('/stripe/products/delete', isAdmin, StripeProductsController.getViewDelete)
    .post('/stripe/products/delete', isAdmin, StripeProductsController.postDeleteProduct)

    .get('/stripe/products/listAll', isAdmin, StripeProductsController.getViewListAll)



// PRICES CONTROLLER
    .get('/stripe/prices/create', isAdmin, StripePricesController.getViewCreate)
    .post('/stripe/prices/create', isAdmin, StripePricesController.postCreatePrice)

    .get('/stripe/prices/retrieve', isAdmin, StripePricesController.getViewRetrieve)
    .post('/stripe/prices/retrieve', isAdmin, StripePricesController.postRetrievePrice)

    .get('/stripe/prices/listAll', isAdmin, StripePricesController.getViewListAll)



// PLANS CONTROLLER
    .get('/stripe/plans/create', isAdmin, StripePlansController.getViewCreate)
    .post('/stripe/plans/create', isAdmin, StripePlansController.postCreatePlan)

    .get('/stripe/plans/retrieve', isAdmin, StripePlansController.getViewRetrieve)
    .post('/stripe/plans/retrieve', isAdmin, StripePlansController.postRetrievePlan)

    .get('/stripe/plans/delete', isAdmin, StripePlansController.getViewDelete)
    .post('/stripe/plans/delete', isAdmin, StripePlansController.postDeletePlan)

    .get('/stripe/plans/listAll', isAdmin, StripePlansController.getViewListAll)



// SUBSCRIPTIONS CONTROLLER
    .get('/stripe/subscriptions/create', isAdmin, StripeSubscriptionsController.getViewCreate)
    .post('/stripe/subscriptions/create', isAdmin, StripeSubscriptionsController.postCreateSubscription)

    .get('/stripe/subscriptions/retrieve', isAdmin, StripeSubscriptionsController.getViewRetrieve)
    .post('/stripe/subscriptions/retrieve', isAdmin, StripeSubscriptionsController.postRetrieveSubscription)

    .get('/stripe/subscriptions/cancel', isAdmin, StripeSubscriptionsController.getViewCancel)
    .post('/stripe/subscriptions/cancel', isAdmin, StripeSubscriptionsController.postCancelSubscription)

    .get('/stripe/subscriptions/listAll', isAdmin, StripeSubscriptionsController.getViewListAll)



module.exports = router;