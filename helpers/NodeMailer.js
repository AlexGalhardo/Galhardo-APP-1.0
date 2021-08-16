const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const randomToken = require('rand-token');

const Users = require('../models/JSON/Users');

const SendGrid = require('../config/SendGrid');

class NodeMailer {
    

    static async sendEmailContact (username, email, subject, message) {
        
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

        let sendEmail = await smtpTransport.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: "aleexgvieira@gmail.com",
            subject: `Galhardo APP Contact: Subject ${subject} from ${username}`,
            text: subject,
            html: htmlBody
        });
        
        SendGrid.close();

        console.log(`NodeMailer sendEmailContact: ${sendEmail}`);

        return sendEmail ? true : false
    }



    static async sendEmailShopTransaction (shopTransactionObject) {
        
        const filePath = path.join(__dirname, '../views/emails/shop_transaction.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            status: shopTransactionObject.status,
            products: shopTransactionObject.products,
            transaction_id: shopTransactionObject.transaction_id,
            amount: shopTransactionObject.amount,
            created_at: shopTransactionObject.created_at,
            shipping: shopTransactionObject.shipping
        };
        
        const htmlBody = template(replacements);

        let sendEmail = await smtpTransport.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: shopTransactionObject.customer_email,
            subject: `Galhardo APP: Shop Transaction ${shopTransactionObject.status}!`,
            text: subject,
            html: htmlBody
        });
        
        SendGrid.close();

        console.log(`NodeMailer sendEmailShopTransaction: ${sendEmail}`);

        return sendEmail ? true : false
    }



    static async sendEmailSubscriptionTransaction (subsTransactionObject) {
        
        const filePath = path.join(__dirname, '../views/emails/subscription_transaction.html');
        
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        
        const template = handlebars.compile(source);
        
        const replacements = {
            status: subsTransactionObject.status,
            plan_name: subsTransactionObject.name,
            transaction_id: subsTransactionObject.transaction_id,
            subs_start: subsTransactionObject.start,
            subs_end: subsTransactionObject.end
        };
        
        const htmlBody = template(replacements);

        let sendEmail = await smtpTransport.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: subsTransactionObject.customer_email,
            subject: `Galhardo APP: Subscription Transaction ${subsTransactionObject.status}`,
            text: subject,
            html: htmlBody
        });
        
        SendGrid.close();

        console.log(`NodeMailer sendEmailSubscriptionTransaction: ${sendEmail}`);

        return sendEmail ? true : false
    }



    static async sendEmailConfirmEmailToken (email, confirm_email_token) {
        let confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirm_email_token}`;

        let sendEmail = await SendGrid.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: email,
            subject: `GALHARDO APP: Confirm Your Email!`,
            text: `Confirm your email by clicking this link: ${confirmEmailLinkURL}`,
            //html: ""
        });
        
        SendGrid.close();

        console.log(`NodeMailer sendEmailConfirmEmailToken: ${sendEmail}`);

        return emailSend ? true : false
    }

    static async sendEmailForgetPassword (email, reset_password_token) {
        const resetPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${reset_password_token}`;

        const emailSend = await SendGrid.sendMail({
            from: process.env.SENDGRID_EMAIL_FROM,
            to: email,
            subject: `GALHARDO APP: Recover Your Password!`,
            text: `Your password recovery link is: ${resetPasswordLinkURL}`,
            //html: ""
        });
        SendGrid.close();

        console.log(`NodeMailer sendEmailForgetPassword: ${emailSend}`);

        return emailSend ? true : false
    }
};

module.exports = NodeMailer