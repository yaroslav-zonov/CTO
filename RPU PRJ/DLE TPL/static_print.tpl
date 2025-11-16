<!DOCTYPE html>
<html lang="ru">
<head>
<meta content="text/html; charset={charset}" http-equiv="Content-Type">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Версия для печати > {description}</title>
<link href="{THEME}/style/print.css" type="text/css" rel="stylesheet" />
</head>
<body>
	<div class="print-container">
		<div class="print-nav">
			<a href="javascript:history.go(-1)">Вернуться назад</a>
			<button onclick="window.print();">Распечатать</button>
		</div>

		<h1 class="print-title">{description}</h1>

		<div class="print-content">
			{static}
		</div>
	</div>
</body>
</html>
