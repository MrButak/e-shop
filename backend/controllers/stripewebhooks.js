const emailManager = require('../public/javascripts/emailManager');
const dbManager = require('../public/javascripts/dbManager')

require('dotenv').config()
const sk_test = process.env.STRIPE_SK;
const webhookSecret = process.env.WEBHOOK_SK;



exports.paymentSuccess = (req, res, next) => {

    const stripe = require('stripe')(sk_test);
   
    const sig = req.headers['stripe-signature'];
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    }
    catch (err) {
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Successfully constructed event
    console.log('✅ Success:', event.id);
    console.log(event)

    switch (event.type) {

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            // this function and front end function (axios post req) are hitting db close to the same time. Is there something I can do for this? is this a cause for concern?
            dbManager.storePurchase(paymentIntent);

            dbManager.updateMenuItmQty(paymentIntent);
            //emailManager.sendPaymentSuccessEmail(paymentIntent);

            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
};
