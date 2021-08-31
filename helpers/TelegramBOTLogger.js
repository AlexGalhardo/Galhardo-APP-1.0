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

class TelegramLogger {

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

    getDate(){
        let date = new Date().toLocaleDateString('pt-BR')
        let time = new Date().toLocaleTimeString('pt-BR')
        return `${date} ${time}`;
    }

    sendMessage(level, type, message){
        let emoji = this.emojiMap()[level]

        message = `${emoji} ${type} ${emoji}\n\n <b>CREATED_AT:</b> ${this.getDate()}\n ${message}`

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

        let message = `${emoji} CONTACT ${emoji}\n\n <b>CREATED_AT:</b> ${this.getDate()}\n ${log}`

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

        let message = `${emoji} CONTACT ${emoji}\n\n <b>CREATED_AT:</b> ${this.getDate()}\n ${log}`

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

module.exports = new TelegramLogger(process.env.TELEGRAM_BOT_HTTP_TOKEN, process.env.TELEGRAM_BOT_CHANNEL_ID)


/*
const products = [
            {
                "quantity": "1",
                "name": "Oranges",
                "total": "0.49"
            },
            {
                "quantity": "1",
                "name": "Grapes",
                "total": "0.99"
            },
            {
                "quantity": "1",
                "name": "Apples",
                "total": "1.99"
            },
            {
                "quantity": "1",
                "name": "Bananas",
                "total": "2.99"
            }
        ];

TelegramBOTLogger.sendMessage('ERROR', '<b>LOG ERROR</b>',
    `
    WINSTON LOG ERROR HERE
    `,)


TelegramBOTLogger.sendMessage('CONTACT', '<b>CONTACT</b>',
    `
    <b>CONTACT_FROM:</b> testing@gmail.com
    <b>SUBJECT:</b> Feedback
    ---------------------------------------
    <b>MESSAGE:</b> Testing telegram logging contact
    `,)

TelegramBOTLogger.sendMessage('SHOP', '<b>SHOP TRANSACTION</b>',
    `
    <b>TRANSACTION_ID:</b> ch_pkspo1k2pkaps12
    <b>AMOUNT: $</b> 4.99
    <b>GATEWAY: </b> Stripe
    <b>PAYMENT_METHOD: </b> card_apoaksapso812
    ---------------------------------------
    <b>CUSTOMER_EMAIL:</b> admin@gmail.com
    <b>CUSTOMER_ID:</b> uuid4
    <b>CUSTOMER_STRIPE_ID:</b> cus_1872892
    ---------------------------------------
    <b>PRODUCTS:</b> ${JSON.stringify(products)}
    ---------------------------------------
    <b>SHIPPING_STREET:</b> Avenida Paulista
    <b>SHIPPING_NEIGHBORHOOD:</b> Mariana
    <b>SHIPPING_CITY:</b> Campinas
    <b>SHIPPING_STATE:</b> SP
    <b>SHIPPING_COUNTRY:</b> Brazil
    `,)

TelegramBOTLogger.sendMessage('SUBSCRIPTION', '<b>SUBSCRIPTION TRANSACTION</b>',
    `
    <b>TRANSACTION_ID:</b> ch_pkspo1k2pkaps12
    <b>AMOUNT: $</b> 4.99
    <b>GATEWAY: </b> Stripe
    <b>PAYMENT_METHOD: </b> card_apoaksapso812
    ---------------------------------------
    <b>CUSTOMER_EMAIL:</b> admin@gmail.com
    <b>CUSTOMER_ID:</b> uuid4
    <b>CUSTOMER_STRIPE_ID:</b> cus_1872892
    ---------------------------------------
    <b>PLAN_NAME:</b> PREMIUM
    <b>SUBS_START:</b> 30/08/2021
    <b>SUBS_END:</b> 30/09/2021
    `,)
*/
