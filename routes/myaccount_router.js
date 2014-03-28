/**
 * Router which contains routes for handling the MyAccount page.
 */
var fs=require('fs');
var AccountAPI = require('../controller/AccountController.js');
var Auth = require('../API/authorisation.js');

function initializeRoutes(App, passport, Cache) {
	
	// Gets the MyAccount page.
	App.get("/users/user-profile", Auth.isAuthenticated, function(req, res) {

		// Render the MyAccount page with correct User Picture.
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
		console.log("path is in user-profile"+path);
		fs.stat(path,function(err,stat){
			if(!err){
				path="../../assets/img/profilepics/"+req.user.firstName+".jpg";
				console.log('pic found');
				res.render("users/user-profile",
							{user   : req.user,
							imgpath : path,
							imgpaths :path});}
			else{
				path="../../assets/img/profilepics/1.jpg"
				console.log('not found');
				res.render("users/user-profile",
							{user   : req.user,
							imgpath : path,
							imgpaths :path});}
		})
	});

	App.get("/users/changePicture",function(req,res){
		console.log("Change Picture Called:");
		console.log(req.user);
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
		console.log("path is in user-profile"+path);
		fs.stat(path,function(err,stat){
			if(!err){
				path="../../assets/img/profilepics/"+req.user.firstName+".jpg";
				console.log('pic found');
				res.render("users/picture", 
							{user   : req.user,
							imgpath : path,
							imgpaths :path});}
			else{
				path="../../assets/img/profilepics/1.jpg"
				console.log('not found');
				res.render("users/picture", 
							{user   : req.user,
							imgpath : path,
							imgpaths :path});}
		})
	})

	// Route for handling the chnage picture.
	App.post("/users/changePicture", Auth.isAuthorizedForAPI,AccountAPI.ChangeProfilePicture);
	App.post("/users/changeCover", Auth.isAuthorizedForAPI,AccountAPI.ChangeProfilePicture);
	
	// Route for saving the account info.
	App.post("/users/saveAccountInfo", Auth.isAuthorizedForAPI,AccountAPI.SaveAccountInfo);
	App.post("/users/saveRelationInfo", Auth.isAuthorizedForAPI,AccountAPI.SaveRelationInfo);
	App.post("/users/removeRelation",Auth.isAuthorizedForAPI,AccountAPI.RemoveRelationInfo)
	App.post("/users/addRelation",Auth.isAuthorizedForAPI,AccountAPI.AddRelationInfo)

	App.get("/users/prefrence",Auth.isAuthenticated, function(req, res) {
		//console.log('prefrence is'+req.user);
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
		console.log("path is in my account"+path);
		fs.stat(path,function(err,stat){
			if(!err){
				path="../../assets/img/profilepics/"+req.user.firstName+".jpg";
				console.log('pic found');
				res.render("users/prefrence",
							{user   : req.user,
			    			imgpath : path,
							imgpaths :path});
			}
			else{
				path="../../assets/img/profilepics/1.jpg"
				console.log('not found');
		 		res.render("users/prefrence", 
							{user   : req.user,
			    			imgpath : path,
							imgpaths :path
				});
		 	}
		})
	});

	App.post("/users/updateprefrence",Auth.isAuthenticated,AccountAPI.UpdatePrefrence);
}
/**
 * Export the required functions as module.
 */
module.exports = initializeRoutes;