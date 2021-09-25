/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 * http://localhost:3000/plans
 */

import dotenv from 'dotenv'; dotenv.config()

// HELPERS
import DateTime from '../helpers/DateTime.js'
import NodeMailer from '../helpers/NodeMailer.js'
import TelegramBOTLogger from '../helpers/TelegramBOTLogger.js'
import Header from '../helpers/Header.js'

// MODELS
import Users from '../models/MYSQL/Users.js'
import PagarmeModel from '../models/MYSQL/PagarmeModel.js'

// PagarME
import { PagarME } from '../helpers/PagarME.js'



class PremiumController {

	static getViewPremium(req, res) {
		return res.render('pages/premium/premium', {
            flash_warning: req.flash('warning'),
			user: SESSION_USER,
            header: Header.premium('Plano Premium RecomendaÊ')
		});
	}

    static getViewPlanPremiumCheckout (req, res) {
        return res.render('pages/premium/premium_checkout', {
            flash_warning: req.flash('warning'),
            user: SESSION_USER,
            header: Header.premium('Premium Checkout - RecomendaÊ')
        });
    }



    static getSubscriptionBanner (){
        return `
            <div class="card mb-4 rounded-3 shadow-sm text-center">
                <div class="card-header py-3 bg-info">
                    <h4 class="my-0 fw-normal">Você É PREMIUM!</h4>
                </div>

                <div class="card-body">
                    <h1 class="card-title pricing-card-title">R$ 4.99<small class="text-muted fw-light">/mês</small></h1>
                    <ul class="list-unstyled mt-3 mb-4">
                        <li>✔️ Acesso a nossa API</li>
                        <li>✔️ Sem propagandas no site</li>
                        <li>✔️ Cancele quando quiser</li>
                        <li>✔️ Recomendações ilimitadas</li>
                        <li>✔️ Receba recomendações via email</li>
                        <li>✔️ Receba recomendações via telegram</li>
                    </ul>
                </div>

            </div>
        `
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
                    `+${SESSION_USER.phone}`
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



    static async postSubscription (req, res) {

        try {
            const { confirm_password } = req.body

            const validPassword = await Users.verifyPassword(SESSION_USER.id, confirm_password)

            if(!validPassword){
                req.flash('warning', 'Senha inválida!')
                return res.redirect('/premium/checkout')
            }

            await PremiumController.verifyIfUserIsAlreadyAPagarMECustomer()

            await PremiumController.verifyIfUserAlreadyHasAPagarMECardRegistred(req)

            const subscription = await PagarME.createPremiumSubscription()

            const subscriptionTransactionObject = {
                created_at: DateTime.getNow(),
                transaction_id: subscription.id,
                status: subscription.status,
                payment_method: {
                    card_id: SESSION_USER.pagarme.card_id,
                    card_first_digits: SESSION_USER.pagarme.card_first_digits,
                    card_last_digits: SESSION_USER.pagarme.card_last_digits,
                    card_brand: SESSION_USER.pagarme.card_brand,
                    card_expiration_date: SESSION_USER.pagarme.card_expiration_date
                },
                plan: {
                    id: process.env.PAGARME_PLAN_PREMIUM_ID,
                    name: process.env.PAGARME_PLAN_PREMIUM_NAME,
                    amount: process.env.PAGARME_PLAN_PREMIUM_AMOUNT,
                    current_period_start: DateTime.getNow(),
                    current_period_end: subscription.current_period_end.substring(0, 10)
                },
                customer: {
                    id: SESSION_USER.id,
                    pagarme_id: SESSION_USER.pagarme.customer_id,
                    email: SESSION_USER.email,
                    name: SESSION_USER.name,
                    phone: `${SESSION_USER.phone.country}${SESSION_USER.phone.ddd}${SESSION_USER.phone.number}`
                }
            }

            await Users.createPagarMESubscription(SESSION_USER.id, subscriptionTransactionObject)

            await PagarMEModel.createSubscriptionTransaction(subscriptionTransactionObject)

            await NodeMailer.sendSubscriptionTransaction(subscriptionTransactionObject)

            await TelegramBOTLogger.logSubscriptionTransaction(subscriptionTransactionObject)

            return res.render('pages/premium/premium_log', {
                flash_success: 'Assinatura criada com sucesso!',
                subscriptionTransactionObject,
                user: SESSION_USER,
                header: Header.premium('Premium Checkout Status'),
                divPlanBanner: PremiumController.getSubscriptionBanner()
            });

        } catch(error){
            throw new Error(error)
        }
	}
};

export default PremiumController;
