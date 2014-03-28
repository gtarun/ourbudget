/**
 * Controller for handling the routes in  MyAccount page.
 */
var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");

// link will be sent to user using following mail.
var server = email.server.connect({
	user : " ourbudget@venturepact.com",
	password : "ourbudget@vp",
	host : "smtp.gmail.com",
	ssl : true
});

//alrorithm and key used for encryption
var algo = 'aes256';
var key = 'ourbudget@vp';

//function tosen mail to given email
exports.sendMail = function(email, url, parentID, text){
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
			myurl = url + '?token=' + token + '&parentID=' + parentID;
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

//function todecrypt the token
exports.decryptToken = function(token,parentID){
	var decipher = crypto.createDecipher(algo,key);
	decrypted = decipher.update(token,'hex','utf8') + decipher.final('utf8');
	return decrypted;
}
