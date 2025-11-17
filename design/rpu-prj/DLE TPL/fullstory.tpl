[metatags]
<title>{title} на русском языке — скачать бесплатно или читать онлайн — RPU</title>
<description>Комикс {title} из серии {category} на русском языке. Скачать или читать онлайн бесплатно на сайте RPU.</description>
[/metatags]
<main class="max-w-[1312px] mx-auto px-4 pt-8 pb-8">
  <div class="mb-6 lg:hidden">
    <h1 class="font-extrabold text-[28px] leading-8 md:text-[56px] md:leading-[64px] text-foreground mb-4">
      {title}
    </h1>

    <p class="text-xl md:text-[28px] font-extrabold leading-8 text-foreground">
      {link-category}
      <span> • {category}</span>[xfgiven_volume]<span> • [xfvalue_volume]</span>[/xfgiven_volume]
    </p>
  </div>

  <div class="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
    <div class="w-full md:w-[400px] flex-shrink-0">
      <img
        src="{image-1}"
        alt="{title}"
        class="w-full h-auto object-cover"
        style="aspect-ratio: 2/3;"
      />
    </div>

    <div class="flex-1">
      <div class="hidden lg:block mb-6">
        <h1 class="font-extrabold text-[56px] leading-[64px] text-foreground mb-4">{title}</h1>

        <p class="text-xl md:text-[28px] font-extrabold leading-8 text-foreground">
          {link-category}
          <span> • {category}</span>[xfgiven_volume]<span> • [xfvalue_volume]</span>[/xfgiven_volume]
        </p>
      </div>

      <div class="flex items-center gap-4 mb-6">
        [xfgiven_download]
        <a href="[xfvalue_download]" target="_blank" class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-8 py-3 text-[16px] font-extrabold leading-6 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 md:flex-initial md:w-auto">
          Скачать
        </a>
        [/xfgiven_download]
        [xfgiven_reader]
        <a
          href="[xfvalue_reader]"
          target="_blank"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Читать онлайн"
          data-action="read"
        >
          <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'wght' 500;">menu_book</span>
        </a>
        [/xfgiven_reader]
        <button
          type="button"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Добавить в избранное"
          data-action="favorite"
          onclick="doFavorite('{post-id}', 'fav');"
        >
          <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'wght' 500;">favorite</span>
        </button>
        <button
          type="button"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          aria-label="Добавить в закладки"
          data-action="bookmark"
          onclick="doFavorite('{post-id}', 'bookmark');"
        >
          <span class="material-symbols-outlined" style="font-size: 32px; font-variation-settings: 'wght' 500;">bookmark</span>
        </button>
      </div>

      <p class="text-[20px] leading-[32px] text-foreground mb-6 font-normal [font-variant-numeric:lining-nums_tabular-nums]">
        {full-story}
      </p>

      [xfgiven_team]
      <hr class="border-t border-gray-200 my-6" />

      <p class="text-xl font-normal leading-8 text-foreground tabular-nums mb-4">
        Переведено командой <span class="font-extrabold">[xfvalue_team]</span>[xfgiven_together] совместно с <span class="font-extrabold">[xfvalue_together]</span>[/xfgiven_together]
      </p>

      <hr class="border-t border-gray-200 my-6" />
      [/xfgiven_team]

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        [xfgiven_perevodchik]
        <div>
          <h3 class="text-[16px] leading-6 font-normal text-foreground mb-2">Перевод</h3>
          <div class="text-[20px] leading-[32px] font-extrabold text-foreground">[xfvalue_perevodchik]</div>
        </div>
        [/xfgiven_perevodchik]
        [xfgiven_taiper]
        <div>
          <h3 class="text-[16px] leading-6 font-normal text-foreground mb-2">Тайп</h3>
          <div class="text-[20px] leading-[32px] font-extrabold text-foreground">[xfvalue_taiper]</div>
        </div>
        [/xfgiven_taiper]
        [xfgiven_oformlenie]
        <div>
          <h3 class="text-[16px] leading-6 font-normal text-foreground mb-2">Оформление</h3>
          <div class="text-[20px] leading-[32px] font-extrabold text-foreground">[xfvalue_oformlenie]</div>
        </div>
        [/xfgiven_oformlenie]
        [xfgiven_redaktor]
        <div>
          <h3 class="text-[16px] leading-6 font-normal text-foreground mb-2">Редактура</h3>
          <div class="text-[20px] leading-[32px] font-extrabold text-foreground">[xfvalue_redaktor]</div>
        </div>
        [/xfgiven_redaktor]
      </div>
    </div>
  </div>

  <hr class="border-t border-gray-200 my-8" />

  <div class="flex flex-col gap-4 w-full mb-8">
    <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Другие выпуски {category}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4">
      {custom category="{category-id}" template="shortstory" from="0" limit="10" sort="asc"}
    </div>
  </div>

  [if category = "1"]
  <hr class="border-t border-gray-200 my-8" />

  <div class="flex flex-col gap-4 w-full">
    <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
      Новинки <a href="/marvel/" class="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors">издательства</a>
    </h2>
    <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 px-4">
      <div class="flex gap-2 md:gap-3 lg:gap-4">
        {custom category="1" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
      </div>
    </div>
  </div>
  [/if]
  [if category = "2"]
  <hr class="border-t border-gray-200 my-8" />

  <div class="flex flex-col gap-4 w-full">
    <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
      Новинки <a href="/dc/" class="underline decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px] hover:text-[#fc5621] hover:decoration-[#fc5621] transition-colors">издательства</a>
    </h2>
    <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide -mx-4 px-4">
      <div class="flex gap-2 md:gap-3 lg:gap-4">
        {custom category="2" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
      </div>
    </div>
  </div>
  [/if]
</main>
