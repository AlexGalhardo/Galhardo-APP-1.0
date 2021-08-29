const knex = require('knex')
const sqliteConfig = require('../../config/sqlite')

const db = knex(sqliteConfig.development)

class Books {

    find(){
        return db('books')
    }

    findById(id){
        return db('books').where({id: Number(id)})
    }

    store(book){
        return db('books').insert(book).then(ids => ({id: ids[0]}))
    }

    update(id, book){
        return db('books').where('id', Number(id)).update(post)
    }

    remove(id){
        return db('books').where('id', Number(id)).del();
    }
}

module.exports = Books;
