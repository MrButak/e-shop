const { default: Stripe } = require('stripe')
const paymentManager = require('../public/javascripts/paymentManager')

require('dotenv').config()
const sk_test = process.env.STRIPE_SK;


async function paymentIntent(req, res, next) {
    
    let data = Object.keys(req.body)
    data = JSON.parse(data)
    let purchasedItems = JSON.stringify(data.shoppingCart)
    
    const stripe = require("stripe")(sk_test);
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({

        // send ids of item in db then just pull from db

        amount: data.subTotal * 100,// in cents
        currency: "usd",
        receipt_email: data.email,
        description: "Smoothie order",
        // email list of item ids
        metadata: {
            
            'purchasedItems': purchasedItems

        },
        shipping: {
            address: {
                city: data.cityField,
                country: data.countryField,
                line1: data.add1Field,
                line2: data.add2Field,
                postal_code: data.posField,
                state: data.stateField
            },
            name: data.name,
            phone: null
        },
        automatic_payment_methods: {
            enabled: true,
        },

        

    });
    // console.log(paymentIntent)
    // console.log("payment intent ^^^^^^^^^^^^^^^^^^^^^^^^")
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
    
    // res.status(200).json(paymentIntention.client_secret)
    
};

exports.paymentIntent = paymentIntent