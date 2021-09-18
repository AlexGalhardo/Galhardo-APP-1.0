/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/TelegramBOTLogger.js
 *
 * https://api.telegram.org/bot<telegram_token_here>/getUpdates
 * bot
 */


const https = require('https')
const DateTime = require('./DateTime')



class TelegramBOTLogger {

    constructor(token, channelName) {
        this.isThereToken(token)
        this.isThereChannel(channelName)
        this.token = token
        this.channelName = channelName
        this.baseUrl = `https://api.telegram.org/bot${token}`
    }

    isThereToken(token){
        if(!token) throw new Error('There is no Telegram Token in TelegramLogger Class Constructor')
    }

    isThereChannel(channel){
        if(!channel) throw new Error('There is no Telegram Channel name in TelegramLogger Class Constructor')
    }

    emojiMap(){
        return {
            CONTACT:'💬',
            ERROR:'🚨',
            SUBSCRIPTION:'🏆',
            SHOP:'💵'
        }
    }

    sendMessage(level, type, message){
        let emoji = this.emojiMap()[level]

        message = `${emoji} ${type} ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${message}`

        let urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`)

        let url =  `${this.baseUrl}/sendMessage?${urlParams}`

        this.sendRequest(url)
    }


    logContact(contactObject){
        let emoji = this.emojiMap()['CONTACT']

        const log = `
        <b>CONTACT_FROM_NAME:</b> ${contactObject.name}
        <b>CONTACT_FROM_EMAIL:</b> ${contactObject.email}
        <b>SUBJECT:</b> ${contactObject.subject}
        ---------------------------------------
        <b>MESSAGE:</b> ${contactObject.message}
                    `

        let message = `${emoji} CONTACT ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`

        let urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`)

        let url =  `${this.baseUrl}/sendMessage?${urlParams}`

        this.sendRequest(url)
    }

    logShopTransaction(shopTransactionObject){
        let emoji = this.emojiMap()['SHOP']

        const log = `
        <b>TRANSACTION_ID:</b> ${shopTransactionObject.transaction_id}
        <b>PAID: </b> ${shopTransactionObject.paid}
        <b>AMOUNT: $</b> ${shopTransactionObject.total_amount}
        <b>GATEWAY: </b> Stripe
        <b>PAYMENT_METHOD: </b> ${shopTransactionObject.payment_method.card_id}
        ---------------------------------------
        <b>CUSTOMER_EMAIL:</b> ${shopTransactionObject.customer.email}
        <b>CUSTOMER_ID:</b> ${shopTransactionObject.customer.id}
        <b>CUSTOMER_STRIPE_ID:</b> ${shopTransactionObject.customer.stripe_id}
        ---------------------------------------
        <b>PRODUCTS:</b> ${JSON.stringify(shopTransactionObject.products)}
        ---------------------------------------
        <b>SHIPPING_ZIPCODE: </b> ${shopTransactionObject.shipping.address_zipcode}
        <b>SHIPPING_STREET:</b> ${shopTransactionObject.shipping.address_street}
        <b>SHIPPING_NEIGHBORHOOD:</b> ${shopTransactionObject.shipping.address_neighborhood}
        <b>SHIPPING_CITY:</b> ${shopTransactionObject.shipping.address_city}
        <b>SHIPPING_STATE:</b> ${shopTransactionObject.shipping.address_state}
        <b>SHIPPING_COUNTRY:</b> BRAZIL
        `

        let message = `${emoji} SHOP TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`

        let urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`)

        let url =  `${this.baseUrl}/sendMessage?${urlParams}`

        this.sendRequest(url)
    }



    logSubscriptionTransaction(subsTransactionObject){
        let emoji = this.emojiMap()['SUBSCRIPTION']

        const log = `
        <b>TRANSACTION_ID:</b> ${subsTransactionObject.transaction_id}
        <b>STATUS: </b> ${subsTransactionObject.status}
        ---------------------------------------------
        <b>CURRENT_PERIOD_START: </b> ${subsTransactionObject.plan.current_period_start}
        <b>CURRENT_PERIOD_END:</b> ${subsTransactionObject.plan.current_period_end}
        <b>CANCEL_AT_PERIOD_END:</b> ${subsTransactionObject.plan.cancel_at_period_end}
        ---------------------------------------------
        <b>PLAN_ID:</b> ${subsTransactionObject.plan.id}
        <b>PLAN_NAME:</b> ${subsTransactionObject.plan.name}
        <b>PLAN_AMOUNT:</b> ${subsTransactionObject.plan.amount}
        ---------------------------------------------
        <b>CUSTOMER_ID:</b> ${subsTransactionObject.customer.id}
        <b>CUSTOMER_STRIPE_ID:</b> ${subsTransactionObject.customer.stripe_id}
        <b>CUSTOMER_EMAIL:</b> ${subsTransactionObject.customer.email}
        <b>CUSTOMER_NAME:</b> ${subsTransactionObject.customer.name}
        `

        let message = `${emoji} SUBSCRIPTION TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`

        let urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`)

        let url =  `${this.baseUrl}/sendMessage?${urlParams}`

        this.sendRequest(url)
    }


    sendRequest(url){
        return https.get(url, (res) => {
            const { statusCode } = res;
            if(statusCode !== 200){
                let data
                res.on('data',(chunk)=>{
                    data += chunk
                })
                res.on('end',() => {
                    console.log(data)
                })
            }
        }).on('error',(e)=>{
            console.log(e)
        })
    }
}

module.exports = new TelegramBOTLogger(process.env.TELEGRAM_BOT_HTTP_TOKEN, process.env.TELEGRAM_BOT_CHANNEL_ID)
