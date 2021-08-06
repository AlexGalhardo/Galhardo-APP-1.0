const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

const Games = {

	getAllGames: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/games`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json;

		return null;
	},

	getTotalGames: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/games`, {
  			"method": "GET"
		});

		const json = await response.json();
		console.log('total games é: ' + json.length)

		if(json) return json.length;

		return 2;
	},

	getRandomGame: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/games`, {
  			"method": "GET"
		});

		const jsonTotalGames = await response.json();

		let totalGames = 2;
		if(jsonTotalGames)  totalGames = jsonTotalGames.length;
		
		const random_game_id = await Math.floor(Math.random() * totalGames) + 1;
		
		const responseGame = await fetch(`${process.env.DATABASE_JSON_URL}/games/${random_game_id}`, {
  			"method": "GET"
		});

		const json = await responseGame.json();

		if(json) return json;

		return null;
	}
};

module.exports = Games;