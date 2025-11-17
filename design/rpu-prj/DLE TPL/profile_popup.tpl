<div class="bg-white rounded-lg border border-gray-200 p-6 max-w-md">
  <div class="flex items-start gap-4 mb-6">
    <div class="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-gray-100">
      <img src="{foto}" alt="{fullname}" class="w-full h-full object-cover" />
    </div>
    
    <div class="flex-1 min-w-0">
      <h3 class="font-extrabold text-[20px] leading-[32px] text-foreground mb-1 truncate">{fullname}</h3>
      <div class="flex items-center gap-2">
        <span class="text-[14px] leading-5 text-gray-500">{status}</span>
        [online]
        <span class="inline-flex items-center gap-1 text-[14px] leading-5 text-green-600">
          <span class="w-2 h-2 rounded-full bg-green-600"></span>
          В сети
        </span>
        [/online]
        [offline]
        <span class="text-[14px] leading-5 text-gray-400">Не в сети</span>
        [/offline]
      </div>
    </div>
  </div>
  
  <div class="space-y-3">
    <div class="flex items-start justify-between text-[14px] leading-5">
      <span class="text-gray-500">Дата посещения:</span>
      <span class="font-medium text-foreground text-right">{lastdate}</span>
    </div>
    <div class="flex items-start justify-between text-[14px] leading-5">
      <span class="text-gray-500">Дата регистрации:</span>
      <span class="font-medium text-foreground text-right">{registration}</span>
    </div>
    <div class="flex items-start justify-between text-[14px] leading-5">
      <span class="text-gray-500">Всего статей:</span>
      <span class="font-medium text-foreground">
        {news-num} 
        <a href="#" class="text-[#fc5621] hover:text-[#e04d1c] transition-colors ml-1">{news}</a>
      </span>
    </div>
    <div class="flex items-start justify-between text-[14px] leading-5">
      <span class="text-gray-500">Комментариев:</span>
      <span class="font-medium text-foreground">
        {comm-num} 
        <a href="#" class="text-[#fc5621] hover:text-[#e04d1c] transition-colors ml-1">{comments}</a>
      </span>
    </div>
  </div>
</div>
