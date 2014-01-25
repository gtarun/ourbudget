/**
 * EarningsController will serve the routes for all the earnings tiles in the earnings page.
 */

var AdExchangeModel = require('../models/AdExchangeReport');
var moment = require('moment');

/**
 * Validates the GetEarnings method requests. All the methods should have both startDate and endDate
 * @param req
 * @param res
 * @param next
 * @returns
 */
function validateGetEarnings(req, res, next) {
	console.log("API method getEarnings Called with " + req.query.startDate);
	if (!req.query.startDate || !req.query.endDate) {
		res.json(400, {
			error : "StartDate and EndDate is expected"
		});
	} else {
		console.log("Validation just completed");
		return next();
	}
}

/**
 * This method will create a structure that embeds different pieces of information into one object.
 * This object will be passed to different functions related to GetEarnings methods.
 * @param req
 * @param res
 * @returns {req : {}, res : {}, totalEarnings : String, startDate : Date, endDate : Date}
 */
function createParams(req, res) {
	var params = {};
	params.req = req;
	params.res = res;
	params.totalEarnings = "0";
	params.startDate = req.query.startDate;
	params.endDate = req.query.endDate;
	return params;
}

/**
 * Generic Callback which will be called by the getEarningsForDateRange
 * @callback genericCallback
 * @param err error thrown by the getEarningsForDateRange
 * @param functionName represents the function trace encoded as string
 * @param prevData data returned by getEarningsForDateRange
 * @param params 
 * @param callback the next callback for the getEarningsForDateRange
 * @param next
 */
function genericCallback(err, functionName, prevData, params, callback, next) {

	var d1, d2;

	if (functionName === 'getEarningsForTodaygetEarningsForDateRange') {
		getEarningsForTodayCallback(err, functionName, prevData, params, null,
				next);
	} else if (functionName === 'getEarningsForYesterdaygetEarningsForDateRange') {
		d1 = moment.utc(new Date(params.startDate)).subtract('days', 1);
		d2 = moment.utc(new Date(params.endDate)).subtract('days', 1);
		console.log("In Generic Callback");
		console.log(prevData);

		params.startDate = d1.toString();
		params.endDate = d2.toString();

		getEarningsForDateRange(err, functionName, prevData, params,
				getEarningsForYesterdayCallback, next);

	} else if (functionName === 'getEarningsForCurrentMonthgetEarningsForDateRange') {

		console.log("In Generic Callback");
		console.log(prevData);
		getEarningsForCurrentMonthCallback(err, functionName, prevData, params,
				null, next);

	} else if (functionName === 'getEarningsForLastMonthgetEarningsForDateRange') {

		d1 = moment.utc(new Date(params.startDate));
		d2 = moment.utc(new Date(params.endDate));

		d2 = d2.startOf('month');
		d1 = d1.startOf('month');

		d2 = d2.subtract('days', 1);
		d1 = d1.subtract('days', 1);

		d1 = d1.startOf('month');

		console.log("In Generic Callback");
		console.log(prevData);
		console.log(d1.toString());
		console.log(d2.toString());

		params.startDate = d1.toString();
		params.endDate = d2.toString();

		getEarningsForLastMonthCallback(err, functionName, prevData, params,
				getEarningsForLastMonthCallback, next);

	}
}

/**
 * Generic Helper method for getting the earnings data for a specific date range. Date
 * range is Embedded in the request
 * @param err error thrown by previous method
 * @param functionName
 * @param prevData
 * @param params
 * @param callback
 * @param next
 */
function getEarningsForDateRange(err, functionName, prevData, params, callback,next) {

	if (err) {
		callback(err, functionName, prevData, params, callback, next);
		return;
	}

	console.log("Getting the Data by making a Db Query");

	var d1 = moment.utc(new Date(params.startDate)).toDate();
	var d2 = moment.utc(new Date(params.endDate)).toDate();

	console.log(d1.toUTCString());
	console.log(d2.toUTCString());

	var conditions = {
			DATE : {
				$gte : d1,
				$lt : d2
			},
			AD_TAG_NAME : {
				$in : params.req.user.AdTagNames
			}
	};

	AdExchangeModel
	.find(
			conditions,
			'EARNINGS DATE LAST_UPDATED_AT',
			function(err, records) {
				console.log("DB Query called");
				console.log(records);
				if (err) {
					callback(err, functionName, prevData, params,
							callback, next);
				}

				if (!records) {
					var res1 = {
							value : {
								data : '0',
								percentage : '0'
							}
					};

					console.log("Sending 0");
					callback(null, functionName, res1, params,
							callback, next);
				}

				var index = 0;
				var totalEarnings = 0;
				// Why this is required
				var largestDate = moment
				.utc(new Date(params.startDate)).subtract(
						'days', 3);
				for (; index < records.length; index = index + 1) {
					totalEarnings = totalEarnings
					+ parseFloat(records[index].EARNINGS);
					var currentDate = moment(records[index].LAST_UPDATED_AT);
					if (largestDate.isBefore(currentDate)) {
						largestDate = currentDate;
					}

				}

				console.log('TotalEarnings are Before : ' + totalEarnings);
				totalEarnings = totalEarnings.toFixed(2);
				console.log('TotalEarnings are : ' + totalEarnings);
				console.log('Largest Date with Time '
						+ largestDate.format());
				console.log('Progress compelete ' + largestDate.hour()
						/ 24);

				var result1 = {};
				if (prevData === null) {
					// Get Earning For Today usecase
					result1.value = {};
					result1.value.data = totalEarnings.toString();
					var fraction = (largestDate.hour() / 24);
					fraction = fraction.toFixed(4);
					result1.value.percentage = ((largestDate.hour() / 24) * 100)
					.toString();
				} else {
					result1.value = {};
					result1.value.data = prevData.value.data;
					var currentDataValue = parseFloat(result1.value.data);
					var prevDataValue = parseFloat(totalEarnings.toString());
					console.log("PrevDataValue : " + prevDataValue + "  currentValue: " + currentDataValue);
					var percentageValue = 0;
					if (prevDataValue === 0) {
						percentageValue = totalEarnings;
					} else if (currentDataValue - prevDataValue > 0) {
						percentageValue = (currentDataValue - prevDataValue) / prevDataValue;
						
					}else {
						if (currentDataValue === 0){
							percentageValue = prevDataValue; 
						}
						else{
							percentageValue = (prevDataValue - currentDataValue) / prevDataValue;
						}
						percentageValue = -percentageValue;
					}
					if(typeof percentageValue !== "undefined" && parseInt(percentageValue) > 0){
					   percentageValue = percentageValue.toFixed(2);
                    }
					result1.value.percentage = percentageValue.toString();

				}

				console.log(result1);
				functionName = functionName + "getEarningsForDateRange";
				callback(null, functionName, result1, params, callback,
						next);
			});
}

