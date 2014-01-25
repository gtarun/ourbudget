/**
 * New node file
 */
var appconfig = require('../config/appconfig');
var mongoose = require('mongoose');

mongoose.connect(appconfig.development.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Conneced succesfully");
});
