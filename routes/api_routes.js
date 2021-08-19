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
router.get('/', APIController.getWelcomeToAPI);
router.get('/public', APIController.getPublicEndpoints);
router.get('/admin', APIController.getAdminEndpoints);

//  ---------------- PUBLIC
router.get('/public/blog', APIPublicController.getPublicBlog);
router.get('/public/blog/random', APIPublicController.getPublicBlogPostRandom);
router.get('/public/blog/:blog_id', APIPublicController.getPublicBlogPostByID);

router.get('/public/games', APIPublicController.getPublicGames);
router.get('/public/games/random', APIPublicController.getPublicGameRandom);
router.get('/public/games/:game_id', APIPublicController.getPublicGameByID);


router.get('/public/books', APIPublicController.getPublicBooks);
router.get('/public/books/random', APIPublicController.getPublicBookRandom);
router.get('/public/books/:book_id', APIPublicController.getPublicBookByID);



//  ---------------- PROFILE
router.post('/profile/login', APIProfileController.postProfileLogin);
router.patch('/profile/patch', APIProfileController.updateProfile);
router.delete('/profile/delete', APIProfileController.deleteProfile);




//  ---------------- ADMIN
router.post('/admin/login', APIAdminController.postAdminLogin);
router.post('/admin/test', APIAdminController.postAdminTestJWT);

// ADMIN BLOG
router.post('/admin/blog/create', verifyAPIAdminJWTToken, APIAdminBlogController.postCreateBlogPost);
router.patch('/admin/blog/patch/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.patchBlogPost);
router.delete('/admin/blog/delete/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.deleteBlogPost);

//  ---------------- ADMIN GAMES
router.post('/admin/games/create', verifyAPIAdminJWTToken, APIAdminGameController.postCreateGame);
router.patch('/admin/games/patch/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.patchGame);
router.delete('/admin/games/delete/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.deleteGame);

//  ---------------- ADMIN BOOKS
router.get('/admin/books/listAll', APIAdminBookController.getAllBooks);
router.post('/admin/books/create', verifyAPIAdminJWTToken, APIAdminBookController.postCreateBook);
router.patch('/admin/books/patch/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.patchBook);
router.delete('/admin/books/delete/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.deleteBook);




//  ---------------- ADMIN STRIPE

// CUSTOMERS
router.get('/admin/stripe/customers/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getCustomersListAll)

router.get('/admin/stripe/customers/retrieve/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCustomer)

router.post('/admin/stripe/customers/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCustomer)

router.patch('/admin/stripe/customers/update/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCustomer)

router.delete('/admin/stripe/customers/delete/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCustomer)




// CARDS
router.get('/admin/stripe/cards/listAll', verifyAPIAdminJWTToken, APIAdminStripeController.getCardsListAll)

router.get('/admin/stripe/cards/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCard)

router.post('/admin/stripe/cards/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCard)

router.patch('/admin/stripe/cards/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCard)

router.delete('/admin/stripe/cards/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCard)




// CHARGES
router.get('/admin/stripe/charges/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getChargesListAll)

router.get('/admin/stripe/charges/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCharge)

router.post('/admin/stripe/charges/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateCharge)




// PRODUCTS
router.get('/admin/stripe/products/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getProductsListAll)

router.get('/admin/stripe/products/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveProduct)

router.post('/admin/stripe/products/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeProduct)

router.patch('/admin/stripe/products/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeProduct)

router.delete('/admin/stripe/products/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeProduct)



// PRICES
router.get('/admin/stripe/prices/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPricesListAll)

router.get('/admin/stripe/prices/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePrice)

router.post('/admin/stripe/prices/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePrice)





// PLANS
router.get('/admin/stripe/plans/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPlansListAll)

router.get('/admin/stripe/plans/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePlan)

router.post('/admin/stripe/plans/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePlan)

router.delete('/admin/stripe/plans/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deletePlan)




// SUBSCRIPTIONS
router.get('/admin/stripe/subscriptions/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getSubscriptionsListAll)

router.get('/admin/stripe/subscriptions/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveSubscription)

router.post('/admin/stripe/subscriptions/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateSubscription)

router.post('/admin/stripe/subscriptions/cancel', verifyAPIAdminJWTToken, APIAdminStripeController.postCancelSubscription)


module.exports = router;