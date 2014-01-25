/**
 * Router for handling the routes in Payments page.
 */

var PaymentsAPI = require('../controller/PaymentController.js');
var Auth = require('../API/authorisation.js');

/**
 * Initialize the routes for Payments page.
 * @param App
 * @param passport
 * @param Cache
 */
function initializeRoutes(App, passport, Cache) {

	// Gets the Payments page.
	App.get("/payments", Auth.isAuthenticated, function(req, res) {
		console.log("Rendering payments");

		var userPicPath;
		console.log("Profile Pic Path: " + req.user.profile_pic_path);

		if (req.user.profile_pic_path) {
			userPicPath = req.user.profile_pic_path.substring(9);

		} else {
			userPicPath = "assets/img/profile-pic.png";
		}

		res.render("payments", {
			user : req.user,
			path : userPicPath
		});
	});

	// Route for handling the Tax form uploads.
	App.post("/taxFormUpload", Auth.isAuthorizedForAPI,
			PaymentsAPI.TaxFormHandler);

	// Route for handling the submission of WireTransferInternational data.
	App.post("/wireTransferInternational", Auth.isAuthorizedForAPI,
			PaymentsAPI.WireTranferInternationalHandler);
	
	// Route for handling the submission of WireTransferUS data.
	App.post("/wireTransferUS", Auth.isAuthorizedForAPI,
			PaymentsAPI.WireTranferUSHandler);
	
	// Route for handling the submission of ACH Deposit data.
	App.post("/achSubmit", Auth.isAuthorizedForAPI,
			PaymentsAPI.ACHDepositHandler);
	
	// Route for handling the submission of PaperCheck data.
	App
	.post("/paperCheck", Auth.isAuthorizedForAPI,
			PaymentsAPI.TaxFormHandler);
	
	// Route for handling the submission of Paypal data.
	App.post("/paypal", Auth.isAuthorizedForAPI, PaymentsAPI.PaypalHandler);

}

/**
 * Export the function as module.
 */
module.exports = initializeRoutes;
