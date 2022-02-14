const dbManager = require ('../public/javascripts/dbManager');

exports.getMenu = (req, res, next) => {

    let menuItems = dbManager.getMenu();
    res.status(200).json(menuItems)
    

};