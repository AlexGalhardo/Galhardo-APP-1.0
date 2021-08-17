const fs = require('fs-extra')
const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

const { JSON_DATABASE_FILE, database } = require('../../config/json_database');

class Books {

	static save(database, error_message){
		for(let i = 0; i < database.books.length; i++){
			database.books[i].id = i+1
		}

	    fs.writeFileSync(JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	      if (error) {
	        console.log(`Error writing file in ${JSON_DATABASE_FILE}: `, error);
	        return false
	      }
	    });
	    return true
	}

	static getAllBooks()  {
		try {
	      return database.books
	    } catch (error) {
	      return console.log("ERROR getAllBooks: ", error);
	    };
	}

	static getTotalBooks()  {
		try {
	      return database.books.length
	    } catch (error) {
	      return console.log("ERROR getTotalBooks: ", error);
	    };
	}

	static getRandomBook()  {		
		try {
			const totalBooks = Books.getTotalBooks()
		
			const random_book_index = Math.floor(Math.random() * totalBooks) + 1 

	      	return database.books[random_book_index-1]
	    } catch (error) {
	      	return console.log("ERROR getRandomBook: ", error);
	    };
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


	static createBook(bookObject) {
		try {
			bookObject.updated_at = DateTime.getNow()
			bookObject.created_at = DateTime.getNow()
			database.books.push(bookObject)
			Books.save(database, "Error createBook: ")
			return bookObject
    	} catch (error) {
      		return console.log("ERROR createBook: ", error);
    	}
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