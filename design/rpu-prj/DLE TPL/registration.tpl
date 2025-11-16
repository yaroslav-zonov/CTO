<div class="form-wrap">
<header class="form-title"><h1>[registration]Регистрация[/registration]
		[validation]Обновление профиля[/validation]</h1></header>

<div class="full-text sep-textarea">		
		[registration]
			<b>Здравствуйте, уважаемый посетитель нашего сайта!</b><br />
			Регистрация на нашем сайте позволит Вам быть его полноценным участником.
			Вы сможете добавлять новости на сайт, оставлять свои комментарии, просматривать скрытый текст и многое другое.
			<br />В случае возникновения проблем с регистрацией, обратитесь к <a href="/index.php?do=feedback">администратору</a> сайта.
		[/registration]
		[validation]
			<b>Уважаемый посетитель,</b><br />
			Ваш аккаунт был зарегистрирован на нашем сайте,
			однако информация о Вас является неполной, поэтому заполните дополнительные поля в Вашем профиле.
		[/validation]
</div>		

[registration]
<div class="sep-input clearfix">
<div class="label"><label for="name">Логин:</label></div>
<div class="input"><input type="text" name="name" id="name" class="f_input" />
	<input class="register-check" title="Проверить доступность логина для регистрации" onclick="CheckLogin(); return false;" type="button" value="Проверить имя" />
</div>
</div>

<div class="sep-textarea" id='result-registration'></div>

<div class="sep-input clearfix">
<div class="label"><label for="password1">Пароль:</label></div>
<div class="input"><input type="password" name="password1" id="password1" class="f_input" /></div>
</div>

<div class="sep-input clearfix">
<div class="label"><label for="password2">Повторите пароль:</label></div>
<div class="input"><input type="password" name="password2" id="password2" class="f_input" /></div>
</div>

<div class="sep-input clearfix">
<div class="label"><label for="email">Ваш E-Mail:</label></div>
<div class="input"><input type="text" name="email" id="email" class="f_input" /></div>
</div>

<div class="sep-input secur clearfix">
<div class="label"><label>Защита от спама:</label></div>
<div class="input">
[question]
<div class="sec-label"><span>Вопрос:</span><span class="impot">*</span> {question}</div>
<div class="sec-answer"><input type="text" name="question_answer" placeholder="Впишите ответ на вопрос" /></div>
[/question]
[sec_code]
<div class="sec-label">Введите код с картинки:<span class="impot">*</span> </div>
<div class="sec-capcha clearfix"><input type="text" name="sec_code" id="sec_code" maxlength="45" />{reg_code}</div>
[/sec_code]
[recaptcha]
<div class="sec-label"><span>Введите два слова, показанных на изображении:</span><span class="impot">*</span></div>
<div>{recaptcha}</div>
[/recaptcha]
</div>
</div>
[/registration]

[validation]
<div class="sep-input clearfix">
<div class="label"><label for="fullname">Ваше Имя:</label></div>
<div class="input"><input type="text" id="fullname" name="fullname" class="f_input" /></div>
</div>

<div class="sep-input clearfix">
<div class="label"><label for="land">Место жительства:</label></div>
<div class="input"><input type="text" id="land" name="land" class="f_input" /></div>
</div>

<div class="sep-input clearfix">
<div class="label"><label for="image">Фото:</label></div>
<div class="input"><input type="file" id="image" name="image" class="f_input" /></div>
</div>

<div class="sep-textarea">
<div class="textarea-title">О себе:</div>
<div><textarea id="info" name="info" rows="8" class="f_textarea" /></textarea></div>
</div>

<div class="sep-xfield">
<div>{xfields}</div>
</div>
[/validation]

<div class="sep-submit">
<button name="submit" class="fbutton" type="submit"><span>Отправить</span></button>
</div>		
		
</div>