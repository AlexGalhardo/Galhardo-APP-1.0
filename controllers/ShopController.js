/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/
 */

import bodyParser from 'body-parser'

// HELPERS
import DateTime from '../helpers/DateTime.js'
import NodeMailer from '../helpers/NodeMailer.js'
import TelegramBOTLogger from '../helpers/TelegramBOTLogger.js'
import Header from '../helpers/Header.js'

// MODELS
import { Users, PagarmeModel } from '../models/models.js'


// PagarME
import { PagarME } from '../helpers/PagarME.js'



class ShopController {

	static getViewShop (req, res)  {

        const itens = [
                {
                    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r77.jpg',
                    title: 'SpiderMan',
                    price: 9.90.toFixed(2)
                },
                {
                    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2crj.jpg',
                    title: 'Ghost Of Tsushima',
                    price: 19.90.toFixed(2)
                },
                {
                    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg',
                    title: 'The Last Of Us',
                    price: 29.90.toFixed(2)
                }
            ]

        const shopCart = {
            amount: itens.reduce(function(accumulator, item) { return parseFloat(accumulator) + parseFloat(item.price) }, 0).toFixed(2),
            itens
        }

        if(shopCart.itens.length < 3){
            req.flash('warning', 'Você precisa adicionar pelo menos 1 produto no seu carrinho')
            res.redirect('/')
        }

	    return res.render('pages/shop/shop_checkout', {
	        user: SESSION_USER,
            flash_warning: req.flash('warning'),
	        header: Header.shop(),
            shopCart
	    });
	}

    static async postDeleteGameFromShopCart(req, res){
        const { user_id, game_id } = req.params
        await Users.createGameIntoShopCart(user_id, parseInt(game_id))
        return res.redirect('/shop')
    }


    static async verifyIfUserIsAlreadyAPagarMECustomer(){
        if(!SESSION_USER.pagarme.customer_id){
            const customer = await PagarME.createCustomer({
                "external_id": SESSION_USER.id,
                "name": SESSION_USER.name,
                "type": "individual",
                "country": "br",
                "email": SESSION_USER.email,
                "documents": [
                    {
                        "type": "cpf",
                        "number": SESSION_USER.document
                    }
                ],
                "phone_numbers": [
                    `${SESSION_USER.phone.country}${SESSION_USER.phone.ddd}${SESSION_USER.phone.number}`
                ],
                "birthday": "1985-01-01"
            })
            await Users.savePagarMECustomerID(SESSION_USER.id, customer.id)
            return
        }
        return
    }


    static async verifyIfUserAlreadyHasAPagarMECardRegistred(req){
        if(!SESSION_USER.pagarme.card_id){
            const {
                card_number,
                card_holder_name,
                card_exp_year,
                card_exp_month,
                card_cvv
            } = req.body

            const [pagarmeCreditCard, cardHash] = await PagarME.createCreditCard({
                card_number,
                card_holder_name,
                card_expiration_date: `${card_exp_month}${card_exp_year}`,
                card_cvv
            })

            console.log(pagarmeCreditCard, cardHash)

            await Users.createPagarMECard(SESSION_USER.id, pagarmeCreditCard)
            return
        }
        return
    }



