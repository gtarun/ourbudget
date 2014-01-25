/**
 * Router for handling all the User Password related routes.
 */

var AdminAPI = require('../controller/AdminController.js');

/**
 * Initialize the routes
 * @param app
 * @param passport
 * @param cache
 */
function initializeRoutes(app, passport, cache) {
	
	// Route for fetching Forgot Password page.
	app.get("/forgotpassword", AdminAPI.ForgotPassword);
	
	// Route for handling the reset password link sent to user's mail
	app.get("/resetpassword", AdminAPI.ResetPassword);
	
	// Route for Generating the password reset link.
	app.post("/generatePassword", AdminAPI.GeneratePaswordLink);
	
	// Save the password
	app.post("/savePassword", AdminAPI.SavePassword);
}

/**
 * Export the required functions into module.
 */
module.exports = initializeRoutes;