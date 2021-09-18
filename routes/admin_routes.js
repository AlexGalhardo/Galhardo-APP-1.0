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




module.exports = router;
