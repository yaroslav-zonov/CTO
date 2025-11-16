<!DOCTYPE html>
<html lang="ru">
<head>
{headers}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="{THEME}/images/favicon.ico" />
  <link href="{THEME}/style/styles.css" type="text/css" rel="stylesheet" />
  <link href="{THEME}/style/engine.css" type="text/css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body class="antialiased">
  <div class="w-full">
    <!-- Header -->
    <header class="bg-white w-full">
      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-end justify-between px-4 py-2 mx-auto h-[60px] max-w-[1312px]">
        <div class="flex gap-4 items-end">
          <a href="/" class="w-[120px] h-11">
            <img src="/rpu-logo.svg" alt="RPU Logo" class="w-full h-full" />
          </a>
          <nav class="flex flex-col h-11 pt-1">
            <div class="flex gap-3 h-4 items-end">
              <a href="/releases" class="flex items-center justify-center gap-2 group font-semibold text-sm leading-4 whitespace-pre transition-colors text-foreground group-hover:text-[#fc5621]">
                Комиксы
              </a>
              <a href="/collections" class="flex items-center justify-center gap-2 group font-semibold text-sm leading-4 whitespace-pre transition-colors text-foreground group-hover:text-[#fc5621]">
                Подборки
              </a>
              <a href="/team/stats" class="flex items-center justify-center gap-2 group font-semibold text-sm leading-4 whitespace-pre transition-colors text-foreground group-hover:text-[#fc5621]">
                Команда
              </a>
            </div>
          </nav>
        </div>

        <div class="flex-1 flex justify-end items-center mx-4">
          <form id="quicksearch" method="post" class="flex-1 max-w-md relative flex items-center h-12">
            <input type="hidden" name="do" value="search" />
            <input type="hidden" name="catlist[]" value="" />
            <input type="hidden" name="subaction" value="search" />
            <input id="story" name="story" placeholder="Поиск" type="text" class="w-full h-full bg-transparent border-b border-[#212121] pr-12 text-base text-foreground placeholder:text-[rgba(33,33,33,0.4)] focus:outline-none focus:border-[#fc5621] transition-colors" />
            <button type="submit" class="absolute right-0 w-10 h-10 flex items-center justify-center">
              <span class="material-symbols-outlined text-foreground" style="font-size: 32px; font-weight: 600;">search</span>
            </button>
          </form>
        </div>

        <div class="flex gap-4 items-center">
          <button class="w-10 h-10 flex items-center justify-center">
            <span class="material-symbols-outlined text-foreground" style="font-size: 32px; font-weight: 600;">bookmark</span>
          </button>
          <div class="w-11 h-11 rounded-full overflow-hidden cursor-pointer" id="loginbtn">
            <img src="/diverse-user-avatars.png" alt="Avatar" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="flex lg:hidden items-center justify-between px-4 py-2 h-[60px]">
        <div class="w-11 h-11 rounded-full overflow-hidden cursor-pointer" id="loginbtn-mobile">
          <img src="/diverse-user-avatars.png" alt="Avatar" class="w-full h-full object-cover" />
        </div>

        <a href="/" class="w-[120px] h-11">
          <img src="/rpu-logo.svg" alt="RPU Logo" class="w-full h-full" />
        </a>

        <button id="mobile-menu-toggle" class="w-10 h-10 flex items-center justify-center">
          <span class="material-symbols-outlined text-foreground" style="font-size: 32px; font-weight: 600;">menu</span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="lg:hidden fixed inset-0 bg-white z-50 p-4 hidden">
        <div class="flex justify-between items-center mb-8">
          <a href="/" class="w-[120px] h-11">
            <img src="/rpu-logo.svg" alt="RPU Logo" class="w-full h-full" />
          </a>
          <button id="mobile-menu-close" class="w-10 h-10 flex items-center justify-center">
            <span class="material-symbols-outlined text-foreground" style="font-size: 32px; font-weight: 600;">close</span>
          </button>
        </div>
        <nav class="flex flex-col gap-6">
          <a href="/releases" class="text-2xl font-semibold text-foreground">
            Комиксы
          </a>
          <a href="/collections" class="text-2xl font-semibold text-foreground">
            Подборки
          </a>
          <a href="/team/stats" class="text-2xl font-semibold text-foreground">
            Команда
          </a>
        </nav>
      </div>
    </header>

