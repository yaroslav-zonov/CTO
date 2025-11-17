<div class="max-w-[1312px] mx-auto px-4 pt-8 pb-8">
  <h1 class="font-extrabold text-[28px] md:text-[56px] leading-8 md:leading-[64px] text-foreground mb-6">Персональные сообщения</h1>

  <div class="flex items-center gap-2 mb-6 border-b border-gray-200">
    <button class="px-4 py-2 text-[16px] leading-6 font-medium text-foreground border-b-2 border-[#fc5621]" data-tab="inbox">
      [inbox]Входящие[/inbox]
    </button>
    <button class="px-4 py-2 text-[16px] leading-6 font-medium text-gray-500 hover:text-foreground border-b-2 border-transparent" data-tab="outbox">
      [outbox]Отправленные[/outbox]
    </button>
    <button class="px-4 py-2 text-[16px] leading-6 font-medium text-gray-500 hover:text-foreground border-b-2 border-transparent" data-tab="new">
      [new_pm]Создать новое[/new_pm]
    </button>
  </div>
  
  <div class="bg-gray-50 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between mb-2">
      <span class="text-[14px] leading-5 text-gray-600">Папки персональных сообщений заполнены на:</span>
      <span class="text-[14px] leading-5 font-medium text-foreground">{proc-pm-limit}% от лимита ({pm-limit} сообщений)</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      {pm-progress-bar}
    </div>
  </div>
  
  [pmlist]
  <div class="mb-6">
    <h2 class="font-extrabold text-[20px] leading-[32px] text-foreground mb-4">Список сообщений</h2>
    <div class="space-y-2">
      {pmlist}
    </div>
  </div>
  [/pmlist]
  
  [newpm]
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <h2 class="font-extrabold text-[20px] leading-[32px] text-foreground mb-6">Новое сообщение</h2>
    
    <form method="post" class="space-y-6">
      <div>
        <label for="pm_name" class="block text-[14px] leading-5 font-medium text-foreground mb-2">Кому:</label>
        <input 
          type="text" 
          name="name" 
          id="pm_name"
          value="{author}"
          placeholder="Введите имя получателя"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      
      <div>
        <label for="pm_subj" class="block text-[14px] leading-5 font-medium text-foreground mb-2">Тема:</label>
        <input 
          type="text" 
          name="subj" 
          id="pm_subj"
          value="{subj}"
          placeholder="Введите тему сообщения"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      
      <div>
        <label class="block text-[14px] leading-5 font-medium text-foreground mb-2">Ваше письмо:</label>
        <div class="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#fc5621] focus-within:border-transparent transition-all">
          {editor}
        </div>
      </div>
      
      <div class="flex items-center">
        <input 
          type="checkbox" 
          id="outboxcopy" 
          name="outboxcopy" 
          value="1"
          class="w-4 h-4 rounded border-gray-300 text-[#fc5621] focus:ring-[#fc5621] focus:ring-offset-0"
        />
        <label for="outboxcopy" class="ml-2 text-[14px] leading-5 text-gray-600">
          Сохранить сообщение в папке "Отправленные"
        </label>
      </div>
      
      [not-group=1]
      <div>
        <label class="block text-[14px] leading-5 font-medium text-foreground mb-2">Защита от спама</label>
        <div class="space-y-4">
          [question]
          <div>
            <p class="text-[14px] leading-5 text-gray-600 mb-2">
              Вопрос: <span class="text-red-500">*</span> {question}
            </p>
            <input 
              type="text" 
              name="question_answer"
              placeholder="Впишите ответ на вопрос"
              class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
            />
          </div>
          [/question]
          [sec_code]
          <div>
            <p class="text-[14px] leading-5 text-gray-600 mb-2">
              Введите код с картинки: <span class="text-red-500">*</span>
            </p>
            <div class="flex items-center gap-4">
              <input 
                type="text" 
                name="sec_code" 
                id="sec_code" 
                maxlength="45"
                class="flex-1 px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
              />
              <div class="flex-shrink-0">
                {sec_code}
              </div>
            </div>
          </div>
          [/sec_code]
          [recaptcha]
          <div>
            <p class="text-[14px] leading-5 text-gray-600 mb-2">
              Введите два слова, показанных на изображении: <span class="text-red-500">*</span>
            </p>
            <div>
              {recaptcha}
            </div>
          </div>
          [/recaptcha]
        </div>
      </div>
      [/not-group]
      
      <div class="flex items-center gap-4">
        <button 
          type="submit" 
          name="add"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-6 py-2.5 text-[16px] font-extrabold leading-6 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2"
        >
          Отправить
        </button>
        <button 
          type="button" 
          onclick="dlePMPreview()"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-2.5 text-[16px] font-medium leading-6 text-foreground transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
        >
          Просмотр
        </button>
      </div>
    </form>
  </div>
  [/newpm]

  [readpm]
  <div class="mb-6">
    <h2 class="font-extrabold text-[20px] leading-[32px] text-foreground mb-4">Ваши сообщения</h2>
    
    <article class="flex flex-col gap-4 border border-gray-200 rounded-lg p-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          <img src="{foto}" alt="{login}" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <span class="font-extrabold text-[16px] leading-6 text-foreground">{author}</span>
            <span class="text-[14px] leading-5 text-gray-500">{group-name}</span>
            [online]<span class="inline-flex items-center gap-1 text-[14px] leading-5 text-green-600">
              <span class="w-2 h-2 rounded-full bg-green-600"></span>
              В сети
            </span>[/online]
          </div>
          
          <div class="flex items-center gap-3 text-[14px] leading-5 text-gray-500">
            <time datetime="{date}">{date}</time>
            <span>#{comm-num}</span>
          </div>
        </div>
      </div>
      
      <div class="text-[16px] leading-6 text-foreground prose prose-sm max-w-none">
        {text}
      </div>
      
      [signature]
      <div class="text-[14px] leading-5 text-gray-500 border-t border-gray-100 pt-3 mt-2">
        {signature}
      </div>
      [/signature]
      
      <div class="flex items-center gap-4 flex-wrap">
        [reply]
        <button 
          type="button" 
          class="text-[14px] leading-5 font-medium text-foreground hover:text-[#fc5621] transition-colors inline-flex items-center gap-1"
        >
          <span class="material-symbols-outlined" style="font-size: 18px;">reply</span>
          Ответить
        </button>
        [/reply]
        [not-group=5]
        [ignore]
        <button 
          type="button" 
          class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
        >
          Игнор
        </button>
        [/ignore]
        [complaint]
        <button 
          type="button" 
          class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
        >
          Пожаловаться
        </button>
        [/complaint]
        [del]
        <button 
          type="button" 
          class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
        >
          Удалить
        </button>
        [/del]
        [/not-group]
      </div>
    </article>
  </div>
  [/readpm]
