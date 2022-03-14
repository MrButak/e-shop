var express = require('express');
var router = express.Router();
var app = express();

const stripeWebHooks = require('../controllers/stripewebhooks');

// allow requests from vue front end ** John, this may be the issue
const allowRequest = app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.post('/webhook', stripeWebHooks.stripeWebHooks);


module.exports = router;
