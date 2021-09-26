/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Books.js
 */

// HELPERS
const DateTime = require('../../helpers/DateTime');

// CONFIG
const MYSQL = require('../../config/mysql')



class Books {

    static async selectAll()  {
        try {
            let stmt = `SELECT *
                        FROM books`;

            const [ rows ] = await MYSQL.execute(stmt)

            console.log('selectAll: ', rows ? rows : null)

            // return rows ? rows : null

        } catch (error) {
            throw new Error(error);
        };
    }


    static async getTotal()  {
        try {
            let stmt = "SELECT COUNT(id) as totalGames FROM books";

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getTotal: ', rows ? rows[0].totalGames : false)

            // return rows ? rows[0].totalGames : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async getRandom()  {
        try {
            let stmt = `SELECT * FROM books ORDER BY RAND() LIMIT 1;`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getRandom: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectByID(book_id) {
        try {
            let stmt = `SELECT * FROM books WHERE id = ${book_id}`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByID: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async create(bookObject) {
        try {
            let stmt = `INSERT INTO books
                                (title,
                                year_release,
                                price,
                                image,
                                amazon_link,
                                resume,
                                pages,
                                genres,
                                author,
                                created_at,
                                updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let data = [
                bookObject.title,
                bookObject.year_release,
                bookObject.price,
                bookObject.image,
                bookObject.amazon_link,
                bookObject.resume,
                bookObject.pages,
                bookObject.genres,
                bookObject.author,
                DateTime.getNow(),
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`BOOK: ${bookObject.ttitle} CREATED!`) : console.log(`BOOK: ${bookObject.ttitle} NOT CREATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async update(bookObject) {
        try {
            console.log('id é', bookObject.id)
            let stmt = `UPDATE books
                    SET
                        title = '${bookObject.title}',
                        year_release = '${bookObject.year_release}',
                        price = '${bookObject.price}',
                        image = '${bookObject.image}',
                        amazon_link = '${bookObject.amazon_link}',
                        resume = '${bookObject.resume}',
                        pages = '${bookObject.pages}',
                        genres = '${bookObject.genres}',
                        author = '${bookObject.author}',
                        updated_at = '${DateTime.getNow()}'
                    WHERE
                        id = '${bookObject.id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`BOOK_ID: ${bookObject.id} UPDATED!`) : console.log(`BOOK_ID: ${bookObject.id} NOT UPDATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async delete(book_id){
        try {
            let stmt = `DELETE FROM books WHERE id = '${book_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('delete: ', rows.affectedRows ? `book_id: ${book_id} DELETED!` : `book_id ${book_id} NOT Deleted!`)

        } catch (error) {
            throw new Error(error);
        }
    }


    static async searchTitle(book_title){
        try {
            let stmt = `SELECT * FROM books WHERE title LIKE '%${book_title}%'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('searchTitle: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Books;
