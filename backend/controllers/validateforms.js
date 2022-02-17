const bodyParser = require("body-parser");

exports.validateDeliveryAddress = (req, res, next) => {

    data = Object.keys(req.body)
    data = JSON.parse(data)
    console.log(data)
    // res.status(200).json(cities)
};