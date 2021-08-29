/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 * ./helpers/Upload.js
 */


const formidable = require('formidable')
var fs = require('fs')

const multer = require("multer");
const multerConfig = require("../config/multer");

const Users = require('../models/JSON/Users')
// const Users = require('../models/MONGODB/Users')
// const Users = require('../models/MYSQL/Users')
// const Users = require('../models/POSTGRES/Users')
// const Users = require('../models/SQLITE/Users')


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
