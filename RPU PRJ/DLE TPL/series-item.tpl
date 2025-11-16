<article class="flex flex-col gap-2 group shrink-0">
    <a href="{link-category}" class="relative w-full overflow-hidden pb-[150%] block">
        [not-category]
        <img
            src="{icon}"
            alt="{category}"
            class="absolute top-0 left-0 w-full h-full object-cover object-center"
            loading="lazy"
        />
        [/not-category]
    </a>
    <div class="flex flex-col gap-1">
        <a href="{link-category}" class="no-underline">
            <h3 class="font-semibold text-base leading-[18px] transition-opacity group-hover:opacity-90">{category}</h3>
        </a>
        <p class="font-normal text-sm leading-4">{news-num} выпусков →</p>
    </div>
</article>
