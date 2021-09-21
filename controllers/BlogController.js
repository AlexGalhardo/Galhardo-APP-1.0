/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * http://localhost:3000/blog
 */

const bodyParser = require('body-parser');
const pagination = require('pagination')

// HELPERS
const DateTime = require('../helpers/DateTime');
const Header = require('../helpers/Header');

// MODEL
const Blog = require(`../models/${process.env.APP_DATABASE}/Blog`)



class BlogController {


	static async getViewBlog(req, res){
		const totalBlogPosts = await Blog.getTotal();
		const blogPostsPerPage = 4;
		
		let page = req.params.page;

		if(!page){
			page = 1;
		}

		const blog = await Blog.getPostsByPageLimit(page, blogPostsPerPage);

		res.render('pages/blog/blog', {
			blog,
			user: SESSION_USER,
			blog_active: true,
			boostrapPaginator: BlogController.getRenderBootstrapPaginator(page, blogPostsPerPage, totalBlogPosts),
            header: Header.blog()
		});
	}


	static getSearchBlogTitle (req, res){
		const blogPosts = Blog.getAll();
		const searchBlogTitle = req.query.blogTitle;

		if(!searchBlogTitle){
			return res.redirect('/blog')
		}
		
		const blogTitlesSearched = blogPosts.filter(blogPost => blogPost.title.toLowerCase().indexOf(searchBlogTitle.toLowerCase()) > -1);

		const totalBlogPostsFoundFromSearch = blogTitlesSearched.length;

		res.render('pages/blog/blog', {
			blog: blogTitlesSearched,
			searchBlogTitle,
			totalBlogPostsFoundFromSearch,
			header: Header.blog()
		})
	}


	/**
	 * This methods verify if user logged can delete comment
	 * and get comments by DESC ORDER
	 */
	static fixComments(blogPost){
		blogPost.comments = blogPost.comments.map(comment => {
			if(SESSION_USER && comment.user_id == SESSION_USER.id){
				comment.user_logged_can_delete = true
			}
			else {
				comment.user_logged_can_delete = false
			}
			return comment
		});

		return blogPost
	}


	static getViewBlogPost (req, res) {
		const slug = req.params.slug;

		let blogPost = Blog.getBySlug(slug)

        if(blogPost.comments.length){
            blogPost = BlogController.fixComments(blogPost)

            if(blogPost.comments[0].comment_id < blogPost.comments[1].comment_id) blogPost.comments.reverse()
        }

		res.render('pages/blog/blogPost', {
			user: SESSION_USER,
			blogPost,
            header: Header.blogPost(blogPost.title)
		});
	}


	static getRenderBootstrapPaginator(current, blogPostsPerPage, totalBlogPosts, searchBlogTitle) {

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
	}


	static async postBlogComment (req, res){
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

		const blogPost = await Blog.createComment(slug, blogComment)

		if(!blogPost){
			return res.redirect('/blog')
		}

		blogPost = await BlogController.fixComments(blogPost)

        req.flash('success', 'Comment Created!')
        return res.redirect(`/blog/${slug}`)
	}


	static async getDeleteBlogCommentByCommentID (req, res){
		const { slug, comment_id } = req.params;

		let blogPost = await Blog.deleteCommentByID(slug, comment_id)

		if(!blogPost){
			return res.redirect(`/blog/${slug}`)
		}

		blogPost = await BlogController.fixComments(blogPost)

        req.flash('success', 'Comment Deleted!')
        return res.redirect(`/blog/${slug}`)
	}
}

module.exports = BlogController;
