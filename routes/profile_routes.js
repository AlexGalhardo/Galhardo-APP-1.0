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
const multer = require('multer')


// CONTROLLER
const ProfileController = require('../controllers/ProfileController');


// ------- MIDDLEWARES
const userIsNotLoggedIn = (req, res, next) => {
    if(!req.session.userID) return res.redirect('/login');
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
    .get('/', userIsNotLoggedIn, ProfileController.getViewProfile)
    .post('/', userIsNotLoggedIn, ProfileController.updateProfile)

    .post('/avatar', userIsNotLoggedIn, upload.single('avatar'), ProfileController.updateProfileAvatar)

    .get('/shop/transactions', userIsNotLoggedIn, ProfileController.getViewShopTransactions)
    .get('/shop/transaction/:shop_transaction_id', userIsNotLoggedIn, ProfileController.getViewShopTransactionByID)

    .get('/subscriptions/transactions', userIsNotLoggedIn, ProfileController.getViewSubscriptionsTransactions)
    .get('/shop/subscription/:subs_transaction_id', userIsNotLoggedIn, ProfileController.getViewSubscriptionTransactionByID)

    .get('/logout', userIsNotLoggedIn, ProfileController.getLogout)


module.exports = router;
