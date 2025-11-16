<div class="max-w-md mx-auto px-4 py-8">
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <h1 class="font-extrabold text-[28px] leading-8 text-foreground mb-6">Восстановить пароль</h1>
    
    <form method="post" class="space-y-6">
      <div>
        <label for="lostname" class="block text-[14px] leading-5 font-medium text-foreground mb-2">
          Ваш логин или E-mail
        </label>
        <input 
          type="text" 
          name="lostname" 
          id="lostname"
          placeholder="Введите логин или e-mail"
          class="w-full px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
        />
      </div>
      
      <div>
        <label class="block text-[14px] leading-5 font-medium text-foreground mb-2">
          Защита от спама
        </label>
        <div class="space-y-4">
          [sec_code]
          <div>
            <p class="text-[14px] leading-5 text-gray-600 mb-2">
              Введите код с картинки: <span class="text-red-500">*</span>
            </p>
            <div class="flex items-center gap-4">
              <input 
                type="text" 
                name="sec_code" 
                maxlength="45"
                class="flex-1 px-4 py-2.5 text-[16px] leading-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5621] focus:border-transparent transition-all"
              />
              <div class="flex-shrink-0">
                {code}
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
      
      <button 
        name="submit" 
        type="submit"
        class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#fc5621] px-6 py-3 text-[16px] font-extrabold leading-6 text-white transition-colors hover:bg-[#e04d1c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc5621] focus-visible:ring-offset-2"
      >
        Отправить
      </button>
    </form>
  </div>
</div>
