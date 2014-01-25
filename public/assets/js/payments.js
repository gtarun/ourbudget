/**
 * New node file
 */
$(document).ready(function(){
    
    Dropzone.autoDiscover = false;
    
    $("#taxUploadForm").dropzone({
      url : "taxFormUpload",
      dictDefaultMessage  : "Drop your Tax forms here",
      addRemoveLinks : true,
      maxFiles: 1,
      accept: function(file, done) {
        console.log("uploaded");
        done();
      },
      init: function() {
        this.on("maxfilesexceeded", function(file){
            alert("Only one file will be uploaded");
        });
      }
    });
    
    $("#wireTransferGridBody").css("background-color","#FCF5EE");
    $("#wireTransferUSGridBody").hide();
    $("#achGridBody").hide();
    $("#paperCheckGridBody").hide();
    $("#paypalGridBody").hide();
    
    function disFormSubmit(event){
       event.preventDefault(); 
     };
    
    $('#paypalForm').submit(disFormSubmit);
    $('#wireTransferForm').submit(disFormSubmit);
    $('#wireTransferUSForm').submit(disFormSubmit);
    $('#achForm').submit(disFormSubmit);

    
    $(".payment-radio").change(function (){
        if ($("#wireTransferRadio").attr('checked')){
            $("#wireTransferGridBody").css("background-color","#FCF5EE");
            $("#wireTransferGridBody").show();
            $("#wireTransferGridBody").slideDown();
        } 
        else{
            $("#wireTransferGridBody").slideUp();
        }
    
        if ($("#wireTransferUSRadio").attr('checked')){
             $("#wireTransferUSGridBody").css("background-color","#FCF5EE");
             $("#wireTransferUSGridBody").slideDown();
        } 
        else{
            $("#wireTransferUSGridBody").slideUp();
        }
        
        if ($("#achRadio").attr('checked')){
             $("#achGridBody").css("background-color","#FCF5EE");
             $("#achGridBody").slideDown();
        } 
        else{
            $("#achGridBody").slideUp();
        }
        
        if ($("#paperCheckRadio").attr('checked')){
             $("#paperCheckGridBody").css("background-color","#FCF5EE");
             $("#paperCheckGridBody").slideDown();
        } 
        else{
            $("#paperCheckGridBody").slideUp();
        }
        
        if ($("#paypalRadio").attr('checked')){
             $("#paypalGridBody").css("background-color","#FCF5EE");
             $("#paypalGridBody").slideDown();
        } 
        else{
            $("#paypalGridBody").slideUp();
        }
    
    });
    
    
     $('#wireTransferForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    bankNameIN: {
                        minlength: 2,
                        required: true
                    },
                    bankAddressIN: {
                        minlength: 2,
                        required: true
                    },
                    bankCityIN: {
                        minlength: 2,
                        required: true
                    },
                    bankStateIN: {
                        minlength: 2,
                        required: true
                    },
                    bankCountryIN: {
                        minlength: 2,
                        required: true
                    },
                    bankSwiftIN: {
                        minlength: 2,
                        required: true
                    },
                    chipsUID: {
                        minlength: 2,
                        required: true
                    }, 
                    accountHolderNameIN: {
                        minlength: 2,
                        required: true
                    },
                    accountNumberIN: {
                        minlength: 2,
                        required: true
                    },
                    addressIN: {
                        minlength: 2,
                        required: true
                    },
                    cityIN: {
                        minlength: 2,
                        required: true
                    },
                    
                    stateIN: {
                        minlength: 2,
                        required: true
                    },
                    zipIN: {
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
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Submitting WireTransfer International data to the Server failed. Please try again.</div>" ; 
                                  $("#wireTransferUSStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully submitted WireTransfer International data to Server</div>" ; 
                                  $("#wireTransferUSStatus").html(innerHTML);
                                  
                                },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });	
    
    
     $('#wireTransferUSForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    bankName: {
                        minlength: 2,
                        required: true
                    },
                    bankAddress: {
                        minlength: 2,
                        required: true
                    },
                    bankCity: {
                        minlength: 2,
                        required: true
                    },
                    bankState: {
                        minlength: 2,
                        required: true
                    },
                    bankCountry: {
                        minlength: 2,
                        required: true
                    },
                    bankABA: {
                        minlength: 2,
                        required: true
                    },
                    
                    accountHolderName: {
                        minlength: 2,
                        required: true
                    },
                    accountNumber: {
                        minlength: 2,
                        required: true
                    },
                    address: {
                        minlength: 2,
                        required: true
                    },
                    city: {
                        minlength: 2,
                        required: true
                    },
                    
                    state: {
                        minlength: 2,
                        required: true
                    },
                    zip: {
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
                	 $.ajax({
		                      url : $(form).attr('action'),
		                      dataType : 'json',
                              data : $(form).serialize(),
                              type : 'POST', 
		                      cache : false,
                              beforeSend : function() {
                                    console.log("Submitting the WireTransfer International data to Server");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Submitting WireTransfer US data to the Server failed. Please try again.</div>" ; 
                                  $("#wireTransferUSStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully submitted WireTransfer US data to Server</div>" ; 
                                  $("#wireTransferUSStatus").html(innerHTML);
                                  
                                },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });	
    
     $('#achForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    accountNameACH: {
                        minlength: 2,
                        required: true
                    },
                    routingNumberACH: {
                        minlength: 2,
                        required: true
                    },
                    accountNumberACH: {
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
                                    console.log("Submitting the WireTransfer International data to Server");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Submitting ACH Deposit data to the Server failed. Please try again.</div>" ; 
                                  $("#achStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully submitted ACH Deposit data to Server</div>" ; 
                                  $("#achStatus").html(innerHTML);
                                  
                                },

		                      complete : function() {
			                     console.log('Finished all tasks');
		                      }
	                       });
                    
                            return false;
                }
            });	
    
    $('#paypalForm').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    paypalAddress: {
                        minlength: 2,
                        required: true,
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
                                    console.log("Submitting the Paypal data to Server");
                              },
                              error : function(jqXHR, textStatus, errorThrown) {
                                  var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Submitting BTC Wallet Address data to the Server failed. Please try again.</div>" ; 
                                  $("#paypalFormStatus").html(innerHTML);
                                },

		                      success : function(data) { 
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully submitted BTC Wallet Address data to Server</div>" ; 
                                  $("#paypalFormStatus").html(innerHTML);
                                  
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
