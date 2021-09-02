/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MONGODB/Books.js
 */

const { Schema, model, connection, SchemaTypes } = require('mongoose')

const schema = new Schema({
    // _id: SchemaTypes.ObjectId,
    title: { type: String }, //required: true },
    year_release: Number,
    pages: Number,
    author: String,
    resume: String,
    amazon_link: String,
    image: String,
    genres: String,
    created_at: String,
    updated_at: String
})

const modelName = 'Books'

const BookSchema = (connection && connection.models[modelName]) 
?
    connection.models[modelName]
:
    model(modelName, schema)


class Books {

    static async getAll(){
        let books = await BookSchema.find({})
        return books
    }

    static async create(bookObject){
        let newBook = await BookSchema.create(bookObject)
        return newBook
    }

    static async update(bookObject){
        let book = await BookSchema.findOne({_id: bookObject.id})

        book.title = bookObject.title
        book.year_release = bookObject.year_release
        book.image = bookObject.image
        book.amazon_link = bookObject.amazon_link
        book.resume = bookObject.resume
        book.pages = bookObject.pages
        book.genres = bookObject.genres
        book.author = bookObject.author
        book.updated_at = bookObject.updated_at

        await book.save()

        return book
    }

    static async delete(book_id){
        await BookSchema.findOneAndDelete({"_id": book_id})
    }
}


module.exports = Books;
