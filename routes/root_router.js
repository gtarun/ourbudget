var crypto = require("crypto"); 
var url = require('url'); 
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');
var root = require('../controller/rootController.js');


function initializeRoutes(app, passport, cache) {
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
    
    
	app.get("/signup", root.signup);
		
	app.get("/", function(req, res) {
			res.render("homepage", {
				message : req.flash('error')
			});
		
	});

}

module.exports = initializeRoutes;