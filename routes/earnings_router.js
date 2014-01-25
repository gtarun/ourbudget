/**
 * Routes for the Earnings page. All the routes for the earnings pages will be served by two controllers.
 * EarningsController will serve the routes for all the earnings tiles in the earnings page.
 * ChartsController will serve the routes for the Data Chart and Flot Chart in the earnings page.
 */

var User = require('../models/User');
var Auth = require('../API/authorisation.js');
var Earnings = require('../controller/EarningsController.js');
var Charts = require('../controller/ChartsController.js');

/**
 * Initializes the express app with routes for Earnings page
 * @param App
 * @param passport
 * @param Cache
 */
function initializeRoutes(App, passport, Cache) {

	// TODO : remove the index route, and change the reference from index to earnings
	// Gets the earnings page
	App.get("/index", Auth.isAuthenticated, function(req, res) {
		console.log("Rendering earnings");

		var userPicPath;
		console.log("Profile Pic Path: " + req.user.profile_pic_path);

		// Compute the Profile picture path of the user to use.
		if (req.user.profile_pic_path) {
			userPicPath = req.user.profile_pic_path.substring(9);

		} else {
			userPicPath = "assets/img/profile-pic.png";
		}

		// Render the earnings with profile picture path.
		res.render("earnings", {
			user : req.user,
			path : userPicPath
		});
	});

	// Gets the earnings page
	App.get("/earnings", Auth.isAuthenticated, function(req, res) {
		console.log("Rendering earnings");

		var userPicPath;
		console.log("Profile Pic Path: " + req.user.profile_pic_path);

		// Compute the Profile picture path of the user to use.
		if (req.user.profile_pic_path) {
			userPicPath = req.user.profile_pic_path.substring(9);

		} else {
			userPicPath = "assets/img/profile-pic.png";
		}

		// Render the earnings with profile picture path.
		res.render("earnings", {
			user : req.user,
			path : userPicPath
		});
	});

	// Gets the Todays Earnings
	App.get("/getEarningsForToday", Auth.isAuthorizedForAPI,
			Earnings.validateGetEarnings, Earnings.getEarningsForToday);

	/**
	 * Gets the Yesterdays Earnings. Gets the response directly from the redis cache 
	 * if the response is present in the cache
	 */
	App.get("/getEarningsForYesterday", Auth.isAuthorizedForAPI,
			Earnings.validateGetEarnings,
			Cache.respondWithCacheEntryForGetEarningsForYesterday,
			Earnings.getEarningsForYesterday,
			Cache.cacheReposneForGetEarningsForYesterday);

	// Gets the Current month Earnings
	App.get("/getEarningsForCurrentMonth", Auth.isAuthorizedForAPI,
			Earnings.validateGetEarnings, Earnings.getEarningsForCurrentMonth);

	/**
	 * Gets the Last Month Earnings.  Gets the response directly from the redis cache 
	 * if the response is present in the cache
	 */
	App.get("/getEarningsForLastMonth", Auth.isAuthorizedForAPI,
			Earnings.validateGetEarnings,
			Cache.respondWithCacheEntryForGetEarningsForLastMonth,
			Earnings.getEarningsForLastMonth,
			Cache.cacheReposneForGetEarningsForLastMonth);

	// Gets the Data for filling the flot-chart and data chart in the earnings page
	App.get("/getReportDataByExhchange", Auth.isAuthorizedForAPI,
			Charts.validateGetReportDataByExhchange,
			Charts.getReportDataByExhchange);

	// Gets the Values to be filled in the URL Picker in the earnings page.
	App.get("/getRegisteredTags", Auth.isAuthorizedForAPI, function(req, res) {
		var response = {};
		if (req.user.AdTagNames !== null) {
			response.value = req.user.AdTagNames;
		} else {
			response.value = [];
		}

		res.json(200, response);
	});

}

module.exports = initializeRoutes;