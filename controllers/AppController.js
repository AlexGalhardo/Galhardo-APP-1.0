/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/
 */

const bodyParser = require('body-parser');


// HELPERS
const NodeMailer = require('../helpers/NodeMailer');
const TelegramBOTLogger = require('../helpers/TelegramBOTLogger');
const Header = require('../helpers/Header');


const Games = require('../models/JSON/Games');
// const Games = require('../models/MONGODB/Games');
// const Games = require('../models/MYSQL/Games');
// const Games = require('../models/POSTGRES/Games');
// const Games = require('../models/SQLITE/Games');


const Books = require('../models/JSON/Books');
// const Books = require('../models/MONGODB/Books');
// const Books = require('../models/MYSQL/Books');
// const Books = require('../models/POSTGRES/Books');
// const Books = require('../models/SQLITE/Books');



class AppController {

    static async getViewHome (req, res) {
        const game = await Games.getRandom()

        return res.render('pages/home', {
            game,
            user: SESSION_USER,
            header: Header.games()
        });
    }

    static async getViewBooks (req, res){
        const book = await Books.getRandom()

        return res.render('pages/books', {
            book,
            user: SESSION_USER,
            header: Header.books()
        });
    }

    static getViewContact (req, res){
        res.render('pages/contact', {
            user: SESSION_USER,
            header: Header.contact()
        });
    }


    static async postContact (req, res){
        try {
            const { name,
                    email,
                    subject,
                    message } = req.body;

            const contactObject = {
                name,
                email,
                subject,
                message
            }

            await NodeMailer.sendContact(contactObject)
            await TelegramBOTLogger.logContact(contactObject)

            return res.render('pages/contact', {
                flash: {
                    type: 'success',
                    message: 'Message Send!'
                },
                user: SESSION_USER,
                header: Header.contact()
            });
        }
        catch(err){
            return res.render('pages/contact', {
                flash: {
                    type: 'danger',
                    message: err
                },
                user: SESSION_USER,
                header: Header.contact()
            });
        }
    }

    static getViewPrivacy (req, res){
        return res.render('pages/privacy', {
            user: SESSION_USER,
            header: Header.privacy()
        });
    }
};

module.exports = AppController;
