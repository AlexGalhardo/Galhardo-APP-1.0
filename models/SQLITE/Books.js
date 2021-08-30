/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./models/SQLITE/Books.js
 */

const knex = require('knex')
const sqliteConfig = require('../../config/sqlite')

const db = knex(sqliteConfig.development)

class Books {
    static async getAll(){return db('books')}
    static async getByID(book_id){return db('books').where({id: Number(id)})}
    static async create(bookObject) {return db('books').insert(book).then(ids => ({id: ids[0]}))}
    static async update(bookObject){return db('books').where('id', Number(id)).update(post)}
    static async delete(book_id){return db('books').where('id', Number(id)).del();}
}

module.exports = Books;
