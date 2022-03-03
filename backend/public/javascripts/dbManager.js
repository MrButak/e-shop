const Database = require('better-sqlite3');
const { Client } = require('pg')


// Function gets all menu items from database
exports.getMenu = async () => {

    const client = new Client()
    await client.connect()
    
    try {
        let res = await client.query('SELECT * FROM menu_items');
        await client.end();
        return(res.rows);
        
    }
    catch(error) {
        console.log(error) // error.stack
    }
};

// Function stores purchase information into database when receives stripe webhook for paymentIntent success
exports.storePurchase = (paymentIntent) => {
    
    
    // create address object to store in db
    let shippingAddress = {};
    Object.keys(paymentIntent.shipping.address).forEach((key) => {

        shippingAddress[key] = paymentIntent.shipping.address[key];
    });
    shippingAddress = JSON.stringify(shippingAddress);
    
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

// Function updates item quantity in database after purchase
exports.updateMenuItmQty = (paymentIntent) => {

    let db = new Database('menu.db');

    let purchasedItems = JSON.parse(paymentIntent.metadata.purchasedItems);
    Object.keys(purchasedItems).forEach((key) => {

        try {
            db.prepare('UPDATE items SET quantity = quantity - (?) WHERE id = (?)').run(purchasedItems[key].qty, key);
            // if quantity is 0 set in_stock to 0 (i can probably remove this row from the table and just use quantity to determine if item is in stock)
            if(db.prepare('SELECT quantity FROM items WHERE id = (?)').get(key).quantity < 1) {
                db.prepare('UPDATE items SET in_stock = (?) WHERE id = (?)').run(0, key)
            }
        }
        
        catch(error) {

            console.log(error)
        }
    });
    
    console.log("ok I update db here")
    
};