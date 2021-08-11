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
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog/?_page=${page}&_limit=${limit}`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json;

		return null;

		try {
	      for(let i = 0; i < database.blog.length; i++){
	        if(database.users[i].id == user_id) return database.users[i]
	      }
	      return null
	    } catch (error) {
	      return console.log("ERROR getUserByID: ", error);
	    }
	}

	static getAllBlogPosts() {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json;

		return null;
	}

	static getTotalBlogPosts () {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json.length;

		return null;
	},

	static getBlogPostBySlug (slug) {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog?slug=${slug}`, {
  			"method": "GET"
		});
		const json = await response.json();

		if(json.length > 0) return json[0];

		return null;
	}

	static getBlogPostsCommentsByBlogPostID(blogPostID) {
		console.log('recebeu id: ' + blogPostID)
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog_comments?blog_post_id=${blogPostID}?_sort=created_at&_order=ASC`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json;

		return null;
	}

	static createBlogComment (body) {
		console.log('recebeu body: ', body)
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog_comments`, {
		    method: 'POST',
		    body:    JSON.stringify(body),
		    headers: { 'Content-Type': 'application/json' },
		})

		const json = await response.json();

		if(json) return true;

		return false;
	}

	static createBlogPost (blog_title, blog_category, blog_body) {
		const slug = slugify(blog_title)
		console.log('slug é: ' + slug)

		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog`, {
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

		const blogPostCreated = await response.json();
		console.log(blogPostCreated);

		return blogPostCreated;
	}

	static updateBlogPost (blog_id, blog_title, blog_category, blog_body) {

		const slug = slugify(blog_title)

		const response = await fetch(`${process.env.DATABASE_JSON_URL}/blog/${blog_id}`, {
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

		const blogPostUpdated = await response.json();
		console.log(blogPostUpdated);

		return blogPostUpdated;
	}
}

module.exports = Blog;