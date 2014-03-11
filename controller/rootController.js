var mail = require('./MailingController.js');

exports.signup = function(req,res){
	console.log('Inside root controller/sigup');
	var token = req.query.token;
	var email = ''
	if(token){
		email = mail.decryptToken(token);
		console.log('email decrypted:'+ email);
	}	
	res.render("signup.ejs", {email : email});
}
