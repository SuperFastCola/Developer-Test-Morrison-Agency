<!DOCTYPE html>
<!--[if lte IE 8]> <html xmlns="http://www.w3.org/1999/xhtml" class="ie8-and-lower"> <![endif]-->
<!--[if !IE]><!--> <html xmlns="http://www.w3.org/1999/xhtml"> <!--<![endif]-->
<head>
	<title>Developer Test - Anthony Baker</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="js/jobapp.js"></script>
</head>
<body>

	<div class="holder">
		<div class="header_area">
			<h1>A list of things</h1>
			<button class="refresh">Reset</button>
			<div class="search_area">
					<input type="text" name="criteria" class="search_field" value="" />
					<div class="sort_message">Showing <b>1-8</b> <span class="sm_rows">Row</span></div>
			</div>
			<div class="sorting_nav">
				<a class="sort title" 	data-ref="title">Job Title</a>
				<a class="sort code" 	data-ref="code">Code</a>
				<a class="sort company" data-ref="company">Company</a>
				<a class="sort created" 	data-ref="created">Date</a>
			</div>
		</div>
		<div class="jobs_area">
		</div>
	</div>
	<script id="jobtemplate" type="text/template">
	 <div class="jobrow">
	 	<span class="jobdata title"></span>
	 	<span class="jobdata code"></span>
	 	<span class="jobdata company"></span>
	 	<span class="jobdata created">
	 		<span></span>
	 		<small></small>
	 	</span>
	 </div>
	</script>
	<script id="jobtemplate_noresults" type="text/template">
	 <div class="jobrow noresults"></div>
	</script>
</body>
</html>