	static async postShopPayLog (req, res) {
		
        try {
            const {
                customer_email,
                customer_name,
                customer_phone,
                confirm_password,
                zipcode,
                customer_street,
                customer_neighborhood,
                customer_city,
                customer_state,
                shipping_country,
                shipping_carrier,
                shipping_fee,
                shipping_deadline,
                total_shop_amount,
                card_number,
                card_exp_month,
                card_exp_year,
                card_cvc } = req.body;


            const validPassword = await Users.verifyPassword(SESSION_USER.id, confirm_password)

            if(!validPassword){
                req.flash('warning', 'Senha Inválida!')
                return res.redirect(`/shop`)
            }

            await ShopController.verifyIfUserIsAlreadyAPagarMECustomer()

            await ShopController.verifyIfUserAlreadyHasAPagarMECardRegistred(req)

            const shopCartProducts = [
                    {
                        "id": '3',
                        "title": 'SpiderMan',
                        "unit_price": '990',
                        "quantity": 1,
                        "tangible": true
                    },
                    {
                        "id": '2',
                        "title": 'Ghost Of Tsushima',
                        "unit_price": '1990',
                        "quantity": 1,
                        "tangible": true
                    },
                    {
                        "id": '10',
                        "title": 'The Last Of Us',
                        "unit_price": '2990',
                        "quantity": 1,
                        "tangible": true
                    }
                ]

            const transaction = await PagarME.createShopTransaction({
                "amount": "3000",
                "card_id": SESSION_USER.pagarme.card_id,
                "payment_method": "credit_card",
                "customer": {
                    "name": SESSION_USER.name,
                    "external_id": SESSION_USER.id,
                    "email": SESSION_USER.email,
                    "type": "individual",
                    "country": "br",
                    "phone_numbers": [`${SESSION_USER.phone.country}${SESSION_USER.phone.ddd}${SESSION_USER.phone.number}`],
                    "documents": [
                        {
                          "type": "cpf",
                          "number": "30621143049"
                        }
                    ]
                },
                "billing" : {
                    "name": SESSION_USER.name,
                    "address" : {
                        "country": "br",
                        "state": customer_state,
                        "city": customer_city,
                        "neighborhood" : customer_neighborhood,
                        "street": customer_street,
                        "street_number": "42",
                        "zipcode": zipcode
                    }
                },
                "shipping": {
                    "name": SESSION_USER.name,
                    "fee": shipping_fee,
                    "delivery_date": "2000-12-21",
                    "expedited": true,
                    "address": {
                        "country": "br",
                        "state": 'sp',
                        "city": customer_city,
                        "neighborhood": customer_neighborhood,
                        "street": customer_street,
                        "street_number": "42",
                        "zipcode": zipcode
                    }
                },
                "items": shopCartProducts
            })

            shopCartProducts.forEach(product => product.unit_price = parseFloat((product.unit_price)/100).toFixed(2))

            const shopTransactionObject = {
                transaction_id: transaction.id,
                total_amount: parseFloat(total_shop_amount).toFixed(2),
                payment_method: {
                    card_id: transaction.card.id,
                    first_digits: transaction.card.first_digits,
                    last_digits: transaction.card.last_digits,
                    brand: transaction.card.brand,
                    expiration_date: transaction.card.expiration_date
                },
                currency: 'BRL',
                status: transaction.status,
                products_amount: (parseFloat(total_shop_amount) - parseFloat(shipping_fee)).toFixed(2),
                products: shopCartProducts,
                customer: {
                    id: req.session.userID,
                    pagarme_id: SESSION_USER.pagarme.customer_id,
                    email: customer_email,
                    phone: customer_phone,
                    name: customer_name
                },
                shipping: {
                    address_zipcode: zipcode,
                    address_street: customer_street,
                    address_street_number: 42,
                    address_neighborhood: customer_neighborhood,
                    address_city: customer_city,
                    address_state: customer_state,
                    address_country: "Brazil",
                    carrier: "Correios",
                    fee: parseFloat(shipping_fee).toFixed(2),
                    deadline: parseInt(shipping_deadline) + 2
                },
                created_at: DateTime.getNow()
            }

            await PagarMEModel.createShopTransaction(shopTransactionObject)
            await NodeMailer.sendShopTransaction(shopTransactionObject)
            await TelegramBOTLogger.logShopTransaction(shopTransactionObject)

            return res.render('pages/shop/shopPayLog', {
                flash_success: 'TRANSAÇÃO COM CARTÃO DE CRÉDITO REALIZADA COM SUCESSO!',
                shopTransactionObject,
                user: SESSION_USER,
                header: Header.shop()
            });
        }
        catch(error){
            throw new Error(error)
        }
	}
};

export default ShopController;
