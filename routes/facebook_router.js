/**
 * Router contains the routes for handling the Facebook login sessions. 
 * See Passport documentation for more details. 
 * Currently the main app workflow doesn't include this routes. But this has to be integrated into  the 
 * main workflow in the future.
 */

function initializeRoutes(App, passport, Cache) {
	
	// This is the initial route requested by the Browser for handling facebook login.
	App.get("/auth/facebook", passport.authenticate("facebook", {
		scope : "email"
	}));

	// This is the route that facebook calls supplying the parameters in query string which indicates whether
	// Facebook has been succesfull or failure.
	App.get("/auth/facebook/callback", passport.authenticate("facebook", {
		failureRedirect : '/login',
		failureFlash : true
	}), function(req, res) {
		res.redirect('\index');
	});

}

/**
 * Export the required functions into a module.
 */
module.exports = initializeRoutes;