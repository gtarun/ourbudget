$(document).ready(function() {

var fname = $('#first-name').text();
var lname = $('#last-name').text();

var postdata = {
	'fname' : fname,
	'lname' : lname
};

$('#my-task-list').click(function(event) {
	$.ajax({
		url : '/showNotify',
		type : 'POST',
		data : postdata,
		beforeSend : function(){
					console.log('retrieving')
					},
		success : function(data){
					console.log(data.notification[0].who);
					var innerHtml ='';
					for (var i = data.notification.length-1; i >=0 ; i--) {
					innerHtml+=
					"<div style='width:300px' class='scroller' data-height='100px'>"+
									"<div class='notification-messages info'>"+
										"<div class='user-profile'>"+
											"<img src='../assets/img/profilepics/"+data.notification[i].who.substring(0,data.notification[i].who.lastIndexOf(' '))+".jpg'  width='35' height='35'>"+
										"</div>"+
										"<div class='message-wrapper'>"+
											"<div class='heading'>"+
												data.notification[i].who+" - Sent you Rs."+data.notification[i].amount+
											"</div>"+
											"<div class='description'>"+
									
											"</div>"+
											"<div class='date pull-left'>"+
												"Date :"+data.notification[i].postDate+
											"</div>	"+									
										"</div>"+
										"<div class='clearfix'>"+
										"</div>	"+								
									"</div>"+
								"</div>";	
					
					//$('.popover-content').popover({'content': innerHtml});
					};
					$('#alerts').append(innerHtml);
					console.log('success');	
					},
		error : function(){
					console.error('error');
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
					console.log(data.length);
					$('#countNotify').text(data.length);
					},
		error : function(){
					console.error('error');
					},
		complete : function () {
					console.log('complete');
					} 						 
});

}
countNotify();
setInterval(countNotify , 10000*60);

});
