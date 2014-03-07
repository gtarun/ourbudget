/**
 * Admin controller which handles the routes in admin_router.js
 */
var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");
var User = require("../models/User");
var url = require("url");
/**
 * GetUser will return the User details from the DB, and rrbudgetnew
 turn as JSON object.
 * @param req
 * @param res 
 */
function getUser(req, res) {
	var email = req.body.email;
	console.log(req.path);
	
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
			console.log('getUser not found');
			sendMail(email);
			// No User found
			res.json(200, response);
			return;
		} else {
			// User found. Populate the user
			console.log('getUser found');
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
	console.log("Create User called");
	console.log("req.body:"+req.body.value);
	var email = req.body.email1;

	/*if (typeof req.body.relation !== 'undefind') {
		req.body.relation = [ req.body.relation ];
		req.body.rel_email = [ req.body.rel_email ];
	}*/

	// Construct the User Json object from the data in the request
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
	var adData = {};
	if(typeof(req.body.relation)=='string'){
		adData.relation = req.body.relation;
		adData.rel_email = req.body.rel_email;
		members.push(adData);
	}
	else{
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
			
			adData.relation = relation;
			adData.rel_email = rel_email;
			members.push(adData);
		}
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
									  		sendMail(child.email);
									  })
			}
		}
		// Query executed successfully. Send User Created response.  
		response.value = "New User Created";
		res.json(200, response);
	});
}

var server = email.server.connect({
	user : "zufeshanzareen14@gmail.com",
	password : "Z\"fe$#@nZ@reeN14",
	host : "smtp.gmail.com",
	ssl : true
});

function sendMail(email){
	console.log(email);
	console.log("Inside sendmail");
	var client = redis.getClient();
	//var buf = crypto.randomBytes(32);
	//var token = buf.toString('hex');
	var algo = 'aes256';
	var key = 'password';
	//var text = 'I lov my India';
	var cipher = crypto.createCipher(algo,key);
	var token = cipher.update(email,'utf8','hex') + cipher.final('hex');
	console.log('encrypted:'+ token);

	client.get(token, function(err, reply){
		console.log("client.get(token).")
		if (err) {
			console.log(err);
			return;
		}
		if(reply==null){
			console.log("redis.insertKeyValue(token, email) ");
			redis.insertKeyValue(token, email);
			var url = "http://127.0.0.1:3000/signup?token=" + token;
			var emailText = "Please click on the follwoing link to signup as a child";
			emailText = emailText + "\n" + url;
			console.log(url);
			server.send({
				text : emailText,
				from : "zufeshanzareen14@gmail.com",
				to : email,
				subject : "SignUp"
			}, function(err, message) {
				if (err) {
					console.log("error occurred during sendmail"+err);
				} 
				else {
					console.log("message: is:"+message);
				}
			});
		}
		else{
			console.log("send mail again");
			sendMail(email);
		}
	});
}

/**
 * Export the functions
 */
exports.getUser = getUser;
exports.createUser = createUser;