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
	      	console.log("ERROR getTotalBooks: ", error);
	    	return 0
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
			bookObject.id = database.books.length + 1
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
        			
        			if(bookObject.title) database.books[i].title = bookObject.title
	                if(bookObject.year_release) database.books[i].year_release = bookObject.year_release
	                if(bookObject.image) database.books[i].image = bookObject.image
	                if(bookObject.amazon_link) database.books[i].amazon_link = bookObject.amazon_link
	                if(bookObject.resume) database.books[i].resume = bookObject.resume
	                if(bookObject.pages) database.books[i].pages = bookObject.pages
	                if(bookObject.genres) database.books[i].genres = bookObject.genres
	                if(bookObject.author) database.books[i].author = bookObject.author

        			database.books[i].updated_at = DateTime.getNow()
        			
        			Books.save(database, "Error updateBookByID: ")
        			
        			return database.books[i]
        		}
      		}
      		return "Book NOT Updated!"
    	} catch (error) {
      		console.log("ERROR updateBookByID: ", error);
    	}
	}



	static deleteBookByID(book_id){
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id === book_id){
        			database.books.splice(i, 1)
        			Books.save(database, "Error deleteBookByID: ")
        			return `Book ID ${book_id} DELETED!`
        		}
      		}
      		return `Book ID ${book_id} NOT Deleted!`
    	} catch (error) {
      		return console.log("ERROR deleteBookByID: ", error);
    	}
	}
}

module.exports = Books;