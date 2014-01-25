/**
 * New node file
 */
$(document).ready(function(){
    
    Dropzone.autoDiscover = false;
    
    var options = {
      url : "changePicture",
      dictDefaultMessage  : "Drop your Image Pics here",
      addRemoveLinks : true,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function() {
        this.on("maxfilesexceeded", function(file){
            alert("Only one file will be uploaded");
        });
         this.on("success", function(file){
            alert("File Uploaded to Server Succesfully.");
             window.location.href = "user-profile";
        });
         this.on("error", function(file, error){
            alert(error);
        });
      }
    };
    
    $("#userpicform").dropzone(options);
    
    function disFormSubmit(event){
       event.preventDefault(); 
     };
    
    $('#accountInfoForm').submit(disFormSubmit);

     $('#accountInfoForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    pass1: {
                        minlength: 2
                    },
                    pass2: {
                        minlength: 2,
                        equalTo : "#pass1"
                    },
                    email: {
                        minlength: 2
                    },
                    countrycode: {
                        minlength: 2
                    },
                    phonenumber: {
                        minlength: 2
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
                                  $("#accountInfoStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Account Information has successfully saved. Please relogin. <script>setTimeout(function(){window.location.href = 'login';},5000);</script></div>" ; 
                                  $("#accountInfoStatus").html(innerHTML);
                                  
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
