const { default: Stripe } = require('stripe')
const paymentManager = require('../public/javascripts/paymentManager')




async function paymentIntent(req, res, next) {
    
    const stripe = require("stripe")('sk_test_51KSQNbAaTEmIXM6wt6O7rs6rMT1LttdkEP6NQBUtdHSIrilfukpYC6ZDT1vJRzbP6vHoOwbliaEwMnSA7JwJKpsV00sDkfdvxx');
    
    // TODO: receive shopping cart object (req) and total ammount here
    // const calculateOrderAmount = (items) => {
    //     // Replace this constant with a calculation of the order's amount
    //     // Calculate the order total on the server to prevent
    //     // people from directly manipulating the amount on the client
    //     // return 1400;
    //   };

    //   const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 23 * 1000,// calculateOrderAmount(items),
        currency: "usd",
        // automatic_payment_methods: {
        // enabled: true,
        // },
    });
    console.log(paymentIntent)
    console.log("payment intent")
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
    
    // res.status(200).json(paymentIntention.client_secret)
    
};

exports.paymentIntent = paymentIntent