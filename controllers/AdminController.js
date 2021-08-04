const Blog = require('../models/JSON/Blog');

const AdminController = {
	
	getViewCreateBlogPost: (req, res) => {
		res.render('pages/admin/createBlogPost');
	},

	postCreateBlogPost: async (req, res) => {
		const { blog_title, blog_category, blog_body } = req.body;

		const blogPost = await Blog.createBlogPost(blog_title, blog_category, blog_body);

		if(!blogPost){
			return res.render('pages/admin/createBlogPost', {
				flash: {
					type: "warning",
					message: "Error: blog post not created!"
				}
			});
		}

		return res.render(`pages/admin/updateBlogPost`, {
			flash: {
				type: "success",
				message: "Blog Post Created!"
			},
			blogPost
		});
	},

	getViewUpdateBlogPost: async (req, res) => {
		const slug = req.params.slug;
		const blogPost = await Blog.getBlogPostBySlug(slug);

		res.render('pages/admin/updateBlogPost', {
			blogPost
		});
	},

	postUpdateBlogPost: async (req, res) => {
		
		const { blog_id, blog_title, blog_category, blog_body } = req.body;

		const blogPost = await Blog.updateBlogPost(blog_id, blog_title, blog_category, blog_body);

		if(!blogPost){
			return res.render('pages/admin/updateBlogPost', {
				flash: {
					type: "warning",
					message: "Error: blog post not updated!"
				}
			});
		}

		res.render('pages/admin/updateBlogPost', {
			flash: {
				type: "success",
				message: "Blog Post UPDATED!"
			},
			blogPost
		});
	}

};

module.exports = AdminController;