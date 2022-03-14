var express = require('express');
var router = express.Router();
var app = express();

const menu = require('../controllers/menu');
const payment = require('../controllers/payment');
const stripeWebHooks = require('../controllers/stripewebhooks');
const validateForms = require('../controllers/validateforms');

// allow requests from vue front end ** John, this may be the issue
const allowRequest = app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/getmenu', allowRequest, menu.getMenu);
router.post('/create-payment-intent', allowRequest, payment.paymentIntent)
// Probably need to move this route somewhere else - webhooks controller?
// app.js:
// app.use('/webhook')
// controllers/webhook.js:
// router.post('/', stripeWebHooks.stripeWebHooks)
router.post('/webhook', stripeWebHooks.stripeWebHooks);
router.post('/validatedeliveryaddress', allowRequest, validateForms.validateDeliveryForm);

// db lookup on "purchases" TABLE (need pi_stripe_key and email)
router.post('/orderdetails', allowRequest, menu.getOrderDetails)

module.exports = router;
