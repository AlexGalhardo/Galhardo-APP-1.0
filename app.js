/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 */

const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const { flash } = require('express-flash-message');
const compression = require('compression');
const cors = require('cors');
const morgan = require('./config/morgan');
const Logger = require('./config/winston');

// PWD ROOT
global.APP_ROOT_PATH = path.resolve(__dirname);


/*
 * with LocalHost HTTPS
 * Need to change .env APP_URL to https
 */
// const app = require("https-localhost")()

// with LocalHost HTTP
const app = express();


// Morgan + Winston Logging Setup
// Log all HTTP Requests in console.log()
// app.use(morgan("combined", { stream: Logger.stream.write }));
app.use(morgan)


// compress all responses
app.use(compression())

// CORS
app.use(cors())

// SESSION
app.use(session({
    name: 'session',
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// temporary session_user
global.SESSION_USER = null;


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }))

// TEMPLATE ENGINE
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());

// PUBLIC STATIC FILES
app.use(express.static(path.join(__dirname, './public')));

// ROUTES
const mainRoutes = require('./routes/routes.js');
app.use(mainRoutes);

// ERROR 404
app.use((req, res) => {
	return res.render('pages/404', {
    user: SESSION_USER
  });
});
  
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


/*
 * THIS CODE FORCE REQUESTS FROM HTTP TO HTTPS IN PRODUCTION
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
}*/


// START HTTP SERVER WITH PORT
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});
