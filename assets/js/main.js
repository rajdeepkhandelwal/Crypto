/* =================================
------------------------------------
	Cryptocurrency - Landing Page Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(200).fadeOut("slow");

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.responsive-bar').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});


	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});

	
	/*------------------
		Review
	--------------------*/
	var review_meta = $(".review-meta-slider");
    var review_text = $(".review-text-slider");


    review_text.on('changed.owl.carousel', function(event) {
		review_meta.trigger('next.owl.carousel');
	});

	review_meta.owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 3,
		center: true,
		margin: 20,
		autoplay: true,
		mouseDrag: false,
	});


	review_text.owlCarousel({
		loop: true,
		nav: true,
		dots: false,
		items: 1,
		margin: 20,
		autoplay: true,
		navText: ['<i class="ti-angle-left"><i>', '<i class="ti-angle-right"><i>'],
		animateOut: 'fadeOutDown',
    	animateIn: 'fadeInDown',
	});



	 /*------------------
		Contact Form
	--------------------*/
    $(".check-form").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".check-form").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });

    /*----------------
    Get data form api for Main page table
    ----------------*/
    $(document).ready(()=>{
	    $.ajax({
	        type : 'GET',
	        url : 'https://api.nomics.com/v1/currencies/ticker?key=yourkey&ids=BTC,ETH,USDT,MKR,FTXTOKEN,REP,DX,CPX,FSN,IOST,ENG,ENJ,REQ&interval=1d',
	        success : function(data){
	        	$.each( data, function(key, value ) {
	        
	  				$(".table-body").append(
	  					"<tr><td>"+(key+1) +"</td><td><a class='link"+key+"'><img style='width:16px;height:16px;' src="+value['logo_url']+" > " +value['name']+"</a></td><td>$"+value['market_cap']+"</td><td id="+key+" >$"+value['price']+"</td><td>$"+value['1d']['volume']+"</td><td>"+value['circulating_supply']+" "+value['symbol']+"</td><td>"+value['1d']['price_change_pct']+"%</td></tr>"
	  				);
	  				$(".link"+key).attr('href',"coin/details?symbol="+value['symbol']);
				});
       		 }, 
	    });
	});
    /*------------------
    update data perodically on main table
    -------------------*/
	(function update() {
	    $.ajax({
	        type : 'GET',
	        url : 'https://api.nomics.com/v1/currencies/ticker?key=yourKey&ids=BTC,ETH,LINK,USDT,MKR,PAX,FTXTOKEN,REP,TUSD,DX,LSK&interval=1d',
	        success : function(data){
	        	$.each( data, function(key, value ) {
	        
	  				$('#'+key).html('$'+value['price']);
				});
            
       		 },                       // pass existing options
	    }).then(function() {           // on completion, restart
	       setTimeout(update, 200000);  // function refers to itself
	    });
	})();

	// ===========================
	$("#about").click(function() {
		  $('html, body').animate({
		    scrollTop: $("#element_about").offset().top
		  }, 1000);
		});
		$("#subscribe").click(function() {
		  $('html, body').animate({
		    scrollTop: $("#element_subscribe").offset().top
		  }, 1000);
		});
	})(jQuery);



	/**
	 *
	 * ajax call to get token metadata
	 *
	 */
	 if(window.location.href.split('?')[0] == base_url + 'coin/details'){
	 	var url_string = window.location.href;
	 	var url = new URL(url_string);
		var symbol = url.searchParams.get("symbol");
	 	load_token_metadata(symbol);
	 	load_token_ticker_data(symbol);
	 	chart(symbol);
	 }

	 function load_token_metadata(symbol){
	 	
	 	$.ajax({
	 		type : 'GET',
	 		url : 'https://api.nomics.com/v1/currencies?key=yourkey&ids='+symbol,
	 		success: function(data){
	 			$('.name').html(data[0].name);
	 			$('.symbol').html("("+data[0].original_symbol+")");
	 			$('.website_url').attr('href',data[0].website_url);
	 			$('.whitepaper_url').attr('href',data[0].whitepaper_url);
	 			$('.img-id').attr('src',data[0].logo_url);
	 			$('.description').html(data[0].description);
	 		}

	 	});
	 }

	  function load_token_ticker_data(symbol){
	 	
	 	$.ajax({
	 		type : 'GET',
	 		url : 'https://api.nomics.com/v1/currencies/ticker?key=yourkey&ids='+symbol,
	 		success: function(data){
	 			$('.price').html("$"+data[0].price);
	 			$('.market_cap').html("$"+data[0].market_cap);
	 			if(data[0]['1d'].price_change_pct < 0){
	 				$('.price_change_pct').html("(<span class='text-danger'>"+data[0]['1d'].price_change_pct+"%</span>)");
	 			}else{
	 				$('.price_change_pct').html("(<span class='text-success'>"+data[0]['1d'].price_change_pct+"%</span>)");
	 			}
	 			
	 			$('.market_rank').html("#"+data[0].rank);
	 			$('.24_hour_volume').html("$"+data[0]['1d'].volume);
	 			$('.circulating_supply').html("$"+data[0].circulating_supply);
	 			$('.1_day_price_change').html("$"+data[0]['1d'].price_change);
	 			$('.7_day_price_change').html("$"+data[0]['7d'].price_change);
	 			$('.30_day_price_change').html("$"+data[0]['30d'].price_change);
	 		}

	 	});
	 }


