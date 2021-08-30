/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 * ./helpers/Upload.js
 */


const { unlink } = require('fs/promises');
const sharp = require('sharp')

const multer = require("multer");
const multerConfig = require("../config/multer");

const Users = require('../models/JSON/Users')
// const Users = require('../models/MONGODB/Users')
// const Users = require('../models/MYSQL/Users')
// const Users = require('../models/POSTGRES/Users')
// const Users = require('../models/SQLITE/Users')


class Upload {

	static async profileAvatar(req){
        console.log(req.body, req.body.avatar, req.body.file)

        if(req.file){
            const filename = `${req.file.filename}.jpg`;

            await sharp(req.file.path)
                .resize(200, 200)
                .toFormat('jpeg')
                .toFile(`./public/uploads/avatars/${filename}`)

            await unlink(req.file.path);

            console.log(`${req.file.filename}.jpg`)
            Users.updateAvatarName(`${req.file.filename}.jpg`, req.session.userID)
        } else {
            res.status(400);
            return res.json({error: 'Arquivo inválido.'})
        }
	}

}

module.exports = Upload;
