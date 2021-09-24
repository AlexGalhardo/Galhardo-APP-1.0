/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/Games.js
 */

import fs from 'fs-extra'
import DateTime from '../../helpers/DateTime.js'

import database from '../../config/json_database.js'



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

            return database.games[random_game_index]
	    } catch (error) {
	      	throw new Error(error)
	    };
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
}

export default Games;
