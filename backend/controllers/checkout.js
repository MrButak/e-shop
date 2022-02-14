const paymentManager = require('../public/javascripts/paymentManager')

exports.checkout = (req, res, next) => {

    paymentManager.receivePayment();
};