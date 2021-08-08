const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const stripe = require('stripe')(`${process.env.STRIPE_SK_TEST}`);

const ProductsController = {
	getViewCreate: (req, res) => {
		res.render('pages/products/create');
	},
	postCreateProduct: async (req, res) => {
		const product_name = req.body.product_name;
		
		const product = await stripe.products.create({
  			name: product_name,
		});

		product.created = DateTime.getDateTime(product.created);

		res.render('pages/products/create', {
			flash: {
				type: 'success',
				message: 'Product Created With Success!'
			},
			product
		});
	},
	getViewRetrieve: (req, res) => {
		res.render('pages/products/retrieve');
	},
	postRetrieveProduct: async (req, res) => {
		const product_id = req.body.product_id;

		const product = await stripe.products.retrieve(
			product_id
		);

		product.created = DateTime.getDateTime(product.created);
		product.updated = DateTime.getDateTime(product.updated);

		res.render('pages/products/retrieve', {
			flash: {
				type: 'success',
				message: 'Product Exists!'
			},
			product
		});
	},
	getViewUpdate: (req, res) => {
		res.render('pages/products/update');
	},
	postUpdateProduct: async (req, res) => {
		const product_id = req.body.product_id;
		const description = req.body.description;
		const name = req.body.name;

		if(product_id == "prod_JxIQjuKdjaZdHk"){
			res.render('pages/products/update', {
				flash: {
					type: 'warning',
					message: "You can't update this product!"
				},
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

		res.render('pages/products/update', {
			flash: {
				type: 'success',
				message: 'Product Updated!'
			},
			product
		});
	},
	getViewDelete: (req, res) => {
		res.render('pages/products/delete');
	},
	postDeleteProduct: async (req, res) => {
		let product_id = req.body.product_id;

		if(product_id == "prod_JxIQjuKdjaZdHk"){
			res.render('pages/products/delete', {
				flash: {
					type: 'warning',
					message: "You can't delete this product!"
				},
			});
			return
		}

		const productDeleted = await stripe.products.del(
  			product_id
		);

		res.render('pages/products/delete', {
			flash: {
				type: 'success',
				message: 'Product DELETED!'
			},
			product: productDeleted
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

		res.render('pages/products/listAll', {
			lastProductsCreated,
			products: products.data,
		});
	},
}

module.exports = ProductsController;