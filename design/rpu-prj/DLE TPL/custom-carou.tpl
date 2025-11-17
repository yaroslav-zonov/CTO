[item]
<article class="flex flex-col gap-2 group shrink-0">
  <a href="{url}" class="no-underline">
    <div class="relative w-full overflow-hidden rounded-lg pb-[150%]">
      <img 
        src="{icon}" 
        alt="{name}" 
        loading="lazy"
        class="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
      />
    </div>
  </a>
  <a href="{url}" class="no-underline">
    <div class="text-[14px] leading-[18px] font-semibold text-foreground group-hover:text-[#fc5621] transition-colors line-clamp-2">
      {name}
    </div>
  </a>
  <div class="text-[12px] leading-4 text-muted-foreground flex items-center gap-1">
    {news-count} [declination={news-count}]выпуск|а|ов[/declination] 
    <i class="fa-solid fa-arrow-right text-[10px]"></i>
  </div>
</article>
[/item]