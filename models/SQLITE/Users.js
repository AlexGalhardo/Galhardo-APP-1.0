const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../../config/postgres.js');


const BookModel = sequelize.define('BookModel', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER
	},
	title: {
		type: DataTypes.STRING
	},
	year_release: {
		type: DataTypes.INTEGER
	},
	image: {
		type: DataTypes.STRING
	},
	amazon_link: {
		type: DataTypes.STRING
	},
	resume: {
		type: DataTypes.STRING
	},
	pages: {
		type: DataTypes.INTEGER
	},
	genres: {
		type: DataTypes.STRING
	},
	author: {
		type: DataTypes.STRING
	},
	created_at: {
		type: DataTypes.STRING
	},
	updated_at: {
		type: DataTypes.STRING
	}
}, {
	tableName: 'books',
	timestamps: false
});



class Books {
	
	static async getAllBooks(){
		let books = await BookModel.findAll({})
		return books
	}

	static async createBook (bookObject) {
		let bookCreated = await BookModel.create(bookObject)
		return bookCreated
	}

	static async updateBookByID(bookObject){
		let book = await BookModel.findByPk(bookObject.id)
		if(!book){
			return null
		}

		book.title = bookObject.title
		book.year_release = bookObject.year_release
		book.image = bookObject.image
		book.amazon_link = bookObject.amazon_link
		book.resume = bookObject.resume
		book.pages = bookObject.pages
		book.genres = bookObject.genres
		book.author = bookObject.author
		await book.save()

		return book
	}

	static async deleteBookByID(id){
		console.log(id)
		await BookModel.destroy({where: {id}})
	}
}

module.exports = Books;