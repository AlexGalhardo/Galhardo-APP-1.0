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


// MODELS
const Games = require(`../../models/${process.env.GALHARDO_APP_DATABASE}/Games`)
const Books = require(`../../models/${process.env.GALHARDO_APP_DATABASE}/Books`)



class AppController {

    static async getViewHome (req, res) {
        const game = await Games.getRandom()

        return res.render('pages/home', {
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
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
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
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

            req.flash('success', 'Message Send!')
            return res.redirect('/contact')
        }
        catch(error){
            throw new Error(error)
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
