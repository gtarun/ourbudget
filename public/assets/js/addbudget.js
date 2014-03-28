$(document).ready(function() {
	$('addBudgetForm').validate({
      focusInvalid: false, 
      ignore: "",
      rules: {
          amount_spend: {
              required: true
          },
          spend_on: {
          	  required: true
          },
          location: {
          	  required: true
          }
      },

      success: function (label, element) {
			console.log("email form success");
      },

      submitHandler: function (form) {
            $.ajax({
		        url : '/addBudget',
		        dataType : 'json',
                data : $(form).serialize(),
                type : 'POST', 
                beforeSend : function() {
                        console.log("Submitting Add Budget form with data : " + $(form).serialize());
                },
                error : function() {
                        var innerHTML = "<div class='alert alert-danger'><button class='close' data-dismiss='alert'></button> Server Failure. Please retry. </div>" ; 
                        $("#budgetStatus").html(innerHTML);
                },

		        success : function(data) { 
                              console.log("myData:" +JSON.stringify(data));
                              if(data.value){
                              	var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Budget has successfully been added.</div>" ; 
                                $("#budgetStatus").html(innerHTML);
                              }
                              else{
                                var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Error in adding Budget </div>" ; 
                                $("#budgetStatus").html(innerHTML);
                              }    
                },

		        complete : function() {
			        console.log('Finished all tasks');
		        }
	        });
            return false;
       }
  });