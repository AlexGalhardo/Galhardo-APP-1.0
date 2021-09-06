/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/
 */

const { validationResult } = require("express-validator");

// HELPERS
const NodeMailer = require('../helpers/NodeMailer');
const TelegramBOTLogger = require('../helpers/TelegramBOTLogger');
const Header = require('../helpers/Header');


// MODELS
const Games = require(`../models/${process.env.APP_DATABASE}/Games`)
const Books = require(`../models/${process.env.APP_DATABASE}/Books`)



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
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
            book,
            user: SESSION_USER,
            app_url: process.env.APP_URL,
            header: Header.books()
        });
    }

    static getViewContact (req, res){
        res.render('pages/contact', {
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning'),
            user: SESSION_USER,
            header: Header.contact(),
            captcha: res.recaptcha,
            csrfToken: req.csrfToken()
        });
    }


    static async postContact (req, res){
        try {

            const errors = validationResult(req);

            if (!req.recaptcha.error) {
                if (!errors.isEmpty()) {
                    req.flash('warning', `${errors.array()[0].msg}`)
                    return res.redirect('/contact')
                }
            } else {
                req.flash('warning', `Invalid Recaptcha!`)
                return res.redirect('/contact')
            }

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


    static getViewCriptoBOT(req, res){
        return res.render('pages/criptoBOT', {
            user: SESSION_USER,
            header: Header.criptoBOT()
        });
    }


    static getViewPrivacy (req, res){
        return res.render('pages/privacy', {
            user: SESSION_USER,
            header: Header.privacy()
        });
    }


    static async getSearchGameTitle(req, res){
        const searchGameTitle = req.query.title;

        if(!searchGameTitle){
            return res.redirect('/')
        }

        const searchedGames  = await Games.searchTitle(searchGameTitle)

        if(!searchedGames.length){
            req.flash('warning', 'No games found from this game title search! Recommending a random game...')
            return res.redirect('/')
        }

        if(searchedGames.length > 1){
            searchedGames[0].firstGame = true
            return res.render('pages/home', {
                flash_success: `${searchedGames.length} Games Found For Search Title: ${searchGameTitle.toUpperCase()}`,
                games: searchedGames,
                user: SESSION_USER,
                header: Header.games()
            });
        }

        return res.render('pages/home', {
            flash_success: `1 Game Found From Search Title: ${searchGameTitle.toUpperCase()}`,
            game: searchedGames[0],
            user: SESSION_USER,
            header: Header.games()
        });
    }



    static async getSearchBookTitle(req, res){
        const searchBookTitle = req.query.title;

        if(!searchBookTitle){
            return res.redirect('/books')
        }

        const searchedBooks  = await Books.searchTitle(searchBookTitle)

        if(!searchedBooks.length){
            req.flash('warning', 'No books found from this book title search! Recommending a random book...')
            return res.redirect('/books')
        }

        if(searchedBooks.length > 1){
            searchedBooks[0].firstBook = true
            return res.render('pages/books', {
                flash_success: `${searchedBooks.length} Books Found For Search Title: ${searchBookTitle.toUpperCase()}`,
                books: searchedBooks,
                user: SESSION_USER,
                header: Header.books()
            });
        }

        return res.render('pages/books', {
            flash_success: `1 Book Found From Search Title: ${searchBookTitle.toUpperCase()}`,
            book: searchedBooks[0],
            user: SESSION_USER,
            header: Header.books()
        });
    }


    static async recommendBook(req, res){
        const { book_id, user_id } = req.params
        const response = await Books.userRecommend(user_id, parseInt(book_id))
        console.log(response)
        return res.json(response)
    }


    static async dontRecommendBook(req, res){
        const { book_id, user_id } = req.params
        const response = await Books.userNotRecommend(user_id, parseInt(book_id))
        console.log(response)
        return res.json(response)
    }
};

module.exports = AppController;
