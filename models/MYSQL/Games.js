/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Games.js
 */


// HELPERS
const DateTime = require('../../helpers/DateTime');

// CONFIG
const MYSQL = require('../../config/mysql');


class Games {

    static async selectAll()  {
        try {
            let stmt = `SELECT *
                        FROM games`;

            const [ rows ] = await MYSQL.execute(stmt)

            console.log('selectAll: ', rows ? rows : null)

            // return rows ? rows : null

        } catch (error) {
            throw new Error(error);
        };
    }


    static async getTotal()  {
        try {
            let stmt = "SELECT COUNT(id) as totalGames FROM games";

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getTotal: ', rows ? rows[0].totalGames : false)

            // return rows ? rows[0].totalGames : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async getRandom()  {
        try {
            let stmt = `SELECT * FROM games ORDER BY RAND() LIMIT 1;`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('getRandom: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        };
    }


    static async selectByID(game_id) {
        try {
            let stmt = `SELECT * FROM games WHERE id = ${game_id}`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('selectByID: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async create(gameObject) {
        try {
            let stmt = `INSERT INTO games
                                (title,
                                year_release,
                                price,
                                resume,
                                image,
                                igdb_link,
                                igdb_rating,
                                platforms,
                                developer,
                                genres,
                                amazon_link,
                                created_at,
                                updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let data = [
                gameObject.title,
                gameObject.year_release,
                gameObject.price,
                gameObject.resume,
                gameObject.image,
                gameObject.igdb_link,
                gameObject.igdb_rating,
                gameObject.platforms,
                gameObject.developer,
                gameObject.genres,
                gameObject.amazon_link,
                DateTime.getNow(),
                DateTime.getNow()
            ];

            const [ rows ] = await MYSQL.execute(stmt, data);

            rows.affectedRows ?  console.log(`GAME: ${gameObject.title} CREATED!`) : console.log(`GAME: ${gameObject.title} NOT CREATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async update(gameObject) {
        try {
            let stmt = `UPDATE games
                    SET
                        title = '${gameObject.title}',
                        year_release = '${gameObject.year_release}',
                        price = '${gameObject.price}',
                        resume = '${gameObject.resume}',
                        image = '${gameObject.image}',
                        igdb_link = '${gameObject.igdb_link}',
                        igdb_rating = '${gameObject.igdb_rating}',
                        platforms = '${gameObject.platforms}',
                        developer = '${gameObject.developer}',
                        genres = '${gameObject.genres}',
                        amazon_link = '${gameObject.amazon_link}',
                        updated_at = '${DateTime.getNow()}'
                    WHERE
                        id = '${gameObject.id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            rows.affectedRows ? console.log(`GAME ID: ${gameObject.id} UPDATED!`) : console.log(`GAME ID: ${gameObject.id} NOT UPDATED!`)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error);
        }
    }


    static async delete(game_id){
        try {
            let stmt = `DELETE FROM games WHERE id = '${game_id}'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('delete: ', rows.affectedRows ? `GAME_ID: ${game_id} DELETED!` : `GAME_ID ${game_id} NOT Deleted!`)

        } catch (error) {
            throw new Error(error);
        }
    }


    static async searchTitle(game_title){
        try {
            let stmt = `SELECT * FROM games WHERE title LIKE '%${game_title}%'`;

            const [ rows ] = await MYSQL.execute(stmt);

            console.log('searchTitle: ', rows ? rows : false)

            // return rows ? rows : false
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Games;
