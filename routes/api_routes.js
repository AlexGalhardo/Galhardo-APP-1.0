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
const jwt = require('jsonwebtoken')


// INIT EXPRESS 
const router = require('express').Router()


// MODELS
const Users = require('../models/JSON/Users')



// API CONTROLLERS
const APIController = require('../controllers/API/APIController')

const APIProfileController = require('../controllers/API/APIProfileController')

const APIPublicController = require('../controllers/API/APIPublicController')

const APIAdminController = require('../controllers/API/APIAdminController')

const APIAdminBlogController = require('../controllers/API/APIAdminBlogController')
const APIAdminGameController = require('../controllers/API/APIAdminGameController')
const APIAdminBookController = require('../controllers/API/APIAdminBookController')

const APIAdminStripeController = require('../controllers/API/APIAdminStripeController')



// ---------------------- MIDDLEWARES 
const verifyAPIAdminJWTToken = (req, res, next) => {
    if(
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer') ||
      !req.headers.authorization.split(' ')[1]
    ){
      return res.status(422).json({
          message: "Please provide the ADMIN JWT Token in Header Authorization Bearer Token",
      })
    }

    const JWT_TOKEN = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET)

    if(!Users.verifyIfAdminByID(decoded.admin_id)){
      return res.status(422).json({
        message: "This JWT Token is Inválid!",
      })
    }
    return next()
}


// API ROUTES

//  ---------------- INTRODUCTION
router
    .get('/', APIController.getWelcomeToAPI)
    .get('/public', APIController.getPublicEndpoints)
    .get('/admin', APIController.getAdminEndpoints)

//  ---------------- PUBLIC
    .get('/public/blog', APIPublicController.getPublicBlog)
    .get('/public/blog/random', APIPublicController.getPublicBlogPostRandom)
    .get('/public/blog/:blog_id', APIPublicController.getPublicBlogPostByID)
    .get('/public/email/:email', APIPublicController.getPublicEmailRegistred)

    .get('/public/games', APIPublicController.getPublicGames)
    .get('/public/games/random', APIPublicController.getPublicRandomGame)
    .get('/public/games/:game_id', APIPublicController.getPublicGameByID)


    .get('/public/books', APIPublicController.getPublicBooks)
    .get('/public/books/random', APIPublicController.getPublicRandomBook)
    .get('/public/books/:book_id', APIPublicController.getPublicBookByID)



//  ---------------- PROFILE
    .post('/profile/login', APIProfileController.postProfileLogin)
    .patch('/profile/patch', APIProfileController.updateProfile)
    .delete('/profile/delete', APIProfileController.deleteProfile)




//  ---------------- ADMIN
    .post('/admin/login', APIAdminController.postAdminLogin)
    .post('/admin/test', APIAdminController.postAdminTestJWT)

// ----------------- ADMIN BLOG
    .post('/admin/blog/create', verifyAPIAdminJWTToken, APIAdminBlogController.postCreateBlogPost)
    .patch('/admin/blog/patch/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.patchBlogPost)
    .delete('/admin/blog/delete/:blog_id', verifyAPIAdminJWTToken, APIAdminBlogController.deleteBlogPost)

//  ---------------- ADMIN GAMES
    .post('/admin/games/create', verifyAPIAdminJWTToken, APIAdminGameController.postCreateGame)
    .patch('/admin/games/patch/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.patchGame)
    .delete('/admin/games/delete/:game_id', verifyAPIAdminJWTToken, APIAdminGameController.deleteGame)

//  ---------------- ADMIN BOOKS
    .get('/admin/books/listAll', APIAdminBookController.getAllBooks)
    .post('/admin/books/create', verifyAPIAdminJWTToken, APIAdminBookController.postCreateBook)
    .patch('/admin/books/patch/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.patchBook)
    .delete('/admin/books/delete/:book_id', verifyAPIAdminJWTToken, APIAdminBookController.deleteBook)




//  ---------------- ADMIN STRIPE

// CUSTOMERS
    .get('/admin/stripe/customers/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getCustomersListAll)

    .get('/admin/stripe/customers/retrieve/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCustomer)

    .post('/admin/stripe/customers/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCustomer)

    .patch('/admin/stripe/customers/update/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCustomer)

    .delete('/admin/stripe/customers/delete/:customer_id', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCustomer)




// CARDS
    .get('/admin/stripe/cards/listAll', verifyAPIAdminJWTToken, APIAdminStripeController.getCardsListAll)

    .get('/admin/stripe/cards/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCard)

    .post('/admin/stripe/cards/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeCard)

    .patch('/admin/stripe/cards/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeCard)

    .delete('/admin/stripe/cards/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeCard)




// CHARGES
    .get('/admin/stripe/charges/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getChargesListAll)

    .get('/admin/stripe/charges/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveCharge)

    .post('/admin/stripe/charges/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateCharge)




// PRODUCTS
    .get('/admin/stripe/products/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getProductsListAll)

    .get('/admin/stripe/products/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveProduct)

    .post('/admin/stripe/products/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateStripeProduct)

    .patch('/admin/stripe/products/update', verifyAPIAdminJWTToken, APIAdminStripeController.patchStripeProduct)

    .delete('/admin/stripe/products/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deleteStripeProduct)



// PRICES
    .get('/admin/stripe/prices/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPricesListAll)

    .get('/admin/stripe/prices/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePrice)

    .post('/admin/stripe/prices/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePrice)





// PLANS
    .get('/admin/stripe/plans/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getPlansListAll)

    .get('/admin/stripe/plans/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrievePlan)

    .post('/admin/stripe/plans/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreatePlan)

    .delete('/admin/stripe/plans/delete', verifyAPIAdminJWTToken, APIAdminStripeController.deletePlan)




// SUBSCRIPTIONS
    .get('/admin/stripe/subscriptions/listAll/:limit', verifyAPIAdminJWTToken, APIAdminStripeController.getSubscriptionsListAll)

    .get('/admin/stripe/subscriptions/retrieve', verifyAPIAdminJWTToken, APIAdminStripeController.getRetrieveSubscription)

    .post('/admin/stripe/subscriptions/create', verifyAPIAdminJWTToken, APIAdminStripeController.postCreateSubscription)

    .post('/admin/stripe/subscriptions/cancel', verifyAPIAdminJWTToken, APIAdminStripeController.postCancelSubscription)




module.exports = router;
