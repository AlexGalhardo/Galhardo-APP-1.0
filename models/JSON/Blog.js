const fs = require('fs')
const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

var slugify = require('slugify')

const { JSON_DATABASE_FILE, database } = require('../../config/global');

class Blog {

	static save(database, error_message){
	    fs.writeFileSync(JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	      if (error) {
	        console.log("Error writing file in registerUser: ", error);
	        return false
	      }
	    });
	    return true
	}

	static async getBlogPostsByPageLimit(page, limit) {
		let totalBlogPosts = database.blog.length
		let totalPages = parseInt(totalBlogPosts/limit)
		let totalBlogPostsLastPage = (totalBlogPosts%limit)

		let offset = (page * limit) - limit;
		let getUntil = page * limit

		if(page == totalPages+1){
			getUntil = offset + totalBlogPostsLastPage
		}

		let blogPosts = []
		try {
      		for(offset; offset < getUntil; offset++){
        		blogPosts.push(database.blog[offset])
      		}
      		return blogPosts
    	} catch (error) {
      		return console.log("ERROR getBlogPostsByPageLimit: ", error);
    	}
	}

	static getAllBlogPosts() {
		try {
	      return database.blog
	    } catch (error) {
	      return console.log("ERROR getUsers: ", error);
	    };
	}

	static async getTotalBlogPosts () {
		try {
      		return database.blog.length
    	} catch (error) {
      		return console.log("ERROR getTotalBlogPosts: ", error);
    	}
	}

	static getBlogPostBySlug (slug) {
		try {
      		for(let i=0; i < database.blog.length; i++){
        		if(database.blog[i].slug === slug){
        			return database.blog[i]
        		}
      		}
      		return null
    	} catch (error) {
      		return console.log("ERROR getBlogPostBySlug: ", error);
    	}
	}

	static createBlogComment (slug, commentObject) {
		try {
      		for(let i=0; i < database.blog.length; i++){
        		if(database.blog[i].slug === slug){
        			commentObject.comment_id = database.blog[i].comments.length+1
        			database.blog[i].comments.push(commentObject)
        			Blog.save(database, 'Error createBlogComment: ')
        			return database.blog[i]
        		}
      		}
      		return null
    	} catch (error) {
      		return console.log("ERROR createBlogComment: ", error);
    	}
	}

	static deleteCommentByCommentID(slug, comment_id) {
		try {
      		
      		for(let i=0; i < database.blog.length; i++){
        		
        		if(database.blog[i].slug === slug){
        			
        			for(let index=0; index < database.blog[i].comments.length; index++){

        				if(database.blog[i].comments[index].comment_id == comment_id){
        					
        					if(database.blog[i].comments[index].user_id == SESSION_USER.id){
        						
        						database.blog[i].comments.splice(index, 1)
        						Blog.save(database, 'Error deleteCommentByCommentID: ')
        						return database.blog[i]	
        					}
        				}
        			}
        		}
      		}
      		return null
    	} catch (error) {
      		return console.log("ERROR deleteCommentByCommentID: ", error);
    	}
	}

	static createBlogPost (blog_title, blog_category, blog_body) {
		const slug = slugify(blog_title)
		console.log('slug é: ' + slug)

		const response =  fetch(`${process.env.DATABASE_JSON_URL}/blog`, {
		    method: 'POST',
		    body: JSON.stringify({
		    	title: blog_title,
		    	slug: slug,
		    	category: blog_category,
		    	body: blog_body,
		    	created_at: DateTime.getNow(),
		    	updated_at: DateTime.getNow()
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const blogPostCreated =  response.json();
		console.log(blogPostCreated);

		return blogPostCreated;
	}

	static updateBlogPost (blog_id, blog_title, blog_category, blog_body) {

		const slug = slugify(blog_title)

		const response =  fetch(`${process.env.DATABASE_JSON_URL}/blog/${blog_id}`, {
		    method: 'PATCH',
		    body: JSON.stringify({
		    	title: blog_title,
		    	slug: slug,
		    	category: blog_category,
		    	body: blog_body,
		    	updated_at: DateTime.getNow()
		    }),
		    headers: { 'Content-Type': 'application/json' },
		});

		const blogPostUpdated =  response.json();
		console.log(blogPostUpdated);

		return blogPostUpdated;
	}
}

module.exports = Blog;