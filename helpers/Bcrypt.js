/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/Bcrypt.js
 */

const bcrypt = require('bcryptjs');



class Bcrypt {
    
    static cryptPassword (password) {
        return bcrypt.genSalt(12)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash)
    }

    static comparePassword (password, hashPassword) {
        return bcrypt.compare(password, hashPassword)
        .then(resp => resp)
    }
};

module.exports = Bcrypt;
