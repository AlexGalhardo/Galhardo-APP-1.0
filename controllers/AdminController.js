const Blog = require('../models/JSON/Blog');
const Games = require('../models/JSON/Games');
const Books = require('../models/JSON/Books');

class AdminController {
	
	/************** BLOG ********************/
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

		const blogPost = Blog.createBlogPost(blogPostObject);

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
		const slug = req.params.slug;
		const blogPost = Blog.getBlogPostBySlug(slug);

		res.render('pages/admin/updateBlogPost', {
			blogPost,
			user: SESSION_USER
		});
	}

	static postUpdateBlogPost (req, res){
		
		const { blog_id, blog_title, blog_category, blog_body } = req.body;

		const blogPostObject = {
			id: blog_id,
			title: blog_title,
			category: blog_category,
			body: blog_body
		}

		const blogPost = Blog.updateBlogPost(blogPostObject);

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







	/************** GAME ********************/
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

		const game = Games.createGame(gameObject);

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
		const game = Games.getGameByID(game_id);

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

		const game = Games.updateGameByID(gameObject);

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
		console.log(Games.deleteGameByID(parseInt(game_id)))
		if(Games.deleteGameByID(parseInt(game_id))){
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







	/************** BOOK ********************/
	static getViewCreateBook(req, res)  {
		res.render('pages/admin/createBlogPost', {
			user: SESSION_USER
		});
	}

	static postCreateBook (req, res)  {
		const { blog_title, blog_category, blog_body } = req.body;
		
		const blogPostObject = {
			title: blog_title,
			category: blog_category,
			body: blog_body
		}

		const blogPost = Blog.createBlogPost(blogPostObject);

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

	static getViewUpdateBook (req, res){
		const slug = req.params.slug;
		const blogPost = Blog.getBlogPostBySlug(slug);

		res.render('pages/admin/updateBlogPost', {
			blogPost,
			user: SESSION_USER
		});
	}

	static postUpdateBook (req, res){
		
		const { blog_id, blog_title, blog_category, blog_body } = req.body;

		const blogPostObject = {
			id: blog_id,
			title: blog_title,
			category: blog_category,
			body: blog_body
		}

		const blogPost = Blog.updateBlogPost(blogPostObject);

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
}

module.exports = AdminController;