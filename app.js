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
const cookieParser = require('cookie-parser')



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


/* FORCE HTTP TO HTTPS */
// this code will not work with https-localhost module
// use this code in production without port defined in url (localhost:3000)
// and using a reverse-proxy like nginx
// need to defined this middleware before any routes
if(process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
            res.redirect(`https://${req.hostname}${req.url}`);
        }
        else {
            next();
        }
    });
}


// CSRF
app.use(cookieParser())


// LOGS 
const PinoLog = require('./config/pino')
const pinoHttp = require('pino-http')({logger:PinoLog})
// app.use(pinoHttp) // for complete http log
// pino log is used in API routes

const morgan = require('./config/morgan');
const Logger = require('./config/winston');
app.use(morgan) // 08/09/2021 19:37:50 http: GET / 200  162.571 ms




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
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, './public')));


// ROUTES
const publicRoutes = require('./routes/public_routes');
const profileRoutes = require('./routes/profile_routes');
const apiRoutes = require('./routes/api_routes');
const adminRoutes = require('./routes/admin_routes');
const testRoutes = require('./routes/test_routes');

// app.use('/api', pinoHttp, apiRoutes);
app.use('/api', apiRoutes);
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

    if(err.code === 'EBADCSRFTOKEN') return res.json({error: "Invalid CSRF Token!"})

    if(err instanceof MulterError) return res.json({error: err.code })

    console.log(err)

    return res.json({
        name: err.name,
        message: err.message
    })
});


module.exports = app;
