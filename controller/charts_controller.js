var User = require("../models/User");
var Budget = require("../models/Budget.js");

var PieChart = function(req,res){
	console.log("Inside Pie Chart controller");
	var response = {}
	response.data=[];
	response.names = [];
	response.names[0] = req.user.firstName;
	/*User.findOne({_id:req.user._id},function(err,parent_data){
		if(err)
			console.log("Error in individualReport.");
		if(parent_data){*/
			console.log("parent_data:"+req.user);
			var amnt_spnt = req.user.amnt_spnt;
			var savings = req.user.monthlyIncome + req.user.amnt_rcvd - amnt_spnt;
			response.data[0] = {"cols": [
       				 					{"id":"","label":"Labels","pattern":"","type":"string"},
        								{"id":"","label":"Values","pattern":"","type":"number"}
      								 ],
  							 "rows": [
        								{"c":[{"v":"Savings","f":null},{"v":savings,"f":null}]},
        								{"c":[{"v":"Expenditure","f":null},{"v":amnt_spnt,"f":null}]}
      								 ]
							}
			console.log("response_data:"+JSON.stringify(response.data));
			console.log("LENGTH:"+req.user.familyMembers.length);
			var child_id=[];
			for(var i=0;i<req.user.familyMembers.length;i++)
				child_id[i]=req.user.familyMembers[i]._id;
			console.log("Chidren Id Array: "+JSON.stringify(child_id));
			User.find({_id:{$in:child_id}},function(err,child_data){
				if(err)
					console.log("Error in child_data");
				if(child_data){
					console.log("Children Data: "+child_data);
					for(var i=0;i<child_data.length;i++){
						console.log("child_data:"+i+' '+child_data[i]);
						var amnt_spnt = child_data[i].amnt_spnt;
						var savings = child_data[i].monthlyIncome + child_data[i].amnt_rcvd - amnt_spnt;
						response.data[i+1] = {"cols": [
       				 									{"id":"","label":"Labels","pattern":"","type":"string"},
        												{"id":"","label":"Values","pattern":"","type":"number"}
      												  ],
  											  "rows": [
        												{"c":[{"v":"Savings","f":null},{"v":savings,"f":null}]},
        												{"c":[{"v":"Expenditure","f":null},{"v":amnt_spnt,"f":null}]}
      												  ]
							};
						response.names[i+1]=child_data[i].firstName;
					}
					console.log("response_data:"+JSON.stringify(response.data));
					console.log("Name array: "+JSON.stringify(response.names));
					res.json(200,response);
				}
				else{
					console.log("No Child!!!");
					res.json(200,"Error");
				}
			})
	/*	}
	})*/
}

var ComboChart = function(req,res){
	var dataArr = [];
	var ids =[];
	ids[0]=req.user._id;
	for(var i=0;i<req.user.familyMembers.length;i++)
		ids[i+1]=req.user.familyMembers[i]._id;
	console.log("Budget userIds: "+JSON.stringify(ids));
	User.find({_id:{$in:ids}},function(err,names){
		if(err)
			console.log("error");
		if(names){
			console.log("NAMES: "+names);
			for(var i=0;i<names.length;i++)
				ids[i]=names[i].firstName;
			console.log("Budget userNames: "+JSON.stringify(ids));
			Budget.aggregate({$group:{_id:{month:{$month:'$DATE'},year:{$year:'$DATE'},userId:'$userId.id',name:'$userId.name'},ttlBudget:{$sum:'$amount_spend'}}},
					 		 {$sort:{"_id.year":-1,"_id.month":1,"_id.userId":1}},function(err,data){
				if(err)
					console.log("Error in ComboChart"+err);
				if(data){
					console.log("Budget details of collection Budget:"+JSON.stringify(data));
			/*Budget.find({userId:{$in:ids}},function(error,familybudget){
				console.log("Inside data.find");
				if(error)
					console.log("Error in familybudget");
				if(familybudget){
					console.log("Budget details of familybudget:"+JSON.stringify(Budget));
				}
				else
					console.log("Cant faind familybudget");
			})*/
					var row1= [];
					row1[0]='Month';
					var mon=['jan','feb','mar','apr','may','june','july','aug','sept','oct','nov','dec'];
					for(var i=0;i<ids.length;i++)
						row1[i+1]=ids[i];
					dataArr[0] = row1;
					for(var i=1;i<13;i++){
						var row = [i];
						for(var j=0;j<ids.length;j++)
							row.push(0);
						dataArr[i] = row;
					}
					console.log("dataArr: "+JSON.stringify(dataArr));
					for(var j=0;j<data.length;j++){
						var user = data[j]._id.name;
						console.log("User Id: "+user);
						var index;
						for(var k=0;k<ids.length;k++){
							console.log("ids[k]: "+ids[k]);
							if(user===String(ids[k]))
								index = k+1;
						}
						console.log("Index: "+index);
						dataArr[data[j]._id.month][index]=data[j].ttlBudget;
					}
					console.log("dataArr "+j+' '+JSON.stringify(dataArr));
    				res.json(200,dataArr);
				}
			})
		}
	})
	
}

exports.PieChart = PieChart;
exports.ComboChart = ComboChart;