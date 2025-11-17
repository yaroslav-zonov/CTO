<article class="flex flex-col gap-2 group shrink-0">
  <a href="{full-link}" class="no-underline">
    <div class="relative w-full overflow-hidden rounded-lg pb-[150%]">
      <img 
        src="{image-1}" 
        alt="{title}" 
        loading="lazy"
        class="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity"
      />
    </div>
  </a>
  <a href="{full-link}" class="no-underline">
    <div class="text-[14px] leading-[18px] font-semibold text-foreground group-hover:text-[#fc5621] transition-colors line-clamp-2">
      {title limit="50"}
    </div>
  </a>
</article>