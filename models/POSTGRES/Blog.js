/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/POSTGRES/Blog.js
 */

const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../../config/postgres.js');

const DateTime = require('../../helpers/DateTime');
const slugify = require('slugify')

const BlogModel = sequelize.define('BlogModel', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER
	},
	title: {
		type: DataTypes.STRING
	},
	resume: {
		type: DataTypes.INTEGER
	},
	image: {
		type: DataTypes.STRING
	},
	category: {
		type: DataTypes.STRING
	},
	body: {
		type: DataTypes.STRING
	},
	slug: {
		type: DataTypes.INTEGER
	},
	created_at: {
		type: DataTypes.STRING
	},
	updated_at: {
		type: DataTypes.STRING
	}
}, {
	tableName: 'books',
	timestamps: false
});



class Blog {
	static async getPostsByPageLimit(page, limit) {}
    static getAll() {}
    static async getTotal() {}
    static getBySlug(slug) {}
    static getByID (blog_id) {}
    static createComment (blog_id, commentObject) {}
    static deleteCommentByID(blog_id, comment_id) {}
    static create(blogPostObject) {}
    static update(blogPostObject) {}
    static delete(blog_id){}
}

module.exports = Blog;
