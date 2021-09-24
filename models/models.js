/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/models.js
 */

import dotenv from 'dotenv'; dotenv.config()

if(process.env.APP_DATABASE === "JSON"){
    import Users from './JSON/Users.js'
    import Games from './JSON/Games.js'
    import Books from './JSON/Books.js'
    import Blog from './JSON/Blog.js'
    import PagarmeModel from './JSON/PagarmeModel.js'

    export { Users, Games, Books, Blog, PagarmeModel }
}
else {
    import Users from './MYSQL/Users.js'
    import Games from './MYSQL/Games.js'
    import Books from './MYSQL/Books.js'
    import Blog from './MYSQL/Blog.js'
    import PagarmeModel from './MYSQL/PagarmeModel.js'

    export { Users, Games, Books, Blog, PagarmeModel }
}
