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

	console.log("Update: "+req.user);

	// Current contact information of the user.
	//var contactInformation = req.user.contactInformation;
	
	// User can upload different pieces of information using this route.
	// Figure out the info to be saved.
	if (req.body.email !== null) {
		email = req.body.email;
		update.email = email;
	}
	if (req.body.countrycode !== null) {
		countrycode = req.body.countrycode;
		update.countrycode = countrycode;
	}
	if (req.body.phonenumber !== null) {
		phonenumber = req.body.phonenumber;
		update.phonenumber = phonenumber;
	}
	if (req.body.pass1 !== null && req.body.pass1.length > 0) {
		update.pass = req.body.pass1;
	}

		
	//update.contactInformation = contactInformation;
	
	// Query Condition.
	var conditions = {_id : req.user._id}, options = {multi : true};

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
						//console.log(doc);
						
						
						// Update the doc
						doc.contactInformation.countrycode = update.countrycode;
						doc.contactInformation.phonenumber = update.phonenumber;
				
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
	var filePath = req.files.file.path;
	var n = filePath.lastIndexOf(".");
	var ext = filePath.substring(n);
	var fileName ="./public/assets/img/profilepics/"+ req.user.firstName+".jpg";
	var newPath = fileName;
	fs.readFile(req.files.file.path, function (err, data) {
	if(err){
  		console.log("err")
  		res.redirect("/user/user-home");
  		res.end();
	}
	else {
    fs.writeFile(newPath, data, function (err) {
    res.redirect('/user/user-home');
     });
    }
  });
}


/**
 * Export the required functions as module.
 */
function UpdatePrefrence(req,res){
	// Query Condition.
	var conditions = {
		_id: req.user._id
	}, options = {
		multi : true,
		upsert :true
	};

	var data= {
	prefrences :req.body
		};
	// Save the Info into DB.
	
	User.findOneAndUpdate(conditions,data,options,function(err, doc) {
						var response = {};
						if (err) {
							console.log(err);
							response.error = "Saving the File to server failed. Please retry";
							console.log(response);
							res.json(500, response);
							return;
						}

						// Create the ContactInformation if not present.
						if (!doc.prefrences)
						{
							doc.prefrences = {};	
						}
						// Once is is saved, logout the user for security reasons.
						if(doc){
								response.value = "Information Saved Succesfully";
								console.log(response);
								res.json(200, response);
								res.redirect('users/prefrence');
								}
								});
					
	

	// Save the Info into DB.
	
}

/**
* Export the prefrence of user
*/

exports.SaveAccountInfo = SaveAccountInfo;
exports.ChangePicture = ChangePicture;
exports.UpdatePrefrence =UpdatePrefrence;
