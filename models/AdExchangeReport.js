/**
 * Mongoose model for the AdExchange record.
 */

var mongoose = require('mongoose');

var ReportSchema = mongoose.Schema({
	AD_UNIT_SIZE_NAME : String,
	AD_TAG_NAME : String,
	DATE : Date,
	EARNINGS : String,
	MATCHED_AD_REQUESTS : String,
	MATCHED_AD_REQUESTS_CTR : String,
	MATCHED_AD_REQUESTS_RPM : String,
	LAST_UPDATED_AT : Date
});

var Report = mongoose.model("report", ReportSchema);
module.exports = Report;