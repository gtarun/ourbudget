$(document).ready(function() {

var fname = $('#first-name').text();
var lname = $('#last-name').text();

var postdata = {
	'fname' : fname,
	'lname' : lname,
};

$('#my-task-list').click(function(event) {
	var innerHtml=''; 
	var el = $(this);
	$.ajax({
		url : '/showNotify',
		type : 'POST',
		data : postdata,
		beforeSend : function(){
					console.log('retrieving')
					},
		success : function(data){
					for (var i = data.notification.length-1; i >=0 ; i--) {
						if(Object.keys(data.notification[i]).length==3){
							console.log('here');
					innerHtml+=
					"<div style='width:300px' class='scroller' data-height='100px'>"+
									"<div class='notification-messages info'>"+
										"<div class='user-profile'>"+
											"<img src='../assets/img/profilepics/"+data.notification[i].who+".jpg'  width='35' height='35'>"+
										"</div>"+
										"<div class='message-wrapper'>"+
											"<div class='heading'>"+
												"Your Parent Sent you Rs."+data.notification[i].amount+
											"</div>"+
											"<div class='description'>"+
									
											"</div>"+
											"<div class='date pull-left'>"+
												"Date :"+data.notification[i].date+
											"</div>	"+									
										"</div>"+
										"<div class='clearfix'>"+
										"</div>	"+								
									"</div>"+
								"</div>";	
					}

					else{
					innerHtml+=
					"<div style='width:300px' class='scroller' data-height='100px'>"+
									"<div class='notification-messages info'>"+
										"<div class='user-profile'>"+
											"<img src='../assets/img/profilepics/"+data.notification[i].who+".jpg'  width='35' height='35'>"+
										"</div>"+
										"<div class='message-wrapper'>"+
											"<div class='heading'>"+data.notification[i].who+
												" spent Rs."+data.notification[i].amount+
												" on "+data.notification[i].spent_on+	
											"</div>"+
											"<div class='description'>"+
									
											"</div>"+
											"<div class='date pull-left'>"+
												"Date :"+data.notification[i].date+
											"</div>	"+
											"<div class='date pull-left'>"+
												"Location :"+data.notification[i].location+
											"</div>	"+									
										"</div>"+
										"<div class='clearfix'>"+
										"</div>	"+								
									"</div>"+
								"</div>";	
					}
					//$('.popover-content').popover({'content': innerHtml});
					}
					console.log("innerHtml : "+innerHtml);
						$(el).attr('data-content', innerHtml); 
         			console.log('success');	
					},
		error : function(err){
					console.error('error');
					console.error(err);
					},
		complete : function () {
					console.log('complete');
					} 						 
});

});

function countNotify () {
	$.ajax({
		url : '/countNotify',
		type : 'POST',
		data : postdata,
		beforeSend : function(){
						console.log(postdata);
						},
		success : function(data){
					console.log(data.data);
					$('#countNotify').text(data.data);
					},
		error : function(err,a,b){
					console.error(err);
					},
		complete : function () {
					console.log('complete');
					} 						 
});

}
countNotify();
setInterval(countNotify , 10000*60);

});
