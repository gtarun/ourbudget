/**
 * Admin controller which handles the routes in admin_router.js
 */

var Budget = require("../models/Budget");
var User = require("../models/User");

//Add Personal Budget 
function addBudgget(req, res) {
	console.log("Get Budget called");
	console.log(req.body);
	var datetime = new Date();//.toISOString().slice(0,10).replace(/-/g,"-");
	var data = new Budget({
		userId: {name : req.user.firstName,
			     id: req.body.userid},
		amount_spend : req.body.amount_spend,
		DATE : datetime,
		location : req.body.location,
		spend_on : req.body.spend_on,
		description : req.body.description,
	});
	console.log("ParentID: "+req.user.parentID);
	//If User is a child then send notification to parent
	if(req.user.parentID){
		data.notification={send_to:req.user.parentID,
						   status: false}
	}
	else{
		data.notification={send_to:req.user._id,
						   status: false}
	}
	var response={};
	//save budget in the database
	data.save(function(err, doc) {
		if (err) {
			console.log(err);
			response.error = "Saving Failed " +err;
			res.json(500, response);
			return;
		}
		if(doc){
			console.log("doc: "+ doc)
			// Query executed successfully. Send User Created response.  
			response.value = "Budget Saved " + doc;
		    res.json(200, response);
			res.redirect("/users/home");
		}
	});

	//Update User database with incrementing amnt_spnt field
	User.findOneAndUpdate({_id:req.body.userid},{$inc:{amnt_spnt:req.body.amount_spend}},function(err,data){
		if(err)
			console.log("Error");
		if(data){
			console.log("incrementing amount spent"+data);
		}
	})
}

//get the budget of a User
function getBudget(req,res){
	
	var response ={};
	var id ="";
	if(req.body.id)
	 	id=req.body.id ;
	console.log("id" +JSON.stringify(req.body));
	Budget.find({userId :id},function(err, doc) {
	  	if (err) 
	  		return console.error(err);
	  	response = doc;
		if (doc === null) {
			// No User found
			res.json(200, response);
			return;
		} 
		else {
			// User found. Populate the user
			response.budget = doc;
			res.json(200, doc);
			console.log(JSON.stringify(doc));
			return;
		}
	});
	
	//res.render('users/home',{data :response});
}

function getAllBudget(req,res){
	var response ={};
	var id ="";
	if(req.body.id)
	 	id=req.body.id ;
	console.log("id" +JSON.stringify(req.body));
	
	User.find({email :id},function(err, doc) {
	  	if (err) 
	  		return console.error(err);
	  	response = doc;
		if (doc === null) {
			// No User found
			res.json(200, response);
			return;
		} 
		else {
			// User found. Populate the user
			response.budget = doc;
			var familyMembers = doc.familyMembers;
			res.json(200, familyMembers);
			console.log(JSON.stringify(familyMembers));
			return;
		}
	});
}

//Ajax function to display children and their monthly income
function relbudget(req,res){
  	console.log("Ajax request for: "+req.body.email+req.body.parId);
  	var response={};
  	User.findOne({'email':req.body.email,'parentID':req.body.parId},function(err,found){
  		if(err)
  			console.log("Error in dealing");
  		if(found){
  			//console.log("Found user:"+found);
  			var name=found.firstName;
  			console.log("name is" +name);
  			//if child hasn't yet created its profile
  			if(name === undefined)
  			{
  				console.log("name is undefind in if"+ (name === undefined));
  				res.json(200,response);
  			}
  			//if child has created his profile
  			else 
  			{
  				console.log("name is good"+(name === undefined));
  				response.name = found.firstName+' '+found.lastName;
				console.log("response.name in case of "+name +"is"+response.name);
  				User.findOne({_id:req.body.id} ,function(err,doc){
					if(err){	
						console.log("error ocuureed in fetching data"+err);
						res.json(200,"error");
					}
					if(doc){ 
						doc=doc;
						response.email= doc.email,
						response.monthlyIncome=doc.monthlyIncome+doc.amnt_rcvd-doc.amnt_spnt;
					}	
					console.log("response final in else is :"+response);
					res.json(200,response);
				});
			}
		}
	})
}	

//Add relation Budget to the account
function relationBudget(req,res){
	console.log("Body: "+JSON.stringify(req.body));
	var savings = req.body.income+req.body.rcvd-req.body.spnt;
	//checkif savingsof parent is more than amount transferred
	if(savings>=req.body.amount)
	{
		console.log(req.body.name);
		name=req.body.name;

		var spacePosition = name.lastIndexOf(" ");
		var firstName=name.substring(0,spacePosition);
		var lastName =name.substring(spacePosition+1,name.length);

		//increment amnt_rcvd of the child
		User.findOneAndUpdate({firstName:firstName, lastName:lastName,parentID:req.body.userid},
						  	{$inc:{amnt_rcvd: req.body.amount}},
						   	function(err,updated){
						  		if(err)
						  			console.log("Error:"+err);
						  		if(updated){
						  			console.log("Updated Document:"+updated);
						  			var data = new Budget({
										userId: {name : req.user.firstName,
			     								    id: req.user._id},
										amount_spend : req.body.amount,
										DATE : new Date(),
										spend_on : 'Pocket Money',
										description : "Sent to my child",
										notification:{
											send_to: updated._id,
											status: false
										}
									});
									data.save(function(err,budget){
										if(budget)
											console.log("Budget saved: "+budget);
									});	
								}
		});
		//increment amnt_spnt of the parent 
		User.findOneAndUpdate({_id:req.body.userid,},
						  	{$inc:{amnt_spnt: req.body.amount}},
						  	function(err,updated){
						  		if(err)
						  			console.log("Error:"+err);
						  		if(updated){
						  			console.log("Updated Document:"+updated);
													  		}
		});
	}
	else{
		console.log("Inappropriate transacion as you have less funds");
	}
	res.redirect("/users/relationBudget");
}

//Ajax function to count the total no. of notifications for a user
function countNotify(req,res){
	console.log("User ID: "+req.user._id)
	Budget.find({'notification.send_to':req.user._id,'notification.status':false},function(err,notifications){
		if(err)
			console.log("Error: ");
		if(notifications){
			console.log("notifications: "+notifications.length);
			res.json(200,{data:notifications.length});
		}
	})
}
	
//ajax function to display notifications on click
function showNotify(req,res){
	var notif_data=[];
	console.log("REQ>USER:"+req.user._id)
	Budget.find({'notification.send_to':req.user._id,'notification.status':false},function(err,notifications){
		if(err)
			console.log("Error: ");
		if(notifications){
			if(req.user.parentID){
				for(var i=0;i<notifications.length;i++){
					var data = {
						amount : notifications[i].amount_spend,
						date : notifications[i].DATE,
						who : notifications[i].userId.name
					}
					notif_data[i]=data;
				}
			}
			else{
				for(var i=0;i<notifications.length;i++){
					var data = {
						amount : notifications[i].amount_spend,
						spent_on : notifications[i].spend_on,
						who : notifications[i].userId.name,
						date : notifications[i].DATE,
						location : notifications[i].location
					}
					notif_data[i]=data;
				}
			}
			res.json(200,{'notification':notif_data});
		}
	})
}

/**
 * Export the functions
 */

exports.addBudgget = addBudgget;
exports.getBudget = getBudget;
exports.getAllBudget = getAllBudget;
exports.relbudget = relbudget;
exports.relationBudget= relationBudget;
exports.countNotify = countNotify;
exports.showNotify = showNotify;