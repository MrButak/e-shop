const dbManager = require ('../public/javascripts/dbManager');

exports.getMenu = (req, res, next) => {

    let menuItems = dbManager.getMenu();
    res.status(200).json(menuItems)
};

exports.getOrderDetails = (req, res, next) => {

    
    let data = Object.keys(req.body)
    data = JSON.parse(data)
    res.status(200).json(dbManager.getOrderDetails(data.stripePiId, data.email))
    
}