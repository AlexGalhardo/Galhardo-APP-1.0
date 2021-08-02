const express = require('express');
const mustache = require('mustache-express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser')

const stripe = require('stripe')(process.env.STRIPE_SK_TEST);

const app = express();

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
