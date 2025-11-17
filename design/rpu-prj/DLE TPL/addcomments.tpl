<div class="border border-gray-200 rounded-lg p-6 mb-8" id="add-comm-form">
  <div class="flex items-center justify-between mb-6">
    <h3 class="font-extrabold text-[20px] leading-[32px] text-foreground">Прокомментировать</h3>
    <button 
      type="button" 
      class="text-gray-500 hover:text-foreground transition-colors" 
      data-toggle="comment-form"
      aria-label="Свернуть/развернуть форму"
    >
      <span class="material-symbols-outlined" style="font-size: 24px;">expand_more</span>
    </button>
  </div>
  
  <div class="comment-form-content" data-form-body>
    [not-logged]
    [vk]
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
        [mailru]<a href="{mailru_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/mailru.gif" alt="Mail.ru" class="w-6 h-6" />
        </a>[/mailru]
        [yandex]<a href="{yandex_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/yandex.png" alt="Яндекс" class="w-6 h-6" />
        </a>[/yandex]
        [google]<a href="{google_url}" target="_blank" rel="nofollow" class="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:border-[#fc5621] transition-colors">
          <img src="{THEME}/images/social/google.jpg" alt="Google" class="w-6 h-6" />
        </a>[/google]
      </div>
    </div>
    [/vk]
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label for="name" class="block text-[14px] leading-5 font-medium text-foreground mb-2">Ваше имя</label>
        <input 
          type="text" 
          maxlength="35" 
          name="name" 
          id="name" 
          placeholder="Введите ваше имя"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      <div>
        <label for="mail" class="block text-[14px] leading-5 font-medium text-foreground mb-2">E-mail (необязательно)</label>
        <input 
          type="text" 
          maxlength="35" 
          name="mail" 
          id="mail" 
          placeholder="Введите ваш e-mail"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
    </div>
    [/not-logged]
    
    <div class="mb-4">
      <label class="block text-[14px] leading-5 font-medium text-foreground mb-2">Комментарий</label>
      <div class="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#fc5621] focus-within:border-transparent transition-all">
        {editor}
      </div>
    </div>
    
    [not-group=1]
    <div class="space-y-4 mb-6">
      [question]
      <div>
        <label for="question_answer" class="block text-[14px] leading-5 font-medium text-foreground mb-2">
          Вопрос: <span class="text-red-500">*</span>
        </label>
        <p class="text-[14px] leading-5 text-gray-600 mb-2">{question}</p>
        <input 
          type="text" 
          name="question_answer" 
          id="question_answer" 
          placeholder="Впишите ответ на вопрос"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      [/question]
      [sec_code]
      <div>
        <label for="sec_code" class="block text-[14px] leading-5 font-medium text-foreground mb-2">
          Введите код с картинки: <span class="text-red-500">*</span>
        </label>
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
        <label class="block text-[14px] leading-5 font-medium text-foreground mb-2">
          Введите два слова, показанных на изображении: <span class="text-red-500">*</span>
        </label>
        <div>
          {recaptcha}
        </div>
      </div>
      [/recaptcha]
    </div>
    [/not-group]
    
    <div class="flex items-center gap-4">
      <button 
        name="submit" 
        type="submit"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-6 py-2.5 text-[16px] font-extrabold leading-6 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        Отправить
      </button>
    </div>
  </div>
</div>
