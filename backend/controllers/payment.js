const { default: Stripe } = require('stripe')
const paymentManager = require('../public/javascripts/paymentManager')

require('dotenv').config()
const sk_test = process.env.STRIPE_SK;


async function paymentIntent(req, res, next) {
    
    
    let data = Object.keys(req.body)
    data = JSON.parse(data)
    

    const stripe = require("stripe")(sk_test);
    
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

        amount: data.subTotal * 100,// calculateOrderAmount(items),
        currency: "usd",
        receipt_email: data.email,
        description: "Smoothie order",
        metadata: {
            'item_1': "Can put menu items ordered here",
            'item_2': "Item ordered # 2"
        },
        // shipping: {
        //     address: "123 testy street. salem, mo",
        //     name: "put name here"
        // },
        automatic_payment_methods: {
            enabled: true,
        },

        

    });
    console.log(paymentIntent)
    console.log("payment intent ^^^^^^^^^^^^^^^^^^^^^^^^")
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
    
    // res.status(200).json(paymentIntention.client_secret)
    
};

exports.paymentIntent = paymentIntent