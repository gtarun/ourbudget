
function remElement()
{
  $(".destroy").click(function () {
      var email = $(this).parent().parent().find('#rel_email').val();
      var parent_id = $('#parID').val();     
      var postdata = {
        'email' : email,
        'parent_id' : parent_id
      }
      console.log(email);
      console.log(parent_id);
      
        $.ajax({
          url : 'removeRelation',
          type: 'POST',
          dataType : 'json',
          data : postdata,

          success : $(this).parent().parent().remove(),

          error : function(data,a,b){
            console.log("remElement:"+a);
          }

        });
  });
}



    
function addElement()
{

    var rel = $('#relation').val();
    var email = $('#rel_email').val();
    var parent_id = $('#parID').val();
    var postdata ={
      'rel' : rel,
      'email' : email,
      'parent_id' :parent_id
    }
    console.log(rel);
    console.log(email);
    console.log(parent_id);

  $.ajax({
    url : 'addRelation',
    type : 'post',
    dataType : 'json',
    data : postdata,
    beforeSend :  function(){
      var addHTML = "<div class='addTagDiv top'>" + 
                   "<div class='col-md-3'>" + 
                    "<input name='relation' id='relation' type='text' class='form-control' placeholder='+Relation'>" + 
                      "</div>" +
                      "<div class='col-md-7'>" + 
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
  },
 
  success:console.log("success"),

  error : function(data,a,b){
            console.log("addElement:"+a);
          }
}) ;  
 
 $(".destroy").click(function () {
      var email = $(this).parent().parent().find('#rel_email').val();
      var parent_email = $('#parID').val();     
      var postdata = {
        'email' : email,
        'parent_id' : parent_id
      }
      console.log(email);
      console.log(parent_id);
      
        $.ajax({
          url : 'removeRelation',
          type: 'POST',
          dataType : 'json',
          data : postdata,

          success : $(this).parent().parent().remove(),

          error : function(data,a,b){
            console.log("addElement/destroy:"+a);
          }

        });
  }); 
   
}/**
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
        });
      }
    };
    
    $("#userpicform").dropzone(options);
      $("#userpicform1").dropzone(options);
    function disFormSubmit(event){
       event.preventDefault(); 
     };

     jQuery.validator.addMethod("notEqual", function(value, element, param) {
     return this.optional(element) || value != $(param).val();
     }, "Email Ids of Parent and Children must be diffrent.");
    
    $('#accountInfoForm').submit(disFormSubmit);
    $('#parID').hide();
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
                        minlength: 6,
                        email: true,
                        notEqual : "#rel_email"
                    },
                    countrycode: {
                        minlength: 3,
                        maxlength : 3
                    },
                    phonenumber: {
                        minlength: 10,
                        maxlength: 10
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
                              console.log("myData:" +JSON.stringify(data));
                              if(data.user){
                                var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> This email ID already exists as Parent.</div>" ; 
                                $("#accountInfoStatus").html(innerHTML);
                              }
                              else{
                                var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Account Information has successfully saved. Please relogin. <script>setTimeout(function(){window.location.href = '../login';},5000);</script></div>" ; 
                                $("#accountInfoStatus").html(innerHTML);
                              }    
                           },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });	

$('#relationForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    rel_email:{
                        minlength : 6,
                        email: true,
                        notEqual : "#email"
                    },
                    monthlyIncome:{
                      minlength : 3
                    }
                },

                errorPlacement: function (label, element) { // render error placement for each input type   
                    $('<span class="error"></span>').insertAfter(element).append(label)
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('success-control').addClass('error-control');  
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
                              console.log("Submitting Edit Reations form with data : " + $(form).serialize());
                          },
                          error : function(jqXHR, textStatus, errorThrown) {
                              var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Server Failure. Please retry. </div>" ; 
                              $("#relInfoStatus").html(innerHTML);
                                },

                          success : function(data) { 
                              console.log("myData:" +JSON.stringify(data));
                              if(data){
                                var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Relations and monthly income has been saved successfully.</div>" ; 
                                $("#relInfoStatus").html(innerHTML);
                              }
                              else{
                                var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Try again </div>" ; 
                                $("#relInfoStatus").html(innerHTML);
                              }    
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
