(function() {

	// object holder
	var my = {};
	my.ready = null;
	my.queryParams = {};

	my.startCheck = function(){
		my.ready = setInterval(my.checkForJQuery,10);
	}

	my.checkForJQuery = function(){
		if(typeof window.jQuery != "undefined"){
			clearInterval(my.ready);
			my.ready = null;
			$(document).ready(my.init);
		}
	}

	my.showsJobs = function(output){
		$(".jobs_area").empty();

		var html = "";
		for(var i in output.results){
			html += output.results[i].id + " ";
			html += output.results[i].title + " ";
			html += output.results[i].code + " ";
			html += output.results[i].company + " ";
			html += output.results[i].niceDate + " ";
			html += "<br/>";

		}
		$(".jobs_area").html(html);
	}

	my.getData = function(){

		var promise = $.ajax({
		    contentType: 'application/json',
		    url: "api/jobs",
			dataType: "json",
		    data: JSON.stringify(my.queryParams),
			processData: false,			
			type: 'POST'
		} );

		promise.done(my.showsJobs);

		promise.fail( function( jqXHR, textStatus, errorThrown ) {
			console.log(JSON.parse(jqXHR.responseText) );
		} );
	}

	my.assignFunctions = function(){

	}

	my.init = function () {
		my.getData();
	}
	
	return my;

}()).startCheck();
