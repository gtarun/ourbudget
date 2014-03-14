/**
 * Router for the main routes
 */
fs=require('fs');
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');

function initializeRoutes(app, passport, cache) {

	// This is the first route which will be accessed by a authenticated user.
	// Here we can do a lot of stuff like tracking how many logins made etc.
	
	app.get("/users/addbudget",Auth.isAuthenticated, function(req, res) {
			path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is in addbudget"+path);
			fs.stat(path,function(err,stat)
			{
			if(!err){
			path="../assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log('pic found');
			res.render("users/addbudget", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
		else{
			path="../assets/img/profilepics/1.jpg"
			console.log('not found');
			res.render("users/addbudget", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
			})
		
			console.log("add budget : " + req.user);
			/*res.render("users/addbudget",{
				user:req.user,
				imgpath:"../assets/img/profilepics/"+req.user.firstName+".jpg",
				imgpaths:"../assets/img/profilepics/"+req.user.firstName+".jpg"});*/
		
	});

	app.get("/users/relationBudget",Auth.isAuthenticated, function(req, res) {
			path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is in addbudget"+path);
			fs.stat(path,function(err,stat)
			{
			if(!err){
			path="../assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log('pic found');
			res.render("users/relationBudget", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
		else{
			path="../assets/img/profilepics/1.jpg"
			console.log('not found');
			res.render("users/relationBudget", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
			})
		
			//console.log("add budget : " + req.user);
			/*res.render("users/addbudget",{
				user:req.user,
				imgpath:"../assets/img/profilepics/"+req.user.firstName+".jpg",
				imgpaths:"../assets/img/profilepics/"+req.user.firstName+".jpg"});*/
		
	});
	app.post("/users/relationBudget",AccountAPI.relationBudget);
	app.post("/users/relbudget",AccountAPI.relbudget);
	
	app.post("/users/addbudget", AccountAPI.addBudgget);

	app.post("/addbudget", AccountAPI.addBudgget);
	app.post("/getBudget",AccountAPI.getBudget);
    app.post("/getAllBudget",AccountAPI.getAllBudget);
}

module.exports = initializeRoutes;