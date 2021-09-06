/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * PROFILE ROUTES
 * http://localhost:3000/profile
 */


const multer = require('multer')
const csrf = require('csurf')
const csrfProtection = csrf({ cookie: true })


// INIT ROUTER
const router = require('express').Router()


// CONTROLLER
const ProfileController = require('../controllers/ProfileController');


// ------- MIDDLEWARES
const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) {
        req.flash('warning', 'You need to login first')
        return res.redirect('/login');
    }
    next()
}


const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp');
    },
    filename: (req, file, cb) => {
        let randomName = Math.floor(Math.random()*99999)
        cb(null, `${randomName+Date.now()}.jpg`);
    }
});

const upload = multer({
    dest: './tmp',
    // storage: multer.memoryStorage(), // salvar na memória ram
    // storage: storageConfig // salvar em uma pasta temporária
    fileFilter: (req, file, cb) => {
        // cb(null, false); // não aceito nada
        // cb(null, true) // aceito qualquer tipo de arquvio

        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];

        cb(null, allowed.includes(file.mimetype))
    },
    limits: { fieldSize: 1000000 } // 1MB
});




router
    .get('/', userIsNotLoggedIn, csrfProtection, ProfileController.getViewProfile)

    .post('/', userIsNotLoggedIn, csrfProtection, ProfileController.updateProfile)

    .post('/avatar', userIsNotLoggedIn, upload.single('avatar'), ProfileController.updateProfileAvatar)

    .get('/shop/transactions', userIsNotLoggedIn, ProfileController.getViewMyShopTransactions)

    .get('/shop/transaction/:shop_transaction_id', userIsNotLoggedIn, ProfileController.getViewShopTransactionByID)

    .get('/subscriptions/transactions', userIsNotLoggedIn, ProfileController.getViewMySubscriptionsTransactions)

    .get('/subscription/transaction/:subs_transaction_id', userIsNotLoggedIn, ProfileController.getViewSubscriptionTransactionByID)

    .get('/logout', userIsNotLoggedIn, ProfileController.getLogout)

    .get('/delete/stripeCard/:stripe_card_id', userIsNotLoggedIn, ProfileController.deleteStripeCard)

    .get('/cancel/subscription/:stripe_currently_subscription_id', userIsNotLoggedIn, ProfileController.cancelStripeSubscriptionRenewAtPeriodEnd)


module.exports = router;
