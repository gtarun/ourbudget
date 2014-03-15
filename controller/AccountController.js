/**
 * Controller for handling the routes in  MyAccount page.
 */
var fs = require('fs');
var User = require('../models/User');
var mail = require("../controller/MailingController");

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
	var update = {};

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


	var conditions = {_id : req.user._id}, options = {multi : true};

	console.log("Updating the contact info with: ");
	console.log(update);

	User.findOne(conditions,function(err, doc) {
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
							doc.contactInformaion = {};	
						doc.contactInformation.countrycode = update.countrycode;
						doc.contactInformation.phonenumber = update.phonenumber;
				
						if (update.pass) {
							doc.pass = update.pass;
						}
						
						if (update.email) {
							if(doc.email !== update.email){
								User.findOne({email : update.email, parentID : {$exists:false}}, function(err, parent){
									if(parent){
										console.log("parent exists :)");
										response.user = parent;
										res.json(200,response);
										return;
									}
										
									else{
										console.log("parent doesn't exist :)");
										mail.sendMail(update.email,'http://127.0.0.1:3000/login',
										'Your login emailID has been changed from '+doc.email+' to '+update.email);
										doc.email = update.email;
									}
								});
								
							}
						}

						// Save the information.
						doc.save(function(err) {
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

function SaveRelationInfo (req, res){
	User.findOneAndUpdate({_id:req.user._id},
						  {$inc:{monthlyIncome:req.body.monthlyIncome}},
						  function(err,doc){
						  	if(!err)
								console.log("Update Monthly Income")
	});

	var members = [];

	for ( var i = 0; i < req.body.relation.length; i++) {
		var relation = req.body.relation[i];
		var rel_email = req.body.rel_email[i];

		
		// Prepare the adData
		if (relation.length > 0 && rel_email.length > 0) {
			var adData = {relation : relation, rel_email : rel_email};
			console.log('Pushing:' + adData.relation + adData.rel_email);
			members.push(adData);
		}
	}

	res.json(200,members);
}		
/**
 * Saves the User picture uploaded in the request to the Images folder, and changes the user pic.
 * @param req
 * @param res
 */
function ChangeProfilePicture (req, res) {

	console.log("Chnage Picture Called:");
	console.log(req.files.file.path);

	var filePath = req.files.file.path;
	var n = filePath.lastIndexOf(".");
	var newPath = "./public/assets/img/profilepics/" + req.user.firstName+".jpg";
	fs.readFile(req.files.file.path,function(err,data){
		if(err){
			console.log("err");
			res.redirect("/user/user-home");
			res.end();
		}
		else
		{
			fs.writeFile(newPath,data,function(err){
				res.redirect("/user/user-home");
			})
		}

	})
	
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

	var data= req.body;
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
						if (!doc.prefrences)
						{
							doc.prefrences = {};	
						}
						
						// Update the doc
						doc.prefrences =data;
				
						// Save the information.
						doc.save(function(err) {
									// Saving failed.
									if (err) {
										console.log(err);
										response.error = "Saving the File to server failed. Please retry";
										console.log(response);
										res.json(500, response);
										return;
									}

									// Once is is saved, logout the user for security reasons.
									
									response.value = "Information Saved Succesfully";
									console.log(response);
									res.json(200, response);
									res.redirect("/users/prefrence");

								});
					});
	

	// Save the Info into DB.
	
}

function RemoveRelationInfo (req, res){
	console.log(req.body.email);
	console.log(req.body.parent_id);
	User.remove({email:req.body.email,parentID:req.body.parent_id},function(err,removed){
		if(err)
			console.log("Error in Remove Relation child");
		if(removed){
			console.log("removed child");
		}
	});
	
	User.findOneAndUpdate({_id:req.body.parent_id},
						  {$pull:{familyMembers:{rel_email:req.body.email}}},
						  function(err,updated){
						  		if(err)
									console.log("Error in Remove Relation Parent");
								if(updated){
									console.log("updated/removed from parent");
								}
    });
	res.send(req.body);
}

function AddRelationInfo (req, res){
	User.findOneAndUpdate({_id:req.body.parent_id},
					      {$push:{familyMembers:{rel_email:req.body.email,relation:req.body.rel}}},
					      function(err,added1){
						    if(err) 
						    	console.log('error');
							if(added1){
								console.log('updated/added into Parent'+added1);
								var len=added1.familyMembers.length - 1;
								console.log(len);
								console.log(added1.familyMembers[len]._id);
								User.findOneAndUpdate({_id:added1.familyMembers[len]._id},
													  {email:req.body.email,parentID:req.body.parent_id},//{_id:added1.familyMembers[len]._id},
													  {upsert:true},
													  function(err,added2){
														if(err) 
															console.log('error2');
														if(added2)
														    console.log('Added child'+added2); 
								}); 
							}
	});
	
	res.send(req.body);
}
/**
* Export the prefrence of user
*/

exports.SaveAccountInfo = SaveAccountInfo;
exports.ChangeProfilePicture = ChangeProfilePicture;
exports.UpdatePrefrence =UpdatePrefrence;
exports.SaveRelationInfo = SaveRelationInfo;
exports.RemoveRelationInfo = RemoveRelationInfo;
exports.AddRelationInfo = AddRelationInfo;