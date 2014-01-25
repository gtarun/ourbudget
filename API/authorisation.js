/**
 * New node file
 */
var User = require('../models/User');

/**
 * Checks whether a user is authenticated.
 */
exports.isAuthenticated = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

/**
 * Checks whether a user is authorized.
 */
exports.isAuthorizedForAPI = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

exports.userExist = function(req, res, next) {
	console.log("userExuist called with " + req.body.email);
	User.count({
		email : req.body.email
	}, function(err, count) {
		if (count === 0) {
			next();
		} else {
			res.redirect("/login");
		}
	});
};
