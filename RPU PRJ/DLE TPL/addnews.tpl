<div class="form-wrap">
    <header class="form-title"><h1>Добавить комикс на сайт</h1></header>
    <tr>

    <td>
        <p class="addnewsscan">ВНИМАНИЕ!!! Перед добавлением комикса ознакомьтесь с инструкцией по заполнению полей для корректного отображения комикса на сайте.</p><br>
        <!-- Spoiler start --><dl><dt class="quotetitle"><a href="javascript: void(0);" onclick="var spoiler = this.parentNode.parentNode.getElementsByTagName('dd')[0]; if ( spoiler.style.display == 'none' ) { spoiler.style.display = 'block';} else { spoiler.style.display = 'none';};"><p class="addnewsscan">НАЖМИ, ЧТОБЫ УВИДЕТЬ ИНСТРУКЦИЮ</p></em></a></dt><dd class="quotecontent" style="display: none;">
        <p class="addnewsscan"><b>1. Заголовок.</b> Прописывается полностью название комикса с номером через "#", номер прописывается в формате "01" или "010". Пример правильного заголовка - <b>Amazing Spider-Man #099</b>.</p><br>
        <p class="addnewsscan"><b>2. Категория.</b> Из списка категорий нужно выбрать только одну категорию (серию, лимитку и т.д.), к которой относится комикс. Например, для <b>Amazing Spider-Man #099</b> это будет категория <b>Amazing Spider-Man (1963)</b>. Категорию <b>Marvel</b> дополнительно выбирать не нужно.</p><br>
        <p class="addnewsscan"><b>3. Обложка комикса.</b> Для загрузки обложки нужно нажать кнопку "Вставить изображение" <i class="far fa-image"></i>, далее "Загрузить изображение"<i class="fas fa-upload"></i> и вставить нужную обложку. После загрузки обложки сайт сам её подгонит под нужные размеры, т.е. 800x600. Для обложек есть ограничение – она не должна быть больше 4Мб.</p><br>
        <p class="addnewsscan"><b>4. Описание.</b> Кратко написать, о чём комикс.</p><br>
        <p class="addnewsscan"><b>5.</b> Обязательные поля <b>"Переводчик", "Оформитель"</b>. В поле "Переводчик" и "Оформитель" указать никнеймы тех, кто работал над комиксом. При заполнении полей могут выскакивать подсказки с никнеймами сканлейторов, которые уже упоминались ранее на сайте. Например, достаточно ввести <b>"Fla"</b> и сайт подкинет вариант <b>FlaimZ</b> из своего списка. Можно игнорировать подсказки, но если ими пользоваться, в поле автоматически добавляется запятая, которую необходимо удалить, иначе на сайте все будут с запятой в конце.</p><br>
    	<p class="addnewsscan"><b>6.</b> Обязательное поле <b>"Ссылка на скачивание"</b>. Вставить в это поле сслыку на Яндекс.Диск или другой файлообменник.<br><br>
        <p class="addnewsscan">Также можно заполнить остальные необязательные поля, такие как:</p><br>
        <p class="addnewsscan"><b>"Номер тома"</b>- выбор из вариантов "Лимитированная серия", "Одиночный выпуск", "Том 1, 2, 3" и т.д.</p><br>
        <p class="addnewsscan"><b>"Название сюжета"</b> - название сюжетной арки и т.д.</p><br>
        <p class="addnewsscan"><b>"Тайпер"</b> - указать, если комикс тайпил не оформитель. </p><br>
        <p class="addnewsscan"><b>"Редактор"</b> - указать никнеймы редакторов, если они есть.</p><br>	
		<p class="addnewsscan"><b>"Совместно с:"</b> указать, если комикс делался совместно с другой сканлейторской командой.</p><br>
    </td>
		</dd></dl><!-- Spoiler end -->
    </tr>
<br>
    <div class="sep-input clearfix">
        <div class="label">
            <label for="title">Заголовок:</label>
        </div>
        <div class="input">
            <input type="text" id="title" name="title" value="{title}" maxlength="150" placeholder="Введите заголовок" />
        </div>
    </div>

