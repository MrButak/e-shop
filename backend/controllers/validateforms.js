const validationManager = require('../public/javascripts/validationManager');

exports.validateDeliveryAddress = (req, res, next) => {

    let data = Object.keys(req.body)
    data = JSON.parse(data)
    // validationManager.validateDeliveryAddress(data)
    res.status(200).json(validationManager.validateDeliveryAddress(data))
};