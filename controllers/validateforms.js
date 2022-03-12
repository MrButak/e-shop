const validationManager = require('../public/javascripts/validationManager');

exports.validateDeliveryForm = (req, res, next) => {

    let data = Object.keys(req.body)
    data = JSON.parse(data);

    if(validationManager.validateDeliveryAddress(data) && validationManager.validateEmail(data.email)) {
            res.status(200).json(true)
    }
    else {
        res.status(200).json(false)
    
    };
    
    
};
