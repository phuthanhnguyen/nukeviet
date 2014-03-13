<!-- BEGIN: main -->
<div class="navbar navbar-inverse navbar-static-top" role="navigation">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#menu-site-default">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
	</div>
	<div class="collapse navbar-collapse" id="menu-site-default">
		<ul class="nav navbar-nav">
			<li<!-- BEGIN: home_active --> class="active"<!-- END: home_active -->> 
				<a title="{LANG.Home}" href="{THEME_SITE_HREF}"><i class="fa fa-lg fa-home">&nbsp;</i> {LANG.Home}</a>
			</li>
			<!-- BEGIN: top_menu -->
			<li{TOP_MENU.current}>
				<a href="{TOP_MENU.link}">{TOP_MENU.title}<!-- BEGIN: has_sub --> <b class="caret"></b><!-- END: has_sub --></a>
				<!-- BEGIN: sub -->
				<ul class="dropdown-menu">
					<!-- BEGIN: item --><li><a href="{SUB.link}" title="{SUB.title}">{SUB.title}</a></li><!-- END: item -->
				</ul>
				<!-- END: sub -->
			</li>
			<!-- END: top_menu -->
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li><a href="#">{THEME_DIGCLOCK_TEXT}</a></li>
		</ul>
	</div>
</div>
<script type="text/javascript">
nv_DigitalClock('digclock');
$(document).ready(function(){
	$('#menu-site-default .dropdown').hover(function(){
		$(this).addClass('open');
	}, function(){
		$(this).removeClass('open');
	});
});
</script>
<!-- END: main -->