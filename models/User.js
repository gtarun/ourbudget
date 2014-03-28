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
	parentID : {type: String, default:''},
	address :String,
	mailSent: {type: Boolean, default:false},
	contactInformation: {
		countrycode : String,
		phonenumber : String,
	},
	monthlyIncome:{type:Number,default:0},
	amnt_spnt : {type:Number,default:0},
	amnt_rcvd : {type:Number,default:0},
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
	familyMembers: [{relation: String,
		rel_email : String}],
	PaymentMethod : {},
	prefrences : [],
	notification:[{
		postDate:Date,
		amount :Number,
		who    : String
	}]
});

//creating User with given emailID and Password
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

//Validating User with emailID and Password
UserSchema.statics.isValidUserPassword = function(email, password, done) {
	this.findOne({email : email, pass : password}, function(err, user) {
		if (err) 
			return done(err);
		if (user){ 
			console.log(user);
			return done(null, user);
		}
		else
			return done(null, false, {message : 'EmailID or Password is incorrect. Plese retry.'});
	})
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