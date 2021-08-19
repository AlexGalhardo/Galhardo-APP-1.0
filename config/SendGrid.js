const nodemailer = require('nodemailer')

const SendGrid = nodemailer.createTransport({
    host: process.env.SENDGRID_SERVER,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
    }
})

module.exports = SendGrid;