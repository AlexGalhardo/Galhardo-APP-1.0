const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

// helpers
const Bcrypt = require('../helpers/Bcrypt')
const DateTime = require('../helpers/DateTime')

// models
const Users = require('../models/JSON/Users');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



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
			blogPosts: "/api/public/blogPosts",
			games: "/api/public/games",
			books: "/api/public/books"
		};

		res.json(response);
	}

	static getAdminEndpoints(req, res) {
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
				data: "JWT TOKEN in Header Authorization Bearer Token",
				response: "Admin Data and JWT remaining duration"
			},
			stripe: {
				customers: {
					listAll: {
						method: "POST",
						endpoint: "/api/admin/stripe/customers/listAll/:limit",
						params: {
							limit: "How many last customers created to list" 
						},
						data: "JWT TOKEN in Header Authorization Bearer Token",
						response: "List Last :limit Stripe Customers Created"
					}
				}
			}
		};

		res.json(response);
	}

	static async postAdminLogin(req, res, next) {
		const errors = validationResult(req);
		
		if(!errors.isEmpty()){
        	return res.status(422).json({ errors: errors.array() });
    	}

    	const { email, password } = req.body;

    	try {

    		if(!Users.emailIsAlreadyRegistred(email)){
    			return res.status(422).json({
	                error: "Email inválid!",
	            });
    		}

    		const admin = Users.getUserByEmail(email)
	        
	        const passwordIsValid = await Bcrypt.comparePassword(password, admin.password);
	        
	        if(!passwordIsValid){
	            return res.status(422).json({
	                error: "Incorrect password",
	            });
	        }

	        if(!admin.admin){
	        	return res.status(422).json({
	                error: "This user is NOT ADMIN!",
	            });
	        }

	        const JWT_TOKEN = jwt.sign(
	        	{admin_id:admin.id}, 
	        	process.env.JWT_SECRET,
	        	{ expiresIn: '1h' }
	        );

	        return res.json({
	            ADMIN_JWT_TOKEN: JWT_TOKEN
	        });

	    }
	    catch(err){
	        next(err);
	    }
	}

	static verifyAdminAPIRequestUsingJWT(req){
		if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the JWT Token in Header Authorization Bearer Token",
            });
        }

        const JWT_TOKEN = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);

        if(!Users.verifyIfAdminByID(decoded.admin_id)){
        	return res.status(422).json({
                message: "This JWT Token is Inválid!",
            });
        }

        const admin = Users.getUserByID(decoded.admin_id)
        return admin
	}

	static postAdminTest(req, res, next) {
		try {

			// if success, return admin data
	        const admin = APIController.verifyAdminAPIRequestUsingJWT(req)
            
            return res.json({
                admin: {
                	name: admin.name,
                	email: admin.email,
                	JWT_created_at: DateTime.getDateTime(decoded.iat),
                	JWT_expires_at: DateTime.getDateTime(decoded.exp)
                }
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}

	static async postAdminStripeCustomersListAll(req, res, next) {
		try {

	        // if success, return admin data
	        const admin = APIController.verifyAdminAPIRequestUsingJWT(req)
            
	        const limit = req.params.limit

	        let customers = await stripe.customers.list({
				limit: limit
			});

            return res.json({
                stripe: {
                	customers: {
                		limit: limit,
                		listAll: customers
                	}
                }
            });	        
	    }
	    catch(err){
	        next(err);
	    }
	}
};

module.exports = APIController;