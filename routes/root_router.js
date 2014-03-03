/**
 * Router for the main routes
 */
var crypto = require("crypto"); 
var url = require('url'); 
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');
function initializeRoutes(app, passport, cache) {

	// This is the first route which will be accessed by a authenticated user.
	// Here we can do a lot of stuff like tracking how many logins made etc.
	
	//app.get("/users/home", AccountAPI.getBudget);
	app.get("/users/home", function(req, res) {
		if(req.isAuthenticated()){

			path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is"+path);
			fs.stat(path,function(err,stat)
			{
				if(!err){

					res.render('users/home', { user:req.user, imgpath:"../assets/img/profilepics/"+req.user.firstName+".jpg",imgpaths:"../assets/img/profilepics/"+req.user.firstName+".jpg" });
				}
			
			else{
				path="../assets/img/profilepics/1.jpg"
		 res.render('users/home', { user:req.user ,imgpath:path,imgpaths:"../assets/img/profilepics/1.jpg" });}
		});
		}
		else
		{
			console.log('not succeed');
		}
		
	});
    
    
	app.get("/signup", function(req, res) {
		var token = req.query.token;
		var algo = 'aes256';
	var key = 'password';
	var decrypted = "";
		console.log(token);
		if(token){
		var decipher = crypto.createDecipher(algo,key);
		 decrypted = decipher.update(token,'hex','utf8') + decipher.final('utf8');
		console.log('decrypted:'+ decrypted);
		}
		 //res.render('users/home', { what: 'best', who: 'me' });
		if (req.isAuthenticated()) {
			console.log("Authenticated : " + req.user);
			res.redirect('users/home');

		} else {			
			console.log("Unauthenticated Req received for GET /");
			res.render("signup", {
				message : req.flash('error'),
				email : decrypted
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