/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MONGODB/Blog.js
 */

const { Schema, model, connection, SchemaTypes } = require('mongoose')
var slugify = require('slugify')


const schema = new Schema({
	// _id: SchemaTypes.ObjectId,
	title: { type: String }, //required: true },
	slug: String,
	resume: String,
	image: String,
	category: String,
	body: String,
	created_at: String,
	updated_at: String,
	comments: Array
})

const modelName = 'Blog'

const BlogSchema = (connection && connection.models[modelName]) 
?
	connection.models[modelName]
:
	model(modelName, schema)


class Blog {

	static async create(blogObject){
		blogObject.slug = slugify(blogObject.title)
		let newBlogPost = await BlogSchema.create(blogObject)
		return newBlogPost
	}

	static async update(blogObject){
		let blogPost = await BlogSchema.findOne({_id: blogObject.id})
		
		blogPost.title = blogObject.title
        blogPost.resume = blogObject.resume
		blogPost.image = blogObject.image
        blogPost.category = blogObject.category
        blogPost.body = blogObject.body
        blogPost.updated_at = blogObject.updated_at
		
		await blogPost.save()
		
		return blogPost
	}

	static async delete(blog_id){
		await BlogSchema.findOneAndDelete({"_id": blog_id})
	}
}


module.exports = Blog;
