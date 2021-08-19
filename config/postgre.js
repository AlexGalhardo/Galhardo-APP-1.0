const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

/* FOR LOCALL POSTGRESQL
export const sequelize = new Sequelize(
	process.env.PG_DB as string,
	process.env.PG_USER as string,
	process.env.PG_PASSWORD as string,
	{
		dialect: 'postgres',
		port: parseInt(process.env.PG_PORT as string)
	}
);
*/

// FOR POSTGRE AS A SERVICE
export const sequelize = new Sequelize(`${process.env.PG_URL}`)