const Database = require('better-sqlite3');

exports.getMenu = () => {

    let db = new Database('menu.db');

	try {
		let statement = db.prepare('SELECT * FROM items');
		let menuItems = statement.all();
		db.close();
        console.log(menuItems)
		return menuItems;
	}
    catch (e) {
		console.log(e);
	};
};