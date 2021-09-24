/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Blog.js
 */

import slugify from 'slugify'

// HELPERS
import DateTime from '../../helpers/DateTime.js'

// CONFIG
import MYSQL from '../../config/mysql.js'



class Blog {


    static async getPostsByPageLimit(page, limit) {}


    static async getAll() {
        let stmt = "SELECT * FROM blog";

        const [ rows ] = await MYSQL.execute(stmt);

        console.log(rows)

        return rows ? rows : false
    }


    static async getTotal() {
        let stmt = "SELECT COUNT(id) as totalBlogPosts FROM blog";

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows[0].totalBlogPosts : false
    }


    static async getBySlug(slug) {}


    static async getByID (blog_id) {}


    static async createComment (blog_id, commentObject) {}


    static async deleteCommentByID(blog_id, comment_id) {}


    static async create(blogPostObject) {
        const slug = await slugify(blogPostObject.title)
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
            blogPostObject.category,
            blogPostObject.resume,
            blogPostObject.body,
            DateTime.getNow(),
            DateTime.getNow()
        ];

        const [ rows ] = await MYSQL.execute(stmt, data);

        return rows ? rows : false
    }


    static async update(blogPostObject) {
        const slug = await slugify(blogPostObject.title)
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

        return rows ? rows : false
    }


    static async delete(blog_id){
        let stmt = `DELETE FROM blog WHERE id = '${blog_id}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows.affectedRows ? `BLOG ID ${blog_id} DELETED!` : `Book ID ${blog_id} NOT Deleted!`
    }
}

export default Blog
