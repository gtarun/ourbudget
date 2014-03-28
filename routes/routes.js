/**
 * This is the main router file which consolidates the remaining page specific routes.
 * If a new page say A is to be designed, create both controller and router for A, and add the router in this file.
 */

var login_router = require('../routes/login_router.js');
var password_router = require('../routes/password_router.js');
var root_router = require('../routes/root_router.js');
var admin_router = require('../routes/admin_router.js');
/*var earnings_router = require('../routes/earnings_router.js');
var payments_router = require('../routes/payments_router.js');*/
var myaccount_router = require('../routes/myaccount_router.js');
var budget_router = require('../routes/budget_router.js');
var charts_router =  require('../routes/charts_router.js');
/**
 * 
 */
module.exports = function(app, passport, cache) {
	
	// Initialize the root routes.
	root_router(app, passport, cache);
	
	// Initialize the admin routes.
	admin_router(app, passport, cache);
	
	// Initialize the earnings_router
	//earnings_router(app, passport, cache);
	
	// Initialize the payments_router
	//payments_router(app, passport, cache);
	
	// Initialize the myaccount_router
	myaccount_router(app, passport, cache);
	
	// Initialize the login router
	login_router(app, passport, cache);
	
	// Initialize the password router
	password_router(app, passport, cache);
	
	budget_router(app,passport,cache);
	charts_router(app,passport,cache);
};