const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');
const compression = require('compression')

// PWD ROOT
global.APP_ROOT_PATH = path.resolve(__dirname);

/*
 * with LocalHost HTTPS
 * Need to change .env APP_URL to https
 */
// const app = require("https-localhost")()


// with LocalHost HTTP
const app = express();

// compress all responses
app.use(compression())

/*
 * THIS CODE FORCE REQUESTS FROM HTTP TO HTTPS IN PRODUCTION
 */
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
}

app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000, // 1hr
    }
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.engine('mustache', mustache());

app.use(express.static(path.join(__dirname, './public')));

// ROUTES
const mainRoutes = require('./routes/index.js');
app.use(mainRoutes);

// ERROR 404
app.use((req, res) => {
	res.render('pages/404');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`)
});
