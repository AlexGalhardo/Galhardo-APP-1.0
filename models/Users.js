const MySQL = require("../mysql");
const Bcrypt = require('../helpers/Bcrypt');

const Users = {
	getUserByID: async (userID) => {
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

	createResetPasswordToken: async function(recoverPasswordToken, email){
		[rows] = await MySQL.execute(
            "UPDATE users SET resetPasswordToken = ? WHERE email = ?",
            [recoverPasswordToken, email]
        );

        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
	},

	passwordResetTokenIsValid: async (email, resetPasswordToken) => {
		// http://localhost:3000/resetPassword/aleexgvieira@gmail.com/tI02ndjswz3PCf8M
		// SELECT * FROM `users` WHERE `email`= ? AND `resetPasswordToken` = ?
		const [row] = await MySQL.execute('SELECT * FROM `users` WHERE `email`= ? AND `resetPasswordToken` = ?', 
			[email, resetPasswordToken]);
		
		if (row.length === 1) {
            return true;
        }
        return false;
	},

	resetPassword: async (email, newPassword) => {

		const passwordHash = await Bcrypt.cryptPassword(newPassword);
		console.log('new password hash é: ' + passwordHash);

		[rows] = await MySQL.execute(
            "UPDATE users SET password = ?, resetPasswordToken = null WHERE email = ?",
            [passwordHash, email]
        );

        if (rows.affectedRows === 1) {
            return true;
        }
        return false;
	}
};

module.exports = Users;