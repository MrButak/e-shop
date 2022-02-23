const { default: Stripe } = require('stripe')
const paymentManager = require('../public/javascripts/paymentManager')

require('dotenv').config()
const sk_test = process.env.STRIPE_SK;


async function paymentIntent(req, res, next) {
    
    
    let data = Object.keys(req.body)
    data = JSON.parse(data)
    let shoppingCart = data.shoppingCart
    console.log(shoppingCart)
    
    const stripe = require("stripe")(sk_test);
    
    // create an object which holds the items purchased, which I pass to the metadata paymentIntent property below
    let itemsPurchased = {};
    let itemKeys = Object.keys(shoppingCart)
    
    itemKeys.forEach((item) => {

        itemsPurchased[`${item}`] = shoppingCart[`${item}`].name + " Qty:" + shoppingCart[`${item}`].buyQuantity + " Price: $" + shoppingCart[`${item}`].price;
        // itemsPurchased[`${item}-name`] = shoppingCart[`${item}`].name;
        // itemsPurchased[`${item}-qty`] = shoppingCart[`${item}`].buyQuantity;
        // itemsPurchased[`${item}-price`] = shoppingCart[`${item}`].price;
    })
    

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({

        amount: data.subTotal * 100,// in cents
        currency: "usd",
        receipt_email: data.email,
        description: "Smoothie order",
        metadata: itemsPurchased,
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