var impressionsSeries = {   label : "Impressions",
				            data: [], 
                            animator: {steps: 60, duration: 1000, start:0},
                            lines: {
                                   show: true,
					               fill: 0,
					               lineWidth: 2,				
				                },
                            points: { show: true, fill: true, radius:6,fillColor:"#f35958",lineWidth:3 },
                            color: '#f35958'
			};
    
var earningsSeries =  {
                label : "Earnings",
                //animator: {steps: 60, duration: 1000, start:0},
				data: [], 
                lines: {
                    show: true,
					fill: 0,
					lineWidth: 2,				
				},
                points: { show: true, fill: true, radius:6,fillColor:"#0000FF",lineWidth:3 },
                color: "#0000FF"
            };
    
var cpmSeries =  {
                label : "ECPM",
                //animator: {steps: 60, duration: 1000, start:0},
				data: [],
                lines: {
                    show: true,
					fill: 0,
					lineWidth: 2,				
				},
                points: { show: true, fill: true, radius:6,fillColor:"#008000",lineWidth:3 },
                color: "#008000"
            };
        
    
var seriesData = [impressionsSeries, earningsSeries, cpmSeries];
    
var options = {	xaxis: {
            mode: "time",
            timezone: "GMT",
            monthNames: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Oct",  "Nov", "Dec"],
		    //minTickSize: [1, "hour"],
				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			yaxis: {
                tickDecimals: 2,
				tickColor: "#f0f0f1",
				font :{
					lineHeight: 13,
					style: "normal",
					weight: "bold",
					family: "sans-serif",
					variant: "small-caps",
					color: "#6F7B8A"
				}
			},
			grid: {
				backgroundColor: { colors: [ "#fff", "#fff" ] },
				borderWidth:1,borderColor:"#f0f0f0",
				margin:0,
				minBorderMargin:0,							
				labelMargin:20,
				hoverable: true,
				clickable: true,
				mouseActiveRadius:6
			},
            selection: {
				mode: "x"
			},
			legend: { show: false}
		};
    

function animate() {
	$(this).animateNumbers($(this).attr("data-value"), true,
			parseInt($(this).attr("data-animation-duration")));
}

// Ajax helper method to get the URL data from the server.
function getRegisteredURLS() {
	// Preconditions
	var url = "getRegisteredTags";
    
	// Send the request
	$.ajax({
		url : url,
		dataType : 'json',
		cache : false,

		beforeSend : function() {
			console.log("Sending the request to server for " + url);
		},

		error : function(jqXHR, textStatus, errorThrown) {
			alert("Can not able to get the data from the Server" + textStatus);
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},

		success : function(data) {
           var index = 0;
           var str = "";
           var init = "";
           for (index = 0; index < data.value.length; index++)
           {
               str = str + "<li><a class = 'dropdown-value'>" + 
                      data.value[index] + "</a></li>";
           }
            
            if (data.value.length > 0)
                init = data.value[0];
            
           $('#urlList').html(str);   
           $(".dropdown-value").click(function(){
            $("#url").attr('value', $(this).text());
            getReportData()
           });
            
           $("#url").attr('value', init);
            getReportData();
            
		},

		complete : function() {
			console.log('Finished all tasks');
		}
	});
};


function getDateParams(sourecId) {
	var d1 = Date.today();
	var d2 = Date.today();
    var url = null;
    var res = {};
	if (sourecId === "todayDataLabel") {
		d1 = d1.addDays(1);
        url = "getEarningsForToday?";
	} else if (sourecId === "yesterdayDataLabel") {
		d2 = d2.addDays(-1);
        url = "getEarningsForYesterday?";
	}
	else if (sourecId === "monthDataLabel") {
        console.log("In monthDataLabel");
		d2 = d2.clearTime().moveToFirstDayOfMonth();
        d1 = d1.addDays(1);
        url = "getEarningsForCurrentMonth?";
	}
	else if (sourecId === "lastmonDataLabel") {
		d2 = d2.clearTime().moveToFirstDayOfMonth();
        d1 = d1.clearTime().moveToFirstDayOfMonth();
        d1 = d1.addDays(-1);
        d2 = d2.addDays(-1);
        d2 = d2.clearTime().moveToFirstDayOfMonth();
         url = "getEarningsForLastMonth?";
        
	}

	res.startDate = d2.toString('yyyy-MM-dd');
    res.endDate = d1.toString('yyyy-MM-dd');
    res.url = url;
	
	return res;
}

// Ajax helper method for getting Tiles data from server 
function refreshData(sourceId) {
	// Preconditions

	var dateParams = getDateParams(sourceId);
	// Prepare the request.
	var url = dateParams.url;
	var startDate = "startDate=" + dateParams.startDate;
	var endDate = "endDate=" + dateParams.endDate;
	url = url + startDate + "&" + endDate;

	// Send the request
	$.ajax({
		url : url,
		dataType : 'json',
		cache : false,

		beforeSend : function() {
			console.log("Loading");
		},

		error : function(jqXHR, textStatus, errorThrown) {
			alert("Can not able to get the data from the Server" + textStatus);
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},

		success : function(data) {
            if (sourceId === "todayDataLabel")
            {
                console.log("Daata" + data.value.data);
                console.log("Percentage" + data.value.percentage);
                $('#todayDataTile').show();
                sourceId = "#" + sourceId;
                
                $(sourceId).attr("data-value", data.value.data);
                $("#todayDataProgress").attr("data-percentage", data.value.percentage + '%');
                $(sourceId).text("0");
                $("#todayDataProgress").each(function(){
                    $(this).css('width', $(this).attr("data-percentage"));
		
	           }); 
                $(sourceId).each(animate);
                console.log('Success');
            }
            else if (sourceId === "yesterdayDataLabel")
            {
                console.log("Data" + data.value.data);
                console.log("Percentage" + data.value.percentage);
                $('#yesterdayDataTile').show();
                sourceId = "#" + sourceId;
               
                $(sourceId).attr("data-value", data.value.data);
                var percentage = parseFloat(data.value.percentage);
                if (percentage < 0)
                {
                  $("#up-down").removeClass( "icon-custom-up icon-custom-down" ).addClass( "icon-custom-down" );  
                }
                else
                {
                  $("#up-down").removeClass( "icon-custom-up icon-custom-down" ).addClass( "icon-custom-up" );  
                }    
                
                $("#yesterdayDataProgress").text(data.value.percentage + '%' + ' higher than last day');
                $(sourceId).text("0");
                $(sourceId).each(animate);
                console.log('Success');
            }
            else if (sourceId === "monthDataLabel")
            {
                console.log("Data" + data.value.data);
                console.log("Percentage" + data.value.percentage);
                
                 $('#curMonthDataTile').show();
                sourceId = "#" + sourceId;
                
                $(sourceId).attr("data-value", data.value.data);
                 $("#monthDataProgress").attr("data-percentage", data.value.percentage + '%');
               
                $("#monthDataProgress").each(function(){
                    $(this).css('width', $(this).attr("data-percentage"));
		
	           }); 
                
                $(sourceId).text("0");
                $(sourceId).each(animate);
                console.log('Success');
            }
            else if (sourceId === "lastmonDataLabel")
            {
                console.log("Data" + data.value.data);
                console.log("Percentage" + data.value.percentage);
                $('#lastMonthDataTile').show();
                sourceId = "#" + sourceId;
                
                $(sourceId).attr("data-value", data.value.data);
                $("#monthDataProgress").attr("data-percentage", data.value.percentage + '%');
               
                $("#lastMonthDataProgress").each(function(){
                    $(this).css('width', $(this).attr("data-percentage"));
		
	           }); 
                
                $(sourceId).text("0");
                $(sourceId).each(animate);
                console.log('Success');
            }		
		},

		complete : function() {
			console.log('Finished all tasks');
		}
	});
};

  // Ajax helper method for getting Flot chart and Data Chart data 
  function getReportData() {
    $('#example').dataTable().fnClearTable();  
      
	// Preconditions

	// Prepare the request.
	var url = "getReportDataByExhchange?";
    url = url + "URL=" + $("#url").attr('value') + "&";
	var startDate = "startDate=" + $('#startDate').datepicker('getUTCDate').toString('yyyy-MM-dd');
	var endDate = "endDate=" + $('#endDate').datepicker('getUTCDate').toString('yyyy-MM-dd');
	url = url + startDate + "&" + endDate;

    var result = null;
	// Send the request
	$.ajax({
		url : url,
		dataType : 'json',
		cache : false,

		beforeSend : function() {
			console.log("Sending the getReportDataByExhchange Request to the Server with : " + url);
		},

		error : function(jqXHR, textStatus, errorThrown) {
			alert("Failure" + textStatus);
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
            return null;
		},

		success : function(data) {
            console.log("Succesfully received response for getReportData from the server");
            processReportDataResponse(data);
			
		},

		complete : function() {
			console.log('Finished all tasks');
		}
	});
   };
    
    function processReportDataResponse(data)
    {
        console.log("Procesing Server Response for getReportDataByExhchange");
       // tableOptions.aaData = data.aaData;
        $('#example').dataTable().fnAddData(data.value.aaData);  
        $('#example').dataTable().fnAdjustColumnSizing (); 
        reloadFlotChart(data);
    };
    
    function reloadFlotChart(data)
    {
        index = 0;
        seriesData = [];
        earningsSeries.data = data.value.chartData.earnings;
        impressionsSeries.data = data.value.chartData.impressions;
        cpmSeries.data = data.value.chartData.ecpm;
        
        seriesData = [impressionsSeries, earningsSeries, cpmSeries];
        $("#totalImpressionsValue").text('' + data.value.chartData.totalImpressions);
        $("#totalEcpmValue").text(data.value.chartData.totalEcpm);
        $("#totalEarningsValue").text(data.value.chartData.totalEarnings);
        
        plot = $.plotAnimator($("#placeholder"), seriesData, options);
    }



        // Helper method which switches the Series data.
		function toggleSeriesData() {
            seriesData = [];
			var dataSets = {earnings : earningsSeries,
                           impressions : impressionsSeries,
                           ecpm : cpmSeries};

			 $("#toggelSeriesDiv").find("input:checked").each(function () {
				var key = $(this).attr("name");
				if (key && dataSets[key]) {
					seriesData.push(dataSets[key]);
				}
			});

			plot = $.plotAnimator("#placeholder", seriesData, options);
			
		}


