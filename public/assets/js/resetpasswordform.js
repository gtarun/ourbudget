/**
 * New node file
 */

/**
 * New node file
 */
$(document).ready(function(){
    
     function disFormSubmit(event){
       event.preventDefault(); 
     };
    
    $('#resetPassForm').submit(disFormSubmit);
    
    
    $('#resetPassForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    pass1: {
                        minlength: 2,
                        required: true
                    },
                    pass2: {
                        minlength: 2,
                        required: true,
                        equalTo : "#pass1"
                    }
                },

                invalidHandler: function (event, validator) {
					//display error alert on form submit    
                },

                errorPlacement: function (label, element) { // render error placement for each input type   
					$('<span class="error"></span>').insertAfter(element).append(label)
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('success-control').addClass('error-control');  
                },

                highlight: function (element) { // hightlight error inputs
					
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    
                },

                success: function (label, element) {
					var parent = $(element).parent('.input-with-icon');
					parent.removeClass('error-control').addClass('success-control'); 
                },

                submitHandler: function (form) {
                    
                    $.ajax({
		                      url : $(form).attr('action'),
		                      dataType : 'json',
                              data : $(form).serialize(),
                              type : 'POST', 
		                      cache : false,
                              beforeSend : function() {
                                    console.log("Submitting the Paypal data to Server with data : " + $(form).serialize());
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Server Failure. Please retry. </div>" ; 
                                  $("#resetPassStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Password has been reset succefully. Please <a href = 'login'>relogin</a> with your new password. </div>" ; 
                                  $("#content").html(innerHTML);
                                  
                                },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });	
    
    
    
}   
);
