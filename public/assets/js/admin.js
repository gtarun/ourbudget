function addElement()
{
        
    var addHTML = "<div class='addTagDiv top'>" + 
                   "<div class='col-md-3'>" + 
                    "<input name='relation' id='relation' type='text' class='form-control' placeholder='+Relation'>" + 
                      "</div>" +
                      "<div class='col-md-8'>" + 
                      "<input name='rel_email' id='rel_email' type='text' class='form-control' placeholder='Relative Email'>" + 
                      "</div>" + 
                      "<div class = 'col-md-1 links'>" + 
                      "<a href = 'javascript:addElement();' class='addMore topanchor'> add</a>" + 
                      "</div></div>";
    
    
    $('.addMore.topanchor').text('remove');
    $('.addMore.topanchor').attr('href', '#');
    $('.addMore.topanchor').removeClass('topanchor addMore').addClass('destroy');
    
    var topDiv = $('.addTagDiv.top');
    topDiv.before(addHTML);
    topDiv.removeClass('top');
    
     $(".destroy").click(function () {
        $(this).parent().parent().remove();
    });
    
};

$(document).ready(function() {
     function disFormSubmit(event){
       event.preventDefault(); 
     };
    console.log("email is "+$('#email').val()); 
    if($('#email').val()){
     $('#email').prop('readonly',true);      
    }
    $("#createUserRow").hide();
    $("#modifyUserRow").hide();
    
    
    $(".destroy").click(function () {
        alert("Destroy called");
        $(this).remove();
    });
    
    $('#createUserForm').submit(disFormSubmit);
    $('#emailform').submit(disFormSubmit);
    
    $('#emailform').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    email: {
                        minlength: 10,
                        required: true
                    },
                },

                invalidHandler: function (event, validator) {
					//display error alert on form submit    
          console.log("invalid Handler");
                },

                errorPlacement: function (label, element) { // render error placement for each input type   
                  console.log("errorPlacement");
					          $('<span class="error"></span>').insertAfter(element).append(label)
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('success-control').addClass('error-control');  
                },

                highlight: function (element) { // hightlight error inputs
					console.log("hightlight");
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    console.log("unhighlight");
                },

                success: function (label, element) {
					          var parent = $(element).parent('.input-with-icon');
					          parent.removeClass('error-control').addClass('success-control'); 
                    console.log("email form success");
                },

                submitHandler: function (form) {
                	 $.ajax({
		                      url : $(form).attr('action'),
		                      dataType : 'json',
                              data : $(form).serialize(),
                              type : 'POST', 
		                      cache : false,
                              beforeSend : function() {
                                    console.log("Submitting the Email form");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Email Submission failed. Please try again. </div>" ; 
                                  $("#emailformStatus").html(innerHTML);
                                },

		                          success : function(data) {
                                 console.log("email form submit handler success")
                              if($(location).attr('search')){

                                 if (data.value.user)
                                 {                                    
                                    $('#createUserRow').show();
                                    $('#createUserForm')[0].reset();
                                    $('#email1').val(data.value.email);
                                    $('#email1').prop('readonly',true);
                                    $('#emailRow').remove();
                                    if(data.value.user.parentID){
                                      $('#addTagsDiv').hide();
                                    }                                    
                                }
                                else{

                                    alert("The User doesnt exist. User Create user Form to create a new user");
                                    $('#createUserRow').show();
                                    $('#createUserForm')[0].reset();
                                    $('#email1').val(data.value.email);
                                    $('#email1').prop('readonly',true);
                                    $('#emailRow').remove();
                                }

                              }
                              else{
                                var innerHTML = "<div class = 'col-md-12'><div class='alert alert-success'><button class='close' data-dismiss='alert'></button> You are signing up as parent.Please Check your e-mail for verification.You will be redirected to the login page after 5 seconds. Thank you !<script>setTimeout(function(){window.location.href = '../login';},5000);</script></div></div>" ;               
                                $("#emailform").html(innerHTML);
                              }
                                  return;
                                  
                                },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });
    
     $('#createUserForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    firstName: {
                        minlength: 2,
                        required: true
                    },
                    lastName: {
                        minlength: 2,
                        required: true
                    },
                    email1: {
                        minlength: 2,
                        required: true,
                        email : true
                    },
                    pass1: {
                        minlength: 2
                    },
                    pass2: {
                        minlength: 2,
                        equalTo : "#pass1"
                    },
                    dob: {
                        required: true
                    },
                    countrycode: {
                        minlength:3,
                        maxlength:3,
                        required: true
                    },
                    phoneNumber: {
                        minlength: 10,
                        maxlength:10,
                        required: true
                    },
                    address: {
                        minlength: 10,
                        required: true
                    },
                    relation: {
                        minlength: 4,
                    },
                     rel_email: {
                        minlength: 2,
                        email : true
                    }, 
                    monthlyIncome: {
                        minlength: 3,
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
                  console.log("create user form success");
                },

                submitHandler: function (form) {
                	 $.ajax({
		                      url : $(form).attr('action'),
		                      dataType : 'json',
                              data : $(form).serialize(),
                              type : 'POST', 
		                          cache : false,
                              beforeSend : function() {
                                    console.log("Submitting the Create New User form");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button>  User Creation failed. Please try again. </div>" ; 
                                  $("#createUserForm").html(innerHTML);
                                },

		                          success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully created/updated the User.You will be redirected to login screen after 3 seconds.<script>setTimeout(function(){window.location.href = '../login';},3000);</script></div>" ; 
                                  $("#createUserForm").html(innerHTML);
                                  console.log("create user form submit handler success");
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