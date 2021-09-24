/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/MYSQL/Games.js
 */


import DateTime from '../../helpers/DateTime.js'
import MYSQL from '../../config/mysql.js'


class Games {


    static async getAll(){
        let stmt = "SELECT * FROM games";

        const [ rows ] = await MYSQL.execute(stmt);

        console.log(rows)

        return rows ? rows : false
    }


    static async getTotal(){
        let stmt = "SELECT COUNT(id) as totalGames FROM games";

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows[0].totalGames : false
    }


    static async getRandom(){
        let stmt = `SELECT * FROM games ORDER BY RAND() LIMIT 1;`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows : false
    }


    static async getByID(game_id){
        let stmt = `SELECT * FROM games WHERE id = ${game_id}`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows ? rows : false
    }


    static async create(gameObject){
        let stmt = `INSERT INTO games
                                (title,
                                year_release,
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
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        let data = [
            gameObject.title,
            gameObject.year_release,
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

        return rows ? rows : false
    }


    static async update(gameObject){
        let stmt = `UPDATE games
                    SET
                        title = '${gameObject.title}',
                        year_release = '${gameObject.year_release}',
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

        return rows ? rows : false
    }


    static async delete(game_id){
        let stmt = `DELETE FROM games WHERE id = '${game_id}'`;

        const [ rows ] = await MYSQL.execute(stmt);

        return rows.affectedRows ? `GAME ID ${game_id} DELETED!` : `GAME ID ${game_id} NOT Deleted!`
    }
}

export default Games
