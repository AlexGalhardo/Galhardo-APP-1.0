/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Blog.js
 */

const slugify = require('slugify')

// HELPERS
const DateTime = require('../../helpers/DateTime');

// CONFIG
const MYSQL = require('../../config/mysql')


class Blog {


    static async selectAll() {
        try {
            let stmt = `SELECT * FROM blog`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getAll: ', rows)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async getTotal() {
        try {
            let stmt = `SELECT COUNT(id) as totalBlogPosts FROM blog`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getTotal: ', rows ? rows[0].totalBlogPosts : false)

            // return rows ? rows[0].totalBlogPosts : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async selectBySlug(slug) {
        try {
            let stmt = `SELECT *
                        FROM blog
                        WHERE slug = '${slug}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getBySlug: ', rows ? rows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async selectByID(blog_id) {
        try {
            let stmt = `SELECT *
                        FROM blog
                        WHERE id = '${blog_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getByID: ', rows ? rows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async selectPostsByPageLimit(page, limit) {
        try {
            let stmt = `SELECT *
                        FROM blog
                        LIMIT ${page}, ${limit};`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectPostsByPageLimit: ', rows ? rows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async searchTitle(blogTitle){
        try {
            let stmt = `SELECT *
                        FROM blog
                        WHERE title
                        LIKE '%${blogTitle}%'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('searchTitle: ', rows ? rows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async insertComment (commentObject) {
        try {
            let stmt = `INSERT INTO blog_comments (blog_id, user_id, comment, created_at)
                        VALUES (?, ?, ?, ?)`;

            let data = [
                commentObject.blog_id,
                commentObject.user_id,
                commentObject.comment,
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ? console.log(`Comment: ${commentObject.comment} created!`) : console.log('Comment not created!')

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async deleteCommentByID(blog_id, comment_id) {
        try {
            let stmt = `DELETE FROM blog_comments
                        WHERE blog_id = '${blog_id}' AND comment_id = '${comment_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('deleteCommentByID: ', rows ? rows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async create(blogPostObject) {
        try {
            const slug = await slugify(blogPostObject.title, { lower: true })
            let stmt = `INSERT INTO blog
                                    (title,
                                    slug,
                                    resume,
                                    image,
                                    category,
                                    body,
                                    created_at,
                                    updated_at)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            let data = [
                blogPostObject.title,
                slug,
                blogPostObject.resume,
                blogPostObject.image,
                blogPostObject.category,
                blogPostObject.body,
                DateTime.getNow(),
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            console.log('create: ', rows ? rows.affectedRows : null)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async updateBlogPost(blogPostObject) {
        try {
            const slug = await slugify(blogPostObject.title, { lower: true })
            let stmt = `UPDATE blog
                        SET
                            title = '${blogPostObject.title}',
                            slug = '${slug}',
                            resume = '${blogPostObject.resume}',
                            image = '${blogPostObject.image}',
                            category = '${blogPostObject.category}',
                            body = '${blogPostObject.body}',
                            updated_at = '${DateTime.getNow()}'
                        WHERE
                            id = '${blogPostObject.id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`BLOG_ID: ${blogPostObject.id} UPDATED!`) : console.log(`BLOG_ID: ${blogPostObject.id} NOT UPDATED!`)

            // return rows ? rows : false
        } catch(error){
            throw new Error(error)
        }
    }


    static async getRandom(){
        try {
            let stmt = `SELECT * FROM blog ORDER BY RAND() LIMIT 1;`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getRandom: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async deleteBlogPost(blog_id){
        try {
            let stmt = `DELETE FROM blog
                        WHERE id = '${blog_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`BLOG ID ${blog_id} DELETED!`) : console.log(`Book ID ${blog_id} NOT Deleted!`)

        } catch(error){
            throw new Error(error)
        }
    }

    static async selectComments(blog_id){
        try {
            let stmt = `SELECT
                            blog_comments.comment_id,
                            blog_comments.blog_id,
                            blog_comments.user_id,
                            users.name,
                            users.avatar,
                            blog_comments.comment,
                            blog_comments.created_at
                        FROM blog_comments
                        INNER JOIN users
                        ON blog_comments.user_id = users.id
                        WHERE blog_comments.blog_id = '${blog_id}'
                        `;

            const [ rows ] = await MYSQL.execute(stmt);

            rows ? console.log(rows) : console.log('NOTHING FOUND')

        } catch(error){
            throw new Error(error)
        }
    }
}

module.exports = Blog;
