/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MONGODB/Games.js
 */

const { Schema, model, connection, SchemaTypes } = require('mongoose')

const schema = new Schema({
	// _id: SchemaTypes.ObjectId,
	title: { type: String }, //required: true },
	year_release: Number,
	resume: String,
	image: String,
	igdb_link: String,
	igdb_rating: Number,
	platforms: String,
	developer: String,
	genres: String,
	amazon_link: String,
	created_at: String,
	updated_at: String
})

const modelName = 'Games'

const GamesSchema = (connection && connection.models[modelName]) 
?
	connection.models[modelName]
:
	model(modelName, schema)


class Games {

	static async create(gameObject){
		let newGame = await GamesSchema.create(gameObject)
		return newGame
	}

	static async update(gameObject){
		let game = await GamesSchema.findOne({_id: gameObject.id})
		
		game.title = gameObject.title
		game.year_release = gameObject.year_release
        game.image = gameObject.image
        game.amazon_link = gameObject.amazon_link
        game.resume = gameObject.resume
        game.pages = gameObject.pages
        game.genres = gameObject.genres
        game.author = gameObject.author
        game.updated_at = gameObject.updated_at
		
		await game.save()
		
		return game
	}

	static async delete(game_id){
		await GamesSchema.findOneAndDelete({"_id": game_id})
	}
}


module.exports = Games;
