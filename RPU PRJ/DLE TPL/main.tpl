<!DOCTYPE html>
<html lang="ru">
<head>
{headers}
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="{THEME}/images/favicon.ico" />
  <link href="{THEME}/style/styles.css" type="text/css" rel="stylesheet" />
  <link href="{THEME}/style/engine.css" type="text/css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
  <div class="container">
    <header class="nav-container">
      <div class="nav-left">
        <div class="nav-logo" data-detail="Flame"><a href="/"><img src="/uploads/base/logo.png"></img></a></div>
        <nav class="nav-tabs" data-selected-tab="None">
          <a href="#" class="tab">Комиксы</a>
          <a href="#" class="tab">Подборки</a>
          <a href="#" class="tab">Команда</a>
        </nav>
      </div>
      <div class="nav-right">
        <button class="nav-icon" data-state="Rested">
          <div class="icon"></div>
        </button>
                    <form id="quicksearch" method="post">
                    <input type="hidden" name="do" value="search" />
                    <input type="hidden" name="catlist[]" value="" />
                    <input type="hidden" name="subaction" value="search" />
                    <div class="search-inner">
                        <input id="story" name="story" placeholder="Введите название комикса на английском..." type="text" />
                        <button type="submit" title="Найти"><span class="fa fa-search"></span></button>
                    </div>
                </form>
        <button class="nav-icon">
          <div class="icon"></div>
        </button>
        <div class="show-login avatar" id="loginbtn">
             <span class="fa fa-user"></span>
        </div>
      </div>
    </header>
[aviable=main]    
    <main>
      <section class="section">
        <h2 class="section-title underlined">Новые релизы</h2>
        <div class="items-grid" data-type="5 Issues">
          {custom order="date" template="shortstory-main" from="0" limit="5" sort="desc"}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title underlined">Свежие подборки</h2>
        <div class="collections-grid" data-type="2 Collections">
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>
        
      <section class="section">
        <h2 class="section-title underlined">Новинки Marvel</h2>
        <div class="items-grid" data-type="7 Issues">
          {custom category="1" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
        </div>
      </section>
      
      <section class="section">
        <h2 class="section-title underlined">Популярные подборки</h2>
        <div class="collections-grid" data-type="3 Collections">
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
            
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>
      
      <section class="section">
        <h2 class="section-title underlined">Популярные серии</h2>
        <div class="items-grid" data-type="5 Issues">
          {catmenu id="124, 147, 9, 318, 271" template="custom-carou"}
        </div>
      </section>  

      <section class="section">
        <h2 class="section-title underlined">Промо подборка</h2>
        <div class="collections-grid" data-type="1 Collections">         
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>
        
      <section class="section">
        <h2 class="section-title underlined">Новинки DC</h2>
        <div class="items-grid" data-type="7 Issues">
        <div class="items-grid" data-type="7 Issues">
          {custom category="2" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
        </div>
        </div>
      </section>
      
      <section class="section">
        <h2 class="section-title underlined">Популярное за месяц</h2>
        <div class="items-grid" data-type="5 Issues">
        <div class="items-grid" data-type="5 Issues">
          {custom order="reads" days="30" template="shortstory-main" from="0" limit="5" sort="desc"}
        </div>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title underlined">Промо подборка</h2>
        <div class="collections-grid" data-type="1 Collections">         
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title underlined">Коллекция подборок</h2>
        <div class="collections-grid" data-type="5 Collections">         
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>
        
      <section class="section">
        <h2 class="section-title underlined">Новинки других издательств</h2>
        <div class="items-grid" data-type="7 Issues">
        <div class="items-grid" data-type="7 Issues">
          {custom categoryexclude="1,2" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}
        </div>
        </div>
      </section>        

      <section class="section">
        <h2 class="section-title underlined">Популярные ваншоты</h2>
        <div class="items-grid" data-type="5 Issues">
        <div class="items-grid" data-type="5 Issues">
          {custom order="reads" xfields="Одиночный выпуск" template="shortstory-main" from="0" limit="5" sort="desc"}
        </div>
        </div>
      </section> 

      <section class="section">
        <h2 class="section-title underlined">Промо подборка</h2>
        <div class="collections-grid" data-type="1 Collections">         
          <article class="collection">
            <div class="collection-image" style="background-image: url(https://placehold.co/632x379)">
              <div class="collection-grid">
              </div>
            </div>
            <h3 class="collection-title">Full collection title</h3>
            <div class="collection-count">123 выпуска -></div>
          </article>
        </div>
      </section>        
        
    </main>
      
[/aviable]
      [not-aviable=main|cat]
      {content}
      [/not-aviable]
    <footer class="footer">
      <div class="footer-links">
        <a href="#" class="footer-link">Телеграм</a>
        <a href="#" class="footer-link">Вконтакте</a>
        <a href="#" class="footer-link">База переводов</a>
        <a href="#" class="footer-link">RSS</a>
      </div>
      <div class="copyright">© 2007...2025 Russian Project Universe</div>
    </footer>
  </div>
{login}
{jsfiles}    
<script src="{THEME}/js/libs.js"></script>
{AJAX}
</body>
</html>