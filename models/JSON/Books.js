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


    static searchTitle(book_title){
        try {

            const searchedBooks = database.books.filter(book => book.title.toLowerCase().indexOf(book_title.toLowerCase()) > -1);
            return searchedBooks

        } catch (error) {
            throw new Error(error)
        }
    }

    static plusRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].recommend++
                    Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static minusRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].recommend--
                    Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static plusDontRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].dont_recommend++
                    Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static minusDontRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].dont_recommend--
                    Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    static getTotalRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    console.log('total recommend', database.books[i].recommend)
                    return database.books[i].recommend
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    static getTotalNotRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    console.log('total dont recommend', database.books[i].not_recommend)
                    return database.books[i].not_recommend
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    static async userRecommend(user_id, book_id){
        try {

            let bookRecommendationObj = {
                user_id,
                book_id,
                user_recommend: true,
                user_not_recommend: false,
                total_recommend: 123,
                total_dont_recommend: 321
            }

            for(let i=0; i < database.books_recommendations.length; i++){

                if(database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === book_id){

                    if(database.books_recommendations[i].user_not_recommend) {
                        database.books_recommendations[i].user_not_recommend = false
                        bookRecommendationObj.user_not_recommend = false
                        await Books.minusDontRecommend(book_id)
                    }

                    if(database.books_recommendations[i].user_recommend) {
                        database.books_recommendations[i].user_recommend = false
                        bookRecommendationObj.user_recommend = false
                        await Books.minusRecommend(book_id)
                    }

                    database.books_recommendations[i].user_recommend = true
                    bookRecommendationObj.user_recommend = true
                    await Books.plusRecommend(book_id)

                    await Books.save(database)
                    return bookRecommendationObj
                }
            }

            database.books_recommendations.push(bookRecommendationObj)

            await Books.save(database)

            return bookRecommendationObj

        } catch (error) {
            throw new Error(error)
        }
    }



    static async userDontRecommend(user_id, book_id){
        try {

            const bookRecommendationObj = {
                user_id,
                book_id,
                user_recommend: true,
                user_not_recommend: false,
                total_recommend: await Books.getTotalRecommend(book_id),
                total_dont_recommend: await Books.getTotalNotRecommend(book_id)
            }

            for(let i=0; i < database.books_recommendations.length; i++){

                if(database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === book_id){

                    if(database.books_recommendations[i].user_not_recommend) {
                        database.books_recommendations[i].user_not_recommend = false
                        bookRecommendationObj.user_not_recommend = false
                        await Books.minusDontRecommend(book_id)
                    }

                    if(database.books_recommendations[i].user_recommend) {
                        database.books_recommendations[i].user_recommend = false
                        bookRecommendationObj.user_recommend = false
                        await Books.minusRecommend(book_id)
                    }

                    database.books_recommendations[i].user_not_recommend = true
                    bookRecommendationObj.user_not_recommend = true
                    await Books.plusDontRecommend(book_id)

                    Books.save(database)
                    return bookRecommendationObj
                }
            }

            database.books_recommendations.push(bookRecommendationObj)

            await Books.save(database)

            return bookRecommendationObj

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Books;
