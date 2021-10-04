// yarn init -y && yarn add mysql2 uuid rand-token bcryptjs slugify
// npm init -y && npm isntall mysql2 uuid rand-token bcryptjs slugify

// ALTER TABLE blog ADD UNIQUE (title, slug);
// alter table blog auto_increment = 1;
// ALTER TABLE `blog_comments` ADD FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// ALTER TABLE `blog_comments` DROP FOREIGN KEY `blog_comments_ibfk_1`, ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE


import mysql2 from 'mysql2';
import { v4 as uuid } from 'uuid';
import slugify from 'slugify';

// CONNECT TO MYSQL 
let connection = null
try {
    connection = mysql2.createPool({
        host: '172.18.0.3', // DOCKER IPv4 Address Here (use $ sudo docker inspect galhardoapp_mysql)
        user: 'root',
        password: 'root',
        database: 'galhardoapp',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}
catch(error){
    throw new Error(error)
}

let MYSQL = connection.promise()




// DATETIME
class DateTime  {
    
    static getDateTime(timestamp){
        let date = new Date(timestamp*1000).toLocaleDateString('pt-BR')
        let time = new Date(timestamp*1000).toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }

    static getNow() {
        let date = new Date().toLocaleDateString('pt-BR')
        let time = new Date().toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }
}



// MODEL BLOG
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




// TEST MODEL BLOG
async function testModelBlog(){

    /* await Blog.create({
        title: 'New Blog title',
        resume: 'new resume',
        image: 'blog image here',
        category: 'software',
        body: 'blog body here'
    }) */

    await Blog.insertComment({
        blog_id: 1,
        user_id: 'a9fc0e0e-72a6-47d0-9064-6d3a9fbfa76e',
        comment: 'Comment from ADMIN Alex'
    }) 

    // await Blog.selectComments(1)

    // await Blog.selectAll()

    // await Blog.selectByID(6)

    // await Blog.selectBySlug('new-blog-title-edited')

    
    /* await Blog.updateBlogPost({
        id: 6,
        title: 'new blog title edited',
        resume: 'new blog resume updated',
        image: 'new blog image updated',
        category: 'new blog category here',
        body: 'new blog body'
    }) */

    // await Blog.getTotal()

    // await Blog.getRandom()

    // await Blog.searchTitle('new blog title edited')

    // await Blog.deleteBlogPost(5)
}


console.log('testing testModelBlog...')

testModelBlog()
