<article class="flex flex-col gap-2 group">
    <a href="{url}" class="relative w-full overflow-hidden pb-[56.25%] block">
        <img
            src="{icon}"
            alt="{name}"
            class="absolute top-0 left-0 w-full h-full object-cover object-center"
            loading="lazy"
        />
    </a>
    <div class="flex flex-col gap-1 text-[#151515]">
        <a href="{url}" class="no-underline">
            <h3 class="font-semibold text-base leading-[18px] transition-opacity group-hover:opacity-90">{name}</h3>
        </a>
        <p class="font-normal text-sm leading-4">{news-count} выпуска →</p>
    </div>
</article>
