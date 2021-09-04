/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin/game
 */


// helpers
const DateTime = require('../../helpers/DateTime')

// MODEL
const Games = require(`../../models/${process.env.APP_DATABASE}/Games`)




class APIAdminGameController {

    /**
     * http://localhost:3000/api/admin/game/create
     */
    static async postCreateGame(req, res){

        const {
            title,
            year_release,
            resume,
            image,
            igdb_link,
            igdb_rating,
            platforms,
            developer,
            genres,
            amazon_link
        } = req.body

        const gameObject = {
            title,
            year_release,
            resume,
            image,
            igdb_link,
            igdb_rating,
            platforms,
            developer,
            genres,
            amazon_link,
            created_at: DateTime.getNow(),
            updated_at: DateTime.getNow()
        }

        const gameCreated = await Games.create(gameObject)

        gameObject.id = gameCreated.insertId

        if(gameCreated) return res.json(gameCreated)

        return res.json({ error: 'Game NOT Created!'})
    }



    /**
     * http://localhost:3000/api/admin/game/patch/:game_id
     */
    static async patchGame(req, res, next){
        try {
            const game_id = req.params.game_id

            const {
                title,
                year_release,
                resume,
                image,
                igdb_link,
                igdb_rating,
                platforms,
                developer,
                genres,
                amazon_link
            } = req.body

            const gameObject = {
                id: game_id,
                title,
                year_release,
                resume,
                image,
                igdb_link,
                igdb_rating,
                platforms,
                developer,
                genres,
                amazon_link,
                updated_at: DateTime.getNow()
            }
            
            const gameUpdated = await Games.update(gameObject)
            
            return res.json({
                gameUpdated
            });            
        }
        catch(err){
            next(err);
        }
    }



    /**
     * http://localhost:3000/api/admin/game/delete/:game_id
     */
    static async deleteGame(req, res, next){
        try {
            const game_id = req.params.game_id
            
            const gameDeleted = await Games.delete(game_id)

            return res.json({
                status: gameDeleted
            });        
        }
        catch(err){
            next(err);
        }
    }

}

module.exports = APIAdminGameController;
