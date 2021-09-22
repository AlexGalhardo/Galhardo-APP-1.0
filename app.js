/**
 * GALHARDO APP
 * PAGARME VERSION
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * ./app.js
 */


// MODULES
import 'express-async-errors'
import dotenv from 'dotenv'; dotenv.config();
import express from 'express'
import mustache from 'mustache-express'
import path from 'path'
import bodyParser from 'body-parser'
import session from 'express-session'
import flash from 'connect-flash'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { MulterError } from 'multer'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url';



// GLOBALS
global.SESSION_USER = null;
global.__dirname = dirname(fileURLToPath(import.meta.url));
global.APP_ROOT_PATH = __dirname


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
const app = express()


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
import PinoLog from './config/pino.js'
import pinoHttp from 'pino-http'
const PinoHTTP = pinoHttp({logger:PinoLog})

// app.use(PinoHTTP) // for complete http log
// pino log is used in API routes

import morgan from './config/morgan.js';
import Logger from './config/winston.js';
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
import expressStatusMonitor from 'express-status-monitor'
app.use(expressStatusMonitor());


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
app.set('views', `${__dirname}/views`);
app.engine('mustache', mustache());


// PUBLIC STATIC FILES
app.use(express.static(`${__dirname}/public`));


// ROUTES
import { publicRoutes } from './routes/public_routes.js'
import { profileRoutes } from './routes/profile_routes.js'
import { apiRoutes } from './routes/api_routes.js'
import { adminRoutes } from './routes/admin_routes.js'
import { testRoutes } from './routes/test_routes.js'

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


export default app;
