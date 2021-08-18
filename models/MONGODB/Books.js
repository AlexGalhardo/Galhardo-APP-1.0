const { Schema, model, connection } = require('mongoose')

const schema = new Schema({
	title: { type: String, required: true },
	year_release: Number,
	pages: Number,
	author: String,
	resume: String,
	amazon_link: String,
	image: String,
	genres: String
})

const modelName = 'Books'

module.exports = (connection && connection.models[modelName]) 
?
	connection.models[modelName]
:
	model(modelName, schema)