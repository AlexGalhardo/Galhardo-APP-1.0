/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/SQLITE/Blog.js
 */

const DateTime = require('../../helpers/DateTime');
const slugify = require('slugify')

class Blog {
    static async getPostsByPageLimit(page, limit) {}
    static getAll() {}
    static async getTotal() {}
    static getBySlug(slug) {}
    static getByID (blog_id) {}
    static createComment(blog_id, commentObject) {}
    static deleteCommentByID(blog_id, comment_id) {}
    static create(blogPostObject) {}
    static update(blogPostObject) {}
    static delete(blog_id){}
}

module.exports = Blog
