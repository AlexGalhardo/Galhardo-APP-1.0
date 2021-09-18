/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * TEST ROUTES
 * http://localhost:3000/test
 */

// INIT EXPRESS 
const express = require('express')
const router = express.Router()
const stripe = require('stripe');


const Logger = require('../config/winston');


// Test Logger
router
    .get('/logger', (req, res) => {
        Logger.error("This is an error log");
        Logger.warn("This is a warn log");
        Logger.info("This is a info log");
        Logger.http("This is a http log");
        Logger.debug("This is a debug log");

        return res.send("Logger tested");
    })

    .get('/flash', (req, res) => {
        res.render('pages/tests/flash', {
            flash_success: req.flash('success'),
            flash_warning: req.flash('warning')
        })
    })

    .get('/flash/success', (req, res) => {
        req.flash('success', 'SUCCESS!!');
        res.redirect('/test/flash');
    })

    .get('/flash/warning', (req, res) => {
        req.flash('warning', 'WARNING!!');
        res.redirect('/test/flash');
    })

    // https://stripe.com/docs/webhooks
    // https://stripe.com/docs/ips
    // https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
    // stripe listen --forward-to localhost:3000/stripe-checkout/status
    // stripe trigger payment_intent.succeeded
    .post('/stripe-checkout/status', express.raw({type: 'application/json'}), (request, response) => {
        const sig = request.headers['stripe-signature'];

        const endpointSecret = "whsec_da5flk6MdZKpY6PtXrBb5EFlINmjGrkN";

        try {
            let event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
            console.log(event)
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
              const paymentIntent = event.data.object;
              console.log(paymentIntent)
              break;
            default:
              console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        console.log(paymentIntent)
        return response.json({received: true, paymentIntent});
    });



module.exports = router;
