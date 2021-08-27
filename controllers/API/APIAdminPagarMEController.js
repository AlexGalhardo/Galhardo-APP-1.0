/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/api/admin/pagarme
 */


const pagarme = require('pagarme');


// helpers
// const DateTime = require('../../helpers/DateTime')


// models
// const StripeModel = require('../../models/JSON/Stripe');
// const StripeModel = require('../../models/MySQL/Stripe');
// const StripeModel = require('../../models/POSTGRESQL/Stripe');
// const StripeModel = require('../../models/SQLITE/Stripe');
// const StripeModel = require('../../models/MONGODB/Stripe');



class APIAdminPagarMEController {


    postCreateStripeCustomer(req, res){

        const { user_id, 
                name,
                email, 
                cpf,
                phone, 
                birthday } = req.body

        pagarme.client.connect({ api_key: process.env.PAGARME_AK_TEST })
            .then(client => client.customers.create({
                external_id: '#12345d789',
                name: 'João das Neves',
                type: 'individual',
                country: 'br',
                email: 'joaoneves@norte.com',
                documents: [
                  {
                    type: 'cpf',
                    number: '11111111111'
                  }
                ],
                phone_numbers: ['+5511999999999', '+5511888888888'],
                birthday: '1985-01-01'
            })
            .then(customer => console.log(customer))
            .catch(err => console.log(err, err.response.errors)))
    }

}

module.exports = new APIAdminPagarMEController()