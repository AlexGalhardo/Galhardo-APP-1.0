/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ./app.js
 */


// MODULES
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const { MulterError } = require('multer');



// GLOBALS
global.APP_ROOT_PATH = path.resolve(__dirname);
global.SESSION_USER = null;


// DATABASE
if(process.env.GALHARDO_APP_DATABASE === 'MONGODB'){
    console.log('USING DATABASE: MONGODB')
    require('./config/mongodb')()
}

if(process.env.APP_DATABASE === 'JSON') console.log('USING DATABASE: JSON')
if(process.env.APP_DATABASE === 'MYSQL') console.log('USING DATABASE: MYSQL')
if(process.env.APP_DATABASE === 'POSTGRES') console.log('USING DATABASE: POSTGRES')
if(process.env.APP_DATABASE === 'SQLITE') console.log('USING DATABASE: SQLITE')



// LocalHost HTTPS | Need to change .env APP_URL to https
// const app = require("https-localhost")()


// LocalHost HTTP
const app = require('express')()


// LOGS 
const PinoLog = require('./config/pino')
const pinoHttp = require('pino-http')({logger:PinoLog})
// app.use(pinoHttp) // for complete http log
// pino log is used in API routes

const morgan = require('./config/morgan');
const Logger = require('./config/winston');
app.use(morgan) // 04/09/2021 16:25:57 http: GET /favicon.ico 200 CONTENT-LENGTH=- 151.767 ms




// Secure HTTP Headers Responses & Requests
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);


// COMPRESS HTTP RESPONSES
app.use(compression())


// STATUS MONITOR
// http://localhost:3000/status
app.use(require('express-status-monitor')());


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

app.use('/api', pinoHttp, apiRoutes);

app.use('/profile', profileRoutes);
app.use('/admin', adminRoutes);
app.use('/test', testRoutes);
app.use(publicRoutes);



// ERROR 404
app.use((req, res) => {
	return res.render('pages/404', {
    user: SESSION_USER
  });
});
  

// HANDLING SERVER ERRORS
app.use((err, req, res, next) => {
    res.status(500); // INTERNAL SERVER ERROR

    if(err instanceof MulterError){
        return res.json({error: err.code })
    } else {
        console.log(err)
        return res.json({
            name: err.name,
            message: err.message
        })
    }
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

module.exports = app;
