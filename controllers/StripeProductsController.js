const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const ProductsController = {
	getViewCreate: (req, res) => {
		res.render('pages/stripe/products/create', {
			user: SESSION_USER
		});
	},
	postCreateProduct: async (req, res) => {
		const product_name = req.body.product_name;
		
		const product = await stripe.products.create({
  			name: product_name,
		});

		product.created = DateTime.getDateTime(product.created);

		res.render('pages/stripe/products/create', {
			flash: {
				type: 'success',
				message: 'Product Created With Success!'
			},
			product,
			user: SESSION_USER
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/stripe/products/retrieve', {
			user: SESSION_USER
		});
	},
	postRetrieveProduct: async (req, res) => {
		const product_id = req.body.product_id;

		const product = await stripe.products.retrieve(
			product_id
		);

		product.created = DateTime.getDateTime(product.created);
		product.updated = DateTime.getDateTime(product.updated);

		res.render('pages/stripe/products/retrieve', {
			flash: {
				type: 'success',
				message: 'Product Exists!'
			},
			product,
			user: SESSION_USER
		});
	},
	getViewUpdate: (req, res) => {
		res.render('pages/stripe/products/update', {
			user: SESSION_USER
		});
	},
	postUpdateProduct: async (req, res) => {
		const product_id = req.body.product_id;
		const description = req.body.description;
		const name = req.body.name;

		if(product_id == "prod_JxIQjuKdjaZdHk"){
			res.render('pages/stripe/products/update', {
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

		res.render('pages/stripe/products/update', {
			flash: {
				type: 'success',
				message: 'Product Updated!'
			},
			product,
			user: SESSION_USER
		});
	},
	getViewDelete: (req, res) => {
		res.render('pages/stripe/products/delete');
	},
	postDeleteProduct: async (req, res) => {
		let product_id = req.body.product_id;

		if(product_id == "prod_JxIQjuKdjaZdHk"){
			res.render('pages/stripe/products/delete', {
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

		res.render('pages/stripe/products/delete', {
			flash: {
				type: 'success',
				message: 'Product DELETED!'
			},
			product: productDeleted,
			user: SESSION_USER
		});
	},
	getViewListAll: async (req, res) => {
		const products = await stripe.products.list({
  			limit: 10,
		});

		let lastProductsCreated = products.data.length;

		products.data.forEach(function(product){
			let date = new Date(product.created*1000).toLocaleDateString("pt-BR")
			let time = new Date(product.created*1000).toLocaleTimeString("pt-BR")
			product.created = `${date} ${time}`;
		})

		res.render('pages/stripe/products/listAll', {
			lastProductsCreated,
			products: products.data,
			user: SESSION_USER
		});
	},
}

module.exports = ProductsController;