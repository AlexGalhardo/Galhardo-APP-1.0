/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Games.js
 */

const fs = require('fs-extra')
const DateTime = require('../../helpers/DateTime');

const database = require('../../config/json_database');



class Games {

	static save(database){
		for(let i = 0; i < database.games.length; i++){
			database.games[i].id = i+1
		}

	    fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	        if (error) {
	            throw new Error(error)
	        }
	    });
	}

    static getStripePriceID(game_id){
        const arrayGamesPriceIDs = ['price_1JZklOHoneB4ZvrpPyYSucdx', 'price_1JZkqGHoneB4Zvrp4snvuFTb', 'price_1JZkvHHoneB4ZvrpdheMheEq', 'price_1JZkk4HoneB4ZvrpYI0ZB2qp', 'price_1JZkjGHoneB4ZvrpL87M48FC', 'price_1JZkrbHoneB4ZvrpecsIBSU2', 'price_1JZkquHoneB4ZvrpW0hit0Pw', 'price_1JZkseHoneB4ZvrpQJITiBkz', 'price_1JZkpPHoneB4Zvrpx2xALFfi', 'price_1JZkmuHoneB4ZvrpcLw7HdWd', 'price_1JZktsHoneB4ZvrpxL7yf7sm']

        return arrayGamesPriceIDs[game_id-1]
    }

	static getAll()  {
		try {
	        return database.games
	    } catch (error) {
	        throw new Error(error)
	    };
	}


	static getTotal()  {
		try {
	        return database.games.length
	    } catch (error) {
	        throw new Error(error)
	    };
	}


	static async getRandom()  {
		try {
			const totalGames = await Games.getTotal()

            const random_game_index = Math.floor(Math.random() * totalGames)

            if(SESSION_USER){
                database.games[random_game_index].userLoggedRecommend = await Games.verifyIfLoggedUserRecommendThisGame(SESSION_USER.id, random_game_index+1)

                database.games[random_game_index].userLoggedNotRecommend = await Games.verifyIfLoggedUserNotRecommendThisGame(SESSION_USER.id, random_game_index+1)
            }
            else {
                database.games[random_game_index].userLoggedRecommend = "btn-outline-success"
                database.games[random_game_index].userLoggedNotRecommend = "btn-outline-danger"
            }

            return database.games[random_game_index]
	    } catch (error) {
	      	throw new Error(error)
	    };
	}


    static verifyIfLoggedUserRecommendThisGame(user_id, game_id){
        try {
            for(let i=0; i < database.games_recommendations.length; i++){
                if(
                    database.games_recommendations[i].user_id === user_id
                    &&
                    database.games_recommendations[i].game_id === parseInt(game_id)
                    )
                {
                    if(database.games_recommendations[i].user_recommend) return "btn-success"
                }
            }
            return "btn-outline-success"
        } catch (error) {
            throw new Error(error);
        }
    }


    static verifyIfLoggedUserNotRecommendThisGame(user_id, game_id){
        try {
            for(let i=0; i < database.games_recommendations.length; i++){
                if(
                    database.games_recommendations[i].user_id === user_id
                    &&
                    database.games_recommendations[i].game_id === parseInt(game_id)
                    )
                {
                    if(database.games_recommendations[i].user_not_recommend) return "btn-danger"
                }
            }
            return "btn-outline-danger"
        } catch (error) {
            throw new Error(error);
        }
    }


	static getByID(game_id) {
		try {
      		for(let i=0; i < database.games.length; i++){
        		if(database.games[i].id == game_id){
        			return database.games[i]
        		}
      		}
      		return null
    	} catch (error) {
      		throw new Error(error)
    	}
	}


	static async create(gameObject) {
		try {
			gameObject.id = database.games.length + 1
            bookObject.recommend = 0
            bookObject.not_recommend = 0
			gameObject.updated_at = DateTime.getNow()
			gameObject.created_at = DateTime.getNow()

            database.games.push(gameObject)

            await Games.save(database)

            return gameObject
    	} catch (error) {
      		throw new Error(error)
    	}
	}



	static update(gameObject) {
		try {
      		
      		for(let i=0; i < database.games.length; i++){
        		
        		if(database.games[i].id === gameObject.id){
        			
        			// refactor this shit later
        			if(gameObject.title) database.games[i].title = gameObject.title
	                if(gameObject.year_release) database.games[i].year_release = gameObject.year_release
	                if(gameObject.resume) database.games[i].resume = gameObject.resume
	                if(gameObject.image) database.games[i].image = gameObject.image
	                if(gameObject.igdb_link) database.games[i].igdb_link = gameObject.igdb_link
	                if(gameObject.igdb_rating) database.games[i].igdb_rating = gameObject.igdb_rating
	                if(gameObject.platforms) database.games[i].platforms = gameObject.platforms
	                if(gameObject.developer) database.games[i].developer = gameObject.developer
	                if(gameObject.genres) database.games[i].genres = gameObject.genres
	                if(gameObject.amazon_link) database.games[i].amazon_link = gameObject.amazon_link
        			
        			database.games[i].updated_at = DateTime.getNow()
        			
        			Games.save(database)
        			
        			return database.games[i]
        		}
      		}
      		return null
    	} catch (error) {
            throw new Error(error)
    	}
	}


    /**
     * Games.delete(parseInt(game_id))
     */
	static delete(game_id){
		try {
      		for(let i=0; i < database.games.length; i++){
        		if(database.games[i].id === game_id){
        			database.games.splice(i, 1)
        			Games.save(database, "Error deleteGameByID: ")
        			return `Game ID ${game_id} Deleted!`
        		}
      		}
      		return `Game ID ${game_id} NOT Deleted!`
    	} catch (error) {
      		throw new Error(error)
    	}
	}


    static searchTitle(game_title){
        try {

            const searchedGames = database.games.filter(game => game.title.toLowerCase().indexOf(game_title.toLowerCase()) > -1);

            return searchedGames
        } catch (error) {
            throw new Error(error)
        }
    }


    static async plusRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    database.games[i].recommend += 1
                    await Games.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async minusRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    if(database.games[i].recommend > 0){
                        database.games[i].recommend -= 1
                    }
                    await Games.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async plusNotRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    database.games[i].not_recommend += 1
                    await Games.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }


    static async minusNotRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    if(database.games[i].not_recommend > 0){
                        database.games[i].not_recommend -= 1
                    }
                    await Games.save(database)
                    return
                }
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    static getTotalRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    return database.games[i].recommend
                }
            }
            return 0
        } catch (error) {
            throw new Error(error)
        }
    }

    static getTotalNotRecommend(game_id){
        try {
            for(let i=0; i < database.games.length; i++){
                if(database.games[i].id === game_id){
                    return database.games[i].not_recommend
                }
            }
            return 0
        } catch (error) {
            throw new Error(error)
        }
    }



    static async userRecommend(user_id, game_id){
        try {

            const response = {
                user_id,
                game_id,
                user_recommend: true,
                user_not_recommend: false,
                total_recommend: await Games.getTotalRecommend(game_id),
                total_not_recommend: await Games.getTotalNotRecommend(game_id)
            }

            for(let i=0; i < database.games_recommendations.length; i++){

                if(
                    database.games_recommendations[i].user_id === user_id
                    &&
                    database.games_recommendations[i].game_id === game_id
                ){

                    if(database.games_recommendations[i].user_not_recommend){
                        database.games_recommendations[i].user_not_recommend = false
                        response.user_not_recommend = false
                        await Games.minusNotRecommend(game_id)
                        response.total_not_recommend-=1
                    }

                    if(!database.games_recommendations[i].user_recommend){
                        database.games_recommendations[i].user_recommend = true
                        response.user_recommend = true
                        await Games.plusRecommend(game_id)
                        response.total_recommend+=1
                    } else {
                        database.games_recommendations[i].user_recommend = false
                        response.user_recommend = false
                        await Games.minusRecommend(game_id)
                        response.total_recommend-=1
                    }

                    await Games.save(database)
                    return response
                }
            }

            database.games_recommendations.push({
                user_id,
                game_id,
                user_recommend: true,
                user_not_recommend: false,
            })

            await Games.plusRecommend(game_id)
            await Games.save(database)

            response.total_recommend+=1

            return response

        } catch (error) {
            throw new Error(error)
        }
    }



    static async userNotRecommend(user_id, game_id){
        try {

            const response = {
                user_id,
                game_id,
                user_recommend: false,
                user_not_recommend: true,
                total_recommend: await Games.getTotalRecommend(game_id),
                total_not_recommend: await Games.getTotalNotRecommend(game_id)
            }

            for(let i=0; i < database.games_recommendations.length; i++){

                if(
                    database.games_recommendations[i].user_id === user_id
                    &&
                    database.games_recommendations[i].game_id === game_id
                ){

                    if(database.games_recommendations[i].user_recommend){
                        database.games_recommendations[i].user_recommend = false
                        response.user_recommend = false
                        await Games.minusRecommend(game_id)
                        response.total_recommend-=1
                    }

                    if(!database.games_recommendations[i].user_not_recommend){
                        database.games_recommendations[i].user_not_recommend = true
                        response.user_not_recommend = true
                        await Games.plusNotRecommend(game_id)
                        response.total_not_recommend+=1
                    } else {
                        database.games_recommendations[i].user_not_recommend = false
                        response.user_not_recommend = false
                        await Games.minusNotRecommend(game_id)
                        response.total_not_recommend-=1
                    }

                    await Games.save(database)
                    return response
                }
            }

            database.games_recommendations.push({
                user_id,
                game_id,
                user_recommend: false,
                user_not_recommend: true,
            })

            await Games.plusNotRecommend(game_id)
            await Games.save(database)

            response.total_not_recommend+=1

            return response

        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Games;
