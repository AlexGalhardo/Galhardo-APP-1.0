const MySQL = require("../mysql");
const Bcrypt = require('../helpers/Bcrypt');

const Users = {
	getUserByID: async function(userID){
		const [row] = await MySQL.execute("SELECT * FROM `users` WHERE `id`=?", [userID]);
	    if (row.length === 1) {
	        return row[0];
	    }
	    return null;
	},

	postLogin: async function(email, password){
		const [row] = await MySQL.execute('SELECT * FROM `users` WHERE `email`=?', [email]);
		if (row.length != 1) {
            return false;
        }

        const passwordValid = await Bcrypt.comparePassword(password, row[0].password);
        if (!passwordValid) {
	        return false;
	    }
	    return row[0].id;
	},
};

module.exports = Users;