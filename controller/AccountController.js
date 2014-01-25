/**
 * Controller for handling the routes in  MyAccount page.
 */
var fs = require('fs');
var User = require('../models/User');

/**
 * Saves the Account Information in the request to the DB.
 * @param req
 * @param res
 */
function SaveAccountInfo (req, res) {
	var email = null;
	var countrycode = null;
	var phonenumber = null;
	var password = null;

	// Information to be updated.
	var update = {};

	// Current contact information of the user.
	var contactInfo = req.user.contactInformation;
	
	// User can upload different pieces of information using this route.
	// Figure out the info to be saved.
	if (req.body.email !== null) {
		email = req.body.email;
	}
	if (req.body.countrycode !== null) {
		contactInfo.countrycode = req.body.countrycode;
	}
	if (req.body.phonenumber !== null) {
		contactInfo.countrycode = req.body.phonenumber;
	}
	if (req.body.pass1 !== null && req.body.pass1.length > 0) {
		update.pass = req.body.pass1;
	}

	if (email !== null) {
		update.email = email;
	}
	
	update.contactInformation = contactInfo;
	
	// Query Condition.
	var conditions = {
		email : req.user.email
	}, options = {
		multi : true
	};

	console.log("Updating the contact info with: ");
	console.log(update);

	// Save the Info into DB.
	User
			.findOne(
					conditions,
					function(err, doc) {
						var response = {};
						if (err) {
							console.log(err);
							response.error = "Saving the File to server failed. Please retry";
							console.log(response);
							res.json(500, response);
							return;
						}

						// Create the ContactInformation if not present.
						if (!doc.contactInformaion)
						{
							doc.contactInformaion = {};	
						}
						
						// Update the doc
						doc.contactInformaion.countrycode = update.contactInformation.countrycode;
						doc.contactInformaion.phonenumber = update.contactInformation.phonenumber;
				
						if (update.pass) {
							doc.pass = update.pass;
						}
						
						if (update.email) {
							doc.email = update.email;
						}

						// Save the information.
						doc
								.save(function(err) {
									// Saving failed.
									if (err) {
										console.log(err);
										response.error = "Saving the File to server failed. Please retry";
										console.log(response);
										res.json(500, response);
										return;
									}

									// Once is is saved, logout the user for security reasons.
									req.logout();
									response.value = "Information Saved Succesfully";
									console.log(response);
									res.json(200, response);

								});
					});
}

/**
 * Saves the User picture uploaded in the request to the Images folder, and changes the user pic.
 * @param req
 * @param res
 */
function ChangePicture (req, res) {

	console.log("Chnage Picture Called:");
	console.log(req.files.file.path);

	var filePath = req.files.file.path;
	var n = filePath.lastIndexOf(".");
	var ext = filePath.substring(n);
	var fileName = req.user.email + "$" + "userpic" + ext;
	var newPath = "./public/assets/img/profiles/" + fileName;

	fs
			.rename(
					req.files.file.path,
					newPath,
					function(err) {
						var response = {};
						if (err) {
							console.log(err);
							response.error = "Saving the File to server failed. Reupload the File.";
							console.log(response);
							res.send(500, response);
						} else {

							console.log("Renamed the file to : " + newPath);
							var conditions = {
								email : req.user.email
							}, update = {
								profile_pic_path : newPath
							}, options = {
								multi : true
							};

							User.update(conditions, update, options, callback);

							function callback(err, numAffected) {
								if (err) {
									console.log(err);
									response.error = "Saving the File to server failed. Reupload the File.";
									console.log(response);
									res.send(500, response);
								}

								console.log("Updated the NewPath in DB");

								if (req.user.profile_pic_path
										&& req.user.profile_pic_path !== newPath) {
									console
											.log("Deleting the old Profile Pic: "
													+ req.user.profile_pic_path);
									fs
											.unlink(
													req.user.profile_pic_path,
													function(err) {
														if (err) {
															console.log(err);
															response.error = "Saving the File to server failed. Reupload the File.";
															console
																	.log(response);
															res.send(500,
																	response);
														}
														console
																.log('successfully deleted '
																		+ req.user.profile_pic_path);

														req.user.profile_pic_path = newPath;

														response.value = "File Received Succesfully";
														res.send(200, response);
													});

								} else {

									req.user.profile_pic_path = newPath;
									response.value = "File Received Succesfully";
									res.send(200, response);
								}

							}

						}

					});

}

/**
 * Export the required functions as module.
 */
function UpdatePrefrence(req,res){
	// Query Condition.
	var conditions = {
		email : req.user.email
	}, options = {
		multi : true
	};

	console.log("Updating the contact info with: ");
	console.log(update);

	// Save the Info into DB.
	User
			.findOne(
					conditions,
					function(err, doc) {
						var response = {};
						if (err) {
							console.log(err);
							response.error = "Saving the File to server failed. Please retry";
							console.log(response);
							res.json(500, response);
							return;
						}

						// Create the ContactInformation if not present.
						if (!doc.contactInformaion)
						{
							doc.contactInformaion = {};	
						}
						
						// Update the doc
						doc.contactInformaion.countrycode = update.contactInformation.countrycode;
						doc.contactInformaion.phonenumber = update.contactInformation.phonenumber;
				
						if (update.pass) {
							doc.pass = update.pass;
						}
						
						if (update.email) {
							doc.email = update.email;
						}

						// Save the information.
						doc
								.save(function(err) {
									// Saving failed.
									if (err) {
										console.log(err);
										response.error = "Saving the File to server failed. Please retry";
										console.log(response);
										res.json(500, response);
										return;
									}

									// Once is is saved, logout the user for security reasons.
									req.logout();
									response.value = "Information Saved Succesfully";
									console.log(response);
									res.json(200, response);

								});
					});
}

/**
* Export the prefrence of user
*/

exports.SaveAccountInfo = SaveAccountInfo;
exports.ChangePicture = ChangePicture;
exportsUpdatePrefrence =UpdatePrefrence
