[metatags]
<title>{title} на русском языке — скачать бесплатно или читать онлайн — RPU</title>
<description>Комикс {title} из серии {category} на русском языке. Скачать или читать онлайн бесплатно на сайте RPU.</description>
[/metatags]
<main>
      <!-- Comic Details Section -->
      <section class="section">
        <div class="comic-details-container">
          <!-- Comic Cover -->
          <div class="comic-cover-container">
            <div class="comic-cover item-image" style="background-image: url({image-1}"></div>
          </div>
          
          <!-- Comic Info -->
          <div class="comic-info-container">
            <h1 class="section-title comic-title">{title}</h1>
            <div class="comic-meta">
              <span>{link-category}</span> • <span>{category}</span>[xfgiven_volume] • <span>[xfvalue_volume]</span>[/xfgiven_volume]
            </div>
            
            <!-- Download Button -->
            <div class="download-section">
              <a href="[xfvalue_download]" target="blank">
              <button class="download-button">
                Скачать
              </button>
              </a>
            </div>
            
            <!-- Description -->
            <div class="comic-description">
              <p>{full-story}</p>
            </div>
            
            <!-- Team Credits -->
            <div>
              <h3 class="team-title">Переведено командой [xfvalue_team] [xfgiven_together]совместно с [xfvalue_together][/xfgiven_together]</h3>
              <div class="team-grid">
                <div>
                  <div class="team-role">Перевод</div>
                  <div class="team-member">[xfvalue_perevodchik]</div>
                </div>
                [xfgiven_taiper]
                <div>
                  <div class="team-role">Тайп</div>
                  <div class="team-member">[xfvalue_taiper]</div>
                </div>
                [/xfgiven_taiper]
                <div>
                  <div class="team-role">Оформление</div>
                  <div class="team-member">[xfvalue_oformlenie]</div>
                </div>
                [xfgiven_redaktor]
                <div>
                  <div class="team-role">Редактура</div>
                  <div class="team-member">[xfvalue_redaktor]</div>
                </div>
                [/xfgiven_redaktor]
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Issues -->
      <section class="section">
        <h2 class="section-title underlined">Другие выпуски {category}</h2>
        <div class="items-grid" >
          {custom category="{category-id}" template="shortstory" from="0" limit="6" sort="asc"}
        </div>
      </section>

      <!-- Related Collections -->
      <section class="section">
        <h2 class="section-title underlined">Связанные подборки</h2>
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
	[if category = "1"]
      <!-- Publisher News -->
      <section class="section">
        <h2 class="section-title underlined">Новинки Marvel</h2>
        <div class="items-grid" data-type="5 Issues">
			{custom category="1" subcat="yes" order="date" template="shortstory-main" from="0" limit="6" sort="desc"}
        </div>
      </section>
    [/if]
    [if category = "2"]
      <!-- Publisher News -->
      <section class="section">
        <h2 class="section-title underlined">Новинки DC</h2>
        <div class="items-grid" data-type="5 Issues">
			{custom category="2" subcat="yes" order="date" template="shortstory-main" from="0" limit="6" sort="desc"}
        </div>
      </section>
    [/if]
    </main>
