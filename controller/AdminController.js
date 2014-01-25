/**
 * Controller which handles all the Password reset functions.
 */
var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");
var User = require("../models/User");

// Password link will be sent to user using following mail.
var server = email.server.connect({
	user : "tarun.gupta@venturepact.com",
	password : "Napster_tarun",
	host : "smtp.gmail.com",
	ssl : true
});

/**
 * Renders the Forgot Password page.
 */
exports.ForgotPassword = function(req, res) {
	console.log("ForgotPassword request called");
	res.render("forgotpassword");
};

/**
 * Handles the activities involved when the user clicks the reset password link sent to his mail.
 */
exports.ResetPassword = function(req, res) {

	console.log("ResetPassword called from the user");

	// Extract the token from the reset password link.
	var token = req.query.token;
	console.log("Reset Password called with token: " + req.query.token);

	// Check whether the reset password link is expired in the redis.
	var client = redis.getClient();
	client.get(token, function(err, reply) {
		
		// Some problem with the lookup of redis.
		if (err) {
			res.render("resettokenexpired");
			return;
		}

		// Reset password link expired.
		if (reply == null) {
			res.render("resettokenexpired");
		} else {
			
			// Reset password link is not expired. 
			var email = reply;
			console.log("Rendering the resetPaswordForm with email: " + email);
			
			// Delete the token.
			client.del(token);
			
			// Render the page to enter the new password.
			res.render("resetpasswordform", {
				email : email
			});
		}

	});
};

/**
 * Updates the password with new password.
 */
exports.SavePassword = function(req, res) {
	console.log("SavePassword called");
	var email = req.body.email;
	var pass1 = req.body.pass1;
	var pass2 = req.body.pass2;

	var query = {
		email : email
	}, update = {
		pass : pass1
	}, options = {
		multi : true
	};

	User.update(query, update, options, callback);

	/**
	 * Callback to the DB Query for resetting the password.
	 */
	function callback(err, numAffected) {
		if (err) {
			res.json(500, {
				error : "Error in updating the Password"
			});
			return;
		}

		res.json(200, {
			value : "Successfully reset the Password"
		});
	}

};

// Generate the Password reset token
function generateToken() {
	var buf;
	var token;
	// Generate a 32-bit random string.
	buf = crypto.randomBytes(32);
	token = buf.toString('hex');
	return token;
}

/**
 * Generates the Password Asynchronously.
 * First checks whether email is present. If the email is invalid, it will not generate the password reset link.
 * If the email is registered, the tokens will be generated. if the token is not present in the redis server,
 * reset link will be formed with token. Otherwise again the token is regenerated, and logic is repeated.
 */
exports.GeneratePaswordLink = function(req, res) {
	console.log("GeneratePasswordLink is called");
	console.log(req.body.email);

	if (!req.body.email) {
		res.json(500, {
			value : "Please supply an email"
		});
		return;
	}

	// Send the response immediately.
	res.json(200, {
		value : "Succesfully sent the mail"
	});

	var email = req.body.email;

	// Check whether the email is present.
	User.findOne({
		email : email
	}, function(err, doc) {
		if (err) {
			console.log(err);
			return;
		}

		if (doc) {
			// If the email is present, start generating the reset link.
			callback();
		} else {
			// If the email is not registered, don't do anything.
			console.log("Email is not registered. Not sending Password.");
		}
	});

	// generate the reset password link given a token.
	function sendPasswordWithToken(token) {
		redis.insertKeyValue(token, email);

		// TODO : Change the url below to correct url.
		var url = "http://127.0.0.1:3000/resetpassword?token=" + token;
		var emailText = "Please click on the follwoing link to reset your password";
		emailText = emailText + "\n" + url;

		// send the message and get a callback with an error or details of the
		// message that was sent
		server.send({
			text : emailText,
			from : "soul.tarun@gmail.com",
			to : email,
			subject : "Password Reset"
		}, function(err, message) {
			if (err) {
				console.log(err);

			} else {
				console.log(message);
			}
		});

	}

	// Recursive Token Geenration logic.
	function callback() {

		var client = redis.getClient();

		// Generate a token
		var token = generateToken();

		// Check if the token is already used.
		client.get(token, function(err, reply) {
			if (err) {
				console.log(err);
				return;
			}

			if (reply === null) {
				// generate the password if the key is not present.
				sendPasswordWithToken(token);
			} else {
				// Recursively call the same function.
				callback();
			}

		});

	}

};