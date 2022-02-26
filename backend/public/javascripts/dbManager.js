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
    console.log(paymentIntent.id)
    console.log("this is the id I need to be using")
    let stripePiId = paymentIntent.id;
    let email = paymentIntent.receipt_email;
    let itemsPurchased = paymentIntent.metadata['purchasedItems'];
    let totalPrice = paymentIntent.amount / 100; // in cents
    let db = new Database('menu.db');
    
    let dbStmt = db.prepare('INSERT INTO purchases (stripe_pi, email, items_purchased, total_price, shipping_address, account_id) VALUES (?, ?, ?, ?, ?, ?)');
    dbStmt.run(stripePiId, email, itemsPurchased, totalPrice, shippingAddress, null);
    db.close();

}

// Function gets order details from db when provided stripe_pi_key and email
exports.getOrderDetails = (stripePiId, email) => {
    
    let db = new Database('menu.db');

	try {
		let dbStmt = db.prepare('SELECT * FROM purchases WHERE stripe_pi = (?) AND email = (?)');
		let orderDetails = dbStmt.all(stripePiId, email);
		db.close();
		return orderDetails
	}
    catch (e) {
		console.log(e);
	};

};

exports.updateMenuItmQty = () => {

    let db = new Database('menu.db');

    // try {
	// 	let dbStmt = db.prepare('SELECT * FROM purchases WHERE stripe_pi = (?) AND email = (?)');
	// 	let orderDetails = dbStmt.all(stripePiId, email);
	// 	db.close();
	// 	return orderDetails
	// }
    // catch (e) {
	// 	console.log(e);
	// };
};