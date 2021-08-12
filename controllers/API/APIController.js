/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api
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
			blogPosts: {
				method: "GET",
				endpoint: "/api/public/blog",
				response: "Blog Posts Information",
				specific: "You can access /api/public/blog/:blog_id for specific blog post"
			},
			games: {
				method: "GET",
				endpoint: "/api/public/games",
				response: "Games Information",
				specific: "You can access /api/public/games/:game_id for specific game"
			},
			books: {
				method: "GET",
				endpoint: "/api/public/books",
				response: "Books Information",
				specific: "You can access /api/public/books/:book_id for specific book"
			},
		};

		res.json(response);
	}

	static getAdminEndpoints(req, res, next) {
		const response = {
			message: "ADMIN Endpoints. Need JWT in Header Authorization Bearer Token to access endpoints!",
			login: {
				method: "POST",
				endpoint: "/api/admin/login",
				data: "'email' and 'password' in body url encoded",
				response: "ADMIN JWT Token for 1 hour duration"
			},
			test: {
				message: "You can use this endpoint to verify if the JWT Token is válid",
				method: "POST",
				endpoint: "/api/admin/test",
				data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
				response: "Admin Data and JWT remaining duration"
			},
			blog: {
				create: {
					method: "POST",
					endpoint: "/api/admin/blog/create",
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Blog created information"
				},
				update: {
					method: "PUT",
					endpoint: "/api/admin/blog/update/:blog_id",
					params: {
						blog_id: "Blog ID to update" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Blog updated information"
				},
				delete: {
					method: "DELETE",
					endpoint: "/api/admin/blog/delete/:blog_id",
					params: {
						blog_id: "Blog ID to delete" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Blog deleted information"
				}
			},
			games: {
				create: {
					method: "POST",
					endpoint: "/api/admin/game/create",
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Game created information"
				},
				update: {
					method: "PUT",
					endpoint: "/api/admin/game/update/:game_id",
					params: {
						game_id: "Game ID to update" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Game updated information"
				},
				delete: {
					method: "DELETE",
					endpoint: "/api/admin/game/delete/:game_id",
					params: {
						game_id: "Game ID to delete" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Game deleted information"
				}
			},
			books: {
				create: {
					method: "POST",
					endpoint: "/api/admin/book/create",
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Game created information"
				},
				update: {
					method: "PUT",
					endpoint: "/api/admin/book/update/:book_id",
					params: {
						book_id: "Book ID to update" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Book updated information"
				},
				delete: {
					method: "DELETE",
					endpoint: "/api/admin/book/delete/:book_id",
					params: {
						book_id: "Book ID to delete" 
					},
					data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
					response: "Book deleted information"
				}
			},
			stripe: {
				customers: {
					listAll: {
						method: "GET",
						endpoint: "/api/admin/stripe/customers/listAll/:limit",
						params: {
							limit: "How many last customers created to list" 
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "List Last :limit Stripe Customers Created"
					},
					create: {
						method: "POST",
						endpoint: "/api/admin/stripe/customers/create",
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return customer created"
					},
					retrieve: {
						method: "GET",
						endpoint: "/api/admin/stripe/customers/retrieve/:customer_id",
						params: {
							customer_id: "Stripe customer id" 
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return stripe customer information"
					},
					update: {
						method: "PUT",
						endpoint: "/api/admin/stripe/customers/update/:customer_id",
						params: {
							customer_id: "Stripe customer id" 
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return true or false"
					},
					delete: {
						method: "DELETE",
						endpoint: "/api/admin/stripe/customers/delete/:customer_id",
						params: {
							customer_id: "Stripe customer id" 
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return true or false"
					}
				},
				cards: {
					listAll: {
						method: "GET",
						endpoint: "/api/admin/stripe/cards/listAll/:customer_id",
						params: {
							customer_id: "Stripe customer id" 
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "List all stripe cards for this customer id"
					},
					create: {
						method: "POST",
						endpoint: "/api/admin/stripe/cards/create",
						data: {
							header: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
							body: "card_holder_name, card_number, card_cvc, card_exp_month, card_exp_year"
						},
						response: "Return customer created"
					},
					retrieve: {
						method: "GET",
						endpoint: "/api/admin/stripe/cards/retrieve/:customer_id/:card_id",
						params: {
							customer_id: "Stripe customer id",
							card_id: "Stripe card_id"
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return specific customer card information"
					},
					update: {
						method: "PUT",
						endpoint: "/api/admin/stripe/cards/update/:customer_id/:card_id",
						params: {
							customer_id: "Stripe customer id",
							card_id: "Stripe card_id"
						},
						data: {
							header: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
							body: "card_holder_name"
						},
						response: "Return true or false"
					},
					delete: {
						method: "DELETE",
						endpoint: "/api/admin/stripe/cards/delete/:customer_id/:card_id",
						params: {
							customer_id: "Stripe customer id",
							card_id: "Stripe card_id"
						},
						data: "ADMIN JWT TOKEN in Header Authorization Bearer Token",
						response: "Return true or false"
					}
				},
				charges: {},
				products: {},
				prices: {},
				plans: {},
				subscriptions: {}
			}
		};

		res.json(response);
	}
};

module.exports = APIController;