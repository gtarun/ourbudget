/**
 * Router which contains routes for handling the MyAccount page.
 */
var fs=require('fs');
var AccountAPI = require('../controller/AccountController.js');
var Auth = require('../API/authorisation.js');

function initializeRoutes(App, passport, Cache) {
	
	// Gets the MyAccount page.
	App.get("/users/user-profile", Auth.isAuthenticated, function(req, res) {

		/*var userPicPath;
		console.log("Profile Pic Path: " + req.user.profile_pic_path);

		// Correct the User Picture path.
		if (req.user.profile_pic_path) {
			userPicPath = req.user.profile_pic_path.substring(9);

		} else {
			userPicPath = "assets/img/profile-pic.png";
		}*/

		// Render the MyAccount page with correct User Picture.
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
		console.log("path is in user-profile"+path);
		fs.stat(path,function(err,stat)
		{
		if(!err){
			path="../../assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log('pic found');
			res.render("users/user-profile", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
		else{
			path="../../assets/img/profilepics/1.jpg"
			console.log('not found');
			res.render("users/user-profile", {
			user   : req.user,
			imgpath : path,
			imgpaths :path});}
			})
		/*res.render("users/user-profile", {
			user : req.user,
			path : userPicPath
		});*/
	});
	// Route for handling the chnage picture.
	App.post("/users/changePicture", Auth.isAuthorizedForAPI,
			AccountAPI.ChangePicture);
	
	// Route for saving the account info.
	App.post("/users/saveAccountInfo", Auth.isAuthorizedForAPI,AccountAPI.SaveAccountInfo);


	App.get("/users/prefrence",Auth.isAuthenticated, function(req, res) {
			//console.log('prefrence is'+req.user);
			path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is in my account"+path);
			fs.stat(path,function(err,stat)
			{
				if(!err)

				{path="../../assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log('pic found');
				res.render("users/prefrence", {
				user   : req.user,
			    imgpath : path,
				imgpaths :path
			});
				}
			else{
				path="../../assets/img/profilepics/1.jpg"
				console.log('not found');
		 		res.render("users/prefrence", {
				user   : req.user,
			    imgpath : path,
				imgpaths :path
			});
		 	}
			})
		
	});
	App.post("/users/updateprefrence",Auth.isAuthenticated,
		AccountAPI.UpdatePrefrence);
}
/**
 * Export the required functions as module.
 */
module.exports = initializeRoutes;