[aviable=main]
    <div class="w-full pt-8">
      <div class="flex flex-col gap-8 pb-8">
        
        <!-- Новые релизы -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
              <a href="/newcomics" class="text-foreground hover:text-[#fc5621] transition-colors">Новые релизы</a>
            </h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom order="date" template="shortstory-main" from="0" limit="5" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Свежие подборки -->
        <section class="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
          <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
            <a href="/collections/fresh" class="text-foreground hover:text-[#fc5621] transition-colors">Свежие подборки</a>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
          </div>
        </section>

        <!-- Новинки издательства (Marvel) -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
              Новинки <a href="/publisher/marvel" class="text-foreground hover:text-[#fc5621] transition-colors">издательства</a>
            </h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom category="1" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Популярные подборки -->
        <section class="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
          <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Популярные подборки</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
          </div>
        </section>

        <!-- Популярные серии -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Популярные серии</h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {catmenu id="124, 147, 9, 318, 271" template="custom-carou"}
            </div>
          </div>
        </section>

        <!-- Промо подборка 1 -->
        <section class="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
          <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
            <a href="/collections/promo" class="text-foreground hover:text-[#fc5621] transition-colors">Промо подборка</a>
          </h2>
          <div class="w-full">
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
          </div>
        </section>

        <!-- Новинки издательства (DC) -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
              Новинки <a href="/publisher/dc" class="text-foreground hover:text-[#fc5621] transition-colors">DC</a>
            </h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom category="2" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Популярное за месяц -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Популярное за месяц</h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom order="reads" days="30" template="shortstory-main" from="0" limit="3" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Коллекция подборок -->
        <section class="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
          <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Коллекция подборок</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
          </div>
        </section>

        <!-- Новинки других издательств -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">Новинки других издательств</h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom categoryexclude="1,2" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Популярные ваншоты -->
        <section class="flex flex-col gap-4 w-full">
          <div class="max-w-[1312px] mx-auto px-4 w-full">
            <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
              Популярные <a href="/one-shots" class="text-foreground hover:text-[#fc5621] transition-colors">ваншоты</a>
            </h2>
          </div>
          <div class="overflow-x-auto md:overflow-x-visible scrollbar-hide">
            <div class="flex gap-2 md:gap-3 lg:gap-4 pl-4 pr-4 md:max-w-[1312px] md:mx-auto md:px-4">
              {custom order="reads" xfields="Одиночный выпуск" template="shortstory-main" from="0" limit="5" sort="desc"}
            </div>
          </div>
        </section>

        <!-- Промо подборка 2 -->
        <section class="flex flex-col gap-4 w-full max-w-[1312px] mx-auto px-4">
          <h2 class="font-extrabold text-[28px] leading-8 text-foreground">
            <a href="/collections/promo-2" class="text-foreground hover:text-[#fc5621] transition-colors">Промо подборка</a>
          </h2>
          <div class="w-full">
            <article class="collection">
              <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
                <div class="collection-grid"></div>
              </div>
              <h3 class="collection-title">Full collection title</h3>
              <div class="collection-count">123 выпуска -></div>
            </article>
          </div>
        </section>

      </div>

      <div class="pb-8 max-w-[1312px] mx-auto w-full">
        <!-- Footer -->
        <footer class="bg-white flex flex-col gap-4 pt-8 pb-8 border-t border-border max-w-[1312px] mx-auto px-4">
          <div class="flex gap-3 items-center">
            <a href="https://t.me/rpu_channel" class="group">
              <p class="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
                Телеграм
              </p>
            </a>
            <a href="https://vk.com/rpu_online" class="group">
              <p class="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
                Вконтакте
              </p>
            </a>
            <a href="/translations" class="group">
              <p class="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
                База переводов
              </p>
            </a>
            <a href="/rss" class="group">
              <p class="font-semibold text-sm leading-4 text-foreground group-hover:text-[#fc5621] transition-colors">
                RSS
              </p>
            </a>
          </div>
          <p class="font-normal text-sm leading-4 text-foreground">© 2007...2025 Russian Project Universe</p>
        </footer>
      </div>
    </div>
[/aviable]

[not-aviable=main|cat]
{content}
[/not-aviable]

{login}
{jsfiles}
<script src="{THEME}/js/libs.js"></script>
<script>
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
document.getElementById('mobile-menu-close').addEventListener('click', function() {
  document.getElementById('mobile-menu').classList.add('hidden');
});
</script>
{AJAX}
</body>
</html>
