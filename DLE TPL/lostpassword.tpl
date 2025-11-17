<div class="form-wrap">
<header class="form-title"><h1>Восстановить пароль</h1></header>

<div class="sep-input clearfix">
<div class="label"><label>Ваш логин:</label></div>
<div class="input"><input type="text" name="lostname" placeholder="Ваш логин или E-Mail на сайте" /></div>
</div>

<div class="sep-input secur clearfix">
<div class="label"><label>Защита от спама:</label></div>
<div class="input">
[sec_code]
<div class="sec-label">Введите код с картинки:<span class="impot">*</span> </div>
<div class="sec-capcha clearfix"><input type="text" name="sec_code" maxlength="45" />{code}</div>
[/sec_code]
[recaptcha]
<div class="sec-label"><span>Введите два слова, показанных на изображении:</span><span class="impot">*</span></div>
<div>{recaptcha}</div>
[/recaptcha]
</div>
</div>

<div class="sep-submit">
<button name="submit" class="fbutton" type="submit"><span>Отправить</span></button>
</div>

</div>
