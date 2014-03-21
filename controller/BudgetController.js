/**
 * Admin controller which handles the routes in admin_router.js
 */

var Budget = require("../models/Budget");
var User = require("../models/User");

function addBudgget(req, res) {
	console.log("Get Budget called");
	console.log(req.body);
	var datetime = new Date().toISOString().slice(0,10).replace(/-/g,"-");
	var data = new Budget({
		userId : req.body.userid,
		amount_spend : req.body.amount_spend,
		DATE : datetime,
		location : req.body.location,
		spend_on : req.body.spend_on,
			//LAST_UPDATED_AT : datetime
	});

	var response={};
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

	User.findOneAndUpdate({_id:req.body.userid},{$inc:{amnt_spnt:req.body.amount_spend}},function(err,data){
		if(err)
			console.log("Error");
		if(data){
			console.log("data");
		}
	})
}

function getBudget(req,res){
	
	var response ={};
	var id ="";
	if(req.body.id)
	 id=req.body.id ;
	console.log("id" +JSON.stringify(req.body));
	Budget.find({userId :id},function(err, doc) {
	  if (err) return console.error(err);
	  response = doc;
		if (doc === null) {
			// No User found
			res.json(200, response);
			return;
		} else {
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
	  if (err) return console.error(err);
	  response = doc;
		if (doc === null) {
			// No User found
			res.json(200, response);
			return;
		} else {
			// User found. Populate the user
			response.budget = doc;
			var familyMembers = doc.familyMembers;
			
			res.json(200, familyMembers);
			
			console.log(JSON.stringify(familyMembers));
			return;
		}
	});
}

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
  			if(name === undefined)
  			{
  				console.log("name is undefind in if"+ (name === undefined));
  				res.json(200,response);
  			}
  			else 
  			{
  				console.log("name is good"+(name === undefined));
  				response.name = found.firstName+' '+found.lastName;
				console.log("response.name in case of "+name +"is"+response.name);
  				User.find({_id:req.body.id} ,function(err,doc){
					if(err){	
						console.log("error ocuureed in fetching data"+err);
					res.json(200,"error");
					}
					else{ 
						doc=doc[0];
						response.email= doc.email,
						response.monthlyIncome=doc.monthlyIncome;
					}	
					console.log("response final in else is :"+response);
					res.json(200,response);
				});
			}
		}
	})
}

		


function relationBudget(req,res){
	console.log("Body: "+JSON.stringify(req.body));
	console.log("user "+req.user.firstName);
	if(req.body.income>=req.body.amount)
	{
	console.log(req.body.name);
	name=req.body.name;

	var spacePosition = name.lastIndexOf(" ");
	var firstName=name.substring(0,spacePosition);
	var lastName =name.substring(spacePosition+1,name.length);
	User.findOneAndUpdate({firstName:firstName, lastName:lastName,parentID:req.body.userid},
						  {$inc:{amnt_rcvd: req.body.amount},$push:{notification:{postDate:new Date(),amount:req.body.amount,who:req.user.firstName+' '+req.user.lastName}}},
						  function(err,updated){
						  	if(err)
						  		console.log("Error:"+err);
						  	if(updated){
						  		console.log("Updated Document:"+updated);
						  		
						  	}
	});
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
	console.log("Inappropriate transacion");
}
	res.redirect("/users/relationBudget");

}

function countNotify(req,res)
{
User.findOne({'firstName':req.body.fname,'lastName':req.body.lname},function(err,user){
	if(err){
		console.log("Error");
	}
	else if(user)
	{
		res.json(200,{'length':user.notification.length});
	
	}
	else{
		console.log("NO user found");
	}
});
}
	
function showNotify(req,res)
{
User.findOne({'firstName':req.body.fname,'lastName':req.body.lname},function(err,user){
	if(err){
		console.log("Error");
	}
	else if(user)
	{	
		console.log(user.notification);
		res.json(200,{'notification' : user.notification});
	}
	else{
		console.log("NO user found");
	}
}).sort({'user.notification.postDate' :-1});
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