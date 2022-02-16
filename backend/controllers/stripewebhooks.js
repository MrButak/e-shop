
const stripe = require('stripe');
const express = require('express');
const app = express();

exports.paymentSuccess = (res, req, next) => {

    console.log(req)
    

    const sig = req.headers['stripe-signature'];
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = "whsec_37f7f1684ac20431a347f5e09e6200e5c430ae11fbb62165ee230a58794e6226";
                            
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } 
    
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        console.log(err)
        return;
    }

    console.log(event)

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
      // Return a 200 response to acknowledge receipt of the event
    response.send();

};
