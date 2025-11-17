[aviable=lastcomments]<div class="last-comm-link">{news_title}</div>[/aviable]

<div class="comm-item clearfix">
	<div class="comm-one clearfix[online] status-online[/online]">
		<div class="comm-av img-box"><img src="{foto}" alt="{login}"/></div>
		<div class="comm-meta flex-col">
			<div class="comm-author">{author}</div>
			<div class="comm-group">{group-name}</div>
		</div>
		<div class="comm-meta flex-col">
			<div class="comm-date">{date}</div>
			<div class="comm-num"><span class="fa fa-comment-o"></span> {comm-num}</div>
		</div>
        [rating-type-3] 
		<div class="comm-meta flex-col comm-ratebox">
		<div class="comm-rate">
			[rating-plus]<span class="fa fa-plus"></span>[/rating-plus]
			[rating-minus]<span class="fa fa-minus"></span>[/rating-minus] 
			{rating}
		</div>
		</div>
		[/rating-type-3]
	</div>
	<div class="comm-two">
		<div class="comm-body clearfix">
			{comment}
		</div>
		[signature]<div class="signature">{signature}</div>[/signature]
	</div>
	<div class="comm-three">
			<ul class="clearfix">
				[not-aviable=lastcomments]
				<li[not-treecomments] class="comm-r"[/not-treecomments]>[reply]<span class="fa fa-reply"></span>Ответить[/reply]</li>
				<li class="comm-q">[fast]<span class="fa fa-quote-right"></span>Цитата[/fast]</li>
				[/not-aviable]
				[not-group=5]
				<li>[spam]Спам[/spam]</li>
				<li>[complaint]Пожаловаться[/complaint]</li>
				<li>[com-edit]Редактировать[/com-edit]</li>
				<li>[com-del]Удалить[/com-del]</li>
				<li>{mass-action}</li>
				[/not-group]
			</ul>
	</div>
</div>