const nodemailer = require("nodemailer");
const randomToken = require('rand-token');

const Users = require('../models/JSON/Users');

const NodeMailer = {
    postContact: async (username, email, subject, message) => {
        const smtpTransport = nodemailer.createTransport({
            host: process.env.SENDGRID_SERVER,
            port: process.env.SENDGRID_PORT,
            secure: false, // using SSL/TLS ?
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        })
        
        const mail = {
            from: email,
            to: "aleexgvieira@gmail.com",
            subject: `Contact: Subject ${subject} from ${username}`,
            text: message,
            //html: "<b>Opcionalmente, pode enviar como HTML</b>"
        }

        let response = await smtpTransport.sendMail(mail);
        smtpTransport.close();

        console.log(response);

        return response
    },

    postForgetPassword: async (email) => {
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            secure: false, // using SSL/TLS ?
            auth: {
                user: 'postmaster@sandboxd142f4af53414a188c68cd6e8b8c1118.mailgun.org',
                pass: '3078599cce82ee52f2d0b65bd145d78c-6b60e603-5a1a1392'
            }
        })

        let recoverPasswordToken = randomToken.generate(16);
        console.log('recoverPasswordToken é: ' + recoverPasswordToken); 
        let recoverPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${recoverPasswordToken}`;

        const resetPasswordTokenCreated = await Users.createResetPasswordToken(recoverPasswordToken, email);

        if(!resetPasswordTokenCreated){
            return console.log('token não foi salvo no banco de dados');
        }

        const mail = {
            from: "aleexgvieira@gmail.com",
            to: email,
            subject: `GALHARDO APP: Recover Your Password Link`,
            text: `Your password recovery link is: ${recoverPasswordLinkURL}`,
            //html: "<b>Opcionalmente, pode enviar como HTML</b>"
        }

        let response = await smtpTransport.sendMail(mail);
        smtpTransport.close();

        console.log(response);

        return response
    }
};

module.exports = NodeMailer;