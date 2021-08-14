const express = require('express');
const Correios = require('correios-brasil');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req, res) => {
	res.json({
		"/shipping/:zipcode": "Return Shipping Deadline and Fee",
		"/cep/:zipcode": "Return ZipCode/CEP Data",
	});
});

app.get('/shipping/:zipcode', async (req, res) => {
	const zipcode_destiny = req.params.zipcode;

	let args = {
	  sCepOrigem: '16050590',
	  sCepDestino: zipcode_destiny,
	  nVlPeso: '1',
	  nCdFormato: '1',
	  nVlComprimento: '20',
	  nVlAltura: '20',
	  nVlLargura: '20',
	  nCdServico: ['04014'], //Array com os códigos de serviço
	  nVlDiametro: '0',
	};

	const response = await Correios.calcularPrecoPrazo(args);

	res.json(response);
});

app.get('/cep/:cep', async (req, res) => {
	const cep = req.params.cep;

	const response = await Correios.consultarCep(cep);

	res.json(response);
})


app.listen(process.env.PORT || 3000, () => {
	console.log(`Localhost rodando na porta ${process.env.PORT}....`)
});
