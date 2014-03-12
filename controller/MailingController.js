
var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");

var server = email.server.connect({
	user : " ourbudget@venturepact.com",
	password : "ourbudget@vp",
	host : "smtp.gmail.com",
	ssl : true
});

var algo = 'aes256';
var key = 'ourbudget@vp';

exports.sendMail = function(email, url, text){
	var client = redis.getClient();

	var cipher = crypto.createCipher(algo , key);
	var token = cipher.update(email,'utf8','hex')+ cipher.final('hex');
	client.get(token,function(err,reply){
		if(err){
			console.log('Error: '+ err);
			return err;
		}
		else{
			redis.insertKeyValue(token,email);
			myurl = url + '?token=' + token;
			emailText = text + "\n" + myurl;
			server.send({
				text : emailText,
				from : "ourbudget@venturepact.com",
				to : email,
				subject : "SignUp-OurBudget"
			}, function(err, message) {
				if (err) {
					console.log(err);
				} 
				else {
					console.log("message:");//+JSON.stringify(message));
				}
			});
		}
	})
}

exports.decryptToken = function(token){
	var decipher = crypto.createDecipher(algo,key);
	decrypted = decipher.update(token,'hex','utf8') + decipher.final('utf8');
	return decrypted;
}
