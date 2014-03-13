/**
 * Admin controller which handles the routes in admin_router.js
 */

var Budget = require("../models/Budget");
var User = require("../models/User");


function addBudgget(req, res) {
	console.log("Get Budget called");
	console.log(req.body);
	var datetime = new Date();
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
/**
 * Export the functions
 */

exports.addBudgget = addBudgget;
exports.getBudget = getBudget;
exports.getAllBudget = getAllBudget;
