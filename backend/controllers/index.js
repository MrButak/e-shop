const dbManager = require ('../public/javascripts/dbManager');

exports.getMenu = async (req, res, next) => {

    try {
        let menuItems = await dbManager.getMenu();
        res.status(200).json(menuItems);
    }
    catch(error) {
        console.log(error);
    };
    
};

exports.getOrderDetails = (req, res, next) => {

    
    let data = Object.keys(req.body)
    data = JSON.parse(data)
    res.status(200).json(dbManager.getOrderDetails(data.stripePiId, data.email))
    
}