// =================================================================================
/**
 *
 * chart
 *
 */


function chart(symbol){
am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end


// Create chart
var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.padding(0, 15, 0, 15);

chart.dateFormatter.dateFormat = "yyyy-MM-dd";
// Load data
chart.dataSource.url = "https://rest.coinapi.io/v1/ohlcv/"+symbol+"/USD/history?apikey=yourkey&period_id=1DAY&time_start=2017-01-01T00:00:00&limit=10000";
chart.dataSource.parser = new am4core.JSONParser();
// chart.dataSource.parser.options.emptyAs = 0;


// chart.dataSource.parser = new am4core.CSVParser();
chart.dataSource.parser.options.useColumnNames = true;
// chart.dataSource.parser.options.reverse = true;

// the following line makes value axes to be arranged vertically.
chart.leftAxesContainer.layout = "vertical";

// uncomment this line if you want to change order of axes
//chart.bottomAxesContainer.reverseOrder = true;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.ticks.template.length = 8;
dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
dateAxis.renderer.grid.template.disabled = true;
dateAxis.renderer.ticks.template.disabled = false;
dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
dateAxis.renderer.minLabelPosition = 0.01;
dateAxis.renderer.maxLabelPosition = 0.99;
dateAxis.keepSelection = true;
dateAxis.minHeight = 30;
// dateAxis.dateFormats.setKey("day", "MMMM dt");
dateAxis.groupData = true;
dateAxis.minZoomCount = 5;

// these two lines makes the axis to be initially zoomed-in
// dateAxis.start = 0.7;
// dateAxis.keepSelection = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.zIndex = 1;
valueAxis.renderer.baseGrid.disabled = true;
// height of axis
valueAxis.height = am4core.percent(65);

valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
valueAxis.renderer.inside = true;
valueAxis.renderer.labels.template.verticalCenter = "bottom";
valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

//valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis.renderer.fontSize = "0.8em"

var series = chart.series.push(new am4charts.CandlestickSeries());
series.dataFields.dateX = "time_period_start";
series.dataFields.openValueY = "price_open";
series.dataFields.valueY = "price_close";
series.dataFields.lowValueY = "price_low";
series.dataFields.highValueY = "price_high";
series.clustered = false;
series.simplifiedProcessing = true;
series.tooltipText = "Date:{dateX.formatDate('d MMMM, yyyy')}\nopen: ${openValueY}\nlow: ${lowValueY}\nhigh: ${highValueY}\nclose: ${valueY}";
series.name = "MSFT";
series.defaultState.transitionDuration = 0;



var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis2.tooltip.disabled = true;
// height of axis
valueAxis2.height = am4core.percent(35);
valueAxis2.zIndex = 3
// this makes gap between panels
valueAxis2.marginTop = 30;
valueAxis2.renderer.baseGrid.disabled = true;
valueAxis2.renderer.inside = true;
valueAxis2.renderer.labels.template.verticalCenter = "bottom";
valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
valueAxis.renderer.maxLabelPosition = 0.95;
valueAxis2.renderer.fontSize = "0.8em"

valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;

var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.dateX = "time_period_start";
series2.clustered = false;
series2.dataFields.valueY = "volume_traded";
series2.yAxis = valueAxis2;
series2.tooltipText = "${valueY}";
series2.name = "Series 2";
// volume should be summed
series2.groupFields.valueY = "sum";
series2.defaultState.transitionDuration = 0;

chart.cursor = new am4charts.XYCursor();

var scrollbarX = new am4charts.XYChartScrollbar();

var sbSeries = chart.series.push(new am4charts.LineSeries());
sbSeries.dataFields.valueY = "price_close";
sbSeries.dataFields.dateX = "time_period_start";
scrollbarX.series.push(sbSeries);
sbSeries.disabled = true;
scrollbarX.marginBottom = 20;
chart.scrollbarX = scrollbarX;
scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;



/**
 * Set up external controls
 */

// Date format to be used in input fields
var inputFieldFormat = "yyyy-MM-dd";

document.getElementById("b1m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -1);
  zoomToDates(date);
});

