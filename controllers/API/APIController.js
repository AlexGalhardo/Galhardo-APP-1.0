/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api
 * 	http://localhost:3000/api/public
 * 	http://localhost:3000/api/admin
 */

class APIController {
	
	static getWelcomeToAPI(req, res) {
		const response = {
			welcome: "Welcome to GALHARDO APP API!",
			public: "You can see PULBLIC API endpoints acessing URL: /api/public",
			admin: "You can see ADMIN endpoints acessing URL: /api/admin",
			responses: "All responses are in JSON",
			alert: "Only ADMIN can make CRUD operations! Public APIs can only use GET/READ"
		};

		res.json(response);
	}

	static getPublicEndpoints(req, res) {
		const response = {
			blogPosts: "GET /api/public/blog",
			games: "GET /api/public/games",
			books: "GET /api/public/books"
		};
		res.json(response);
	}

	static getAdminEndpoints(req, res, next) {
		const response = {
			message: "ADMIN Endpoints. Need JWT in Header Authorization Bearer Token to access endpoints!",
		}

		res.json(response);
	}
};

module.exports = APIController;