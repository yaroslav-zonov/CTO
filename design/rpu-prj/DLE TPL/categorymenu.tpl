[root]<ul>[/root]
[item]
<div class="flex flex-col gap-2 group">
  <div class="relative w-full overflow-hidden rounded-lg pb-[150%]">
    <img
      src="{icon}"
      alt="{name}"
      loading="lazy"
      class="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
    />
    <a href="{url}" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all">
      <span class="fas fa-book-open text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
    </a>
    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
      <div class="text-white text-xs font-medium">
        {news-count} [declination={news-count}]выпуск|а|ов[/declination]
      </div>
    </div>
  </div>
  <a href="{url}" class="text-[14px] leading-[18px] font-semibold text-foreground group-hover:text-[#fc5621] transition-colors line-clamp-2 no-underline" title="{name}">
    {name}
  </a>
</div>
[/item]