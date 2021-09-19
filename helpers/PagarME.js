/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/PagarME.js
 */

import Pagarme from 'pagarme'
import Games from '../models/JSON/Games.js'


class PagarME {

    async init() {
        this.pagarme = await Pagarme.client.connect({
            api_key: process.env.PAGARME_AK_TEST
        });
    }

    async createCustomer(customerObject){
        try {
            const response = await fetch(`https://api.pagar.me/1/customers?api_key=${process.env.PAGARME_AK_TEST}`, {
                method: 'POST',
                body: JSON.stringify(customerObject),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json()
            console.log(json)
        } catch(error){
            throw new Error(error)
        }
    }

    async getCustomer(customer_id){
        try {
            const pagarmeCustomer = await this.pagarme.customers.find({ id: customer_id })
            console.log(pagarmeCustomer)
        } catch(error){
            throw new Error(error)
        }
    }

    async updateCustomer(customer_id, customer_name, customer_email){
        try {
            const response = await fetch(`https://api.pagar.me/1/customers/${customer_id}?api_key=${process.env.PAGARME_AK_TEST}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: customer_name,
                    email: customer_email
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            const json = await response.json()
            console.log(json)
        } catch(error){
            throw new Error(error)
        }
    }

    async createCreditCard(cardObject){
        try {
            const pagarmeCreditCard = await this.pagarme.cards.create(cardObject)
            const cardHash = await this.pagarme.security.encrypt(cardObject)
            console.log(pagarmeCreditCard, cardHash)
        } catch(error){
            throw new Error(error)
        }
    }

    async getCreditCard(card_id){
        try {
            const pagarmeCreditCard = await this.pagarme.cards.find({id: card_id})
            console.log(pagarmeCreditCard)
        } catch(error){
            throw new Error(error)
        }
    }

    async createShopTransaction(transactionObject){
        const transaction = await this.pagarme.transactions
            .create(transactionObject)
            .catch(function(e){
                console.log(e.response.errors)
            })

        console.log(transaction)
    }

    async sendEmailBankSlipToCustomerEmail(transaction_id, customer_email){
        try {
            await this.pagarme.transactions.collectPayment({
                id: transaction_id,
                email: customer_email,
            })
        } catch(error){
            throw new Error(error)
        }
    }

    async createPlan(){
        try {
            const pagarmePlan = await this.pagarme.plans.create({
                amount: 499,
                days: 30,
                name: 'Premium Plan',
                payment_methods: ['boleto', 'credit_card']
            })
            console.log(pagarmePlan)
        } catch(error){
            throw new Error(error)
        }
    }

    async createSubscription(){
        try {
            const pagarmePlan = await this.pagarme.subscriptions.create({
                plan_id: 629720,
                card_id: 'card_cktr41egb095g0p9tvviu6f3x',
                payment_method:'credit_card',
                customer: {
                    email: 'neo@gmail.com',
                    name: 'Galhardo',
                    document_number: '18152564000105',
                    address: {
                        zipcode: '04571020',
                        neighborhood: 'Dragon Village',
                        street: 'Rua Drogon',
                        street_number: '240'
                    },
                    phone: {
                        number: '987654321',
                        ddd: '11'
                    }
                }
            })
            console.log(pagarmePlan)
        } catch(error){
            throw new Error(error)
        }
    }

    async getCheckoutLinkByGameID(game_id){
        try {
            const game = await Games.getByID(parseInt(game_id))

            const pagarMECheckoutObject = await this.pagarme.paymentLinks.create({
                "amount": game.price,
                "items": [
                    {
                        "id": game.id.toString(),
                        "title": game.title,
                        "unit_price": game.price,
                        "quantity": 1,
                        "tangible": true
                    },
                ],
                "payment_config": {
                    "default_payment_method": "credit_card",
                    "boleto": {
                        "enabled": true,
                        "expires_in": 7
                    },
                    "credit_card": {
                        "enabled": true,
                        // "free_installments": 4,
                        // "interest_rate": 1,
                        "max_installments": 1
                    },
                },
                /* "postback_config": {
                    "orders": "http://postback.url/orders",
                    "transactions": "http://postback.url/transactions"
                }, */
                /* "customer_config": {
                    "customer":{
                        "external_id": SESSION_USER.id,
                        "name": SESSION_USER.name,
                        "type":"individual",
                        "country":"br",
                        "email": SESSION_USER.email,
                        "documents":[
                            {
                               "type":"cpf",
                               "number": SESSION_USER.document
                            }
                        ],
                        "phone_numbers":[
                            "+5511999998888",
                            "+5511888889999"
                        ],
                        "birthday":"1985-01-01"
                    },
                    "billing":{
                        "name":"Ciclano de Tal",
                        "address":{
                            "country":"br",
                            "state":"SP",
                            "city":"São Paulo",
                            "neighborhood":"Fulanos bairro",
                            "street":"Rua dos fulanos",
                            "street_number":"123",
                            "zipcode":"05170060"
                        }
                    },
                    "shipping":{
                        "name": SESSION_USER.name,
                        "fee":12345,
                        "delivery_date": "2017-12-25",
                        "expedited":true,
                        "address":{
                            "country":"br",
                            "state":"SP",
                            "city":"São Paulo",
                            "neighborhood":"Fulanos bairro",
                            "street":"Rua dos fulanos",
                            "street_number":"123",
                            "zipcode":"05170060"
                        }
                    }
                }, */
                "max_orders": 1,
                "expires_in": 60
            })
            .catch(error => console.log(error.response.errors))

            return pagarMECheckoutObject.url
        } catch(error){
            throw new Error(error)
        }
    }
}

const pagarme = new PagarME()
await pagarme.init()

export { pagarme as PagarME }
