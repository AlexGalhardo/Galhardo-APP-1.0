/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/POSTGRES/BlogComments.js
 */

const DateTime = require('../../helpers/DateTime');

class BlogComments {
    static async getComments(blog_id){}
    static async storeComment(blog_id, commentObject){}
    static async deleteComment(blog_id, comment_id){}
}

module.exports = BlogComments;