document.getElementById("b3m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -3);
  zoomToDates(date);
});

document.getElementById("b6m").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "month", -6);
  zoomToDates(date);
});

document.getElementById("b1y").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.add(date, "year", -1);
  zoomToDates(date);
});

document.getElementById("bytd").addEventListener("click", function() {
  var max = dateAxis.groupMax["day1"];
  var date = new Date(max);
  am4core.time.round(date, "year", 1);
  zoomToDates(date);
});

document.getElementById("bmax").addEventListener("click", function() {
  var min = dateAxis.groupMin["day1"];
  var date = new Date(min);
  zoomToDates(date);
});

dateAxis.events.on("selectionextremeschanged", function() {
  updateFields();
});

dateAxis.events.on("extremeschanged", updateFields);

function updateFields() {
  var minZoomed = dateAxis.minZoomed + am4core.time.getDuration(dateAxis.mainBaseInterval.timeUnit, dateAxis.mainBaseInterval.count) * 0.5;
  document.getElementById("fromfield").value = chart.dateFormatter.format(minZoomed, inputFieldFormat);
  document.getElementById("tofield").value = chart.dateFormatter.format(new Date(dateAxis.maxZoomed), inputFieldFormat);
}

document.getElementById("fromfield").addEventListener("keyup", updateZoom);
document.getElementById("tofield").addEventListener("keyup", updateZoom);

var zoomTimeout;
function updateZoom() {
  if (zoomTimeout) {
    clearTimeout(zoomTimeout);
  }
  zoomTimeout = setTimeout(function() {
    var start = document.getElementById("fromfield").value;
    var end = document.getElementById("tofield").value;
    if ((start.length < inputFieldFormat.length) || (end.length < inputFieldFormat.length)) {
      return;
    }
    var startDate = chart.dateFormatter.parse(start, inputFieldFormat);
    var endDate = chart.dateFormatter.parse(end, inputFieldFormat);

    if (startDate && endDate) {
      dateAxis.zoomToDates(startDate, endDate);
    }
  }, 500);
}

function zoomToDates(date) {
  var min = dateAxis.groupMin["day1"];
  var max = dateAxis.groupMax["day1"];
  dateAxis.keepSelection = true;
  //dateAxis.start = (date.getTime() - min)/(max - min);
  //dateAxis.end = 1;

  dateAxis.zoom({start:(date.getTime() - min)/(max - min), end:1});
}

}); // end am4core.ready()
}


	 


	

