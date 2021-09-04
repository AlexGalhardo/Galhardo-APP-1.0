/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/admin/stripe/products
 */


const bodyParser = require('body-parser')

// HELPERS
const DateTime = require('../../../helpers/DateTime')

// MODELS
const StripeModel = require(`../../../models/${process.env.APP_DATABASE}/Stripe`)


const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);



class StripeProductsController {

	static getViewCreate (req, res) {
		res.render('pages/admin/stripe/products/create', {
			user: SESSION_USER
		});
	} 

	static async postCreateProduct (req, res) {
		const product_name = req.body.product_name;
		
		const product = await stripe.products.create({
  			name: product_name,
		});

		product.created = DateTime.getDateTime(product.created);

		res.render('pages/admin/stripe/products/create', {
			flash: {
				type: 'success',
				message: 'Product Created With Success!'
			},
			product,
			user: SESSION_USER
		});
	}
	
	static getViewRetrieve (req, res) {
		res.render('pages/admin/stripe/products/retrieve', {
			user: SESSION_USER
		});
	}
	
	static async postRetrieveProduct (req, res) {
		const product_id = req.body.product_id;

		const product = await stripe.products.retrieve(
			product_id
		);

		product.created = DateTime.getDateTime(product.created);
		product.updated = DateTime.getDateTime(product.updated);

		res.render('pages/admin/stripe/products/retrieve', {
			flash: {
				type: 'success',
				message: 'Product Exists!'
			},
			product,
			user: SESSION_USER
		});
	}

	static getViewUpdate (req, res) {
		res.render('pages/admin/stripe/products/update', {
			user: SESSION_USER
		});
	}

	static async postUpdateProduct (req, res) {
		const product_id = req.body.product_id;
		const description = req.body.description;
		const name = req.body.name;

		if(product_id == "prod_JxIQjuKdjaZdHk" 
			|| product_id == 'prod_K2lMaFvU02Mnwh' 
			|| product_id == 'prod_K2lN2CO9llTt02'){
			res.render('pages/admin/stripe/products/update', {
				flash: {
					type: 'warning',
					message: "You can't update this product!"
				},
				user: SESSION_USER
			});
			return
		}

		const product = await stripe.products.update(
  			product_id,
  			description,
  			name
		);

		product.created = DateTime.getDateTime(product.created);
		product.updated = DateTime.getDateTime(product.updated);

		res.render('pages/admin/stripe/products/update', {
			flash: {
				type: 'success',
				message: 'Product Updated!'
			},
			product,
			user: SESSION_USER
		});
	}

	static getViewDelete (req, res){
		return res.render('pages/admin/stripe/products/delete');
	}
	
	static async postDeleteProduct (req, res) {
		let product_id = req.body.product_id;

		if(product_id == "prod_JxIQjuKdjaZdHk"){
			res.render('pages/admin/stripe/products/delete', {
				flash: {
					type: 'warning',
					message: "You can't delete this product!"
				},
				user: SESSION_USER
			});
			return
		}

		const productDeleted = await stripe.products.del(
  			product_id
		);

		res.render('pages/admin/stripe/products/delete', {
			flash: {
				type: 'success',
				message: 'Product DELETED!'
			},
			product: productDeleted,
			user: SESSION_USER
		});
	}
	
	static async getViewListAll (req, res) {
		const products = await stripe.products.list({
  			limit: 10,
		});

		let lastProductsCreated = products.data.length;

		products.data.forEach(function(product){
			product.created = DateTime.getDateTime(product.created)
		})

		res.render('pages/admin/stripe/products/listAll', {
			lastProductsCreated,
			products: products.data,
			user: SESSION_USER
		});
	}
}

module.exports = StripeProductsController;
