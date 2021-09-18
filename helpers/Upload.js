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

const Users = require(`../models/${process.env.APP_DATABASE}/Users`)


class Upload {

	static async profileAvatar(req){
        if(req.file){
            const filename = `${req.file.filename}.jpg`;

            await sharp(req.file.path)
                .resize(200, 200)
                .toFormat('jpeg')
                .toFile(`./public/uploads/avatars/${filename}`)

            await unlink(req.file.path);

            await Users.updateAvatarName(`${req.file.filename}.jpg`, req.session.userID)
        } else {
            return res.status(400).json({error: 'Invalid file type.'})
        }
	}
}

module.exports = Upload;
