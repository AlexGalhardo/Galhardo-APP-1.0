/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ./app.js
 */


// MODULES
require('dotenv').config();
const mustache = require('mustache-express');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const compression = require('compression');
const cors = require('cors');
const { MulterError } = require('multer');


// GLOBALS
// const path = require('path');
global.APP_ROOT_PATH = path.resolve(__dirname);
global.SESSION_USER = null;


// MONGODB
if(process.env.NODE_ENV === 'development') require('./config/mongodb')()


// ./config
const morgan = require('./config/morgan');
const Logger = require('./config/winston');



// LocalHost HTTPS | Need to change .env APP_URL to https
// const app = require("https-localhost")()


// LocalHost HTTP
const app = require('express')()


// LOGS 
app.use(morgan)


// COMPRESS RESPONSES
app.use(compression())


// Desativa o X-Powered-By: Express
app.disable('x-powered-by')


// CORS
app.use(cors())


// SESSION
app.use(session({
    name: 'session',
    secret: `${process.env.SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));


// FLASH MESSAGES
app.use(flash());


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))


// JSON 
app.use(express.json());


// TEMPLATE ENGINE
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());


// PUBLIC STATIC FILES
app.use(express.static(path.join(__dirname, './public')));


// ROUTES
const publicRoutes = require('./routes/public_routes');
const profileRoutes = require('./routes/profile_routes');
const apiRoutes = require('./routes/api_routes');
const adminRoutes = require('./routes/admin_routes');
const testRoutes = require('./routes/test_routes');

app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/test', testRoutes);
app.use(publicRoutes);



// ERROR 404
app.use((req, res) => {
	return res.render('pages/404', {
    user: SESSION_USER
  });
});
  

// Handling Errors
const errorHandler= (err, req, res, next) => {
    res.status(400); // BAD REQUEST

    if(err instanceof MulterError){
        res.json({error: err.code })
    } else {
        console.log(err)
        res.json({
            error_name: err.name,
            error_message: err.message
        })
    }
}
app.use(errorHandler);


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

module.exports = app;
