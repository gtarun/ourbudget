/**
 * Initializes the Passport Local mechanism.
 */

var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

module.exports = function(passport, config) {

	passport.serializeUser(function(user, done) {
		console.log("Serialzing Userid: " + user.id);
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("DesSerialzing : " + id);
		User.findOne({
			_id : id
		}, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField : 'txtusername',
		passwordField : 'txtpassword'
	}, function(email, password, done) {
		console.log("Validating the " + email + ":" + password);
		User.isValidUserPassword(email, password, done);
	}));

	passport.use(new FacebookStrategy({
		clientID : config.development.facebook.clientID,
		clientSecret : config.development.facebook.clientSecret,
		callbackURL : config.development.facebook.callbackURL
	}, function(accessToken, refreshToken, profile, done) {
		console.log("Finding the User : " + accessToken + refreshToken);
		User.findOrCreateFaceBookUser(profile, done);
	}));
};