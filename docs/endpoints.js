const getGames = require('./public/get-Games')
const getGameByID = require('./public/get-GameByID')

const getBooks = require('./public/get-Books')
const getBookByID = require('./public/get-BookByID')

const getBlogPosts = require('./public/get-BlogPosts')
const getBlogPostByID = require('./public/get-BlogPostByID')

const profileLogin = require('./profile/post-ProfileLogin')
const patchProfile = require('./profile/patch-Profile')
const deleteProfile = require('./profile/delete-Profile')

const postAdminLogin = require('./admin/post-AdminLogin')
const postAdminTest = require('./admin/post-AdminTest')

module.exports = {
    paths:{
        '/api/public/games': {
            ...getGames
        },
        '/api/public/games/{game_id}': {
            ...getGameByID
        },
        '/api/public/books': {
            ...getBooks
        },
        '/api/public/books/{book_id}': {
            ...getBookByID
        },
        '/api/public/blog': {
            ...getBlogPosts
        },
        '/api/public/blog/{blog_id}': {
            ...getBlogPostByID
        },
        '/api/profile/login': {
            ...profileLogin
        },
        '/api/profile/patch': {
            ...patchProfile
        },
        '/api/profile/delete': {
            ...deleteProfile
        },
        '/api/admin/login': {
            ...postAdminLogin
        },
        '/api/admin/test': {
            ...postAdminTest
        },
        /*'/todos':{
            ...getTodos,
            ...createTodo
        },
        '/todos/{id}':{
            ...getTodo,
            ...updateTodo,
            ...deleteTodo
        }*/
    }
}
