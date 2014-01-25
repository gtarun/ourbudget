/**
 * New node file
 */
var redis = require("../controller/AdminController");


function testIsKeyPresent()
{
  var temp = (redis.GenerateToken());	
  console.log("ok");
  console.log(temp);
}

testIsKeyPresent();
