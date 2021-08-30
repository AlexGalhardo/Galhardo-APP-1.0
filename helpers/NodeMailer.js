/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 * ./helpers/NodeMailer.js
 */


const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const randomToken = require('rand-token');

const SendGrid = require('../config/SendGrid');


const Users = require('../models/JSON/Users');
// const Users = require('../models/MONGODB/Users');
// const Users = require('../models/MYSQL/Users');
// const Users = require('../models/POSTGRES/Users');
// const Users = require('../models/SQLITE/Users');



class NodeMailer {


    static async sendContact (username, email, subject, message) {
        
        const filePath = path.join(__dirname, '../views/emails/contact.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            name: username,
            email: email,
            subject: subject,
            message: message,
        };
        
        const htmlBody = template(replacements);

        let emailSend = await SendGrid.sendMail({
            from: email,
            to: process.env.GALHARDO_APP_EMAIL,
            subject: `Galhardo APP Contact: ${subject} from ${username}`,
            text: subject,
            html: htmlBody
        });
        
        SendGrid.close();

        return emailSend ? true : false
    }



    static async sendShopTransaction(shopTransactionObject) {
        
        const filePath = path.join(__dirname, '../views/emails/shop_transaction.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            transaction_id: shopTransactionObject.transaction_id,
            payment_method: shopTransactionObject.payment_method.card_id,
            paid: shopTransactionObject.paid,
            products: JSON.stringify(shopTransactionObject.products),
            total_products: shopTransactionObject.products_amount,
            shipping_fee: shopTransactionObject.shipping.fee,
            amount: shopTransactionObject.total_amount,
            shipping: {
                zipcode:shopTransactionObject.shipping.address_zipcode,
                street:shopTransactionObject.shipping.address_street,
                neighborhood: shopTransactionObject.shipping.address_neighborhood,
                city:shopTransactionObject.shipping.address_city,
                state:shopTransactionObject.shipping.address_state
            },
            created_at: shopTransactionObject.created_at
        };
        
        const htmlBody = template(replacements);

        let emailSend = await SendGrid.sendMail({
            from: process.env.GALHARDO_APP_EMAIL,
            to: "aleexgvieira@gmail.com", //shopTransactionObject.customer.email,
            subject: `Galhardo APP: Shop Transaction Success!`,
            html: htmlBody
            // text:
        });
        
        SendGrid.close();

        return emailSend ? true : false
    }



    static async sendSubscriptionTransaction (subsTransactionObject) {
        
        const filePath = path.join(__dirname, '../views/emails/subscription_transaction.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);

        console.log(subsTransactionObject)
        
        const replacements = {
            status: subsTransactionObject.status,
            plan_name: subsTransactionObject.plan_name,
            transaction_id: subsTransactionObject.transaction_id,
            subs_start: subsTransactionObject.subs_start,
            subs_end: subsTransactionObject.subs_end
        };

        console.log('enviou html email noemilaer', replacements)
        
        const htmlBody = template(replacements);

        let emailSend = await SendGrid.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: 'aleexgvieira@gmail.com', //shopTransactionObject.customer_email,
            subject: `Galhardo APP: Subscription Transaction ${subsTransactionObject.status}`,
            html: htmlBody
        });
        
        SendGrid.close();

        return emailSend ? true : false
    }



    static async sendConfirmEmailToken (email, confirm_email_token) {
        let confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirm_email_token}`;

        let emailSend = await SendGrid.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: email,
            subject: `GALHARDO APP: Confirm Your Email!`,
            text: `Confirm your email by clicking this link: ${confirmEmailLinkURL}`,
        });
        
        SendGrid.close();

        return emailSend ? true : false
    }


    static async sendForgetPassword (email, reset_password_token) {
        const resetPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${reset_password_token}`;

        const filePath = path.join(__dirname, '../views/emails/forget_password.html');

        const source = fs.readFileSync(filePath, 'utf-8').toString();

        const template = handlebars.compile(source);

        const replacements = {
            resetPasswordLinkURL
        };

        const htmlBody = template(replacements);

        const emailSend = await SendGrid.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: email,
            subject: `GALHARDO APP: Recover Your Password!`,
            // text: `Your password recovery link is: ${resetPasswordLinkURL}`,
            html: htmlBody
        });
        SendGrid.close();

        return emailSend ? true : false
    }
};

module.exports = NodeMailer
