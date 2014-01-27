/**
 * Router for the main routes
 */
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');
function initializeRoutes(app, passport, cache) {

	// This is the first route which will be accessed by a authenticated user.
	// Here we can do a lot of stuff like tracking how many logins made etc.
	
	//app.get("/users/home", AccountAPI.getBudget);
	app.get("/users/home", function(req, res) {
		 res.render('users/home', { what: 'best', who: 'me' });
		
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
	app.get("/", function(req, res) {
			res.render("homepage", {
				message : req.flash('error')
			});
		
	});

}

module.exports = initializeRoutes;