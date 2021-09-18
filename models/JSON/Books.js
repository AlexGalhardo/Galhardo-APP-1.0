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


	static async getRandom()  {
		try {
			const totalBooks = Books.getTotal()

            const random_book_index = Math.floor(Math.random() * totalBooks)

            if(SESSION_USER){
                database.books[random_book_index].userLoggedRecommend = await Books.verifyIfLoggedUserRecommendThisBook(SESSION_USER.id, random_book_index+1)

                database.books[random_book_index].userLoggedNotRecommend = await Books.verifyIfLoggedUserNotRecommendThisBook(SESSION_USER.id, random_book_index+1)
            }
            else {
                database.books[random_book_index].userLoggedRecommend = "btn-outline-success"
                database.books[random_book_index].userLoggedNotRecommend = "btn-outline-danger"
            }

            return database.books[random_book_index]
        } catch (error) {
	      	throw new Error(error);
	    };
	}


    static verifyIfLoggedUserRecommendThisBook(user_id, book_id){
        try {
            for(let i=0; i < database.books_recommendations.length; i++){
                if(
                    database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === parseInt(book_id)
                    )
                {
                    if(database.books_recommendations[i].user_recommend) return "btn-success"
                }
            }
            return "btn-outline-success"
        } catch (error) {
            throw new Error(error);
        }
    }


    static verifyIfLoggedUserNotRecommendThisBook(user_id, book_id){
        try {
            for(let i=0; i < database.books_recommendations.length; i++){
                if(
                    database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === parseInt(book_id)
                    )
                {
                    if(database.books_recommendations[i].user_not_recommend) return "btn-danger"
                }
            }
            return "btn-outline-danger"
        } catch (error) {
            throw new Error(error);
        }
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


	static async create(bookObject) {
		try {
			bookObject.id = database.books.length + 1
            bookObject.recommend = 0
            bookObject.not_recommend = 0
			bookObject.updated_at = DateTime.getNow()
			bookObject.created_at = DateTime.getNow()
			
			database.books.push(bookObject)
			
			await Books.save(database)
			
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
        			
        			Books.save(database)
        			
        			return database.books[i]
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error);
    	}
	}



	static async delete(book_id){
		try {
      		for(let i=0; i < database.books.length; i++){
        		if(database.books[i].id === book_id){
        			database.books.splice(i, 1)
        			await Books.save(database)
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

    static async plusRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].recommend += 1
                    await Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async minusRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    if(database.books[i].recommend > 0){
                        database.books[i].recommend -= 1
                    }
                    await Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async plusNotRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    database.books[i].not_recommend += 1
                    await Books.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async minusNotRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    if(database.books[i].not_recommend > 0){
                        database.books[i].not_recommend -= 1
                    }
                    await Books.save(database)
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
                    return database.books[i].recommend
                }
            }
            return 66
        } catch (error) {
            throw new Error(error)
        }
    }

    static getTotalNotRecommend(book_id){
        try {
            for(let i=0; i < database.books.length; i++){
                if(database.books[i].id === book_id){
                    return database.books[i].not_recommend
                }
            }
            return 99
        } catch (error) {
            throw new Error(error)
        }
    }



    static async userRecommend(user_id, book_id){
        try {

            const response = {
                user_id,
                book_id,
                user_recommend: true,
                user_not_recommend: false,
                total_recommend: await Books.getTotalRecommend(book_id),
                total_not_recommend: await Books.getTotalNotRecommend(book_id)
            }

            for(let i=0; i < database.books_recommendations.length; i++){

                if(
                    database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === book_id
                ){

                    if(database.books_recommendations[i].user_not_recommend){
                        database.books_recommendations[i].user_not_recommend = false
                        response.user_not_recommend = false
                        await Books.minusNotRecommend(book_id)
                        response.total_not_recommend-=1
                    }

                    if(!database.books_recommendations[i].user_recommend){
                        database.books_recommendations[i].user_recommend = true
                        response.user_recommend = true
                        await Books.plusRecommend(book_id)
                        response.total_recommend+=1
                    } else {
                        database.books_recommendations[i].user_recommend = false
                        response.user_recommend = false
                        await Books.minusRecommend(book_id)
                        response.total_recommend-=1
                    }

                    await Books.save(database)
                    return response
                }
            }

            database.books_recommendations.push({
                user_id,
                book_id,
                user_recommend: true,
                user_not_recommend: false,
            })

            await Books.plusRecommend(book_id)
            await Books.save(database)

            response.total_recommend+=1

            return response

        } catch (error) {
            throw new Error(error)
        }
    }



    static async userNotRecommend(user_id, book_id){
        try {

            const response = {
                user_id,
                book_id,
                user_recommend: false,
                user_not_recommend: true,
                total_recommend: await Books.getTotalRecommend(book_id),
                total_not_recommend: await Books.getTotalNotRecommend(book_id)
            }

            for(let i=0; i < database.books_recommendations.length; i++){

                if(
                    database.books_recommendations[i].user_id === user_id
                    &&
                    database.books_recommendations[i].book_id === book_id
                ){

                    if(database.books_recommendations[i].user_recommend){
                        database.books_recommendations[i].user_recommend = false
                        response.user_recommend = false
                        await Books.minusRecommend(book_id)
                        response.total_recommend-=1
                    }

                    if(!database.books_recommendations[i].user_not_recommend){
                        database.books_recommendations[i].user_not_recommend = true
                        response.user_not_recommend = true
                        await Books.plusNotRecommend(book_id)
                        response.total_not_recommend+=1
                    } else {
                        database.books_recommendations[i].user_not_recommend = false
                        response.user_not_recommend = false
                        await Books.minusNotRecommend(book_id)
                        response.total_not_recommend-=1
                    }

                    await Books.save(database)
                    return response
                }
            }

            database.books_recommendations.push({
                user_id,
                book_id,
                user_recommend: false,
                user_not_recommend: true,
            })

            await Books.plusNotRecommend(book_id)
            await Books.save(database)

            response.total_not_recommend+=1

            return response

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Books;
