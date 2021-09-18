const nodemailer = require('nodemailer')

const SendGrid = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
    }
})

const MailTrap = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
});

const Ethereal = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD
    }
});

module.exports = { SendGrid, MailTrap, Ethereal };
