/**
 * Router for the main routes
 */
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');

function initializeRoutes(app, passport, cache) {

	// This is the first route which will be accessed by a authenticated user.
	// Here we can do a lot of stuff like tracking how many logins made etc.
	
	app.get("/users/addbudget",Auth.isAuthenticated, function(req, res) {
		
			console.log("add budget : " + req.user);
			res.render("users/addbudget");
		
	});
	app.post("/users/addbudget", AccountAPI.addBudgget);
	app.post("/addbudget", AccountAPI.addBudgget);
	
    
}

module.exports = initializeRoutes;