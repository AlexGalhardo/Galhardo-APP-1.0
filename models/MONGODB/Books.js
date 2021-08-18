const fs = require('fs-extra')
const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

// const mongodb = require('../../config/mongodb');

class Books {

	static async  getAllBooks()  {
    	return global.mongodb.collection("books").find().toArray();
	}

	static async getTotalBooks()  {
		let stmt = "SELECT COUNT(*) FROM books";

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static async getRandomBook()  {		
	    const totalBooks = Books.getTotalBooks()
		
		const random_book_index = Math.floor(Math.random() * totalBooks) + 1 

	    let stmt = `SELECT * FROM books WHERE id = ${random_book_id}`;

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static async getBookByID(book_id) {
		let stmt = `SELECT * FROM books WHERE id = ${book_id}`;

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}


	static async createBook(bookObject) {
		// const result = await global.mongodb.insert(bookObject);
		const result = await global.conn.collection("books").insertOne(bookObject);
    	console.log(result);
    	return result
	}


	static async updateBookByID(bookObject) {
		// let stmt = `UPDATE books SET (title, year_release, image, amazon_link, resume, pages, genres, author, updated_at) VALUES (${bookObject.title}, ${bookObject.year_release}, ${bookObject.image}, ${bookObject.amazon_link}, ${bookObject.resume}, ${bookObject.pages}, ${bookObject.genres}, ${bookObject.author}, ${DateTime.getNow()}) WHERE id = ${bookObject.id};`;
		console.log(bookObject)

		let stmt = `UPDATE books SET title=${bookObject.title} WHERE id=${bookObject.id}`;
		
		let data = [
		  	bookObject.title,
		  	bookObject.year_release,
            bookObject.image,
            bookObject.amazon_link,
            bookObject.resume,
            bookObject.pages,
            bookObject.genres,
            bookObject.author
		];

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false		
	}

	static async deleteBookByID(book_id){
		let stmt = `DELETE FROM books WHERE id = ${book_id}`;

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows.affectedRows ? `Book ID ${book_id} DELETED!` : `Book ID ${book_id} NOT Deleted!`
	}
}

module.exports = Books;