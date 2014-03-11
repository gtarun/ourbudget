var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");
var User = require("../models/User");
var url = require("url");
var mail = require("../controller/MailingController");

var url='http://127.0.0.1:3000/signup';

exports.getUser = function(req, res) {
	var email = req.body.email;
	console.log("Get User called with " + email);
	var response = {};
	User.findOne({email : email, parentID : {$exists:false}}, function(err, doc) {
		if (err) {
			console.log(err);
			response.error = "DB Error";
			res.json(500, response);
			return;
		}
		// Initialize the value
		response.value = {};
		response.value.email = email;
		// Prepare the response object
		if (doc === null) {
			console.log('This user does not exist as a parent');
			var text = 'Please click on th following link to sign up as a parent';
			mail.sendMail(email,url,text);
			res.json(200, response);
			return;
		} else {
			// User found. Populate the user
			console.log('You have already signed up as a parent');
			response.value.user = doc;
			res.json(200, response);
			return;
		}

	});

}

/**
 * CreateUser creates a new User using the data given in the request.
 * @param req
 * @param res
 */
exports.createUser = function(req, res) {
	console.log("Create User called");
	var email = req.body.email1;

	var data = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email1,
		pass : req.body.pass1,
		dob : req.body.dob,
		address :req.body.address,
		//parentID: '',
		contactInformation : {
				countrycode : req.body.countrycode,
				phonenumber : req.body.phoneNumber
		},
		monthlyIncome:req.body.monthlyIncome,
		profile_pic_path : '',
		facebook : {
			id : '',
			email : '',
			name : ''
		},
		twitter : {
			id : '',
			email : '',
			name : ''
		},
		familyMembers: [],
		PaymentMethod : {}
		
	};

	// Construct the AdTags Structure
	var members = [];
	var size = 0;
	console.log("TYPE:"+typeof(req.body.relation));
	if(typeof(req.body.relation)=='string')
	{
		var adData = {relation : req.body.relation, rel_email : req.body.rel_email};
		members.push(adData);
	}
	else{
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
	}

	console.log('members: '+JSON.stringify(members));

	data.familyMembers = members;
	/*Add function to send Invitation to all the members */

	// Reponse object.
	var response = {};

	var query = {
		email : data.email
	};

	var options = {};
	options.upsert = true;

	User.findOneAndUpdate(query, data, options, function(err, parent) {
		if (err) {
			console.log(err);
			response.error = "Saving Failed";
			res.json(500, response);
			return;
		}
		if(parent){
			console.log("Parent:"+parent)
			for(var i=0; i<parent.familyMembers.length; i++)
			{
				console.log(i);
				User.findOneAndUpdate({_id:parent.familyMembers[i]._id},
									  {parentID : parent._id.toString(), email:parent.familyMembers[i].rel_email},
									  {upsert : true},
									  function(err,child){
									  	if(child)
									  		console.log("Child created."+ child);
									  		var text = 'Please click on the following link to signup as a child';
									  		mail.sendMail(child.email,url,text);
									  })
			}
		}
		// Query executed successfully. Send User Created response.  
		response.value = "New User Created";
		res.json(200, response);
	});
}



