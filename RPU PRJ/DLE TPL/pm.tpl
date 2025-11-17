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
