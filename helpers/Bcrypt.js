const bcrypt = require('bcrypt');

const Bcrypt = {
    cryptPassword: (password) =>
        bcrypt.genSalt(12)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash),

    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
        .then(resp => resp)
};

module.exports = Bcrypt;