/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin
 * http://localhost:3000/admin/blog
 * http://localhost:3000/admin/games
 * http://localhost:3000/admin/books
 */


const Blog = require(`../../models/${process.env.APP_DATABASE}/Blog`)
const Games = require(`../../models/${process.env.APP_DATABASE}/Games`)
const Books = require(`../../models/${process.env.APP_DATABASE}/Books`)



class AdminController {
	

	static getViewCreateBlogPost(req, res)  {
		res.render('pages/admin/createBlogPost', {
			user: SESSION_USER
		});
	}


	static postCreateBlogPost (req, res)  {
		const { blog_title, blog_category, blog_body } = req.body;
		
		const blogPostObject = {
			title: blog_title,
			category: blog_category,
			body: blog_body
		}

		const blogPost = Blog.create(blogPostObject);

		if(!blogPost){
			return res.render('pages/admin/createBlogPost', {
				flash: {
					type: "warning",
					message: "Error: blog post not created!"
				},
				user: SESSION_USER
			});
		}

		return res.render(`pages/admin/updateBlogPost`, {
			flash: {
				type: "success",
				message: "Blog Post Created!"
			},
			blogPost,
			user: SESSION_USER
		});
	}

	static getViewUpdateBlogPost (req, res){
		const blog_id = req.params.blog_id;
		const blogPost = Blog.getByID(blog_id);

		res.render('pages/admin/updateBlogPost', {
			blogPost,
			user: SESSION_USER
		});
	}

	static postUpdateBlogPost (req, res){
		
		const { blog_id, 
				blog_title, 
				blog_resume,
				blog_image,
				blog_category, 
				blog_body } = req.body;

		const blogPostObject = {
			id: parseInt(blog_id),
			title: blog_title,
			resume: blog_resume,
			image: blog_image,
			category: blog_category,
			body: blog_body,
      		updated_at: null,
      		comments: []
		}

		const blogPost = Blog.update(blogPostObject);

		if(!blogPost){
			return res.render('pages/admin/updateBlogPost', {
				flash: {
					type: "warning",
					message: "Error: blog post not updated!"
				},
				blogPost,
				user: SESSION_USER
			});
		}

		res.render('pages/admin/updateBlogPost', {
			flash: {
				type: "success",
				message: "Blog Post UPDATED!"
			},
			blogPost,
			user: SESSION_USER
		});
	}

	static postDeleteBlogPost(req, res) {
		const blog_id = req.params.blog_id;
		
		if(Blog.delete(parseInt(blog_id))){
			/*return res.render("pages/admin/createGame", {
				flash: {
					type: "success",
					message: `blog_id: ${blog_id} deleted with success!`
				}
			})*/
			return res.redirect('/admin/create/blogPost')
		}
		return res.redirect(`/admin/update/blogPost/${blog_id}`)
	}








	

	static getViewCreateGame(req, res)  {
		res.render('pages/admin/createGame', {
			user: SESSION_USER
		});
	}

	static postCreateGame (req, res)  {
		const { game_title, 
				game_year_release,
				game_platforms,
				game_genres,
				game_developer,
				game_image,
				game_igdb_link,
				game_igdb_rating,
				game_amazon_link,
				game_resume } = req.body;

		const gameObject = {
			id: null, 
			title: game_title,
			year_release: game_year_release,
			platforms: game_platforms,
			genres: game_genres,
			developer: game_developer,
			image: game_image,
			igdb_link: game_igdb_link,
			igdb_rating: game_igdb_rating,
			amazon_link: game_amazon_link,
			resume: game_resume
		}

		const game = Games.create(gameObject);

		if(!game){
			return res.render('pages/admin/createGame', {
				flash: {
					type: "warning",
					message: "Error: game not created!"
				},
				game,
				user: SESSION_USER
			});
		}

		return res.render('pages/admin/updateGame', {
			flash: {
				type: "success",
				message: "Game Created!"
			},
			game,
			user: SESSION_USER
		});
	}

	static getViewUpdateGame (req, res){
		const game_id = req.params.game_id;
		const game = Games.getByID(game_id);

		res.render('pages/admin/updateGame', {
			game,
			user: SESSION_USER
		});
	}

