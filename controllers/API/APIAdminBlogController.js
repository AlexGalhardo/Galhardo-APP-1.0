/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin/blog
 */

// models
const Blog = require('../../models/JSON/Blog')
// const Blog = require('../../models/MySQL/Blog')
// const Blog = require('../../models/MONGODB/Blog')

// helpers
const DateTime = require('../../helpers/DateTime')



class APIAdminBlogController {


    /**
     * http://localhost:3000/api/admin/blog/create
     */
    static async postCreateBlogPost(req, res, next){
        try {
            const { title,
                    resume,
                    image,
                    category,
                    body } = req.body

            const blogObject = {
                title,
                resume,
                image,
                category,
                body,
                comments: [],
                created_at: DateTime.getNow(),
                updated_at: DateTime.getNow()
            }
            
            const blogPostCreated = await Blog.createBlogPost(blogObject)
            
            return res.json({
                blogPostCreated
            });            
        }
        catch(err){
            next(err);
        }
    }



    /**
     * http://localhost:3000/api/admin/blog/patch/:blog_id
     */
    static async patchBlogPost(req, res, next){
        try {
            const blog_id = req.params.blog_id

            const { title,
                    resume,
                    image,
                    category,
                    body } = req.body

            const blogObject = {
                id: parseInt(blog_id),
                title,
                resume,
                image,
                category,
                body,
                comments: [],
                updated_at: DateTime.getNow()
            }
            
            console.log('entrou blogobject', blogObject)
            const blogPostUpdated = await Blog.updateBlogPost(blogObject)
            
            return res.json({
                blogPostUpdated
            });            
        }
        catch(err){
            next(err);
        }
    }



    /**
     * http://localhost:3000/api/admin/blog/delete/:blog_id
     */
    static async deleteBlogPost(req, res, next){
        try {
            const blog_id = req.params.blog_id
            
            const blogPostDeleted = await Blog.deleteBlogPostByID(blog_id)
            
            if(blogPostDeleted){
                return res.json({
                    status: `Blog Post ID ${blog_id} DELETED!`
                });
            }    

            return res.json({
                status: `Blog Post ID ${blog_id} NOT DELETED!`
            });        
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = APIAdminBlogController;