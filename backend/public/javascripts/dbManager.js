const Database = require('better-sqlite3');

exports.getMenu = () => {

    let db = new Database('menu.db');

	try {
		let statement = db.prepare('SELECT * FROM items');
		let menuItems = statement.all();
		db.close();
        // console.log(menuItems)
		return menuItems;
	}
    catch (e) {
		console.log(e);
	};
};

exports.storePurchase = (paymentIntent) => {
    
    // create address object to store
    let shippingAddress = {}
    Object.keys(paymentIntent.shipping.address).forEach((key) => {

        shippingAddress[key] = paymentIntent.shipping.address[key];
    });
    shippingAddress = JSON.stringify(shippingAddress);
    // let stripeSk = paymentIntent.client_secret;
    // let itemsPurchased = paymentIntent.metadata['purchasedItems'];
    // let deliveryAddress = paymentIntent.metadata['deliveryAddress'];
    // let email = paymentIntent.receipt_email;
    // console.log("start **********^^^^^^^^^")
    // console.log(stripeSk)
    // console.log(itemsPurchased)
    // console.log(deliveryAddress)
    // console.log(email)
    // console.log(paymentIntent)
    console.log(shippingAddress)
    console.log("Can I get here^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")

}