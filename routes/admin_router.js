/**
 * Routes for the admin page. 
 */

var admin = require("../controller/admin_controller");

/**
 * Initializes the express app with routes
 * @param app express app
 * @param passport
 * @param cache
 */
function initializeRoutes(app, passport, cache) {
	// Admin Routes
	// Currently only the basic routes required for functionality of admin page was designed.
	// TODO : Each of the route must be authenticated. Authentication must be handled.
	// TODO : The User Model schema has to be changed to incorporate the new requirements.
	// The Admin page is designed based on new requirements.
	
	app.get("/admin", function(req, res) {
		res.render('admin');
	});

	// Gets the User object from the DB.
	app.post("/getUser", admin.getUser);

	// Creates a new User, and persists into the DB.
	app.post("/createUser", admin.createUser);
}

/**
 * Export the initializeRoutes as Module
 */
module.exports = initializeRoutes;
