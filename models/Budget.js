/**
 * Mongoose model for the AdExchange record.
 */

var mongoose = require('mongoose');

var ReportSchema = mongoose.Schema({
	userId : String,
	amount_spend : String,
	DATE : Date,
	location : String,
	spend_on : String,
	MATCHED_AD_REQUESTS_CTR : String,
	MATCHED_AD_REQUESTS_RPM : String,
	LAST_UPDATED_AT : Date
});

var Report = mongoose.model("report", ReportSchema);
module.exports = Report;