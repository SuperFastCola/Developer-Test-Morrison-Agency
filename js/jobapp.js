(function() {

	// object holder
	var my = {};
	my.ready = null;

	my.setParameters = function(){
		my.queryParams = {
			dir:null,
			search:null,
			order: null,
			ids: new Array()
		};
	}

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

	my.countsRows = function(total){
		console.log(total);

		if(total>0){
			$(".sort_message").show();
			if(total>1){
				$(".sort_message").find("b").text("1-" + total);
				$(".sort_message").find(".sm_rows").text("Rows");
			}
			else{
				$(".sort_message").find("b").text("1");
				$(".sort_message").find(".sm_rows").text("Row");
			}
		}else{
			$(".sort_message").hide();
		}
	}

	my.showsJobs = function(output){
		$(".jobs_area").empty();

		var template = null;
		
		my.queryParams.ids = new Array();

		var currentrow = null;

		if(String(output.results[0]).match(/no\sresults/i)){
			template = $.trim($("#jobtemplate_noresults").html());
			currentrow = $(template).clone();
			$(currentrow).text(output.results[0]);
			$(".jobs_area").append(currentrow);
			my.countsRows(0);
		}
		else{
			
			template = $.trim($("#jobtemplate").html());

			for(var i in output.results){
				my.queryParams.ids.push(output.results[i].id);

				currentrow = $(template).clone();
				$(currentrow).find(".title").text(output.results[i].title);
				$(currentrow).find(".code").text(output.results[i].code);
				$(currentrow).find(".company").text(output.results[i].company);
				$(currentrow).find(".created span").text(output.results[i].niceDate);
				$(currentrow).find(".created small").text(output.results[i].niceTime);
				$(".jobs_area").append(currentrow);
			}
			my.countsRows(output.results.length);
		}


		currentrow = template = null;
	}

	my.getData = function(clearids){

		if(typeof clearids != "undefined"){
			my.queryParams.ids = new Array();	
		}

		var promise = $.ajax({
		    url: "api/jobs",
			dataType: "json",
		    data: my.queryParams,
			type: 'POST'
		} );

		promise.done(my.showsJobs);

		promise.fail( function( jqXHR, textStatus, errorThrown ) {
			console.log(JSON.parse(jqXHR.responseText) );
		} );
	}

	my.sortColumns = function(e){
		my.queryParams.order = $(e.currentTarget).attr("data-ref");
		my.queryParams.dir = (my.queryParams.dir=="desc")?"asc":"desc";
		my.getData();
	}

	my.assignFunctions = function(){
		$(".sorting_nav").find("a").bind('click',my.sortColumns);
		$(".search_field").keyup(function(){

			if(my.queryParams.search==null || my.queryParams.search!=$(this).val()){
				my.queryParams.search = $(this).val();
				my.getData(true);
			}
		});

		$(".refresh").bind('click',function(){
			$(".search_field").val("");
			my.setParameters();
			my.getData(true);
		});
	}

	my.init = function () {
		my.setParameters();
		my.getData();
		my.assignFunctions();
	}
	
	return my;

}()).startCheck();
