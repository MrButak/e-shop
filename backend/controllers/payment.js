const { default: Stripe } = require('stripe')
const paymentManager = require('../public/javascripts/paymentManager')
// const stripe = require('stripe')
const stripe = require('stripe')('sk_test_51KSQNbAaTEmIXM6wt6O7rs6rMT1LttdkEP6NQBUtdHSIrilfukpYC6ZDT1vJRzbP6vHoOwbliaEwMnSA7JwJKpsV00sDkfdvxx'); // Add your Secret Key Here

async function paymentIntent(req, res, next) {

    const paymentIntention = await stripe.paymentIntention.create({
        ammount: 1999,
        currency: 'usd',

    });
    res.status(200).json(paymentIntention.client_secret)
    // paymentManager.receivePayment();
};

exports.paymentIntent = paymentIntent