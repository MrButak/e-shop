var express = require('express');
var router = express.Router();
var app = express();

const index = require('../controllers/index');
const payment = require('../controllers/payment');
const stripeWebHooks = require('../controllers/stripewebhooks');

// allow requests from vue front end
const allowRequest = app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/getmenu', allowRequest, index.getMenu);

router.post('/create-payment-intent', allowRequest, payment.paymentIntent)


const stripe = require('stripe')('sk_test_51KSQNbAaTEmIXM6wt6O7rs6rMT1LttdkEP6NQBUtdHSIrilfukpYC6ZDT1vJRzbP6vHoOwbliaEwMnSA7JwJKpsV00sDkfdvxx');
const webhookSecret = 'whsec_37f7f1684ac20431a347f5e09e6200e5c430ae11fbb62165ee230a58794e6226';
router.post('/webhook', (req, res) => {
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
  
    // Return a response to acknowledge receipt of the event
    res.json({received: true});
});


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
