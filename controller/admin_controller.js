var email = require("emailjs");
var crypto = require("crypto");
var redis = require("../cache/redis_cache");
var User = require("../models/User");
var url = require("url");
var mail = require("../controller/MailingController");

var url='http://127.0.0.1:3000/signup';

exports.getUser = function(req, res) {
	var email = req.body.email;
	var token = req.body.token;
	console.log("Get User called with email " + email);
	console.log("Get User called with token " + token);
	var response = {};
	User.findOne({email : email,parentID:{$exists:false}}, function(err, doc) {
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
		//doc has parent users with given emailId
		if (doc){
			//Parent+email+token=Fill up details in Create Parent form		
			if(token!='undefined'){
				console.log("Go to create Parent form");
				response.value.form = true;
				response.message = "You are proceeding to signup as a parent";
			}
			//Parent+email+no_token=already exist as parent in database
			else if(token==='undefined'){
				console.log("You have already signed up as parent.");
				response.value.form = false;
				response.message = "You have already signed up as parent once. Either login or check your mail for link to proceed."
			}
			else{
				console.log("Unexpected situation 1 !!!");
			}
			res.json(200, response);
			return;
			
			/*else if(doc.parentID && token==='undefined'){
				console.log("You exist as a child but want to sign up as a parent too.");
				var text = 'Please click on th following link to sign up as a parent';
				mail.sendMail(email,url,text);
				User.findOneAndUpdate({email:email,parentID:{$exists:false}},{email:email},{upsert:true},function(err,par){
				if(err)
					console.log("Error in creating Parent");
				if(par)
					console.log("Mail sent and parent created in database.");
				});
				response.value.parent = false;
				response.message = "You exist as a child but want to sign up as a parent too."
			}*/
		} 
		//if email exists then its a child
		else {
			//no_email+no_parent+no_token = New entry as parent
			if(token==='undefined'){
				console.log('You can sign up as a parent');
				var text = 'Please click on th following link to sign up as a parent';
				//send mail to parent for email verification
				mail.sendMail(email,url,'null',text);
				//update DB with emai and _id for parent
				User.findOneAndUpdate({email:email,parentID:{$exists:false}},{email:email},{upsert:true},function(err,par){
					if(err)
						console.log("Error in creating Parent");
					if(par)
						console.log("Mail sent and parent created in database."+par);
				});
				response.value.parent = true;
				response.message='You have signed up as a parent. Please check your mail to proceed forward.'
			}
			//email+no_parent+token = proceed to create child form
			else if(token!='undefined'){
				console.log("You can signup as a child");
				response.value.child = true;
				response.message = "You are proceeding to signup as a child";
			}
			else{
				console.log("Unexpected situation 2 !!!");
			}
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
exports.createUser = function(req, res) {
	console.log("Create User called");
	var data ={};
	var members = [];
	var size = 0;
	console.log("req.body.relation: "+req.body.relation);
	//if creating a parent User then
	if(req.body.relation!=undefined){
		console.log("Parent Form details!!!");
		var email = req.body.email1;
		data = {
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email1,
			pass : req.body.pass1,
			dob : req.body.dob,
			address :req.body.address,
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
		console.log("TYPE:"+typeof(req.body.relation));
		//if only 1 relation is added
		if(typeof(req.body.relation)=='string')
		{
			var adData = {relation : req.body.relation, rel_email : req.body.rel_email};
			members.push(adData);
		}
		//if multiple relations are added
		else{
			for ( var i = 0; i < req.body.relation.length; i++) {
				var relation = req.body.relation[i];
				var rel_email = req.body.rel_email[i];

				// Prepare the adData
				if (relation.length > 0 && rel_email.length > 0) {
					var adData = {relation : relation, rel_email : rel_email};
					console.log('Pushing:' + adData.relation + adData.rel_email);
					members.push(adData);
				}
			}
		}
		console.log('members: '+JSON.stringify(members));
		//add all relations to data object
		data.familyMembers = members;
		/*Add function to send Invitation to all the members */

		// Reponse object.
		var response = {};

		var query = {
			email : data.email,
			parentID : {$exists:false}
		};

		var options = {};
		options.upsert = true;
		//Create complete parent
		User.findOneAndUpdate(query, data, options, function(err, parent) {
			if (err) {
				console.log(err);
				response.error = "Saving Failed";
				res.json(500, response);
				return;
			}
			if(parent){
				console.log("Parent created:"+parent)
				for(var i=0; i<parent.familyMembers.length; i++)
				{
					console.log(i);
					//create child records in DB for the parent 
					User.findOneAndUpdate({_id:parent.familyMembers[i]._id},
									  	{parentID : parent._id.toString(), email:parent.familyMembers[i].rel_email},
									  	{upsert : true},
									  	function(err,child){
									  		if(child)
									  			console.log("Child created."+ child);
									  			var text = 'Please click on the following link to signup as a child';
									  			//send mails to all children
									  			mail.sendMail(child.email,url,parent._id,text);
									  	})
				}
			}
			// Query executed successfully. Send User Created response.  
			response.value = "New User Created";
			res.json(200, response);
		});
	}
	//if creating a child user then
	else{
		console.log("Child Form details!!!");
		data = {
			firstName : req.body.firstName2,
			lastName : req.body.lastName2,
			email : req.body.email2,
			pass : req.body.pass3,
			dob : req.body.dob2,
			parentID : req.body.parentID,
			address :req.body.address2,
			contactInformation : {
					countrycode : req.body.countrycode2,
					phonenumber : req.body.phoneNumber2
			},
			monthlyIncome:req.body.monthlyIncome2,
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
			PaymentMethod : {}		
		};
		//create complete child
		User.findOneAndUpdate({email:data.email,parentID:data.parentID},data,{upsert:false},function(err,child){
			if(err){
				console.log(err);
				response.error = "Saving Failed";
				res.json(500, response);
				return;
			}
			if(child){
				console.log("Child created:"+child);
			}
			else{
				console.log("Cannot create child");
			}

		});
	}	
}



