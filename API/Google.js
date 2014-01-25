/**
 * New node file
 */

var exchangeName = 'DOUBLECLICK';
var CLIENT_ID = '851385122320.apps.googleusercontent.com';
var CLIENT_SECRET = 'oJcrRrVBwNq5edhLLnA6TQR3';
var REDIRECT_URL = 'http://127.0.0.1:3000/callback';
var API_URL = 'https://www.googleapis.com/auth/adexchange.seller.readonly';

var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;

var ACCESS_TOKEN = 'ya29.1.AADtN_XyQEeuSP6nPwj0d2ETAQCmTpi73emWIL578_PJ0qpxWFhlWTh7JwGXkUdqUZDG';
var REFRESH_TOKEN = '1/km5XS-TrBbi6hZQ_WrudmjzXnal8rTdwgbGp6tf1KUU';

function getAccessToken(req, res) {
	  // generate consent page url
	var googleOauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET,
			REDIRECT_URL);

      var code = req.query.code;
      googleOauth2Client.getToken(code, function(err, tokens) {
	      // set tokens to the client
	      // TODO: tokens should be set by OAuth2 client.
    	  googleOauth2Client.credentials = tokens;
	      res.send(tokens);
	    });
	}

exports.getAccess = getAccessToken;