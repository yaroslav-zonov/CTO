<!DOCTYPE html>
<html lang="ru">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8">
	<title>Сайт временно отключен</title>
	<link rel="shortcut icon" href="{THEME}/images/favicon.png" />
	<link rel="stylesheet" type="text/css" href="{THEME}/style/offline.css" />
</head>

<body>
	<div class="offline-container">
		<div class="offline-card">
			<div class="offline-icon">
				<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
				</svg>
			</div>

			<div class="offline-content">
				<h1 class="offline-title">Технические работы</h1>
				<p class="offline-subtitle">Сайт временно недоступен</p>

				<div class="offline-message">
					{reason}
				</div>

				<p class="offline-footer">Приносим извинения за временные неудобства</p>
			</div>
		</div>
	</div>
</body>
</html>
