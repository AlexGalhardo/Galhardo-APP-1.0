const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const session = require('express-session');

// PWD ROOT
global.APP_ROOT_PATH = path.resolve(__dirname);

const app = express();

app.use(session({
    name: 'session',
    secret: 'my_secret',
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
	console.log(`Localhost rodando na porta ${process.env.PORT}....`)
});
