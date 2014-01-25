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
    
    $('#forgotPassForm').submit(disFormSubmit);
    
    
    $('#forgotPassForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    email: {
                        minlength: 2,
                        required: true
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
                    
                    $('#pleaseWaitDialog').modal('show');
                    
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
                                  $('#pleaseWaitDialog').modal('hide')
                                  var innerHTML = "<div class='alert alert-danger'><script>setTimeout(function(){window.location.href = 'login';},5000);</script>Server Failure. Please retry. </div>" ; 
                                  $("#forgotPassStatus").html(innerHTML);
                                },

		                      success : function(data) {
                                  $('#pleaseWaitDialog').modal('hide')
                                  var innerHTML = "<div class='alert alert-success'><script>setTimeout(function(){window.location.href = 'login';},5000);</script> A mail has been sent to the given address. Please follow the instruction for resetting the password.</div>" ; 
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
