const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../instances/pg');

const Books = sequelize('Books', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER
	},
	title: {
		type: DataTypes.STRING
	},
	resume: {
		type: DataTypes.STRING
	}
}, {
	tableName: 'books',
	timestamps: true
});

module.exports = Books;