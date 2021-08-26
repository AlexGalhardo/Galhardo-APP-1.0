/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/api/admin/pagarme
 */


const pagarmeModule = require('pagarme');


// helpers
// const DateTime = require('../../helpers/DateTime')


// models
// const StripeModel = require('../../models/JSON/Stripe');
// const StripeModel = require('../../models/MySQL/Stripe');
// const StripeModel = require('../../models/POSTGRESQL/Stripe');
// const StripeModel = require('../../models/SQLITE/Stripe');
// const StripeModel = require('../../models/MONGODB/Stripe');

let pagarme

(async function(){
    try {
        pagarme = await pagarmeModule.client.connect({ api_key: process.env.PAGARME_AK_TEST })    
    }
    catch(err){
        console.log(err)
    }
    
})()


class APIAdminPagarMEController {

    async postCreateStripeCustomer(req, res){

        const { user_id, 
                name,
                email, 
                cpf,
                phone, 
                birthday } = req.body

        customer = await pagarme.customers.create({
            external_id: user_id,
            name: name,
            type: 'individual',
            country: 'br',
            email: email,
            documents: [
              {
                type: 'cpf',
                number: cpf
              }
            ],
            phone_numbers: [phone],
            birthday: birthday
          })
        
        res.json({ customer })
    }

}

module.exports = new APIAdminPagarMEController()