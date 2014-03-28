/**
 * Mongoose model for the AdExchange record.
 */

var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
	userId : {name:String,id:String},
	amount_spend : Number,
	DATE : Date,
	location : String,
	spend_on : String,
	description : String,
	notification: {
		send_to : String,
		status : Boolean
	}
});

var Budget = mongoose.model("budget", BudgetSchema);
module.exports = Budget;