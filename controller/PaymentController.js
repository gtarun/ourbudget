/**
 * Controller which handles the routes for Payments page.
 */
var fs = require('fs');
var User = require('../models/User');

/**
 * Copies the files from the source to target location.
 * 
 * @param source
 *            source file path
 * @param target
 *            path to be copied to.
 * @param cb
 */
function copyFile(source, target, cb) {
	console.log("Copy File : " + source + " : " + target);
	var cbCalled = false;

	var rd = fs.createReadStream(source);
	rd.on("error", function(err) {
		done(err);
	});

	var wr = fs.createWriteStream(target);
	wr.on("error", function(err) {
		done(err);
	});
	wr.on("close", function(ex) {
		done();
	});
	rd.pipe(wr);

	function done(err) {
		if (!cbCalled) {
			cb(err);
			cbCalled = true;
		}
	}
}

/**
 * Handles the Tax form upload route.
 */
exports.TaxFormHandler = function(req, res) {
	console.log("TaxFormHandler Called:");
	console.log(req.files.file.path);

	var filePath = req.files.file.path;

	// Strip the extension of the file uploaded.
	var n = filePath.lastIndexOf(".");
	var ext = filePath.substring(n);

	// Create a new FilePath with required extension.
	var fileName = req.user.email + "$" + "taxForm" + ext;
	var newPath = "./taxforms/uploads/" + fileName;

	console.log(newPath);

	// Move the uploaded tax form file to the new location.
	fs
			.rename(
					req.files.file.path,
					newPath,
					function(err) {
						var response = {};
						if (err) {
							// Moving the file failed.
							console.log(err);
							response.error = "Saving the File to server failed. Reupload the File.";
							console.log(response);
							res.send(500, response);
						} else {

							console.log("Renamed the file to : " + newPath);

							// Update the tax form new path to the DB.
							var conditions = {
								email : req.user.email
							}, update = {
								tax_form_path : newPath
							}, options = {
								multi : true
							};

							User.update(conditions, update, options, callback);

							function callback(err, numAffected) {
								if (err) {
									// Updating the server failed.
									console.log(err);
									response.error = "Saving the File to server failed. Reupload the File.";
									console.log(response);
									res.send(500, response);
								}

								console.log("Updated the NewPath in DB");

								// Delete the old file.
								if (req.user.tax_form_path
										&& req.user.tax_form_path !== newPath) {
									console
											.log("Deleting the old Profile Taxform: "
													+ req.user.tax_form_path);
									fs
											.unlink(
													req.user.tax_form_path,
													function(err) {
														if (err) {
															// Deleting the olf
															// file failed.
															console.log(err);
															response.error = "Saving the File to server failed. Reupload the File.";
															console
																	.log(response);
															res.send(500,
																	response);
														}
														console
																.log('successfully deleted '
																		+ req.user.tax_form_path);

														req.user.tax_form_path = newPath;

														response.value = "File Received Succesfully";
														res.send(200, response);
													});

								} else {

									req.user.tax_form_path = newPath;
									response.value = "File Received Succesfully";
									res.send(200, response);
								}

							}

						}

					});
};

/**
 * Handler for the WireTranferInternational Data submission.
 */
exports.WireTranferInternationalHandler = function(req, res) {

	console.log("WireTransfer International called");

	var wireTransferDetails = {};

	// Fetch all the required details from the request.
	wireTransferDetails.bankNameIN = req.body.bankNameIN;
	wireTransferDetails.bankAddressIN = req.body.bankAddressIN;
	wireTransferDetails.bankCityIN = req.body.bankCityIN;
	wireTransferDetails.bankStateIN = req.body.bankStateIN;
	wireTransferDetails.bankCountryIN = req.body.bankCountryIN;
	wireTransferDetails.bankSwiftIN = req.body.bankSwiftIN;
	wireTransferDetails.chipsUID = req.body.chipsUID;
	wireTransferDetails.accountHolderNameIN = req.body.accountHolderNameIN;
	wireTransferDetails.accountNumberIN = req.body.accountNumberIN;
	wireTransferDetails.addressIN = req.body.addressIN;
	wireTransferDetails.cityIN = req.body.cityIN;
	wireTransferDetails.stateIN = req.body.stateIN;
	wireTransferDetails.zipIN = req.body.zipIN;

	var paymentMethod = {};
	paymentMethod.wireTransferInternational = wireTransferDetails;

	console.log(wireTransferDetails);

	// Save into the DB
	var query = {
		_id : req.user.id
	}, update = {
		PaymentMethod : paymentMethod
	}, options = {};

	User.update(query, update, options, callback);

	function callback(err, numAffected) {
		// numAffected is the number of updated documents
		var response = {};
		if (err) {
			console.log(err);
			response.error = "Error in Uploading the data to the Server. Please Resubmit";
			res.send(500, response);
			return;
		}

		if (numAffected === 1) {
			response.value = "Succesfully submitted data to server";
			req.user.PaymentMethod = paymentMethod;
			res.send(200, response);
		} else {
			response.value = "Succesfully submitted data to server. But no data got updated";
			res.send(200, response);
		}

		return;
	}
};

