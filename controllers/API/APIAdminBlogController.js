/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin/blog
 */


// HELPERS
const DateTime = require('../../helpers/DateTime')


// MODELS
const Blog = require(`../../models/${process.env.APP_DATABASE}/Blog`)


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
                created_at: DateTime.getNow(),
                updated_at: DateTime.getNow(),
                comments: []
            }
            
            const blogPostCreated = await Blog.create(blogObject)
            
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
                id: blog_id,
                title,
                resume,
                image,
                category,
                body,
                updated_at: DateTime.getNow()
            }
            
            const blogPostUpdated = await Blog.update(blogObject)
            
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
            
            await Blog.delete(blog_id)
            
            return res.json({
                status: `Blog Post ID ${blog_id} DELETED!`
            });  
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = APIAdminBlogController;
