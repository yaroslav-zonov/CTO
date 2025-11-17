[not-group=5]
<div class="relative inline-block" id="login-box">
  <button 
    type="button" 
    class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
    data-dropdown-trigger
    aria-label="Меню пользователя"
  >
    <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
      <img src="{foto}" title="{login}" alt="{login}" class="w-full h-full object-cover" />
    </div>
    <span class="material-symbols-outlined" style="font-size: 20px;">expand_more</span>
  </button>
  
  <div 
    class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hidden"
    data-dropdown-menu
  >
    <div class="px-4 py-3 border-b border-gray-100">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
          <img src="{foto}" alt="{login}" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-extrabold text-[16px] leading-6 text-foreground truncate">{login}</div>
        </div>
      </div>
      [group=1,2,8]
      <a 
        href="{admin-link}" 
        target="_blank"
        class="inline-flex items-center gap-1 text-[14px] leading-5 text-[#fc5621] hover:text-[#e04d1c] transition-colors font-medium"
      >
        <span class="material-symbols-outlined" style="font-size: 16px;">admin_panel_settings</span>
        Админпанель
      </a>
      [/group]
    </div>
    
    <div class="py-1">
      [group=1,2,3,8]
      <a 
        href="{addnews-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">add_circle</span>
        Добавить комикс
      </a>
      <a 
        href="/reliznaja.html" 
        target="_blank"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">forum</span>
        Релизная
      </a>
      <a 
        href="http://rp-universe.ucoz.ru/forum/" 
        target="_blank"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">groups</span>
        Форум
      </a>
      [/group]
      <a 
        href="{profile-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">person</span>
        Мой профиль
      </a>
      <a 
        href="{pm-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">mail</span>
        Сообщения ({new-pm})
      </a>
      <a 
        href="{favorites-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">bookmark</span>
        Мои закладки ({favorite-count})
      </a>
      <a 
        href="{stats-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">bar_chart</span>
        Статистика
      </a>
      <a 
        href="/?do=lastcomments"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-foreground hover:bg-gray-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">comment</span>
        Последние комментарии
      </a>
    </div>
    
    <div class="border-t border-gray-100 pt-1">
      <a 
        href="{logout-link}"
        class="flex items-center gap-3 px-4 py-2 text-[14px] leading-5 text-red-600 hover:bg-red-50 transition-colors"
      >
        <span class="material-symbols-outlined" style="font-size: 20px;">logout</span>
        Выйти
      </a>
    </div>
  </div>
</div>
[/not-group]
[group=5]
<div class="relative inline-block" id="login-box">
  <button 
    type="button" 
    class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-4 py-2 text-[14px] font-extrabold leading-5 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2"
    data-dropdown-trigger
    aria-label="Войти"
  >
    <span class="material-symbols-outlined" style="font-size: 20px;">person</span>
    Войти
  </button>
  
  <div 
    class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-6 z-50 hidden"
    data-dropdown-menu
  >
    <h3 class="font-extrabold text-[20px] leading-[32px] text-foreground mb-4">Авторизация</h3>
    
    <div class="mb-6">
      <p class="text-[14px] leading-5 text-gray-500 mb-3">Войти через социальные сети:</p>
      <div class="flex items-center gap-3 flex-wrap">
        [vk]<a href="{vk_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/vkontakte.png" alt="VK" class="w-6 h-6" />
        </a>[/vk]
        [odnoklassniki]<a href="{odnoklassniki_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/odnoklassniki.jpg" alt="OK" class="w-6 h-6" />
        </a>[/odnoklassniki]
        [facebook]<a href="{facebook_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/facebook.jpg" alt="Facebook" class="w-6 h-6" />
        </a>[/facebook]
        [google]<a href="{google_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/google.jpg" alt="Google" class="w-6 h-6" />
        </a>[/google]
        [yandex]<a href="{yandex_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/yandex.png" alt="Яндекс" class="w-6 h-6" />
        </a>[/yandex]
        [mailru]<a href="{mailru_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/mailru.gif" alt="Mail.ru" class="w-6 h-6" />
        </a>[/mailru]
      </div>
    </div>
    
    <form method="post" class="space-y-4">
      <div>
        <label for="login_name" class="block text-[14px] leading-5 font-medium text-foreground mb-2">Логин</label>
        <input 
          type="text" 
          name="login_name" 
          id="login_name" 
          placeholder="Введите ваш логин"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      
      <div>
        <label for="login_password" class="block text-[14px] leading-5 font-medium text-foreground mb-2">Пароль</label>
        <input 
          type="password" 
          name="login_password" 
          id="login_password" 
          placeholder="Введите ваш пароль"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      
      <div class="flex items-center">
        <input 
          type="checkbox" 
          name="login_not_save" 
          id="login_not_save" 
          value="1"
          class="w-4 h-4 rounded border-gray-300 text-[#fc5621] focus:ring-[#fc5621] focus:ring-offset-0"
        />
        <label for="login_not_save" class="ml-2 text-[14px] leading-5 text-gray-600">Чужой компьютер</label>
      </div>
      
      <button 
        onclick="submit();" 
        type="submit"
        class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-6 py-2.5 text-[16px] font-extrabold leading-6 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2"
      >
        Войти на сайт
      </button>
      <input name="login" type="hidden" id="login" value="submit" />
      
      <div class="flex items-center justify-between pt-2 text-[14px] leading-5">
        <a href="{lostpassword-link}" class="text-[#fc5621] hover:text-[#e04d1c] transition-colors">Забыли пароль?</a>
        <a href="/?do=register" class="text-[#fc5621] hover:text-[#e04d1c] transition-colors">Регистрация</a>
      </div>
    </form>
  </div>
