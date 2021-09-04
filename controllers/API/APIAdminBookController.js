/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin/book
 */


// HELPERS
const DateTime = require('../../helpers/DateTime')

// MODEL
const Books = require(`../../models/${process.env.APP_DATABASE}/Books`);



class APIAdminBookController {


    /**
     * GET http://localhost:3000/api/admin/books/listAll
     */
    static async getAllBooks(req, res){
        let books = await Books.getAll();
        res.json({
            books
        })
    }


    /**
     * POST http://localhost:3000/api/admin/book/create
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
            id: null,
            title, 
            year_release,
            image,
            amazon_link,
            resume,
            pages,
            genres,
            author,
            created_at: DateTime.getNow(),
            updated_at: DateTime.getNow()
        }

        const bookCreated = await Books.create(bookObject)

        if(bookCreated) return res.json(bookCreated)

        return res.json({ error: 'Book NOT registred in DataBase!'})
    }


    /**
     * PATCH http://localhost:3000/api/admin/book/patch/:book_id
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
                id: book_id,
                title, 
                year_release,
                image,
                amazon_link,
                resume,
                pages,
                genres,
                author,
                updated_at: DateTime.getNow()
            }
            
            const bookUpdated = await Books.update(bookObject)

            return res.json({
                bookUpdated
            });            
        }
        catch(err){
            next(err);
        }
    }



    /**
     * DELETE http://localhost:3000/api/admin/book/delete/:book_id
     */
    static async deleteBook(req, res, next){
        try {
            const book_id = req.params.book_id
            
            await Books.delete(book_id)

            return res.json({
                status: `Book ID ${book_id} DELETED!`
            });        
        }
        catch(err){
            next(err);
        }
    }

}

module.exports = APIAdminBookController;
