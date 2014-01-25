/**
 * Mongoose model for a User.
 */
var mongoose = require('mongoose');

//TODO : This model has to be changed to support for the new requirements. Please see the admin page.
UserSchema = mongoose.Schema({
	firstName : String,
	lastName : String,
	email : String,
	pass : String,
	dob : String,
	parentID: String,
	contactInformation: {
		phonenumber : String
	},
	monthlyIncome:String,
	profile_pic_path : String,
	facebook : {
		id : String,
		email : String,
		name : String
	},
	twitter : {
		id : String,
		email : String,
		name : String
	},
	familyMembers: [],
	PaymentMethod : {},
	prefrences : []
});



UserSchema.statics.signup = function(email, password, done) {
	var User = this;

	User.create({
		email : email,
		pass : password,
	}, function(err, user) {
		//if(err) throw err;
		if (err)
			return done(err);
		console.log(user);
		console.log(user.id);
		done(null, user);
	});
};

UserSchema.statics.isValidUserPassword = function(email, password, done) {
	this.findOne({
		email : email
	}, function(err, user) {
		if (err) {
			return done(err);
		}

		if (!user) {
			return done(null, false, {
				message : 'Email provided is not registered.'
			});
		}

		if (password === user.pass) {
			return done(null, user);
		}

		return done(null, false, {
			message : 'Password is incorrect. Plese retry.'
		});
	});
};

UserSchema.statics.findOrCreateFaceBookUser = function(profile, done) {
	var User = this;
	this.findOne({
		'facebook.id' : profile.id
	}, function(err, user) {
		if (err)
			throw err;
		// if (err) return done(err);
		if (user) {
			done(null, user);
		} else {
			User.create({
				email : profile.emails[0].value,
				facebook : {
					id : profile.id,
					email : profile.emails[0].value,
					name : profile.displayName
				}
			}, function(err, user) {
				if (err)
					throw err;
				// if (err) return done(err);
				done(null, user);
			});
		}
	});
}


var User = mongoose.model("User", UserSchema);
module.exports = User;