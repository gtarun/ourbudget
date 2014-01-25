/**
 * New node file
 */

var adexchange = require('./AdExchange');
var express = require('express');
var http = require('http');
var PORT = 3000;

function testAccountSetUp()
{
	var app = express();
	
	app.get('/', adexchange.accountSetUp);
	
	app.get('/callback', function(req, res){
		console.log("Code received");
		adexchange.saveTokens(req, res, req.query.code);
		
	});
	
	app.get('/report', function(req, res){
		adexchange.getReportData(req, res);
		
	});
	
	app.listen(PORT);
    
	console.log('Server running at http://127.0.0.1:3000/');
}

testAccountSetUp();