<!--<div class="sep-vote-rel clearfix">
        <div class="clearfix">
            <input class="add-findrel" title="Найти похожие" onclick="find_relates(); return false;" type="button" value="Найти похожие" />
        </div>
        <div id="related_news"></div>
        <div class="addvote" style="display:none;">
        </div>
    </div>-->

    [urltag]
    <div class="sep-input clearfix">
        <div class="label">
            <label for="alt_name">URL статьи:</label>
        </div>
        <div class="input">
            <input type="text" name="alt_name" value="{alt-name}" maxlength="150" placeholder="УРЛ новости" />
        </div>
    </div>
	[/urltag]

    <div class="sep-textarea">
        <div class="textarea-title">Выбор категории: <i>(Обязательно)</i></div>
        {category}
    </div>

    <div class="sep-textarea">
        <div class="textarea-title">Вставить обложку комикса: <i>(Обязательно)</i></div>
        [not-wysywyg]
        <div class="bb-editor">
            {bbcode}
            <textarea name="short_story" id="short_story" onfocus="setFieldName(this.name)" rows="15" class="f_textarea">{short-story}</textarea>
        </div>
        [/not-wysywyg] 
		{shortarea}
    </div>

    <div class="sep-textarea">
        <div class="textarea-title">Описание комикса: <i>(Необязательно)</i></div>
        [not-wysywyg]
        <div class="bb-editor">
            {bbcode}
            <textarea name="full_story" id="full_story" onfocus="setFieldName(this.name)" rows="20" class="f_textarea">{full-story}</textarea>
        </div>
        [/not-wysywyg] 
		{fullarea}
    </div>

    <div class="sep-xfield">
        <div>
            <table class="tableform">{xfields}</table>
        </div>
    </div>

<div class="form-group">
    <label class="control-label col-md-2 col-sm-3">Страницы комикса:</label>
    <div class="col-md-10 col-sm-9">
        <!-- Загрузчик -->
        <button type="button" id="scrinUploadBtn" class="btn btn-success">
            <i class="fa fa-upload"></i> Загрузить страницы
        </button>
        <div id="scrinUploadStatus" style="margin:5px 0;min-height:20px;"></div>
        
        <!-- Основное поле для системы -->
        <input type="hidden" name="scrin" id="scrinHiddenField" value="">
        
        <!-- Поле для визуального редактирования -->
        <textarea class="form-control width-500" rows="5" 
                  id="scrinTextarea" 
                  placeholder="BB-коды страниц будут добавлены автоматически"></textarea>
        
        <!-- Скрипт инициализации -->
        <script>
        // Простейший рабочий вариант
        document.getElementById('scrinUploadBtn').onclick = function() {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            fileInput.style.display = 'none';
            
            fileInput.onchange = function(e) {
                if (!e.target.files.length) return;
                
                const btn = document.getElementById('scrinUploadBtn');
                const status = document.getElementById('scrinUploadStatus');
                btn.disabled = true;
                status.innerHTML = '<span style="color:blue">Подготовка файлов...</span>';
                
                // Имитация загрузки (замените на реальный код)
                setTimeout(() => {
                    let bbCodes = '';
                    for (let i = 0; i < e.target.files.length; i++) {
                        bbCodes += \`[img]https://example.com/page-\${i+1}.jpg[/img]\\n\`;
                    }
                    
                    document.getElementById('scrinTextarea').value = bbCodes;
                    document.getElementById('scrinHiddenField').value = bbCodes;
                    
                    status.innerHTML = '<span style="color:green">Загружено ' + 
                                      e.target.files.length + ' страниц!</span>';
                    btn.disabled = false;
                }, 1000);
            };
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        };
        
        // Синхронизация полей при ручном редактировании
        document.getElementById('scrinTextarea').addEventListener('input', function() {
            document.getElementById('scrinHiddenField').value = this.value;
        });
        </script>
    </div>
</div>

    <div class="sep-input clearfix">
        <div class="label">
            <label for="tags">Ключевые слова:</label>
        </div>
        <div class="input">
            <input type="text" name="tags" id="tags" value="{tags}" maxlength="150" autocomplete="off" />
        </div>
    </div>

    <div class="sep-checks">{admintag}</div>

	[not-group=1]
    <div class="sep-input secur clearfix">
        <div class="label">
            <label>Защита от спама:</label>
        </div>
        <div class="input">
            [question]
            <div class="sec-label"><span>Вопрос:</span><span class="impot">*</span> {question}</div>
            <div class="sec-answer">
                <input type="text" name="question_answer" placeholder="Впишите ответ на вопрос" />
            </div>
            [/question] 
			[sec_code]
            <div class="sec-label">Введите код с картинки:<span class="impot">*</span> </div>
            <div class="sec-capcha clearfix">
                <input type="text" name="sec_code" id="sec_code" maxlength="45" />{sec_code}</div>
            [/sec_code] 
			[recaptcha]
            <div class="sec-label"><span>Введите два слова, показанных на изображении:</span><span class="impot">*</span></div>
            <div>{recaptcha}</div>
            [/recaptcha]
        </div>
    </div>
	[/not-group]

    <div class="sep-submit">
        <button name="add" type="submit">Отправить</button>
        <button name="nview" onclick="preview()" type="submit">Просмотр</button>
    </div>

</div>
        {info}