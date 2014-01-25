/**
 * Router for the main routes
 */

function initializeRoutes(app, passport, cache) {

	// This is the first route which will be accessed by a authenticated user.
	// Here we can do a lot of stuff like tracking how many logins made etc.
	
	app.get("/users/home", function(req, res) {
		if (req.isAuthenticated()) {
			console.log("Authenticated : " + req.user);
			res.render("users/home", {
				message : req.flash('error')
			});

		} else {
			console.log("Unauthenticated Req received for GET /");
			res.redirect('../login');
		}
	});
    app.get("/", function(req, res) {
		 //res.render('users/home', { what: 'best', who: 'me' });
		if (req.isAuthenticated()) {
			console.log("Authenticated : " + req.user);
			res.redirect('users/home');

		} else {
			console.log("Unauthenticated Req received for GET /");
			res.render("login", {
				message : req.flash('error')
			});
		}
	});
	app.get("/signup", function(req, res) {
		 //res.render('users/home', { what: 'best', who: 'me' });
		if (req.isAuthenticated()) {
			console.log("Authenticated : " + req.user);
			res.redirect('users/home');

		} else {
			console.log("Unauthenticated Req received for GET /");
			res.render("signup", {
				message : req.flash('error')
			});
		}
	});
	

}

module.exports = initializeRoutes;