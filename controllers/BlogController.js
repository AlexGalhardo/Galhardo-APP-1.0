const bodyParser = require('body-parser');
var pagination = require('pagination')

// Helpers
const DateTime = require('../helpers/DateTime');

// Models
const Blog = require('../models/JSON/Blog');

const BlogController = {

	getViewBlog: async (req, res) => {
		const totalBlogPosts = await Blog.getTotalBlogPosts();
		const blogPostsPerPage = 4;
		
		let page = req.params.page;

		if(!page){
			page = 1;
		}

		const blog = await Blog.getBlogPostsByPageLimit(page, blogPostsPerPage);
		console.log(blog)

		res.render('pages/blog/blog', {
			blog,
			user: SESSION_USER,
			blog_active: true,
			boostrapPaginator: BlogController.getRenderBootstrapPaginator(page, blogPostsPerPage, totalBlogPosts)
		});
	},

	getSearchBlogTitle: async (req, res) => {
		const blogPosts = await Blog.getAllBlogPosts();
		const searchBlogTitle = req.query.blogTitle;

		if(!searchBlogTitle){
			return res.redirect('/blog')
		}
		
		console.log(blogPosts, searchBlogTitle);

		const blogTitlesSearched = await blogPosts.filter(blogPost => blogPost.title.toLowerCase().indexOf(searchBlogTitle.toLowerCase()) > -1);

		const totalBlogPostsFoundFromSearch = blogTitlesSearched.length;

		res.render('pages/blog/blog', {
			blog: blogTitlesSearched,
			searchBlogTitle,
			totalBlogPostsFoundFromSearch,
			blog_active: true,
		})
	},

	getViewBlogPost: async (req, res) => {
		const slug = req.params.slug;

		const blogPost = await Blog.getBlogPostBySlug(slug)

		blogPost.comments = await blogPost.comments.map(comment => {
			if(SESSION_USER && comment.user_id == SESSION_USER.id){
				comment.user_logged_can_delete = true
				console.log('true agora é: ', comment.user_logged_can_delete)
			}
			return comment
		})

		console.log(blogPost.comments)

		res.render('pages/blog/blogPost', {
			user: SESSION_USER,
			blogPost,
			blog_active: true,
		});
	},

	getRenderBootstrapPaginator: function(current, blogPostsPerPage, totalBlogPosts, searchBlogTitle) {

		let prelinkUrl = '/blog/';

		if(false){
			prelinkUrl = `/blog/search?blogTitle=${searchBlogTitle}`;
		} 

		return new pagination.TemplatePaginator({
		    prelink: prelinkUrl, current: current, rowsPerPage: blogPostsPerPage,
		    totalResult: totalBlogPosts, slashSeparator: true,
		    template: function(result) {
		        var i, len, prelink;
		        var html = '<div><ul class="pagination">';
		        if(result.pageCount < 2) {
		            html += '</ul></div>';
		            return html;
		        }
		        prelink = this.preparePreLink(result.prelink);
		        if(result.previous) {
		            html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
		        }
		        if(result.range.length) {
		            for( i = 0, len = result.range.length; i < len; i++) {
		                if(result.range[i] === result.current) {
		                    html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
		                } else {
		                    html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
		                }
		            }
		        }
		        if(result.next) {
		            html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
		        }
		        html += '</ul></div>';
		        return html;
		    }
		}).render();
	},

	postBlogComment: async (req, res) => {
		const slug = req.params.slug;
		const { blog_comment } = req.body;

		const blogComment = {
	        "user_id": req.session.userID,
	        "user_logged_can_delete": true,
	        "user_name": SESSION_USER.name,
	        "user_avatar": SESSION_USER.avatar,
	        "comment": blog_comment,
	        "created_at": DateTime.getNow()
		}

		// return blog post if success, null if not success
		const blogPost = Blog.createBlogComment(slug, blogComment)

		if(!blogPost){
			return console.log('blog comment não foi criado no json database!')
		}

		return res.render('pages/blog/blogPost', {
			flash: {
				type: "success",
				message: "Comment Created!"
			},
			blogPost,
			user: SESSION_USER
		})
	},

	getDeleteBlogCommentByCommentID: (req, res) => {
		const { slug, comment_id } = req.params;
		
		// return blog post if success, null if not success
		const blogPost = Blog.deleteCommentByCommentID(slug, comment_id)

		if(!blogPost){
			return res.redirect(`/blog/${slug}`)
		}
	
		return res.render('pages/blog/blogPost', {
			flash: {
				type: "success",
				message: "Comment Deleted!"
			},
			blogPost,
			user: SESSION_USER
		})
	}
};

module.exports = BlogController;