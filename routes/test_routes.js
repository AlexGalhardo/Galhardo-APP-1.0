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
  .get('/test/logger', (req, res) => {
    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    res.send("Logger tested");
  });

module.exports = router;