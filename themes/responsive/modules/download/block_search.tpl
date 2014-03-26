<!-- BEGIN: main -->
<div class="no-bg">
	<form class="d-search" action="{FORMACTION}" method="post">
		<p class="input-group">
		  <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
		  <input type="text" name="q" value="{keyvalue}" class="form-control" placeholder="{LANG.search_key}">
		</p>
		<p>
			<select class="form-control" name="cat">
				<option value="">{LANG.search_option}</option>
				<!-- BEGIN: loop -->
				<option value="{loop.id}" {loop.select}>{loop.title}</option>
				{subcat}
				<!-- END: loop -->
			</select>
		</p>
		<p>
			<input type="submit" value="Search" class="btn btn-primary" name="submit"/>
		</p>
	</form>
</div>
<!-- END: main -->