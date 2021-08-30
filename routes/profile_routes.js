/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * PROFILE ROUTES
 * http://localhost:3000/profile
 */


// INIT EXPRESS
const router = require('express').Router()


// CONTROLLER
const ProfileController = require('../controllers/ProfileController');


// ------- MIDDLEWARES
const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) return res.redirect('/login');
    next()
}

router
// PROFILE CONTROLLER
    .get('/profile', userIsNotLoggedIn, ProfileController.getViewProfile)
    .post('/profile', userIsNotLoggedIn, ProfileController.updateProfile)

    .post('/profile/avatar', userIsNotLoggedIn, upload.single('avatar'), ProfileController.updateProfileAvatar)

    .get('/profile/shop/transactions', userIsNotLoggedIn, ProfileController.getViewShopTransactions)
    .get('/profile/shop/transaction/:shop_transaction_id', userIsNotLoggedIn, ProfileController.getViewShopTransactionByID)

    .get('/profile/subscriptions/transactions', userIsNotLoggedIn, ProfileController.getViewSubscriptionsTransactions)
    .get('/profile/shop/subscription/:subs_transaction_id', userIsNotLoggedIn, ProfileController.getViewSubscriptionTransactionByID)

    .get('/logout', userIsNotLoggedIn, ProfileController.getLogout)


module.exports = router;
