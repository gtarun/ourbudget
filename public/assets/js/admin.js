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
                        minlength: 2,
                        required: true
                    },
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
                                    console.log("Submitting the Email form");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Email Submission failed. Please try again. </div>" ; 
                                  $("#emailformStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                 if (data.value.user)
                                 {
                                      alert("The User exists in the system. User Modfy user Form to edit the current use details");
                                     
                                     console.log(data);
                                     
                                     $('#createUserRow').show();
                                     $('#createUserForm')[0].reset();
                                     $('#email1').val(data.value.user.email);
$('#firstName').val(data.value.user.firstName);
                                     $('#lastName').val(data.value.user.lastName);
                                     $('#pass1').val(data.value.user.pass);
                                     $('#pass2').val(data.value.user.pass);
                                      $('#dob').val(data.value.user.dob);
                                     $('#phoneNumber').val(data.value.user.contactInformation.phonenumber);
                                     $('#address').val(data.value.user.address);
                                     $('#monthlyIncome').val(data.value.user.monthlyIncome);
                                     
                                     $('.addTagDiv.top, #relation').val(data.value.user.familyMembers[0].relation[0]);
                               
                                     
                                     $('.addTagDiv.top, #rel_email').val(data.value.user.familyMembers[0].rel_email[0]);
                                    //console.log(data.value.user.familyMembers); 
                                     for (var i = 1; i < data.value.user.familyMembers[0].relation.length; i++)
                                     {
                                         
                                          var addHTML = "<div class='addTagDiv'>" + 
                                                        "<div class='col-md-3'>" + 
                                                        "<input value = '" + data.value.user.familyMembers[0].relation[i] + "' name ='relation' id='relation' type='text' class='form-control' placeholder='Relation'>" + 
                                                        "</div>" +
                                                        "<div class='col-md-8'>" + 
                                                        "<input value = '" + data.value.user.familyMembers[0].rel_email[i] + "' name='rel_email' id='rel_email' type='email' class='form-control' placeholder='Relative Emails'>" + 
                                                        "</div>" + 
                                                        "<div class = 'col-md-1 links'>" + 
                                                        "<a href = '#' class='destroy'> destroy</a>" + 
                    "</div></div>";
                                         
                                          $('.addTagDiv.top').after(addHTML);
                                         
                                          $(".destroy").click(function () {
                                             $(this).parent().parent().remove();
                                          });    
                                     }     
                                     
                                     
                                     $('#emailRow').remove();
                                 }
                                else{
                                    alert("The User doesnt exist. User Create user Form to create a new user");
                                   console.log(data);
                                    $('#createUserRow').show();
                                    $('#createUserForm')[0].reset();
                                    $('#email1').val(data.value.email);
                                    $('#email1').prop('readonly',true);
                                    $('#emailRow').remove();
                                    
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
                        required: true
                    },
                     rel_email: {
                        minlength: 2,
                        required: true,
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
                },

                submitHandler: function (form) {
                	 $.ajax({
		                      url : $(form).attr('action'),
		                      dataType : 'json',
                              data : $(form).serialize(),
                              type : 'POST', 
		                      cache : false,
                              beforeSend : function() {
                                    console.log("Submitting the WireTransfer US data to Server");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button>  User Creation failed. Please try again. </div>" ; 
                                  $("#createUserForm").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully created/updated the User</div>" ; 
                                  $("#createUserForm").html(innerHTML);
                                  
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