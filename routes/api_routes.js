/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * API ROUTES
 * http://localhost:3000/api
 */

// MODULES
const jwt = require('jsonwebtoken');

// INIT EXPRESS 
const express = require('express');
const router = express.Router();

// MODELS
const Users = require('../models/JSON/Users');


// API CONTROLLERS
const APIController = require('../controllers/API/APIController');

const APIProfileController = require('../controllers/API/APIProfileController');

const APIPublicController = require('../controllers/API/APIPublicController');

const APIAdminController = require('../controllers/API/APIAdminController');
const APIAdminBlogController = require('../controllers/API/APIAdminBlogController');
const APIAdminGameController = require('../controllers/API/APIAdminGameController');
const APIAdminBookController = require('../controllers/API/APIAdminBookController');
const APIAdminStripeController = require('../controllers/API/APIAdminStripeController');



// ---------------------- MIDDLEWARES 
const verifyAPIAdminJWTToken = (req, res, next) => {
    if(
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer') ||
      !req.headers.authorization.split(' ')[1]
    ){
      return res.status(422).json({
          message: "Please provide the ADMIN JWT Token in Header Authorization Bearer Token",
      });
    }

    const JWT_TOKEN = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);

    if(!Users.verifyIfAdminByID(decoded.admin_id)){
      return res.status(422).json({
        message: "This JWT Token is Inválid!",
      });
    }
    return next()
}


// API ROUTES

//  ---------------- INTRODUCTION
router.get('/api', APIController.getWelcomeToAPI);
router.get('/api/public', APIController.getPublicEndpoints);
router.get('/api/admin', APIController.getAdminEndpoints);

//  ---------------- PUBLIC
router.get('/api/public/blog', APIPublicController.getPublicBlog);
router.get('/api/public/blog/:blog_id', APIPublicController.getPublicBlogPostByID);

router.get('/api/public/games', APIPublicController.getPublicGames);
router.get('/api/public/games/:game_id', APIPublicController.getPublicGameByID);

router.get('/api/public/books', APIPublicController.getPublicBooks);
router.get('/api/public/books/:book_id', APIPublicController.getPublicBookByID);




//  ---------------- PROFILE
router.post('/api/profile/login', APIProfileController.postProfileLogin);
router.patch('/api/profile/patch', APIProfileController.updateProfile);
router.delete('/api/profile/delete', APIProfileController.deleteProfile);




//  ---------------- ADMIN
router.post('/api/admin/login', APIAdminController.postAdminLogin);
router.post('/api/admin/test', APIAdminController.postAdminTestJWT);

// ADMIN BLOG
router.post('/api/admin/blog/create', verifyAPIAdminJWTToken, APIAdminBlogController.postCreateBlogPost);
router.patch('/api/admin/blog/patch/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.patchBlogPost);
router.delete('/api/admin/blog/delete/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.deleteBlogPost);

//  ---------------- ADMIN GAMES
router.post('/api/admin/games/create', verifyAPIAdminJWTToken, APIAdminGameController.postCreateGame);
router.patch('/api/admin/games/patch/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.patchGame);
router.delete('/api/admin/games/delete/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.deleteGame);

//  ---------------- ADMIN BOOKS
router.get('/api/admin/books/listAll', APIAdminBookController.getBooks);
router.post('/api/admin/books/create', verifyAPIAdminJWTToken, APIAdminBookController.postCreateBook);
router.patch('/api/admin/books/patch/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.patchBook);
router.delete('/api/admin/books/delete/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.deleteBook);




//  ---------------- ADMIN STRIPE

// CUSTOMERS
router.get('/api/admin/stripe/customers/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getCustomersListAll)

router.get('/api/admin/stripe/customers/retrieve/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCustomer)

router.post('/api/admin/stripe/customers/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCustomer)

router.patch('/api/admin/stripe/customers/update/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCustomer)

router.delete('/api/admin/stripe/customers/delete/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCustomer)




// CARDS
router.get('/api/admin/stripe/cards/listAll', verifyAPIAdminJWTToken, APIAdminStripeController.getCardsListAll)

router.get('/api/admin/stripe/cards/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCard)

router.post('/api/admin/stripe/cards/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCard)

router.patch('/api/admin/stripe/cards/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCard)

router.delete('/api/admin/stripe/cards/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCard)




// CHARGES
router.get('/api/admin/stripe/charges/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getChargesListAll)

router.get('/api/admin/stripe/charges/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCharge)

router.post('/api/admin/stripe/charges/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateCharge)




// PRODUCTS
router.get('/api/admin/stripe/products/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getProductsListAll)

router.get('/api/admin/stripe/products/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveProduct)

router.post('/api/admin/stripe/products/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeProduct)

router.patch('/api/admin/stripe/products/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeProduct)

router.delete('/api/admin/stripe/products/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeProduct)



// PRICES
router.get('/api/admin/stripe/prices/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPricesListAll)

router.get('/api/admin/stripe/prices/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePrice)

router.post('/api/admin/stripe/prices/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePrice)





// PLANS
router.get('/api/admin/stripe/plans/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPlansListAll)

router.get('/api/admin/stripe/plans/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePlan)

router.post('/api/admin/stripe/plans/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePlan)

router.delete('/api/admin/stripe/plans/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deletePlan)




// SUBSCRIPTIONS
router.get('/api/admin/stripe/subscriptions/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getSubscriptionsListAll)

router.get('/api/admin/stripe/subscriptions/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveSubscription)

router.post('/api/admin/stripe/subscriptions/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateSubscription)

router.post('/api/admin/stripe/subscriptions/cancel', verifyAPIAdminJWTToken, APIAdminStripeController.postCancelSubscription)


module.exports = router;