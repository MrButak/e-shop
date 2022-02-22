const webHookManager = require('../public/javascripts/webHookManager');

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
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Successfully constructed event
    console.log('✅ Success:', event.id);
    console.log(event)

    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          // I need to get to this data (meta data and shipping info) so I can display on
          // frontend component/Ordercomfirm
          console.log(paymentIntent);
          console.log("here ************************")
          webHookManager.sendPaymentSuccessEmail()
          // Then define and call a function to handle the event payment_intent.succeeded
          // should send api call to send email
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
};
    
    
