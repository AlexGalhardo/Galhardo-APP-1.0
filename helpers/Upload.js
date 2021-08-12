const formidable = require('formidable')
var fs = require('fs')

const Users = require('../models/JSON/Users')

class Upload {

	static avatarProfile(req){

		const { avatar } = req.body

		var form = new formidable.IncomingForm();

		form.parse(req, function (err, fields, files) {
	    	var oldpath = files.avatar.path;
	      	
	      	var newpath = `${APP_ROOT_PATH}/public/uploads/avatars/${req.session.userID}_${files.avatar.name}`;
	      	
	      	fs.rename(oldpath, newpath, function (err) {
	        	if (err) throw err;
	        })

	        Users.updateAvatarName(`${req.session.userID}_${files.avatar.name}`, req.session.userID);
	    });
	}

}

module.exports = Upload;