/**
 * 
 * @param err
 * @param functionName
 * @param prevData
 * @param params
 * @param callback
 * @param next
 */
function getEarningsForCurrentMonthCallback(err, functionName, prevData,
		params, callback, next) {
	if (err) {
		params.res.json(500, {
			error : "Problem in getting the data from the Server"
		});
	} else {
		var d1 = moment.utc(new Date(params.endDate)).subtract('days', 1);
		var curDate = d1.get('date');
		var d3 = d1.endOf('month');

		var totalDays = d3.get('date');
		console
		.log("Current Date : " + curDate + ":  TotalDays : "
				+ totalDays);
		prevData.value.percentage = ((curDate / totalDays) * 100).toString();
		params.res.json(200, prevData);
	}
}

/**
 * 
 * @param err
 * @param functionName
 * @param prevData
 * @param params
 * @param callback
 * @param next
 */
function getEarningsForTodayCallback(err, functionName, prevData, params,
		callback, next) {
	if (err) {
		params.res.json(500, {
			error : "Problem in getting the data from the Server"
		});
	} else {
		params.res.json(200, prevData);
	}
}

/**
 * 
 * @param err
 * @param functionName
 * @param prevData
 * @param params
 * @param callback
 * @param next
 */
function getEarningsForLastMonthCallback(err, functionName, prevData, params,
		callback, next) {
	if (err) {
		params.res.json(500, {
			error : "Problem in getting the data from the Server"
		});
	} else {
		params.res.locals.response = prevData;
		next();
	}
}

/**
 * 
 * @param err
 * @param functionName
 * @param prevData
 * @param params
 * @param callback
 * @param next
 */
function getEarningsForYesterdayCallback(err, functionName, prevData, params,
		callback, next) {
	if (err) {
		params.res.json(500, {
			error : "Problem in getting the data from the Server"
		});
	} else {
		params.res.locals.response = prevData;
		next();
	}
}

/**
 * 
 * @param req
 * @param res
 * @param next
 */
function getEarningsForToday (req, res, next) {
	console.log("API method getEarningsForToday Called for "
			+ new Date(req.query.startDate).toString() + "------"
			+ new Date(req.query.endDate).toString());

	var params = createParams(req, res);

	// Get the Data directly from the DB without using any cache.
	getEarningsForDateRange(null, "getEarningsForToday", null, params,
			genericCallback, next);
};

/**
 * 
 * @param req
 * @param res
 * @param next
 */
function getEarningsForYesterday (req, res, next) {
	console.log("API method getEarningsForYesterday Called for "
			+ new Date(req.query.startDate).toString() + "------"
			+ new Date(req.query.endDate).toString());

	var params = createParams(req, res);
	// Get the Data directly from the DB without sing any cache.
	getEarningsForDateRange(null, "getEarningsForYesterday", null, params,
			genericCallback, next);
};

/**
 * 
 * @param req
 * @param res
 * @param next
 */
function getEarningsForCurrentMonth (req, res, next) {
	console.log("API method getEarningsForCurrentMonth Called for "
			+ new Date(req.query.startDate).toString() + "------"
			+ new Date(req.query.endDate).toString());

	var params = createParams(req, res);

	// Get the Data directly from the DB without sing any cache.
	getEarningsForDateRange(null, "getEarningsForCurrentMonth", null, params,
			genericCallback, next);
};

/**
 * 
 * @param req
 * @param res
 * @param next
 */
function getEarningsForLastMonth (req, res, next) {
	console.log("API method getEarningsForLastMonth Called for "
			+ new Date(req.query.startDate).toString() + "------"
			+ new Date(req.query.endDate).toString());

	var params = createParams(req, res);

	// Get the Data directly from the DB without sing any cache.
	getEarningsForDateRange(null, "getEarningsForLastMonth", null, params,
			genericCallback, next);
};


exports.validateGetEarnings = validateGetEarnings;
exports.getEarningsForToday = getEarningsForToday;
exports.getEarningsForYesterday = getEarningsForYesterday;
exports.getEarningsForCurrentMonth = getEarningsForCurrentMonth;
exports.getEarningsForLastMonth = getEarningsForLastMonth;
