const dbManager = require ('../public/javascripts/dbManager');

exports.getMenu = async (req, res, next) => {

    let menuItems = {
        name: "green smoothies",
        description: "dsfsfsfssf",
        inStock: 1,
        price: 300,
        imageUrl: "https://efdfds.com"
    }
    // res.status(200).json(menuItems);
    res.send.json(menuItems)
    // try {
    //     let menuItems = await dbManager.getMenu();
    //     res.status(200).json(menuItems);
    // }
    // catch(error) {
    //     console.log(error);
    // };
    
};

exports.getOrderDetails = async (req, res, next) => {

    try {
        let data = Object.keys(req.body);
        data = JSON.parse(data);
        let orderDetails = await dbManager.getOrderDetails(data.stripePiId, data.email);
        res.status(200).json(orderDetails);
    }
    catch(error) {
        console.log(error);
    };
    
};