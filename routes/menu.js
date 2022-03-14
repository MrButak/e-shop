var express = require('express');
var router = express.Router();
var app = express();

const menu = require('../controllers/menu');
const payment = require('../controllers/payment');
const validateForms = require('../controllers/validateforms');

// allow requests from vue front end ** John, this may be the issue
const allowRequest = app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/getmenu', menu.getMenu);

router.post('/create-payment-intent', payment.paymentIntent)

router.post('/validatedeliveryaddress', validateForms.validateDeliveryForm);

// db lookup on "purchases" TABLE (need pi_stripe_key and email)
router.get('/orderdetails', menu.getOrderDetails)

module.exports = router;
