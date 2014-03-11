$(document).ready(function(){
	var i;
	var countries = new Array();





countries.push( 'Canada (+1)'); // 1 so array doesn't start at 0 and show empty
countries.push( 'China (+86)');
countries.push( 'France (+33)');
countries.push( 'Germany (+49)');
countries.push( 'India (+91)');
countries.push( 'Japan (+81)');
countries.push( 'Pakistan (+92)');
countries.push( 'United Kingdom (+44)');
countries.push( 'United States (+1)');
countries.push( 'Abkhazia (+7 840)');
countries.push( 'Abkhazia (+7 940)');
countries.push( 'Afghanistan (+93)');
countries.push( 'Albania (+355)');
countries.push( 'Algeria (+213)');
countries.push( 'American Samoa (+1 684)');
countries.push( 'Andorra (+376)');
countries.push( 'Angola (+244)');
countries.push( 'Anguilla (+1 264)');
countries.push( 'Antigua and Barbuda (+1 268)');
countries.push( 'Argentina (+54)');
countries.push( 'Armenia (+374)');
countries.push( 'Aruba (+297)');
countries.push( 'Ascension (+247)');
countries.push( 'Australia (+61)');
countries.push( 'Australian External Territories (+672)');
countries.push( 'Austria (+43)');
countries.push( 'Azerbaijan (+994)');
countries.push( 'Bahamas (+1 242)');
countries.push( 'Bahrain (+973)');
countries.push( 'Bangladesh (+880)');
countries.push( 'Barbados (+1 246)');
countries.push( 'Barbuda (+1 268)');
countries.push( 'Belarus (+375)');
countries.push( 'Belgium (+32)');
countries.push( 'Belize (+501)');
countries.push( 'Benin (+229)');
countries.push( 'Bermuda (+1 441)');
countries.push( 'Bhutan (+975)');
countries.push( 'Bolivia (+591)');
countries.push( 'Bosnia and Herzegovina (+387)');
countries.push( 'Botswana (+267)');
countries.push( 'Brazil (+55)');
countries.push('British Indian Ocean Territory (+246)');
countries.push( 'British Virgin Islands (+1 284)');
countries.push( 'Brunei (+673)');
countries.push( 'Bulgaria (+359)');
countries.push( 'Burkina Faso (+226)');
countries.push( 'Burundi (+257)');
countries.push( 'Cambodia (+855)');
countries.push( 'Cameroon (+237)');
countries.push( 'Canada (+1)');
countries.push( 'Cape Verde (+238)');
countries.push( 'Cayman Islands (+ 345)');
countries.push( 'Central African Republic (+236)');
countries.push( 'Chad (+235)');
countries.push( 'Chile (+56)');
countries.push( 'China (+86)');
countries.push( 'Christmas Island (+61)');
countries.push( 'Cocos-Keeling Islands (+61)');
countries.push( 'Colombia (+57)');
countries.push( 'Comoros (+269)');
countries.push( 'Congo (+242)');
countries.push( 'Congo, Dem. Rep. of (Zaire) (+243)');
countries.push( 'Cook Islands (+682)');
countries.push( 'Costa Rica (+506)');
countries.push( 'Ivory Coast (+225)');
countries.push( 'Croatia (+385)');
countries.push( 'Cuba (+53)');
countries.push( 'Curacao (+599)');
countries.push( 'Cyprus (+537)');
countries.push( 'Czech Republic (+420)');
countries.push( 'Denmark (+45)');
countries.push( 'Diego Garcia (+246)');
countries.push( 'Djibouti (+253)');
countries.push( 'Dominica (+1 767)');
countries.push( 'Dominican Republic (+1 809)');
countries.push( 'Dominican Republic (+1 829)');
countries.push( 'Dominican Republic (+1 849)');
countries.push( 'East Timor (+670)');
countries.push( 'Easter Island (+56)');
countries.push( 'Ecuador (+593)');
countries.push( 'Egypt (+20)');
countries.push( 'El Salvador (+503)');
countries.push( 'Equatorial Guinea (+240)');
countries.push( 'Eritrea (+291)');
countries.push( 'Estonia (+372)');
countries.push( 'Ethiopia (+251)');
countries.push( 'Falkland Islands (+500)');
countries.push( 'Faroe Islands (+298)');
countries.push( 'Fiji (+679)');
countries.push( 'Finland (+358)');
countries.push( 'France (+33)');
countries.push( 'French Antilles (+596)');
countries.push( 'French Guiana (+594)');
countries.push( 'French Polynesia (+689)');
countries.push( 'Gabon (+241)');
countries.push( 'Gambia (+220)');
countries.push( 'Georgia (+995)');
countries.push( 'Germany (+49)');
countries.push( 'Ghana (+233)');
countries.push( 'Gibraltar (+350)');
countries.push( 'Greece (+30)');
countries.push( 'Greenland (+299)');
countries.push( 'Grenada (+1 473)');
countries.push( 'Guadeloupe (+590)');
countries.push( 'Guam (+1 671)');
countries.push( 'Guatemala (+502)');
countries.push( 'Guinea (+224)');
countries.push( 'Guinea-Bissau (+245)');
countries.push( 'Guyana (+595)');
countries.push( 'Haiti (+509)');
countries.push( 'Honduras (+504)');
countries.push( 'Hong Kong SAR China (+852)');
countries.push( 'Hungary (+36)');
countries.push( 'Iceland (+354)');
countries.push( 'India (+91)');
countries.push( 'Indonesia (+62)');
countries.push( 'Iran (+98)');
countries.push( 'Iraq (+964)'); 
countries.push( 'Ireland (+353)');
countries.push( 'Israel (+972)');
countries.push( 'Italy (+39)');
countries.push( 'Jamaica (+1 876)');
countries.push( 'Japan (+81)');
countries.push( 'Jordan (+962)');
countries.push( 'Kazakhstan (+7 7)');
countries.push( 'Kenya (+254)');
countries.push( 'Kiribati (+686)');
countries.push( 'North Korea (+850)');
countries.push( 'South Korea (+82)');
countries.push( 'Kuwait (+965)');
countries.push( 'Kyrgyzstan (+996)');
countries.push( 'Laos (+856)');
countries.push( 'Latvia (+371)');
countries.push( 'Lebanon (+961)');
countries.push( 'Lesotho (+266)');
countries.push( 'Liberia (+231)');
countries.push( 'Libya (+218)');
countries.push( 'Liechtenstein (+423)');
countries.push( 'Lithuania (+370)');
countries.push( 'Luxembourg (+352)');
countries.push( 'Macau SAR China (+853)');
countries.push( 'Macedonia (+389)');
countries.push( 'Madagascar (+261)');
countries.push( 'Malawi (+265)');
countries.push( 'Malaysia (+60)');
countries.push( 'Maldives (+960)');
countries.push( 'Mali (+223)');
countries.push( 'Malta (+356)');
countries.push( 'Marshall Islands (+692)');
countries.push( 'Martinique (+596)');
countries.push( 'Mauritania (+222)');
countries.push( 'Mauritius (+230)');
countries.push( 'Mayotte (+262)');
countries.push( 'Mexico (+52)');
countries.push( 'Micronesia (+691)');
countries.push( 'Midway Island (+1 808)');
countries.push( 'Micronesia (+691)');
countries.push( 'Moldova (+373)');
countries.push( 'Monaco (+377)');
countries.push( 'Mongolia (+976)');
countries.push( 'Montenegro (+382)');
countries.push( 'Montserrat (+1664)');
countries.push( 'Morocco (+212)');
countries.push( 'Myanmar (+95)');
countries.push( 'Namibia (+264)');
countries.push( 'Nauru (+674)');
countries.push( 'Nepal (+977)');
countries.push( 'Netherlands (+31)');
countries.push( 'Netherlands Antilles (+599)');
countries.push( 'Nevis (+1 869)');
countries.push( 'New Caledonia (+687)');
countries.push( 'New Zealand (64)');
countries.push( 'Nicaragua (+505)');
countries.push( 'Niger (+227)');
countries.push( 'Nigeria (+234)');
countries.push( 'Niue (+683)');
countries.push( 'Norfolk Island (+672)');
countries.push( 'Northern Mariana Islands (+1 670)');
countries.push( 'Norway (+47)');
countries.push( 'Oman (+968)');
countries.push( 'Pakistan (+92)');
countries.push( 'Palau (+680)');
countries.push( 'Palestinian Territory (+970)');
countries.push( 'Panama (+507)');
countries.push( 'Papua New Guinea (+675)');
countries.push( 'Paraguay (+595)');
countries.push( 'Peru (+51)');
countries.push( 'Philippines (+63)');
countries.push( 'Poland (+48)');
countries.push( 'Portugal (+351)');
countries.push( 'Puerto Rico (+1 787)');
countries.push( 'Puerto Rico (+1 939)');
countries.push( 'Qatar (+974)');
countries.push( 'Reunion (+262)');
countries.push( 'Romania (+40)');
countries.push( 'Russia (+7)');
countries.push( 'Rwanda (+250)');
countries.push( 'Samoa (+685)');
countries.push( 'San Marino (+378)');
countries.push( 'Saudi Arabia (+966)');
countries.push( 'Senegal (+221)');
countries.push( 'Serbia (+381)');
countries.push( 'Seychelles (+248)');
countries.push( 'Sierra Leone (+232)');
countries.push( 'Singapore (+65)');
countries.push( 'Slovakia (+421)');
countries.push( 'Slovenia (+386)');
countries.push( 'Solomon Islands (+677)');
countries.push( 'South Africa (+27)');
countries.push( 'South Georgia and the South Sandwich Islands (+500)');
countries.push( 'Spain (+34)');
countries.push( 'Sri Lanka (+94)');
countries.push( 'Sudan (+249)');
countries.push( 'Suriname (+597)');
countries.push( 'Swaziland (+268)');
countries.push( 'Sweden (+46)');
countries.push( 'Switzerland (+41)');
countries.push( 'Syria (+963)');
countries.push( 'Taiwan (+886)');
countries.push( 'Tajikistan (+992)');
countries.push( 'Tanzania (+255)');
countries.push( 'Thailand (+66)');
countries.push( 'Timor Leste (+670)');
countries.push( 'Togo (+228)');
countries.push( 'Tokelau (+690)');
countries.push( 'Tonga (+676)');
countries.push( 'Trinidad and Tobago (+1 868)');
countries.push( 'Tunisia (+216)');
countries.push( 'Turkey (+90)');
countries.push( 'Turkmenistan (+993)');
countries.push( 'Turks and Caicos Islands (+1 649)');
countries.push( 'Tuvalu (+688)');
countries.push( 'Uganda (+256)');
countries.push( 'Ukraine (+380)');
countries.push( 'United Arab Emirates (+971)');
countries.push( 'United Kingdom (+44)');
countries.push( 'United States (+1)');
countries.push( 'Uruguay (+598)');
countries.push( 'U.S. Virgin Islands (+1 340)');
countries.push( 'Uzbekistan (+998)');
countries.push( 'Vanuatu (+678)');
countries.push( 'Venezuela (+58)');
countries.push( 'Vietnam (+84)');
countries.push( 'Wake Island (+1 808)');
countries.push( 'Wallis and Futuna (+681)');
countries.push( 'Yemen (+967)');
countries.push( 'Zambia (+260)');
countries.push( 'Zanzibar (+255)');
countries.push( 'Zimbabwe (+263)');
	
	var option;
	var j, start, end;
	var code;
	var temp = new Array();
	var codes= new Array();


	for(i=0; i<countries.length; i++)
	{
		temp= countries[i];
		
		for(j=0; j<temp.length; j++)
		{
			if(temp[j] == '(')
			{
				start = j;
				while(temp[j] != ')')
					j++;

				end= j;
			}

			code= temp.substring(start+1, end);	

		}
		codes.push(code);
	}

	/*for(i=0; i<codes.length; i++)
	{
		console.log(codes[i]);
	}*/



	
	
	for(i=0; i<countries.length; i++)
	{
		
		option= '<option value="'+codes[i]+'">'+countries[i]+'</option>';
		$('#countrycode').append(option);
	}

	var relations = new Array();
	relations.push( 'Son');
	relations.push( 'Daughter');
	relations.push( 'Wife');
	relations.push( 'Mother');
	relations.push( 'Father');
	relations.push( 'Brother');
	relations.push( 'Sister');
	relations.push( 'Grand-father');
	relations.push( 'Grand-mother');
	relations.push( 'Grand-son');
	relations.push( 'Grand-daughter');
	
	relations.push( 'Other Dependents');

	for(i=0; i<relations.length; i++)
	{
		option= '<option value="'+relations[i]+'">'+relations[i]+'</option>';
		$('#relation').append(option);
	}
	var val_cnt;
	var val_rel;

	/* $('#save').on('click', function(){

		val_cnt= document.getElementById('countrycode').options[document.getElementById('countrycode').selectedIndex].value;
		console.log('country: '+val_cnt);

		val_rel= document.getElementById('relation').options[document.getElementById('relation').selectedIndex].value;
		console.log("relations: "+val_rel);

		console.log($('#txtDate').val());
		
	});*/

	/*$('#emailform').validate({
		email: {
			required: true,
			email: true
		}
	});*/
jQuery.validator.addMethod("notEqual", function(value, element, param) {
 return this.optional(element) || value != $(param).val();
}, "Email Ids of Parent and Children must be distint.");

	$('#createUserForm').validate({
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
                        minlength: 5
                    },
                    pass2: {
                        minlength: 5,
                        equalTo : "#pass1"
                    },
                    dob: {
                        required: true
                    },
                    countrycode: {
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

		errorPlacement: function (label, element) { // render error placement for each input type   
					          $('<span class="error"></span>').insertAfter(element).append(label)
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('success-control').addClass('error-control');  
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
                                  var innerHTML = "<div class='alert alert-success'><button class='close' data-dismiss='alert'></button> Successfully created the User.You will be redirected to login screen after 3 seconds.<script>setTimeout(function(){window.location.href = '../login';},3000);</script></div>" ; 
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
});

