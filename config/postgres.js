const { Sequelize } = require('sequelize');

// FOR LOCALL POSTGRESQL
const sequelize = new Sequelize(
	process.env.PG_DB,
	process.env.PG_USER,
	process.env.PG_PASSWORD,
	{
		host: process.env.PG_HOST, // localhost OR DOCKER IPv4_ADDRESS HERE
		dialect: 'postgres',
		port: parseInt(process.env.PG_PORT)
	}
);

// FOR POSTGRE AS A SERVICE
// const sequelize = new Sequelize(`${process.env.PG_URL}`)

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_URL,
  searchPath: ['knex', 'public'],
});

module.exports = sequelize;