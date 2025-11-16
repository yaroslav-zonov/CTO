[searchposts]
[fullresult]
<article class="flex flex-col gap-2 group">
	<a href="{full-link}" class="relative w-full overflow-hidden pb-[56.25%] block">
		<img
			src="{image-1}"
			alt="{title}"
			class="absolute top-0 left-0 w-full h-full object-cover object-center"
			loading="lazy"
		/>
		[rating-type-1]
		<div class="absolute top-2 right-2 bg-black/75 px-2 py-1 rounded text-white text-sm">
			<span>{rating}</span> ({vote-num})
		</div>
		[/rating-type-1]
	</a>
	<div class="flex flex-col gap-1">
		<a href="{full-link}" class="no-underline">
			<p class="font-semibold text-base leading-[18px] transition-opacity group-hover:opacity-90">{title limit="40"}</p>
		</a>
	</div>
</article>
[/fullresult]
[shortresult]
<article class="flex flex-col gap-2 group">
	<a href="{full-link}" class="relative w-full overflow-hidden pb-[56.25%] block">
		<img
			src="{image-1}"
			alt="{title}"
			class="absolute top-0 left-0 w-full h-full object-cover object-center"
			loading="lazy"
		/>
		<div class="absolute top-2 left-2 bg-black/75 px-2 py-1 rounded text-white text-xs">WEBDL-rip</div>
		[rating-type-3]
		<div class="absolute bottom-2 right-2 flex gap-2 bg-black/75 px-2 py-1 rounded">
			<button class="text-white hover:text-yellow-400 transition-colors" onclick="doRateLD('plus', '{news-id}');">
				<span class="fa fa-thumbs-o-up"></span>
			</button>
			<button class="text-white hover:text-yellow-400 transition-colors" onclick="doRateLD('minus', '{news-id}');">
				<span class="fa fa-thumbs-o-down"></span>
			</button>
			<span class="text-white text-sm">{rating} ({vote-num})</span>
		</div>
		[/rating-type-3]
	</a>
	<div class="flex flex-col gap-1">
		<a href="{full-link}" class="no-underline">
			<p class="font-semibold text-base leading-[18px] transition-opacity group-hover:opacity-90">{title limit="40"}</p>
		</a>
		<p class="font-normal text-sm text-muted-foreground line-clamp-1">Оригинальное название тут</p>
	</div>
</article>
[/shortresult]
[/searchposts]

[searchcomments]
[fullresult]

<div class="border-b border-border pb-4">
	<h3 class="font-semibold text-base mb-3">{news_title}</h3>

	<div class="flex gap-3">
		<div class="flex-shrink-0">
			<img src="{foto}" alt="{login}" class="w-10 h-10 rounded-full object-cover" />
		</div>
		<div class="flex-1">
			<div class="flex items-center gap-2 mb-1">
				<span class="font-semibold text-sm[online] text-green-600[/online]">{author}</span>
				<span class="text-xs text-muted-foreground">{date}</span>
			</div>
			<div class="text-sm text-foreground">
				{comment}
				[signature]<div class="text-xs text-muted-foreground italic mt-2 pt-2 border-t border-border">{signature}</div>[/signature]
			</div>
		</div>
	</div>
</div>
[/fullresult]
[shortresult]
<div class="border-b border-border pb-4">
	<h3 class="font-semibold text-base mb-3">{news_title}</h3>

	<div class="flex gap-3">
		<div class="flex-shrink-0">
			<img src="{foto}" alt="{login}" class="w-10 h-10 rounded-full object-cover" />
		</div>
		<div class="flex-1">
			<div class="flex items-center gap-2 mb-1">
				<span class="font-semibold text-sm[online] text-green-600[/online]">{author}</span>
				<span class="text-xs text-muted-foreground">{date}</span>
			</div>
			<div class="text-sm text-foreground line-clamp-2">
				{comment}
				[signature]<div class="text-xs text-muted-foreground italic mt-2 pt-2 border-t border-border">{signature}</div>[/signature]
			</div>
		</div>
	</div>
</div>
[/shortresult]
[/searchcomments]
