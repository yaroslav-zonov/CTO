<article class="flex flex-col gap-2 group shrink-0">
	<a href="{link}" class="relative w-full overflow-hidden pb-[150%] block">
		<img
			src="{image-1}"
			alt="{title}"
			class="absolute top-0 left-0 w-full h-full object-cover object-center"
			loading="lazy"
		/>
	</a>
	<a href="{link}" class="no-underline">
		<p class="font-normal text-sm leading-4 text-foreground transition-opacity group-hover:opacity-90">{title limit="40"}</p>
	</a>
</article>
<div class="mov tcarusel-item">
	<div class="mov-i img-box">
		<img src="{image-1}" alt="{title}" />
		<div class="mov-mask flex-col ps-link" data-link="{link}"><span class="fas fa-book-open"></span></div>
	</div>
	<a class="mov-t nowrap" href="{link}">{title limit="40"}</a>
</div>
