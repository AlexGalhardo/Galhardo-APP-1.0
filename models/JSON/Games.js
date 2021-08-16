const fs = require('fs-extra')
const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

const { JSON_DATABASE_FILE, database } = require('../../config/json_database');

class Games {

	static save(database, error_message){
		for(let i = 0; i < database.games.length; i++){
			database.games[i].id = i+1
		}

	    fs.writeFileSync(JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
	      if (error) {
	        console.log(`Error writing file in ${JSON_DATABASE_FILE}: `, error);
	        return false
	      }
	    });
	    return true
	}

	static getAllGames()  {
		try {
	      return database.games
	    } catch (error) {
	      return console.log("ERROR getAllGames: ", error);
	    };
	}

	static getTotalGames()  {
		try {
	      return database.games.length
	    } catch (error) {
	      return console.log("ERROR getTotalGames: ", error);
	    };
	}

	static getRandomGame()  {		
		try {
			const totalGames = Games.getTotalGames()
		
			const random_game_index = Math.floor(Math.random() * totalGames) + 1 

	      	return database.games[random_game_index-1]
	    } catch (error) {
	      	return console.log("ERROR getRandomGame: ", error);
	    };
	}

	static getGameByID(game_id) {
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


	static createGame(gameObject) {
		try {
			gameObject.updated_at = DateTime.getNow()
			gameObject.created_at = DateTime.getNow()
			database.games.push(gameObject)
			Games.save(database, "Error createGame: ")
			return gameObject
    	} catch (error) {
      		return console.log("ERROR createGame: ", error);
    	}
	}


	static updateGameByID(gameObject) {
		try {
      		for(let i=0; i < database.games.length; i++){
        		if(database.games[i].id === gameObject.id){
        			gameObject.updated_at = DateTime.getNow()
        			database.games.splice(i, 1, gameObject)
        			Games.save(database, "Error updateGameByID: ")
        			return gameObject
        		}
      		}
      		return null
    	} catch (error) {
      		return console.log("ERROR updateGameByID: ", error);
    	}
	}

	static deleteGameByID(game_id){
		try {
      		for(let i=0; i < database.games.length; i++){
        		if(database.games[i].id === game_id){
        			database.games.splice(i, 1)
        			Games.save(database, "Error deleteGameByID: ")
        			return true
        		}
      		}
      		return false
    	} catch (error) {
      		return console.log("ERROR deleteGameByID: ", error);
    	}
	}
}

module.exports = Games;