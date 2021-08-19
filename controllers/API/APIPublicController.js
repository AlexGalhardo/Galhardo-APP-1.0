/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/public
 */

const bodyParser = require('body-parser')

// JSON DATABASE
const Blog = require('../../models/JSON/Blog')
const Games = require('../../models/JSON/Games')
const Books = require('../../models/JSON/Books')


// MYSQL DATABASE
// const Books = require('../../models/MySQL/Books')



class APIPublicController {


	static async getPublicBlog(req, res, next){
		try {
	        let blog = await Blog.getAllBlogPosts()
            return res.json({
                blog
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicBlogPostByID(req, res, next){
		try {
			const { blog_id } = req.params
	        let blog = await Blog.getBlogPostByID(blog_id)
            return res.json({
                blog
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicBlogPostRandom(req, res, next){
		try {
			const totalBlogPosts = await Blog.getTotalBlogPosts()
			const random_blogPost_id = await Math.floor(Math.random() * totalBlogPosts) + 1;
	        let blog = await Blog.getBlogPostByID(random_blogPost_id)
            return res.json({
                blog
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicGames(req, res, next) {
		try {
	        let games = await Games.getAllGames()
            return res.json({
                games
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicGameByID(req, res, next){
		try {
			const { game_id } = req.params
	        let game = await Games.getGameByID(game_id)
            return res.json({
                game
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicGameRandom(req, res, next){
		try {
			const totalGames = await Games.getTotalGames()
			const random_game_id = await Math.floor(Math.random() * totalGames) + 1;
	        let game = await Games.getGameByID(random_game_id)
            return res.json({
                game
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicBooks(req, res, next) {
		try {
	        let books = await Books.getAllBooks()
            return res.json({
                books
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicBookByID(req, res, next){
		try {
			const { book_id } = req.params
	        let book = await Books.getBookByID(book_id)
            return res.json({
                book
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}


	static async getPublicBookRandom(req, res, next){
		try {
			const totalBooks = await Books.getTotalBooks()
			const random_book_id = await Math.floor(Math.random() * totalBooks) + 1;
	        let book = await Books.getBookByID(random_book_id)
            return res.json({
                book
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}
}

module.exports = APIPublicController;