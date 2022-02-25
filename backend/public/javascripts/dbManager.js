const Database = require('better-sqlite3');

// Function gets all menu items from database
exports.getMenu = () => {

    let db = new Database('menu.db');

	try {
		let statement = db.prepare('SELECT * FROM items');
		let menuItems = statement.all();
		db.close();
		return menuItems;
	}
    catch (e) {
		console.log(e);
	};
};

// Function stores purchase information into database when receives stripe webhook for paymentIntent success
exports.storePurchase = (paymentIntent) => {
    
    
    // create address object to store in db
    let shippingAddress = {};
    Object.keys(paymentIntent.shipping.address).forEach((key) => {

        shippingAddress[key] = paymentIntent.shipping.address[key];
    });

    shippingAddress = JSON.stringify(shippingAddress);
    let stripeSk = paymentIntent.client_secret;
    let email = paymentIntent.receipt_email;
    let itemsPurchased = paymentIntent.metadata['purchasedItems'];
    let totalPrice = paymentIntent.amount / 100; // in cents
    let db = new Database('menu.db');
    
    let dbStmt = db.prepare('INSERT INTO purchases (stripe_pi, email, items_purchased, total_price, shipping_address, account_id) VALUES (?, ?, ?, ?, ?, ?)');
    dbStmt.run(stripeSk, email, itemsPurchased, totalPrice, shippingAddress, null);
    db.close();

}