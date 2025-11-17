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
<!-- Collection Card Component - Based on Figma Design -->
<article class="collection">
    <a href="{url}" class="collection-link">
        <div class="collection-cover">
            <img src="{icon}" alt="{name}" class="collection-img" loading="lazy">
            <div class="collection-grid">
                <!-- Grid overlay for visual effect -->
            </div>
        </div>
    </a>
    <div class="collection-info">
        <a href="{url}" class="collection-link">
            <h3 class="collection-title">{name}</h3>
        </a>
        <p class="collection-count">{news-count} выпуска →</p>
    </div>
</article>

