var AdExchangeModel = require('../models/AdExchangeReport');
var moment = require('moment');

// validation for validateGetReportDataByExhchange
exports.validateGetReportDataByExhchange = function getEarningsValidate(req,
		res, next) {
	if (req.query.URL === null) {
		res.json(200, {
			error : "URL should not be empty"
		});
	} else {
		next();
	}

};

// API Implementation for method getReportDataByExhchange
exports.getReportDataByExhchange = function(req, res) {
	console.log("API method getReportDataByExhchange called at " + new Date());

	var startDate = null;
	var endDate = null;

	// Compute correct Dates
	if (req.query.startDate != null && req.query.endDate != null) {
		startDate = req.query.startDate;
		endDate = req.query.endDate;
	} else {
		var d1 = moment.utc(new Date());
		endDate = d1.format();
		d1 = d1.subtract('days', 7);
		startDate = d1.format();
	}

	console.log("Using parmeters : ");
	console.log("URL : " + req.query.URL);
	console.log("StartDate : " + startDate);
	console.log("EndDate : " + endDate);

	AdExchangeModel.find().where('DOMAIN_NAME').equals(req.query.URL).where(
			'DATE').gte(new Date(startDate)).lte(new Date(endDate)).sort(
			'AD_TAG_NAME').exec(function(err, records) {
		console.log("DB Query called");
		console.log(records);
		if (err) {
			console.log(err);
			res.json(500, {
				error : "Problem in getting Report Data from Server"
			});
		}

		prepareReportDataResponse(records);
	});

	// Prepare Response for the getReportDataByExhchange Method
	function prepareReportDataResponse(records) {
		var response = {};
		if (!records || records.length === 0) {
			response.value = {
				"aaData" : [],
				"chartData" : {
					earnings : [],
					impressions : [],
					ecpm : [],
			        totalEarnings : 0,
			        totalImpressions: 0, 
			        totalEcpm : 0
				}
			};
			res.json(200, response);
			return;
		}

		var dateTotalMap = {};
		var index = 0;
		var val = {};
		var data = [];
		var resultIndex = 0;
		var prev = {};
		var patt2 = /\$[\d]+$/i;
		var tagName = null;
		var prevtagName = records[index].AD_TAG_NAME;

		if (prevtagName != null) {
			prevtagName = prevtagName.replace(patt2, "");
		}

		prev.AD_UNIT_SIZE_NAME = records[index].AD_UNIT_SIZE_NAME;
		prev.MATCHED_AD_REQUESTS = parseFloat(records[index].MATCHED_AD_REQUESTS);
		prev.MATCHED_AD_REQUESTS_CTR = parseFloat(records[index].MATCHED_AD_REQUESTS_CTR);
		prev.MATCHED_AD_REQUESTS_RPM = parseFloat(records[index].MATCHED_AD_REQUESTS_RPM);
		prev.EARNINGS = parseFloat(records[index].EARNINGS);

		addToMap(dateTotalMap, records[index]);

		index++;

		// data[0] = header;
		for (; index < records.length; index++) {

			tagName = records[index].AD_TAG_NAME;
			tagName = tagName.replace(patt2, "");
			if (prevtagName === tagName) {
				prev.AD_UNIT_SIZE_NAME = records[index].AD_UNIT_SIZE_NAME;
				prev.MATCHED_AD_REQUESTS = prev.MATCHED_AD_REQUESTS
						+ parseFloat(records[index].MATCHED_AD_REQUESTS);
				prev.MATCHED_AD_REQUESTS_CTR = prev.MATCHED_AD_REQUESTS_CTR
						+ parseFloat(records[index].MATCHED_AD_REQUESTS_CTR);
				prev.MATCHED_AD_REQUESTS_RPM = prev.MATCHED_AD_REQUESTS_RPM
						+ parseFloat(records[index].MATCHED_AD_REQUESTS_RPM);
				prev.EARNINGS = prev.EARNINGS
						+ parseFloat(records[index].EARNINGS);
				addToMap(dateTotalMap, records[index]);
			} else {
				data[resultIndex++] = [ null, prev.AD_UNIT_SIZE_NAME,
						prev.MATCHED_AD_REQUESTS, prev.MATCHED_AD_REQUESTS_CTR,
						prev.MATCHED_AD_REQUESTS_RPM, prev.EARNINGS ];

				prevtagName = records[index].AD_TAG_NAME;

				if (prevtagName != null) {
					prevtagName = prevtagName.replace(patt2, "");
				}

				prev.AD_UNIT_SIZE_NAME = records[index].AD_UNIT_SIZE_NAME;
				prev.MATCHED_AD_REQUESTS = parseFloat(records[index].MATCHED_AD_REQUESTS);
				prev.MATCHED_AD_REQUESTS_CTR = parseFloat(records[index].MATCHED_AD_REQUESTS_CTR);
				prev.MATCHED_AD_REQUESTS_RPM = parseFloat(records[index].MATCHED_AD_REQUESTS_RPM);
				prev.EARNINGS = parseFloat(records[index].EARNINGS);
				addToMap(dateTotalMap, records[index]);
			}

		}

		data[resultIndex++] = [ null, prev.AD_UNIT_SIZE_NAME,
				prev.MATCHED_AD_REQUESTS, prev.MATCHED_AD_REQUESTS_CTR,
				prev.MATCHED_AD_REQUESTS_RPM, prev.EARNINGS ];

		console.log(dateTotalMap);
		console.log("Sending the data");
		val["aaData"] = data;
		val["chartData"] = prepareTimeSeriesData(dateTotalMap);
		response.value = val;
		console.log(response);
		res.json(200, response);
	}

	// Summary Earnings.
	function addToMap(dateTotalMap, record) {
		var dat = moment.utc(record.DATE).valueOf();
		if (!dateTotalMap[dat]) {
			dateTotalMap[dat] = {};
			dateTotalMap[dat].earnings = 0;
			dateTotalMap[dat].impressions = 0;
			dateTotalMap[dat].ecpm = 0;
		}

		dateTotalMap[dat].earnings = dateTotalMap[dat].earnings
				+ parseFloat(record.EARNINGS);
		dateTotalMap[dat].impressions = dateTotalMap[dat].impressions
				+ parseFloat(record.MATCHED_AD_REQUESTS);
		dateTotalMap[dat].ecpm = dateTotalMap[dat].ecpm
				+ parseFloat(record.MATCHED_AD_REQUESTS_RPM);
	}

	// Prepare the Series Data for Flot chart.
	function prepareTimeSeriesData(dateTotalMap) {
		var dat = null;
		var series = [];
		var series1 = [];
		var series2 = [];

		var result = {};
		result.totalEarnings = 0;
		result.totalImpressions = 0;
		result.totalEcpm = 0;

		var index = 0;

		for (dat in dateTotalMap) {
			series[index] = [ dat, dateTotalMap[dat].earnings ];
			series1[index] = [ dat, dateTotalMap[dat].impressions ];
			series2[index] = [ dat, dateTotalMap[dat].ecpm ];

			result.totalEarnings = result.totalEarnings
					+ dateTotalMap[dat].earnings;
			result.totalImpressions = result.totalImpressions
					+ dateTotalMap[dat].impressions;
			result.totalEcpm = result.totalEcpm + dateTotalMap[dat].ecpm;

			index++;
		}

		result.earnings = series;
		result.impressions = series1;
		result.ecpm = series2;

		return result;
	}

};