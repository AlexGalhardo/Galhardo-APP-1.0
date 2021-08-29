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

	static save(database, error_message){
		for(let i = 0; i < database.games.length; i++){
			database.games[i].id = i+1
		}

	    fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	      if (error) {
	        console.log(`Error writing file in ${process.env.JSON_DATABASE_FILE}: `, error);
	        return false
	      }
	    });
	    return true
	}

	static getAll()  {
		try {
	      return database.games
	    } catch (error) {
	      return console.log("ERROR getAllGames: ", error);
	    };
	}

	static getTotal()  {
		try {
	      return database.games.length
	    } catch (error) {
	      console.log("ERROR getTotalGames: ", error);
	      return 0
	    };
	}

	static getRandom()  {
		try {
			const totalGames = Games.getTotalGames()
		
			const random_game_index = Math.floor(Math.random() * totalGames) + 1 

	      	return database.games[random_game_index-1]
	    } catch (error) {
	      	return console.log("ERROR getRandomGame: ", error);
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
      		return console.log("ERROR getGameByTitle: ", error);
    	}
	}


	static create(gameObject) {
		try {
			gameObject.id = database.games.length + 1
			gameObject.updated_at = DateTime.getNow()
			gameObject.created_at = DateTime.getNow()
			database.games.push(gameObject)
			Games.save(database, "Error createGame: ")
			return gameObject
    	} catch (error) {
      		return console.log("ERROR createGame: ", error);
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
        			
        			Games.save(database, "Error updateGameByID: ")
        			
        			return database.games[i]
        		}
      		}
      		return "Game NOT Updated!"
    	} catch (error) {
      		return console.log("ERROR updateGameByID: ", error);
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
      		return console.log("ERROR deleteGameByID: ", error);
    	}
	}
}

module.exports = Games;
