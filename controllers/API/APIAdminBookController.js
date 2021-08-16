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
const Books = require('../../models/MySQL/Books');

// helpers
const DateTime = require('../../helpers/DateTime')

class APIAdminBookController {

    static async postAdminBookCreate(req, res){

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
            author,
            created_at: DateTime.getNow(),
            updated_at: DateTime.getNow()
        }

        const bookCreated = await Books.create(bookObject)

        bookObject.id = bookCreated.insertId

        if(bookCreated) return res.json(bookObject)

        return res.json({ error: 'Book not registred in MYSQL!'})
    }

}

module.exports = APIAdminBookController;