</div>
<div class="pm-page">

	<header class="sub-title"><h1>Персональные сообщения</h1></header>

	<ul class="pm_menu">
		<li>[inbox]Входящие[/inbox]</li>
		<li>[outbox]Отправленные[/outbox]</li>
		<li>[new_pm]Создать новое[/new_pm]</li>
	</ul>
	<div class="pm_status">
		<div>Папки персональных сообщений заполнены на:</div>
		{pm-progress-bar}
		{proc-pm-limit}% от лимита ({pm-limit} сообщений)
	</div>
	
	[pmlist]
	<header class="sub-title"><h1>Список сообщений</h1></header>	 
	<div class="pm-lists">{pmlist}</div>
	[/pmlist]
	
	[newpm]
	<div class="form-wrap">
		<header class="form-title"><h1>Новое сообщение</h1></header>	
		<div class="sep-input clearfix">
			<div class="label"><label>Кому:</label></div>
			<div class="input"><input type="text" name="name" placeholder="Кому" value="{author}" /></div>
		</div>
		<div class="sep-input clearfix">
			<div class="label"><label>Тема:</label></div>
			<div class="input"><input type="text" name="subj" placeholder="Тема" value="{subj}" /></div>
		</div>
		<div class="sep-textarea">
			<div class="textarea-title">Ваше письмо:</div>
			<div>{editor}</div>
		</div>
		<div class="sep-checks">
			<input type="checkbox" id="outboxcopy" name="outboxcopy" value="1" /> <label for="outboxcopy">Сохранить сообщение в папке "Отправленные"</label>
		</div>
		[not-group=1]
		<div class="sep-input secur clearfix">
			<div class="label"><label>Защита от спама:</label></div>
			<div class="input">
				[question]
				<div class="sec-label"><span>Вопрос:</span><span class="impot">*</span> {question}</div>
				<div class="sec-answer"><input type="text" name="question_answer" placeholder="Впишите ответ на вопрос" /></div>
				[/question]
				[sec_code]
				<div class="sec-label">Введите код с картинки:<span class="impot">*</span> </div>
				<div class="sec-capcha clearfix"><input type="text" name="sec_code" id="sec_code" maxlength="45" />{sec_code}</div>
				[/sec_code]
				[recaptcha]
				<div class="sec-label"><span>Введите два слова, показанных на изображении:</span><span class="impot">*</span></div>
				<div>{recaptcha}</div>
				[/recaptcha]
			</div>
		</div>
		[/not-group]
		<div class="sep-submit">
			<button type="submit" name="add">Отправить</button>
			<button type="button" onclick="dlePMPreview()">Просмотр</button>
		</div>
	</div>
	[/newpm]

	[readpm]
	<header class="form-title"><h1>Ваши сообщения</h1></header>	
	
<div class="comm-item clearfix">
	<div class="comm-one clearfix[online] status-online[/online]">
		<div class="comm-av img-box"><img src="{foto}" alt="{login}"/></div>
		<div class="comm-meta flex-col">
			<div class="comm-author">{author}</div>
			<div class="comm-group">{group-name}</div>
		</div>
		<div class="comm-meta flex-col">
			<div class="comm-date">{date}</div>
			<div class="comm-num"><span class="fa fa-comment-o"></span> {comm-num}</div>
		</div>
	</div>
	<div class="comm-two">
		<div class="comm-body clearfix">
			{text}
		</div>
		[signature]<div class="signature">{signature}</div>[/signature]
	</div>
	<div class="comm-three">
			<ul class="clearfix">
				<li class="comm-r">[reply]<span class="fa fa-reply"></span>Ответить[/reply]</li>
				[not-group=5]
				<li>[ignore]Игнор[/ignore]</li>
				<li>[complaint]Пожаловаться[/complaint]</li>
				<li>[del]Удалить[/del]</li>
				[/not-group]
			</ul>
	</div>
</div>

	[/readpm]

</div>	