</div>
﻿[not-group=5]
	<div class="login-box" id="login-box" title="{login}">
		<div class="login-avatar">
				<div class="avatar-box" id="avatar-box">
					<img src="{foto}" title="{login}" alt="{login}" />
				</div>
				[group=1,2,8]<a href="{admin-link}" target="_blank">Админпанель</a>[/group]
		</div>
		<ul class="login-menu">
						[group=1,2,3,8]<li><a href="{addnews-link}">Добавить комикс</a></li>[/group]
            			[group=1,2,3,8]<li><a href="/reliznaja.html" target="_blank">Релизная</a></li>[/group]
            			[group=1,2,3,8]<li><a href="http://rp-universe.ucoz.ru/forum/" target="_blank">Форум</a></li>[/group]
						<li><a href="{profile-link}">Мой профиль</a></li>
						<li><a href="{pm-link}">Сообщения: ({new-pm})</a></li>
						<li><a href="{favorites-link}">Мои закладки ({favorite-count})</a></li>
						<li><a href="{stats-link}">Статистика</a></li>
						<li><a href="/?do=lastcomments">Последние комментарии</a></li>
						<li><a href="{logout-link}">Выйти</a></li>
		</ul>
	</div>
[/not-group]
[group=5]
	<div class="login-box" id="login-box" title="Авторизация">
		<div class="login-social clearfix">
						[vk]<a href="{vk_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/vkontakte.png" /></a>[/vk]
						[odnoklassniki]<a href="{odnoklassniki_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/odnoklassniki.jpg" /></a>[/odnoklassniki]
						[facebook]<a href="{facebook_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/facebook.jpg" /></a>[/facebook]
						[google]<a href="{google_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/google.jpg" /></a>[/google]
						[yandex]<a href="{yandex_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/yandex.png" /></a>[/yandex]
            			[mailru]<a href="{mailru_url}" target="_blank" rel="nofollow"><img src="{THEME}/images/social/mailru.gif" /></a>[/mailru]
		</div>
		<div class="login-form">
			<form method="post">
				<div class="login-input">
					<input type="text" name="login_name" id="login_name" placeholder="Ваш логин"/>
				</div>
				<div class="login-input">
					<input type="password" name="login_password" id="login_password" placeholder="Ваш пароль" />
				</div>
				<div class="login-button">
					<button onclick="submit();" type="submit" title="Вход">Войти на сайт</button>
					<input name="login" type="hidden" id="login" value="submit" />
				</div>
				<div class="login-checkbox">
					<input type="checkbox" name="login_not_save" id="login_not_save" value="1"/>
					<label for="login_not_save">&nbsp;Чужой компьютер</label> 
				</div>
				<div class="login-links clearfix">
					<a href="{lostpassword-link}">Забыли пароль?</a>
					<a href="/?do=register" class="log-register">Регистрация</a>
				</div>
			</form>
		</div>
				
	</div>
																															
[/group]
