/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin/book
 */



// models
// const Books = require('../../models/JSON/Books');
// const Books = require('../../models/MySQL/Books');
const Books = require('../../models/MONGODB/Books');

// helpers
const DateTime = require('../../helpers/DateTime')



class APIAdminBookController {


    /**
     * http://localhost:3000/api/admin/book/listAll
     */
    static async getBooks(req, res){
        let books = await Books.find({});
        res.json({
            books
        })
    }


    /**
     * http://localhost:3000/api/admin/book/create
     */
    static async postCreateBook(req, res){

        const {
            title,
            year_release,
            image,
            amazon_link,
            resume,
            pages,
            genres,
            author
        } = req.body

        const bookObject = {
            title, 
            year_release,
            image,
            amazon_link,
            resume,
            pages,
            genres,
            author
        }

        const bookCreated = await Books.createBook(bookObject)

        // bookObject.id = bookCreated.insertId

        if(bookCreated) return res.json(bookObject)

        return res.json({ error: 'Book not registred in MYSQL!'})
    }


    /**
     * http://localhost:3000/api/admin/book/patch/:book_id
     */
    static async patchBook(req, res, next){
        try {
            const book_id = req.params.book_id

            const {
                title,
                year_release,
                image,
                amazon_link,
                resume,
                pages,
                genres,
                author
            } = req.body

            const bookObject = {
                id: parseInt(book_id),
                title, 
                year_release,
                image,
                amazon_link,
                resume,
                pages,
                genres,
                author
            }
            
            const bookUpdated = await Books.updateBookByID(bookObject)
            
            return res.json({
                bookUpdated
            });            
        }
        catch(err){
            next(err);
        }
    }



    /**
     * http://localhost:3000/api/admin/book/delete/:book_id
     */
    static async deleteBook(req, res, next){
        try {
            const book_id = req.params.book_id
            
            const bookDeleted = await Books.deleteBookByID(parseInt(book_id))

            return res.json({
                status: bookDeleted
            });        
        }
        catch(err){
            next(err);
        }
    }

}

module.exports = APIAdminBookController;