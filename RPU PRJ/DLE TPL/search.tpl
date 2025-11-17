<div class="space-y-8">
	<header class="mb-8">
		<h1 class="text-3xl font-bold text-foreground mb-2">Поиск по сайту</h1>
		<p class="text-muted-foreground">Найдите интересующий вас контент</p>
	</header>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max" id="searchtable" name="searchtable">
		{searchtable}
	</div>
	[searchmsg]
	<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900">
		<h3 class="font-semibold mb-2">Информация</h3>
		<p>{searchmsg}</p>
	</div>
	[/searchmsg]
</div>
<div class="search-page">
	<header class="sub-title"><h1>Поиск по сайту</h1></header>
	<div class="searchtable" id="searchtable" name="searchtable">{searchtable}</div>
	[searchmsg]<div class="berrors"><b>Информация</b><br />{searchmsg}</div>[/searchmsg]
</div>
<script>
$(document).ready(function(){
	$(".short2-item").wrapAll("<div class='clearfix' style='margin-top:20px;' />");
	});
</script>
