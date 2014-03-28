var root = require('../controller/rootController.js');


function initializeRoutes(app, passport, cache) {
	app.get("/users/home", root.home);
    
	app.get("/signup", root.signup);
		
	app.get("/", function(req, res) {
			res.render("homepage", {message : req.flash('error')});
	});

}

module.exports = initializeRoutes;