	static postUpdateGame (req, res){
		
		const { game_id, 
				game_title, 
				game_year_release,
				game_platforms,
				game_genres,
				game_developer,
				game_image,
				game_igdb_link,
				game_igdb_rating,
				game_amazon_link,
				game_resume } = req.body;

		const gameObject = {
			id: parseInt(game_id), 
			title: game_title,
			year_release: game_year_release,
			platforms: game_platforms,
			genres: game_genres,
			developer: game_developer,
			image: game_image,
			igdb_link: game_igdb_link,
			igdb_rating: game_igdb_rating,
			amazon_link: game_amazon_link,
			resume: game_resume
		}

		console.log('gameObject é', gameObject)

		const game = Games.updateByID(gameObject);

		if(!game){
			return res.render('pages/admin/updateGame', {
				flash: {
					type: "warning",
					message: "Error: game not updated!"
				},
				game,
				user: SESSION_USER
			});
		}

		return res.render('pages/admin/updateGame', {
			flash: {
				type: "success",
				message: "Game UPDATED!"
			},
			game,
			user: SESSION_USER
		});
	}

	static postDeleteGame(req, res) {
		const game_id = req.params.game_id;
		console.log(Games.delete(parseInt(game_id)))
		if(Games.delete(parseInt(game_id))){
			/*return res.render("pages/admin/createGame", {
				flash: {
					type: "success",
					message: `GAME_ID: ${game_id} deleted with success!`
				}
			})*/
			return res.redirect('/admin/create/game')
		}
		return res.redirect(`/admin/update/game/${game_id}`)
	}







	

	
	static getViewCreateBook(req, res)  {
		res.render('pages/admin/createBook', {
			user: SESSION_USER
		});
	}

	static postCreateBook (req, res)  {
		const { book_title, 
				book_year_release,
				book_image,
				book_amazon_link,
				book_resume,
				book_pages,
				book_genres,
				book_author } = req.body;

		const bookObject = {
			id: null, 
			title: book_title,
			year_release: parseInt(book_year_release),
			image: book_image,
			amazon_link: book_amazon_link,
			resume: book_resume,
			pages: parseInt(book_pages),
			genres: book_genres,
			author: book_author
		}

		const book = Books.create(bookObject);

		if(!book){
			return res.render('pages/admin/createBook', {
				flash: {
					type: "warning",
					message: "Error: Book not created!"
				},
				book,
				user: SESSION_USER
			});
		}

		return res.render('pages/admin/updateBook', {
			flash: {
				type: "success",
				message: "Book Created!"
			},
			book,
			user: SESSION_USER
		});
	}

	static getViewUpdateBook(req, res){
		const book_id = req.params.book_id;
		const book = Books.getByID(book_id);

		res.render('pages/admin/updateBook', {
			book,
			user: SESSION_USER
		});
	}

	static postUpdateBook (req, res){
		
		const { book_id,
				book_title, 
				book_year_release,
				book_image,
				book_amazon_link,
				book_resume,
				book_pages,
				book_genres,
				book_author } = req.body;

		const bookObject = {
			id: parseInt(book_id), 
			title: book_title,
			year_release: parseInt(book_year_release),
			image: book_image,
			amazon_link: book_amazon_link,
			resume: book_resume,
			pages: parseInt(book_pages),
			genres: book_genres,
			author: book_author
		}

		const book = Books.update(bookObject);

		console.log('book é', book)

		if(!book){
			return res.render('pages/admin/updateBook', {
				flash: {
					type: "warning",
					message: "Error: Book not updated!"
				},
				book,
				user: SESSION_USER
			});
		}

		return res.render('pages/admin/updateBook', {
			flash: {
				type: "success",
				message: "Book UPDATED!"
			},
			book,
			user: SESSION_USER
		});
	}

	static postDeleteBook(req, res) {
		const book_id = req.params.book_id;
		
		if(Books.delete(parseInt(book_id))){
			/*return res.render("pages/admin/createGame", {
				flash: {
					type: "success",
					message: `book_id: ${book_id} deleted with success!`
				}
			})*/
			return res.redirect('/admin/create/book')
		}
		return res.redirect(`/admin/update/book/${book_id}`)
	}
}

module.exports = AdminController;
