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


// Config
const SendGrid = require('../config/SendGrid');


const Users = require('../models/JSON/Users');
// const Users = require('../models/MONGODB/Users');
// const Users = require('../models/MYSQL/Users');
// const Users = require('../models/POSTGRES/Users');
// const Users = require('../models/SQLITE/Users');



class NodeMailer {


    static async sendContact (contactObject) {
        
        const filePath = path.join(__dirname, '../views/emails/contact.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            name: contactObject.name,
            email: contactObject.email,
            subject: contactObject.subject,
            message: contactObject.message,
        };
        
        const htmlBody = template(replacements);

        await SendGrid.sendMail({
            from: contactObject.email,
            to: process.env.GALHARDO_APP_EMAIL,
            subject: `Galhardo APP Contact: ${contactObject.subject} from ${contactObject.name}`,
            text: contactObject.subject,
            html: htmlBody
        });
        
        SendGrid.close();
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

        await SendGrid.sendMail({
            from: process.env.GALHARDO_APP_EMAIL,
            to: "aleexgvieira@gmail.com", //shopTransactionObject.customer.email,
            subject: `Galhardo APP: Shop Transaction Success!`,
            html: htmlBody
        });
        
        SendGrid.close();
    }



    static async sendSubscriptionTransaction (subsTransactionObject) {
        
        const filePath = path.join(__dirname, '../views/emails/subscription_transaction.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            transaction_id: subsTransactionObject.transaction_id,
            status: subsTransactionObject.status,
            plan_name: subsTransactionObject.plan.name,
            amount: parseFloat(subsTransactionObject.plan.amount / 100),
            payment_method: subsTransactionObject.payment_method,
            current_period_start: subsTransactionObject.current_period_start,
            current_period_end: subsTransactionObject.current_period_end,
            created_at: subsTransactionObject.created_at
        };

        
        const htmlBody = template(replacements);

        let emailSend = await SendGrid.sendMail({
            from: process.env.GALHARDO_APP_EMAIL,
            to: 'aleexgvieira@gmail.com', // subsTransactionObject.customer.email,
            subject: `Galhardo APP: Subscription Transaction Success!`,
            html: htmlBody
        });
        
        SendGrid.close();
    }



    static async sendConfirmEmailToken (email, confirm_email_token) {
        let confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirm_email_token}`;

        const filePath = path.join(__dirname, '../views/emails/confirm_email.html');

        const source = fs.readFileSync(filePath, 'utf-8').toString();

        const template = handlebars.compile(source);

        const replacements = {
            confirmEmailLinkURL
        };

        const htmlBody = template(replacements);

        await SendGrid.sendMail({
            from: process.env.GALHARDO_APP_EMAIL,
            to: email,
            subject: `GALHARDO APP: Confirm Your Email!`,
            html: htmlBody
        });
        
        SendGrid.close();
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

        await SendGrid.sendMail({
            from: process.env.GALHARDO_APP_EMAIL,
            to: email,
            subject: `GALHARDO APP: Recover Your Password!`,
            html: htmlBody
        });

        SendGrid.close();
    }
};

module.exports = NodeMailer
