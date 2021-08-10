const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const randomToken = require('rand-token');

const Users = require('../models/JSON/Users');

const NodeMailer = {
    postContact: async (username, email, subject, message) => {
        // const filePath = path.join(__dirname, '../views/emails/contact.html');
        // const filePath = path.join(__dirname, '../views/emails/subscription_transaction.html');
        const filePath = path.join(__dirname, '../views/emails/forget_password.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            // username: username,
            email: email,
            // subject: subject,
            // message: message,
            // transaction_id: 'k123aosk123kasp',
            // subs_start: '23/09/2021 13:45:52',
            // subs_end: '23/10/2021 13:45:52'
            resetPasswordToken: "123456789"
        };
        const htmlToSend = template(replacements);

        const smtpTransport = nodemailer.createTransport({
            host: process.env.SENDGRID_SERVER,
            port: process.env.SENDGRID_PORT,
            secure: false, 
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        })
        
        const mail = {
            from: email,
            to: "aleexgvieira@gmail.com",
            subject: `Contact: Subject ${subject} from ${username}`,
            text: subject,
            html: htmlToSend
        }

        let response = await smtpTransport.sendMail(mail);
        smtpTransport.close();

        console.log(response);

        return response
    },

    sendConfirmEmailToken: async (email, confirm_email_token) => {
        const smtpTransport = nodemailer.createTransport({
            host: process.env.SENDGRID_SERVER,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        })

        let confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirm_email_token}`;
        console.log(confirmEmailLinkURL)

        const mail = {
            from: "aleexgvieira@gmail.com",
            to: email,
            subject: `GALHARDO APP: Confirm Your Email Link!`,
            text: `Your confirm email link is: ${confirmEmailLinkURL}`,
            //html: "<b>Opcionalmente, pode enviar como HTML</b>"
        }

        let response = await smtpTransport.sendMail(mail);
        smtpTransport.close();

        console.log(response)

        return true
    },

    postForgetPassword: async (email, reset_password_token) => {
        const smtpTransport = nodemailer.createTransport({
            host: process.env.SENDGRID_SERVER,
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        })

        const resetPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${reset_password_token}`;

        const mail = {
            from: "aleexgvieira@gmail.com",
            to: email,
            subject: `GALHARDO APP: Recover Your Password Link`,
            text: `Your password recovery link is: ${resetPasswordLinkURL}`,
            //html: "<b>Opcionalmente, pode enviar como HTML</b>"
        }

        const response = await smtpTransport.sendMail(mail);
        smtpTransport.close();

        return response ? true : false
    }
};

module.exports = NodeMailer