/**
 * Admin controller which handles the routes in admin_router.js
 */

var Budget = require("../models/Budget");


function addBudgget(req, res) {
	console.log("Get Budget called");
	console.log(req.body);
	// Construct the User Json object from the data in the request
	var errors={
		};
	/*if(req.body === null){
		errors.message =" param not found";
		errors.ret= false;
	}
	else if(req.body.id === null || typeof req.body.id === "undefined" )
	{
		errors.message ="Id param not found";
		errors.ret= false;
	}
	else if(req.body.amount_spend ===null || typeof req.user.amount_spend === "undefined"){
		errors.message +="amount_spend param not found\n";
		errors.ret= false;
	}
	else if(req.body.spend_on ===null || typeof req.user.spend_on === "undefined"){
		errors.message +="spend_on param not found\n";
		errors.ret= false;
	}
	else if(req.body.location ===null || typeof req.user.location === "undefined"){
		errors.message +="location param not found\n";
		errors.ret= false;
	}
	else{
		errors.message +="Fine\n";
		errors.ret= true;
	}*/
	errors.ret=true;
	if(errors.ret){
		var datetime = new Date();
		var data =new Budget( {
			userId : req.body.id,
			amount_spend : req.body.amount_spend,
			DATE : datetime,
			location : req.body.location,
			spend_on : req.body.spend_on,
			LAST_UPDATED_AT : datetime
			
		});
	
		var query = {
		
		};

		var options = {};
		
		var response={};
		data.save(function(err, doc) {
			if (err) {
				console.log(err);
				response.error = "Saving Failed " +err;
				res.json(500, response);
				return;
			}

			// Query executed successfully. Send User Created response.  
			response.value = "Budget Saved " +doc;
			res.json(200, response);
			res.redirect("/users/home");
			});
		}
		else{
				res.json(200, errors);
				
		}
}

/**
 * Export the functions
 */

exports.addBudgget = addBudgget;