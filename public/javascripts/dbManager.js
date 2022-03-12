const Database = require('better-sqlite3');
const { Pool, Client } = require('pg')
require('dotenv').config()

// For Deploy. Connect postgresql to heroku
// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
// });

// Function gets all menu items from database
exports.getMenu = async () => {
    const pool = new Pool();
    try {
        let res = await pool.query('SELECT * FROM menu_items ORDER BY item_id ASC');
        return(res.rows);
    }
    catch(error) {
        console.log(error.stack);
    };
};

// Function stores purchase information into database when receives stripe webhook for paymentIntent success
exports.storePurchase = async (paymentIntent) => {
    
    // create address object to store in db
    let shippingAddress = {};
    Object.keys(paymentIntent.shipping.address).forEach((key) => {

        shippingAddress[key] = paymentIntent.shipping.address[key];
    });
    shippingAddress = JSON.stringify(shippingAddress); // storing as string in db
    
    let stripePiId = paymentIntent.id;
    let email = paymentIntent.receipt_email;
    let itemsPurchased = paymentIntent.metadata['purchasedItems'];
    let totalPrice = paymentIntent.amount / 100; // in cents

    const pool = new Pool();
    
    const text = 'INSERT INTO purchases(stripe_pi, email, items_purchased, total_price, shipping_address, account_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [stripePiId, email, itemsPurchased, totalPrice, shippingAddress, null];

    try {
        const res = await pool.query(text, values)
    } 
    catch (error) {
        console.log(error.stack)
    };
}

// Function gets order details from db when provided stripe_pi_key and email
exports.getOrderDetails = async (stripePiId, email) => {
    
    const pool = new Pool();
    const text = 'SELECT * FROM purchases WHERE stripe_pi = ($1) AND email = ($2)';
    const values = [stripePiId, email];
    try {
        let res = await pool.query(text, values);
        await client.end();
        return(res.rows);
        
    }
    catch(error) {
        console.log(error.stack);
    };
};

// Function updates item quantity in database after purchase
exports.updateMenuItmQty = async (paymentIntent) => {

    const pool = new Pool();
    
    let text = 'UPDATE menu_items SET quantity = quantity - ($1) WHERE item_id = ($2)';
    let values; // = [purchasedItems[key].qty, key];

    let purchasedItems = JSON.parse(paymentIntent.metadata.purchasedItems);
    Object.keys(purchasedItems).forEach((key) => {

        try {
            
            values = [parseInt(purchasedItems[key].qty), parseInt(key)];
            let res = pool.query(text, values)
            // no need for an 'await client.end();' ?
        } 
        catch (error) {
            console.log(error.stack)
        };

    });
};
