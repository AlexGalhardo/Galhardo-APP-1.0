const bodyParser = require('body-parser')

const Correios = require('correios-brasil');

/*
Código do serviço:
04014 = SEDEX à vista
04065 = SEDEX à vista pagamento na entrega
04510 = PAC à vista
04707 = PAC à vista pagamento na entrega
40169 = SEDEX12 ( à vista e a faturar)
40215 = SEDEX 10 (à vista e a faturar)
40290 = SEDEX Hoje Varejo
*/

const APIController = {
	
	getCorreiosShippingFeeAndDeadline: async (req, res) => {
		const zipcode_destiny = req.params.zipcode;

		let args = {
		  sCepOrigem: process.env.ZIPCODE_ORIGIN,
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
	}
};

module.exports = APIController;