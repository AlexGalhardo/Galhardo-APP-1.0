/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/POSTGRES/Games.js
 */

const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../../config/postgres.js');


const GameModel = sequelize.define('GameModel', {
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



class Games {
	static getAll(){}
    static getTotal(){}
    static getRandom(){}
    static getByID(game_id){}
    static create(gameObject){}
    static update(gameObject){}
    static delete(game_id){}
}

module.exports = Games;
