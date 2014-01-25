/**
 * Admin controller which handles the routes in admin_router.js
 */

var User = require("../models/User");

/**
 * GetUser will return the User details from the DB, and return as JSON object.
 * @param req
 * @param res 
 */
function getUser(req, res) {
	var email = req.body.email;

	console.log("Get User called with " + email);

	// Response object to be returned
	var response = {};

	// Find the User object in the DB
	User.findOne({
		email : email
	}, function(err, doc) {
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
			// No User found
			res.json(200, response);
			return;
		} else {
			// User found. Populate the user
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
function createUser(req, res) {
	console.log("Get User called");
	console.log(req.body);
	var email = req.body.email1;

	if (typeof req.body.relation !== 'undefind') {
		req.body.relation = [ req.body.relation ];
		req.body.rel_email = [ req.body.rel_email ];
	}

	// Construct the User Json object from the data in the request
	var data = {
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email : req.body.email1,
		pass : req.body.pass1,
		dob : req.body.dob,
		parentID: '',
		contactInformation : {
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
	for ( var i = 0; i < req.body.relation.length; i++) {
		var relation = req.body.relation[i];
		var rel_email = req.body.rel_email[i];

		// Trim the URL
		/*if (relation) {
			relation = relation.trim();
		} else {
			relation = "";
		}

		// Trim the AdTag
		if (rel_email) {
			rel_email = rel_email.trim();
		} else {
			rel_email = "";
		}
*/
		// Prepare the adData
		if (relation.length > 0 && rel_email.length > 0) {
			var adData = {};
			adData.relation = relation;
			adData.rel_email = rel_email;
			members.push(adData);
		}

	}

	data.familyMembers = members;
	/*Add function to send Invitation to all the members */

	// Reponse object.
	var response = {};

	var query = {
		email : data.email
	};

	var options = {};
	options.upsert = true;

	User.findOneAndUpdate(query, data, options, function(err, doc) {
		if (err) {
			console.log(err);
			response.error = "Saving Failed";
			res.json(500, response);
			return;
		}

		// Query executed successfully. Send User Created response.  
		response.value = "New User Created";
		res.json(200, response);
	});
}

/**
 * Export the functions
 */
exports.getUser = getUser;
exports.createUser = createUser;