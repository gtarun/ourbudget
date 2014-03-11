function addElement()
{
        
    var addHTML = "<div class='addTagDiv top'>" + 
                   "<div class='col-md-3'>" + 
                      "<select name='relation' id='relation' type='text' class='form-control' placeholder='+relation'></select>"+
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
    
jQuery.validator.addMethod("notEqual", function(value, element, param) {
 return this.optional(element) || value != $(param).val();
}, "Email Ids of Parent and Children must be distint.");

    if($('#email').val()){
       $('#email').prop('readonly',true);      
    }

    $("#createUserRow").hide();
    //$("#modifyUserRow").hide();
    
    
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
                        minlength: 6,
                        required: true,
                        email: true
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
                                    alert('The User already exists. U are signing up as a child') ;                                 
                                    $('#createUserRow').show();
                                    $('#createUserForm')[0].reset();
                                    $('#email1').val(data.value.email);
                                    $('#email1').prop('readonly',true);
                                    $('#emailRow').remove();
                                    //if(data.value.user.parentID){
                                      $('#addTagsDiv').hide();
                                    //}                                    
                                  }
                                  else{

                                    alert("The User doesnt exist. U are signing up as a parent");
                                    $('#createUserRow').show();
                                    $('#createUserForm')[0].reset();
                                    $('#email1').val(data.value.email);
                                    $('#email1').prop('readonly',true);
                                    $('#emailRow').remove();
                                  }

                                }
                                else{
                                  if(data.value.user){
                                    var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button>You  have already signed up as a parent. Please Login.<script>setTimeout(function(){window.location.href = '../login';},3000);</script></div>" ; 
                                    $("#emailform").html(innerHTML);
                                  }
                                  else{
                                    var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button>Thank You for signing up as parent. Please check you email for verification.<script>setTimeout(function(){window.location.href = '../login';},3000);</script></div>" ; 
                                    $("#emailform").html(innerHTML);
                                  }
                                }/*var message='';
                                  if (data.value.user)
                                    message = 'You already exist as a Parent . Please login from your parent account.';
                                  else
                                    message = 'Please Check your Email for verification.';
                                  var innerHTML = "<div class = 'col-md-12'>
                                                    <div class='alert alert-success'>
                                                      <button class='close' data-dismiss='alert'></button>
                                                      Message
                                                      <script>setTimeout(function(){window.location.href = '../login';},3000);</script>
                                                    </div>
                                                  </div>" ;
                                  $("#emailform").html(innerHTML);               
                                }*/
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
                        email : true,
                        notEqual : "#email1",
                        //notEqual : "#rel_email"
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

                
            });

}
);