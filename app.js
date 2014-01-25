/**
 * This is the starting point of the SulvoX Spur Platform app.
 * Here the express in initialized with all the parameters which will be used by the whole app.
 * The HTTP server is also started here.
 * The authentication of the user is handled by the Node Passport module. 
 * SulvoApp uses the local, facebook, twitter authentication mechanisms of the Passport.
 * The app was organized into different folders.
 * views folder : contains the EJS templates of the HTML pages. This EJS templates will be 
 * rendered by the express for a given URL request.
 * tests folder : was intended to be used for writing the unit tests.
 * taxforms folder : contains the tax forms uploaded by the users.
 * scripts folder : was intended to be used for having any manual scripts.
 * routes folder : contains the express routes for the whole app.
 * public folder : is used to serve the static files, javascript files, css files.
 * models folder : contains all the mongoose models which represent the entities in the MongoDB.
 * Images folder : contains the user pictures uploaded by the users.
 * controller folder : contains the individual page controllers.
 * config folder : contains the application level configuration.
 * API folder : contains the handlers for the Google AdExchange API, Adx API.
 */

// Load all the required modules.
var express = require('express');
var engine = require('ejs-locals')
var routes = require('./routes/routes');
var http = require('http');
var path = require('path');
var passport = require("passport");
var config = require("./config/appconfig");
var flash = require("connect-flash");
var mongoose = require('mongoose');
var cache = require('./cache/redis_cache');

// Initialize the Redis Cache
cache.initialize();

// Initialize the Passport configurations
require('./config/passport')(passport, config);

// Establish a connection to MongoDB.
mongoose.connect(config.development.db);

// Create the Express app
var app = express();

// all environments
// TODO : Current app is based on HTTP. Need to be ported to HTTPS based app.
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('env', 'development');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
	secret : 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

// Default Error handlers to be used if express is not able to find the correct route
app.use(function(err, req, res, next) {
	console.log("Rendering 500");
	res.status(err.status || 500);
	res.render('500', {
		error : err
	});
});

app.use(function(req, res, next) {
	console.log("Rendering 404");
	res.status(404);
	if (req.accepts('html')) {
		res.render('404', {
			url : req.url
		});
		return;
	}
	if (req.accepts('json')) {
		res.send({
			error : 'Not found'
		});
		return;
	}
	res.type('txt').send('Not found');
});

// Load all the routes to be used for express.
require('./routes/routes')(app, passport, cache);

// Start the HTTP server, and listen on configured port.
// TODO : Need to make this as as HTTPS server
http.createServer(app).listen(app.get('port'), function() {
	console.log('Hack is listening on port ' + app.get('port'));
});
