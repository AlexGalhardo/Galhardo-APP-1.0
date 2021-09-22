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
import dotenv from 'dotenv'; dotenv.config()


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
            return json
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
            return [pagarmeCreditCard, cardHash]
        } catch(error){
            throw new Error(error)
        }
    }


    async getCreditCard(card_id){
        try {
            const pagarmeCreditCard = await this.pagarme.cards.find({id: card_id})
            return pagarmeCreditCard
        } catch(error){
            throw new Error(error)
        }
    }


    async createShopTransaction(transactionObject){
        console.log('transactionObject é', transactionObject)
        const transaction = await this.pagarme.transactions
            .create(transactionObject)
            .catch(function(e){
                console.log(e.response.errors)
            })

        console.log('pagarme transaction criado é: ', transaction)
        return transaction
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


    async createPremiumSubscription(){
        try {
            const subscription = await this.pagarme.subscriptions
            .create({
                plan_id: process.env.PAGARME_PLAN_PREMIUM_ID,
                card_id: SESSION_USER.pagarme.card_id,
                payment_method: 'credit_card',
                customer: {
                    email: SESSION_USER.email,
                    name: SESSION_USER.name,
                    document_number: SESSION_USER.document,
                    address: {
                        zipcode: SESSION_USER.address.zipcode,
                        neighborhood: SESSION_USER.address.neighborhood,
                        street: SESSION_USER.address.street,
                        street_number: SESSION_USER.address.street_number
                    },
                    phone: {
                        number: SESSION_USER.phone.number,
                        ddd: SESSION_USER.phone.ddd
                    }
                }
            })
            .catch(function(e){
                console.log(e.response.errors)
            })

            return subscription

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
