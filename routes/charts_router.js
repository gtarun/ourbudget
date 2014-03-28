var charts = require('../controller/charts_controller.js');


function initializeRoutes(app, passport, cache) {
	app.get('/users/individualReport',function(req,res){
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is in addbudget"+path);
			fs.stat(path,function(err,stat){
				if(!err){
					path="../assets/img/profilepics/"+req.user.firstName+".jpg";
					console.log('pic found');
					res.render("users/individualReport",
					 			{user   : req.user,
								imgpath : path,
								imgpaths :path});
				}
				else{
					path="../assets/img/profilepics/1.jpg"
					console.log('not found');
					res.render("users/individualReport", 
								{user   : req.user,
								imgpath : path,
								imgpaths :path});
				}
			})
	});

	app.get('/users/familyReport',function(req,res){
		path="./public/assets/img/profilepics/"+req.user.firstName+".jpg";
			console.log("path is in addbudget"+path);
			fs.stat(path,function(err,stat){
				if(!err){
					path="../assets/img/profilepics/"+req.user.firstName+".jpg";
					console.log('pic found');
					res.render("users/familyReport",
					 			{user   : req.user,
								imgpath : path,
								imgpaths :path});
				}
				else{
					path="../assets/img/profilepics/1.jpg"
					console.log('not found');
					res.render("users/familyReport", 
								{user   : req.user,
								imgpath : path,
								imgpaths :path});
				}
			})
	});

	app.get('/users/PieChart',charts.PieChart)
	app.get('/users/ComboChart',charts.ComboChart);

}

module.exports = initializeRoutes;