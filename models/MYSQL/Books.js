/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Books.js
 */

// HELPERS
import DateTime from '../../helpers/DateTime.js'

// CONFIG
import MYSQL from '../../config/mysql.js'

class Books {

	static async  getAll()  {
		let stmt = "SELECT * FROM 'books'";

		const [ rows ] = await MYSQL.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static async getTotal()  {
		let stmt = "SELECT COUNT(id) as totalBooks FROM books";

		const [ rows ] = await MYSQL.execute(stmt);

		return rows ? rows[0].totalBooks : false
	}


	static async getRandom()  {
	    let stmt = `SELECT * FROM books ORDER BY RAND() LIMIT 1;`;

		const [ rows ] = await MYSQL.execute(stmt);

		return rows ? rows : false
	}


	static async getByID(book_id) {
		let stmt = `SELECT * FROM books WHERE id = ${book_id}`;

		const [ rows ] = await MYSQL.execute(stmt);

		return rows ? rows : false
	}


	static async create(bookObject) {

		let stmt = `INSERT INTO books
								(title, 
								year_release, 
								image, 
								amazon_link, 
								resume, 
								pages, 
								genres, 
								author,
								created_at,
								updated_at) 
					VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
		
		let data = [
		  	bookObject.title,
		  	bookObject.year_release,
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

		return rows ? rows : false		
	}


	static async update(bookObject) {
		let stmt = `UPDATE books
                    SET
                        title = '${bookObject.title}',
                        year_release = '${bookObject.year_release}',
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

		return rows ? rows : false
	}


	static async delete(book_id){
		let stmt = `DELETE FROM books WHERE id = '${book_id}'`;

		const [ rows ] = await MYSQL.execute(stmt);

		return rows.affectedRows ? `Book ID ${book_id} DELETED!` : `Book ID ${book_id} NOT Deleted!`
	}
}

export default Books
