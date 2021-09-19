/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Blog.js
 */

import fs from 'fs-extra'
import DateTime from '../../helpers/DateTime.js'

import slugify from 'slugify'

import database from '../../config/json_database.js'



class Blog {

	static save(database, error_message){
		for(let i = 0; i < database.blog.length; i++){
			database.blog[i].id = i+1
		}

	    fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	        if (error) {
	            throw new Error(error)
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
      		throw new Error(error)
    	}
	}



	static getAllBlogPosts() {
		try {
	        return database.blog
	    } catch (error) {
	        throw new Error(error);
	    };
	}



	static async getTotalBlogPosts() {
		try {
      		return database.blog.length
    	} catch (error) {
      		throw new Error(error);
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
      		throw new Error(error);
    	}
	}



	static getBlogPostByID (blog_id) {
		try {
      		for(let i=0; i < database.blog.length; i++){
        		if(database.blog[i].id === parseInt(blog_id)){
        			return database.blog[i]
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error);
    	}
	}



	static createBlogComment (slug, commentObject) {
		try {
      		for(let i=0; i < database.blog.length; i++){
        		if(database.blog[i].slug === slug){
        			commentObject.comment_id = database.blog[i].comments.length+1
        			database.blog[i].comments.push(commentObject)
        			Blog.save(database)
        			return database.blog[i]
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error);
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
        						Blog.save(database)
        						return database.blog[i]	
        					}
        				}
        			}
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error);
    	}
	}



	static createBlogPost (blogPostObject) {
		blogPostObject.slug = slugify(blogPostObject.title)

		try {
			blogPostObject.id = database.blog.length + 1
			database.blog.push(blogPostObject)
			Blog.save(database)
			return blogPostObject
    	} catch (error) {
      		throw new Error(error);
    	}
	}



	static updateBlogPost (blogPostObject) {
		try {
			for(let i = 0; i < database.blog.length; i++){

				if(database.blog[i].id === blogPostObject.id){
					database.blog[i].slug = slugify(blogPostObject.title, {lower: true})
					if(blogPostObject.title) database.blog[i].title = blogPostObject.title
					if(blogPostObject.resume) database.blog[i].resume = blogPostObject.resume
					if(blogPostObject.image) database.blog[i].image = blogPostObject.image
					if(blogPostObject.category) database.blog[i].category = blogPostObject.category
					if(blogPostObject.body) database.blog[i].body = blogPostObject.body

					Blog.save(database)
					return database.blog[i]
				}
			}
			return null
    	} catch (error) {
      		throw new Error(error);
    	}
	}



	static deleteBlogPostByID(blog_id){
		try {
      		for(let i=0; i < database.blog.length; i++){
        		if(database.blog[i].id === parseInt(blog_id)){
        			database.blog.splice(i, 1)
        			Blog.save(database)
        			return true
        		}
      		}
      		return false
    	} catch (error) {
      		throw new Error(error);
    	}
	}
}

export default Blog;
