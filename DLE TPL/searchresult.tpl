[searchposts]
[fullresult]
<div class="mov">
	<div class="mov-i img-box">
		<img src="{image-1}" alt="{title}" />
		<div class="mov-mask flex-col ps-link" data-link="{full-link}"><span class="fa fa-play"></span></div>
		[rating-type-1]
		<div class="rate3 clearfix mov-r">
		<center>{rating}</center>
		{vote-num}
		</div>
		[/rating-type-1]
	</div>
	<a class="mov-t nowrap" href="{full-link}">{title limit="40"}</a>
</div>
[/fullresult]
[shortresult]
<div class="mov">
	<div class="mov-i img-box">
		<img src="{image-1}" alt="{title}" />
		<div class="mov-mask flex-col ps-link" data-link="{full-link}"><span class="fa fa-play"></span></div>
		<div class="mov-m">WEBDL-rip</div>
		[rating-type-3]
		<div class="rate3 clearfix mov-r">
			<div class="pluss" id="pluss-{news-id}" onclick="doRateLD('plus', '{news-id}');"><span class="fa fa-thumbs-o-up"></span></div>
			<div class="minuss" id="minuss-{news-id}" onclick="doRateLD('minus', '{news-id}');"><span class="fa fa-thumbs-o-down"></span></div>
		{rating}
		{vote-num}
		</div>
		[/rating-type-3]
	</div>
	<a class="mov-t nowrap" href="{full-link}">{title limit="40"}</a>
	<div class="mov-c nowrap">Оригинальное название тут</div>
</div>
[/shortresult]
[/searchposts]

[searchcomments]
[fullresult]

<h3 style="margin-bottom: 0.4em;">{news_title}</h3>

<div class="comm-item clearfix">
	<div class="comm-left">
		<div class="comm-av"><img src="{foto}" alt="{login}"/></div>
	</div>
	<div class="comm-right">
		<div class="comm-top-info clearfix">
			<div class="comm-author[online] status-online[/online]">{author}</div>
			<div class="comm-date">{date}</div>
		</div>
		<div class="comm-text clearfix">
			{comment}
			[signature]<br clear="all" /><div class="signature">{signature}</div>[/signature]
		</div>
	</div>
</div>
[/fullresult]
[shortresult]
<h3 style="margin-bottom: 0.4em;">{news_title}</h3>

<div class="comm-item clearfix">
	<div class="comm-left">
		<div class="comm-av"><img src="{foto}" alt="{login}"/></div>
	</div>
	<div class="comm-right">
		<div class="comm-top-info clearfix">
			<div class="comm-author[online] status-online[/online]">{author}</div>
			<div class="comm-date">{date}</div>
		</div>
		<div class="comm-text clearfix">
			{comment}
			[signature]<br clear="all" /><div class="signature">{signature}</div>[/signature]
		</div>
	</div>
</div>
[/shortresult]
[/searchcomments]