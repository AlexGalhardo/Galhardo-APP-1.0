import getGames from './public/get-Games.js'
import getGameByID from './public/get-GameByID.js'

import getBooks from './public/get-Books.js'
import getBookByID from './public/get-BookByID.js'

import getBlogPosts from './public/get-BlogPosts.js'
import getBlogPostByID from './public/get-BlogPostByID.js'

import profileLogin from './profile/post-ProfileLogin.js'
import patchProfile from './profile/patch-Profile.js'
import deleteProfile from './profile/delete-Profile.js'

import postAdminLogin from './admin/post-AdminLogin.js'
import postAdminTest from './admin/post-AdminTest.js'

export default {
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
