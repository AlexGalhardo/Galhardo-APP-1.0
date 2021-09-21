/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/JSON/ShopCart.js
 */

import fs from 'fs-extra'
import DateTime from '../../helpers/DateTime.js'

import slugify from 'slugify'

import database from '../../config/json_database.js'



class ShopCart {

    static save(database, error_message){
        fs.writeFileSync(process.env.JSON_DATABASE_FILE, JSON.stringify(database, null, 2), error => {
            if (error) {
                throw new Error(error)
            }
        });
        return true
    }


}

export default ShopCart