/**
 * Handler for the WireTransferUS data submission.
 */
exports.WireTranferUSHandler = function(req, res) {

	console.log("WireTransfer US called");

	var wireTransferDetails = {};

	// Fetch all the required details from the request.
	wireTransferDetails.bankName = req.body.bankName;
	wireTransferDetails.bankAddress = req.body.bankAddress;
	wireTransferDetails.bankCity = req.body.bankCity;
	wireTransferDetails.bankState = req.body.bankState;
	wireTransferDetails.bankCountry = req.body.bankCountry;
	wireTransferDetails.bankSwift = req.body.bankSwift;
	wireTransferDetails.accountHolderName = req.body.accountHolderName;
	wireTransferDetails.accountNumber = req.body.accountNumber;
	wireTransferDetails.address = req.body.address;
	wireTransferDetails.city = req.body.city;
	wireTransferDetails.state = req.body.state;
	wireTransferDetails.zip = req.body.zip;

	var paymentMethod = {};
	paymentMethod.wireTransferUS = wireTransferDetails;

	console.log(wireTransferDetails);

	// Save into the DB
	var query = {
		_id : req.user.id
	}, update = {
		PaymentMethod : paymentMethod
	}, options = {};

	User.update(query, update, options, callback);

	function callback(err, numAffected) {
		// numAffected is the number of updated documents
		var response = {};
		if (err) {
			console.log(err);
			response.error = "Error in Uploading the data to the Server. Please Resubmit";
			res.send(500, response);
			return;
		}

		if (numAffected === 1) {
			response.value = "Succesfully submitted data to server";
			req.user.PaymentMethod = paymentMethod;
			res.send(200, response);
		} else {
			response.value = "Succesfully submitted data to server. But no data got updated";
			res.send(200, response);
		}

		return;
	}
};

/**
 * Handler for Paypal data submission.
 */
exports.PaypalHandler = function(req, res) {

	console.log("Paypal Handler initiated");

	var paypalDetails = {};

	// Fetch all the required details from the request.
	paypalDetails.paypalAddress = req.body.paypalAddress;

	var paymentMethod = {};
	paymentMethod.paypal = paypalDetails;

	console.log(paypalDetails);

	// Save into the DB
	var query = {
		_id : req.user.id
	}, update = {
		PaymentMethod : paymentMethod
	}, options = {};

	User.update(query, update, options, callback);

	function callback(err, numAffected) {
		// numAffected is the number of updated documents
		var response = {};
		if (err) {
			console.log(err);
			response.error = "Error in Uploading the data to the Server. Please Resubmit";
			res.send(500, response);
			return;
		}

		if (numAffected === 1) {
			response.value = "Succesfully submitted data to server";
			req.user.PaymentMethod.paypal = paypalDetails;
			console.log(response);
			res.send(200, response);
		} else {
			response.value = "Succesfully submitted data to server. But no data got updated";
			console.log(response);
			res.send(200, response);
		}

		return;
	}
};

// Handler for ACH Deposit Data submission.
exports.ACHDepositHandler = function(req, res) {

	console.log("ACH Deposit Handler initiated");

	var achDetails = {};

	// Fetch all the required details from the request.
	achDetails.accountNameACH = req.body.accountNameACH;
	achDetails.routingNumberACH = req.body.routingNumberACH;
	achDetails.accountNumberACH = req.body.accountNumberACH;
	achDetails.accountTypeACH = req.body.accountTypeACH;

	var paymentMethod = {};
	paymentMethod.achDeposit = achDetails;

	console.log(achDetails);

	// Save into the DB
	var query = {
		_id : req.user.id
	}, update = {
		PaymentMethod : paymentMethod
	}, options = {};

	User.update(query, update, options, callback);

	function callback(err, numAffected) {
		// numAffected is the number of updated documents
		var response = {};

		if (err) {
			console.log(err);
			response.error = "Error in Uploading the data to the Server. Please Resubmit";
			res.send(500, response);
			return;
		}

		if (numAffected === 1) {
			response.value = "Succesfully submitted data to server";
			req.user.PaymentMethod = paymentMethod;
			console.log(response);
			res.send(200, response);
		} else {
			response.value = "Succesfully submitted data to server. But no data got updated";
			console.log(response);
			res.send(200, response);
		}

		return;
	}
};
