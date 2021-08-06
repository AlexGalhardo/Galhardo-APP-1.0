const fetch = require('node-fetch');
const DateTime = require('../../helpers/DateTime');

const Books = {

	getAllBooks: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/books`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json.length > 0) return json;

		return null;
	},

	getTotalBooks: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/books`, {
  			"method": "GET"
		});

		const json = await response.json();

		if(json) return json.length;

		return 2;
	},

	getRandomBook: async () => {
		const response = await fetch(`${process.env.DATABASE_JSON_URL}/books`, {
  			"method": "GET"
		});

		const jsonTotalBooks = await response.json();

		let totalBooks = 2;
		if(jsonTotalBooks)  totalBooks = jsonTotalBooks.length;
		
		const random_book_id = await Math.floor(Math.random() * totalBooks) + 1;
		
		const responseBook = await fetch(`${process.env.DATABASE_JSON_URL}/books/${random_book_id}`, {
  			"method": "GET"
		});

		const json = await responseBook.json();

		if(json) return json;

		return null;
	}
};

module.exports = Books;