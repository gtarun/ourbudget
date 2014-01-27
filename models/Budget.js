/**
 * Mongoose model for the AdExchange record.
 */

var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
	userId : String,
	amount_spend : String,
	DATE : Date,
	location : String,
	spend_on : String,
	LAST_UPDATED_AT : Date
});

var Budget = mongoose.model("budget", BudgetSchema);
module.exports = Budget;