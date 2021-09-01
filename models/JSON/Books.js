/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Books.js
 */

const fs = require('fs-extra')
const DateTime = require('../../helpers/DateTime');

const database = require('../../config/json_database');



class Books {

	static save(database){
		for(let i = 0; i < database.books.length; i++){
			database.books[i].id = i+1
		}

	    fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	      if (error) {
	        throw new Error(error);
	      }
	    });
	}


	static getAll()  {
		try {
	      return database.books
	    } catch (error) {
	      throw new Error(error);
	    };
	}


	static getTotal()  {
		try {
	      	return database.books.length
	    } catch (error) {
	      	throw new Error(error);
	    };
	}


	static getRandom()  {
		try {
			const totalBooks = Books.getTotal()
			const random_book_index = Math.floor(Math.random() * totalBooks) + 1
	      	return database.books[random_book_index-1]
	    } catch (error) {
	      	throw new Error(error);
	    };
	}


	static getByID(book_id) {
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id == book_id){
        			return database.books[i]
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error);
    	}
	}


	static create(bookObject) {
		try {
			bookObject.id = database.books.length + 1
			bookObject.updated_at = DateTime.getNow()
			bookObject.created_at = DateTime.getNow()
			
			database.books.push(bookObject)
			
			Books.save(database, "Error createBook: ")
			
			return bookObject
    	} catch (error) {
      		throw new Error(error);
    	}
	}


	static update(bookObject) {
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
      		throw new Error(error);
    	}
	}



	static delete(book_id){
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id === book_id){
        			database.books.splice(i, 1)
        			Books.save(database)
        			return
        		}
      		}
    	} catch (error) {
      		throw new Error(error);
    	}
	}
}

module.exports = Books;
