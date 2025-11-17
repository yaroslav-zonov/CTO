<div class="form-wrap">
	<header class="form-title"><h1>Статистика сайта</h1></header>			
	<div class="sep-textarea">
							<ul class="statsbox">
								<li>За сутки: <b>{news_day}</b> комиксов, <b>{comm_day}</b> комментариев и <b>{user_day}</b> пользователей</li>
								<li>За неделю: <b>{news_week}</b> комиксов, <b>{comm_week}</b> комментариев и <b>{user_week}</b> пользователей</li>
								<li>За месяц: <b>{news_month}</b> комиксов, <b>{comm_month}</b> комментариев и <b>{user_month}</b> пользователей</li>
							</ul>
	</div>
	<div class="sep-textarea clearfix statistics">
								<ul class="stat-list">
									<li><h4>Комиксы:</h4></li>
									<li>Общее кол-во: <b>{news_num}</b></li>
									<li>В релизной: <b>{news_moder}</b></li>
								</ul>
								<ul class="stat-list">
									<li><h4>Пользователи:</h4></li>
									<li>Общее кол-во: <b>{user_num}</b></li>
									<li>Из них забанено: <b>{user_banned}</b></li>
								</ul>
								<ul class="stat-list">
									<li><h4>Комментарии:</h4></li>
									<li>Общее кол-во: <b>{comm_num}</b></li>
									<li><a href="/?do=lastcomments">Посмотреть последние</a></li>
								</ul>
	</div>
	<div class="sep-textarea">
		<header class="form-title"><h1>ТОП участников команды по добавлению комиксов на сайт</h1></header>
		<table width="100%" class="userstop">{topusers}</table>
	</div>
</div>