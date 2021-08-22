/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 */


// MODULES
require('dotenv').config();
const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { flash } = require('express-flash-message');
const compression = require('compression');
const cors = require('cors');


// ./config
const morgan = require('./config/morgan');
const Logger = require('./config/winston');


// MONGODB
if(process.env.NODE_ENV === 'development'){
  require('./config/mongodb')()
}



// GLOBALS
global.APP_ROOT_PATH = path.resolve(__dirname);
global.SESSION_USER = null;


// LocalHost HTTPS | Need to change .env APP_URL to https
// const app = require("https-localhost")()


// LocalHost HTTP
const app = express();


// LOGS 
app.use(morgan)


// COMPRESS RESPONSES
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


// FLASH MESSAGES
app.use(flash({ sessionKeyName: 'flashMessage' }));


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
const apiRoutes = require('./routes/api_routes');
const adminRoutes = require('./routes/admin_routes');
const testRoutes = require('./routes/test_routes');

app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/test', testRoutes);
app.use(publicRoutes);


// MORGAN HTTP LOGS
app.use(morgan("dev"));


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
