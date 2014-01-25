/**
 * New node file
 */

var User = require("../models/User.js");

var data = {
	firstName : 'Bhanu',
	lastName : 'Kishore',
	email : 'bhanukishore22@gmail.com',
	contactInformation : {
		email : '',
		countrycode : '',
		phonenumber : ''
	},
	pass : '1234',
	profile_pic_path : '',
	tax_form_path : '',
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
	AdTagNames : [ "P.U. Magazine_728x90", "P.U. Magazine_468x60",
			"P.U. Magazine_250x360", "P.U. Magazine_120x240",
			"P.U. Magazine_125x125", "P.U. Magazine_180x150",
			"P.U. Magazine_250x250", "P.U. Magazine_240x400",
			"Malaysiastock.biz_728x90" ],
	PaymentMethod : {}
};

var newUser = new User(data);
function init() {
	console.log("Running script");
	newUser.save(function(err) {
		console.log(err);
	});	
}

module.exports = init;

