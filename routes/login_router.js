/**
 * Router that contains routes for handling the user login. 
 * The routes will use the Passport local authentication mechanism. See Passport documentation.
 */

function initializeRoutes(app, passport, cache) {
	
	// Gets the User login page
	app.get("/login", function(req, res) {

		// Login page uses the Flash to send the user login failure messages back to login page.
		
		if (req.isAuthenticated()) {
			console.log("Authenticated : " + req.user);
			res.render('users/home');
		} 
		else {
			console.log("Unauthenticated Req received for GET /");
			var flash = req.flash('error');
			console.log("Request Received for Login");
			var message = {
				message : flash
			};
			console.log("Rendering login");
			// Render the login page using the error messages from flash. 
			res.render("login", message);
		}
	});

	// Posts the User Login Data using the login form to gain access to the system.
	// Authenticates the User using the Passport Local mechanism.
	app.post("/login", passport.authenticate('local', {
		successRedirect : "/users/home",
		failureRedirect : "/login",
		failureFlash : true
	}));
	
	// Logs out the current user and redirects to the login page
	app.get('/logout', function(req, res) {
		console.log("Logging out the user");
		// Remove the user from the Express Middleware
		req.logout();
		// Render the login page
		res.render('homepage', {
			message : req.flash('error')
		});
        //res.redirect('/');
	});

};

/**
 * Export the required functions as a module.
 */
module.exports = initializeRoutes;
