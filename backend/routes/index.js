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


router.post('/webhook', stripeWebHooks.paymentSuccess);

module.exports = router;
