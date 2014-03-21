var crypto = require("crypto"); 
var url = require('url'); 
var Auth = require('../API/authorisation.js');
var AccountAPI = require('../controller/BudgetController.js');
var root = require('../controller/rootController.js');
var Budget = require('../models/Budget.js');
var User = require('../models/User.js');
var arr = [];
var name=[];

function repeater2(i,docs){
	if(i<docs.length){
	User.findOne({'_id':docs[i]._id},function(err,user){
		if(user){
			name[i]=user.firstName+' '+user.lastName;
			console.log("Name "+i+name[i]);
			repeater2(i+1,docs);
		}
	});
	}
	else{
		console.log("Name String:"+ name);
		return name;
	}

}

function repeater1(i,docs,name){
	console.log("length:"+i+' '+docs.length);
	if(i<docs.length){
		Budget.find({"userId" : docs[i]._id},function(err,data){
			if(err)
				console.log("Its an error.");
			if(data){
				var b=[];
				for(var j=0;j<data.length;j++){
					var a={'period':data[j].DATE,'value':data[j].amount_spend};
					console.log("A:"+JSON.stringify(a));
					b[j]=a;
				}
				arr[i+1]=b;
				console.log("Array:"+i+JSON.stringify(arr));
				repeater1 (i+1,docs);
			}
		});
	}
}
		

function initializeRoutes(app, passport, cache) {
	app.get("/users/home", function(req, res) {
		var children=[];
			User.find({'parentID':req.user._id},function(err,docs){
				if(err)
					console.log("Its an error");
				if(docs){
					for(var i=0;i<docs.length;i++){
						console.log("My Child"+i+" "+docs[i]);
						var child={
							email: docs[i].email,
							amnt_spnt : docs[i].amnt_spnt,
							amnt_rcvd : docs[i].amnt_rcvd,
							monthlyIncome : docs[i].monthlyIncome
						}
						children.push(child);
					}
					
				}
			});
		console.log("Children"+JSON.stringify(children));
		
		if(req.isAuthenticated()){
			User.find({'parentID':req.user._id},function(err,docs){
				if(err)
					console.log("Error hai");
				if(docs){
					Budget.find({'userId':req.user._id},function(err,parentbugs){
						if(err)
							console.log("ERROR!!!!!!!");
						if(parentbugs){
							var b=[];
							for(var j=0;j<parentbugs.length;j++){
								var a={'period':parentbugs[j].DATE,'value':parentbugs[j].amount_spend};
								console.log("A:"+JSON.stringify(a));
								b[j]=a;
							}
							arr[0]=b;
						}
					});
					var name = repeater2(0,docs);
					console.log("Inside main name: "+name)
					repeater1(0,docs,name);
				}
			});	

			path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is"+path);
			fs.stat(path,function(err,stat)
			{
				if(!err){
					console.log(JSON.stringify(arr));
					res.render('users/home',
								 { user:req.user, data:arr, children:children,
								   imgpath:"../assets/img/profilepics/"+req.user.firstName+".jpg",imgpaths:"../assets/img/profilepics/"+req.user.firstName+".jpg" });
				}
			
			else{
				path="../assets/img/profilepics/1.jpg"
		 res.render('users/home', 
		 			{ user:req.user , data:arr, children:children,
		 			  imgpath:path,imgpaths:"../assets/img/profilepics/1.jpg" });}
		});
		}
		else
		{
			console.log('not succeed');
		}
		
	});
    
    
	app.get("/signup", root.signup);
		
	app.get("/", function(req, res) {
			res.render("homepage", {
				message : req.flash('error')
			});
		
	});

}

module.exports = initializeRoutes;





