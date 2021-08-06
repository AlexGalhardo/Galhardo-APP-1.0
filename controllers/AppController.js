const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');
const NodeMailer = require('../helpers/NodeMailer');

const Users = require('../models/JSON/Users');
const Blog = require('../models/JSON/Blog');
const Games = require('../models/JSON/Games');
const Books = require('../models/JSON/Books');

const stripe = require('stripe')('sk_test_IVPNgFWhBStx7kngLOXZHzW0');

var pagination = require('pagination')

const AppController = {
	
	getViewHome: async (req, res) => {
		let user = null;
		if(req.session.userID){
			user = await Users.getUserByID(req.session.userID)
		}

		const game = await Games.getRandomGame()

	    res.render('pages/home', {
	    	game,
	        user
	    });
	},

	getViewBooks: async (req, res) => {
		let user = null;
		if(req.session.userID){
			user = await Users.getUserByID(req.session.userID)
		}

		const book = await Books.getRandomBook()

	    res.render('pages/books', {
	    	book,
	        user
	    });
	},

	getViewShop: async (req, res) => {
		let user = null;
		if(req.session.userID){
			user = await Users.getUserByID(req.session.userID)
		}
	    
	    res.render('pages/templates/shop_checkout', {
	        user
	    });
	},

	getViewBlog: async (req, res) => {
		const totalBlogPosts = await Blog.getTotalBlogPosts();
		const blogPostsPerPage = 4;
		
		let page = req.params.page;

		if(!page){
			page = 1;
		}

		var boostrapPaginator = new pagination.TemplatePaginator({
		    prelink:'/blog/', current: page, rowsPerPage: blogPostsPerPage,
		    totalResult: totalBlogPosts, slashSeparator: true,
		    template: function(result) {
		        var i, len, prelink;
		        var html = '<div><ul class="pagination">';
		        if(result.pageCount < 2) {
		            html += '</ul></div>';
		            return html;
		        }
		        prelink = this.preparePreLink(result.prelink);
		        if(result.previous) {
		            html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
		        }
		        if(result.range.length) {
		            for( i = 0, len = result.range.length; i < len; i++) {
		                if(result.range[i] === result.current) {
		                    html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
		                } else {
		                    html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
		                }
		            }
		        }
		        if(result.next) {
		            html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
		        }
		        html += '</ul></div>';
		        return html;
		    }
		}).render();

		const blog = await Blog.getBlogPosts(page, blogPostsPerPage);

		res.render('pages/blog', {
			blog,
			boostrapPaginator
		});
	},

	getViewBlogPost: async (req, res) => {
		const slug = req.params.slug;

		const blogPost = await Blog.getBlogPostBySlug(slug);
		console.log(blogPost);

		res.render('pages/blogPost', {
			blogPost
		});
	},

	getViewContact: (req, res) => {
		res.render('pages/contact');
	},

	postContact: async (req, res) => {
		const username = req.body.contact_username;
		const email = req.body.contact_email;
		const subject = req.body.contact_subject;
		const message = req.body.contact_message;

		console.log(username, email, subject, message)

		if(NodeMailer.postContact(username, email, subject, message)){
			res.render('pages/contact', {
				flash: {
					type: 'success',
					message: 'Message Send!'
				}
			});
			return
		}

		res.render('pages/contact', {
			flash: {
				type: 'warning',
				message: 'Error'
			}
		});
	},

	getViewPrivacy: (req, res) => {
		res.render('pages/privacy');
	},

	getViewPlanCheckout: (req, res) => {
		res.render('pages/templates/plan_checkout');
	},

	postShopPayLog: async (req, res) => {

		if(!req.session.userID){
        	return res.render('pages/home', {
        		flash: {
        			type: "danger",
        			message: "You must be logued to make a shop transaction!"
        		}
        	})
    	}
		
		// get post request name inputs
		const { quantityOranges,
				quantityGrapes, 
				quantityApples,
				quantityStrawberries,
				customer_email,
				customer_city,
				zipcode,
				customer_state,
				customer_street,
				customer_name,
				customer_phone,
				value_totalShopCart,
				card_number,
				card_exp_month,
				card_exp_year,
				card_cvc } = req.body;

		const shipping = {
			address: {
				city: customer_city,
				country: "BRAZIL",
				postal_code: zipcode,
				state: customer_state,
				line1: customer_street
			},
			name: customer_name,
			phone: customer_phone,
			carrier: "CORREIOS"
		}

		const shopCartItems = {
			quantityOranges,
			quantityGrapes,
			quantityApples,
			quantityStrawberries,
			totalOranges: parseFloat(quantityOranges * 0.49).toFixed(2),
			totalGrapes: parseFloat(quantityGrapes * 0.99).toFixed(2),
			totalApples: parseFloat(quantityApples * 1.99).toFixed(2),
			totalStrawberries: parseFloat(quantityStrawberries * 2.99).toFixed(2)
		};

		// generate card token
		const cardToken = await stripe.tokens.create({
		 	card: {
		    	number: card_number,
		   		exp_month: card_exp_month,
		    	exp_year: card_exp_year,
		    	cvc: card_cvc,
		  	},
		});

		// create shop cart credit card charge
		const shopCardCharge = await stripe.charges.create({
			amount: parseInt(value_totalShopCart * 100),
		  	currency: 'usd',
		  	source: cardToken.id,
		  	description: JSON.stringify(shopCartItems),
		  	receipt_email: customer_email,
		  	shipping: shipping
		});

		shopCardCharge.created = DateTime.getDateTime(shopCardCharge.created);

		return res.render('pages/templates/shopPayLog', {
			flash: {
				type: 'success',
				message: 'Shop Cart Card Charge Created with Success!'
			},
			shopCardCharge,
			shopCartItems,
			value_totalShopCart,
			customer_email,
			shipping
		});
	},
	
	postPlanPayLog: async (req, res) => {
		const customer_email = req.body.customer_email;

		// CREATE CUSTOMER AND CREDIT CARD ONLY IF NOT REGISTRED IN STRIPE YET

		// create customer
		const customer = await stripe.customers.create({
  			description: 'Customer example created to test plan premium',
  			email: customer_email
		});

		// create credit card
		const card_number = req.body.card_number;
		const card_exp_month = req.body.card_exp_month;
		const card_exp_year = req.body.card_exp_year;
		const card_cvc = req.body.card_cvc;;

		// generate card token
		const cardToken = await stripe.tokens.create({
		 	card: {
		    	number: card_number,
		   		exp_month: card_exp_month,
		    	exp_year: card_exp_year,
		    	cvc: card_cvc,
		  	},
		});

		// create credit card
		const card = await stripe.customers.createSource(
		  	customer.id,
		  	{source: cardToken.id}
		);

		// create subscription
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
		  	items: [
		    	{price: 'plan_JxJMW54dmkHkfF'}, // PLAN PREMIUM ALREADY REGISTRED
		  	],
		});

		subscription.created = DateTime.getDateTime(subscription.created);
		subscription.current_period_end = DateTime.getDateTime(subscription.current_period_end);
		subscription.current_period_start = DateTime.getDateTime(subscription.current_period_start);

		res.render('pages/templates/planPayLog', {
			flash: {
				type: 'success',
				message: 'Subscription Created with Success!'
			},
			subscription,
			customer_email
		});
	}
};

module.exports = AppController;