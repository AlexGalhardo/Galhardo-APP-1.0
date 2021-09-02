/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * TEST ROUTES
 * http://localhost:3000/test
 */

// INIT EXPRESS 
const router = require('express').Router()


const Logger = require('../config/winston');


// Test Logger
router
    .get('/logger', (req, res) => {
        Logger.error("This is an error log");
        Logger.warn("This is a warn log");
        Logger.info("This is a info log");
        Logger.http("This is a http log");
        Logger.debug("This is a debug log");

        res.send("Logger tested");
    })

    .get('/flash', (req, res) => {
        res.render('pages/tests/flash', {
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning')
        })
    })

    .get('/flash/success', (req, res) => {
        req.flash('success', 'SUCCESS!!');
        res.redirect('/test/flash');
    })

    .get('/flash/warning', (req, res) => {
        req.flash('warning', 'WARNING!!');
        res.redirect('/test/flash');
    })



module.exports = router;
