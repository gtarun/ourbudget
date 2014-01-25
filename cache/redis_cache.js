/**
 * Helper methods for the accessing the redis server.
 */
var redis = require('redis');
var client;

/**
 * Initializes the redis client to the correct server.
 */
exports.initialize = function() {
	client = redis.createClient();
	client.on("error", function(err) {
		console.log("Error in creating the conenction to Redis Server" + err);
		throw err;
	});
};

/**
 * Caches the response for GetEarningsForYesterday in the redis server.
 */
exports.cacheReposneForGetEarningsForYesterday = function(req, res) {
	var methodName = "getEarningsForYesterday$";
	var lookupKey = methodName + req.query.startDate + "$" + req.query.endDate;

	client.set(lookupKey, JSON.stringify(res.locals.response), function(error,
			reply) {
		if (error) {
			console.log("Saving to Redis Server failed.");
		} else {
			console.log("Got response with redis : " + reply);
		}
	});

	// TODO : Set an expire on the above key for a period less than 1 day.
	console.log("Sending response from cache");
	res.json(200, res.locals.response);
};

exports.respondWithCacheEntryForGetEarningsForYesterday = function(req, res,
		next) {

	var methodName = "getEarningsForYesterday$";
	var lookupKey = methodName + req.query.startDate + "$" + req.query.endDate;

	client.get(lookupKey, function(err, reply) {
		if (err) {
			console.log("Looking up the key" + lookupKey
					+ "from Redis Server failed because ");
		}

		if (reply === null) {
			next();
		} else {
			var response = JSON.parse(reply);
			console.log("Sending the response from cache directly");
			res.json(200, response);
		}
	});
};

exports.cacheReposneForGetEarningsForLastMonth = function(req, res) {
	var methodName = "getEarningsForLastmonth$";
	var lookupKey = methodName + req.query.startDate + "$" + req.query.endDate;

	client.set(lookupKey, JSON.stringify(res.locals.response), function(error,
			reply) {
		if (error) {
			console.log("Saving to Redis Server failed.");
		} else {
			console.log("Got response with redis : " + reply);
		}
	});

	// TODO : Set an expire on the above key for a period less than 1 month.
	console.log("Sending response from cache");
	res.json(200, res.locals.response);
};

exports.respondWithCacheEntryForGetEarningsForLastMonth = function(req, res,
		next) {

	var methodName = "getEarningsForLastmonth$";
	var lookupKey = methodName + req.query.startDate + "$" + req.query.endDate;

	client.get(lookupKey, function(err, reply) {
		if (err) {
			console.log("Looking up the key" + lookupKey
					+ "from Redis Server failed because ");
		}

		if (reply === null) {
			next();
		} else {
			var response = JSON.parse(reply);
			console.log("Sending the response from cache directly");
			res.json(200, response);
		}
	});
};

exports.isKeyPresent = function(key) {

	var response = false;

	try {
		var lookupKey = key;
		console.log("Redis queried for :" + lookupKey);

		var reply = client.get(lookupKey);
		console.log("Redis replied:" + reply);

		if (reply === null) {
			response = false;
		} else if (reply.toString() === 'false') {
			response = false;
		} else if (reply.toString() === 'true') {
			response = true;
		}

	} catch (err) {
		console.log("Looking up the key" + lookupKey
				+ "from Redis Server failed because ");
		response = false;
	}

	console.log("Sending response : " + response);
	return response;
};

exports.getClient = function() {
	return client;
}

exports.insertKeyValue = function(key, value) {
	console.log("The InsertkeyValue called with " + key + ": " + value);
	var lookupKey = key;

	client.set(lookupKey, value, function(error, reply) {
		if (error) {
			console.log("Saving to Redis Server failed.");
		} else {
			console.log("Got response with redis : " + reply);
			client.expire(lookupKey, 3600);
		}
	});

};
