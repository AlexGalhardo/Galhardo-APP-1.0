const fs = require('fs-extra')
const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

const mysql = require('../../config/mysql');

class Books {

	static async  getAllBooks()  {
		let stmt = "SELECT * FROM `books`";

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static getTotalBooks()  {
		let stmt = "SELECT COUNT(*) FROM books";

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static getRandomBook()  {		
	    const totalBooks = Books.getTotalBooks()
		
		const random_book_index = Math.floor(Math.random() * totalBooks) + 1 

	    let stmt = `SELECT * FROM books WHERE id = ${random_book_id}`;

		const [ rows ] = await mysql.execute(stmt);
		
		console.log(rows)

		return rows ? rows : false
	}

	static getBookByID(book_id) {
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id == book_id){
        			return database.books[i]
        		}
      		}
      		return null
    	} catch (error) {
      		return console.log("ERROR getBookByID: ", error);
    	}
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
            bookObject.created_at,
            bookObject.updated_at
		];

		const [ rows ] = await mysql.execute(stmt, data);
		
		console.log(rows)

		return rows ? rows : false		
	}


	static updateBookByID(bookObject) {
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id === bookObject.id){
        			bookObject.updated_at = DateTime.getNow()
        			database.books.splice(i, 1, bookObject)
        			Books.save(database, "Error updateBookByID: ")
        			return bookObject
        		}
      		}
      		return false
    	} catch (error) {
      		return console.log("ERROR updateBookByID: ", error);
    	}
	}

	static deleteBookByID(book_id){
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id === book_id){
        			database.books.splice(i, 1)
        			Games.save(database, "Error deleteGameByID: ")
        			return true
        		}
      		}
      		return false
    	} catch (error) {
      		return console.log("ERROR deleteBookByID: ", error);
    	}
	}
}

module.exports = Books;