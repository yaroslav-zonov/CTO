[aviable=lastcomments]<div class="text-[16px] font-normal leading-6 mb-2 text-foreground">{news_title}</div>[/aviable]

<article class="flex flex-col gap-4 border-b border-gray-200 pb-6 mb-6">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-100">
      <img src="{foto}" alt="{login}" class="w-full h-full object-cover" />
    </div>
    
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1 flex-wrap">
        <span class="font-extrabold text-[16px] leading-6 text-foreground">{author}</span>
        <span class="text-[14px] leading-5 text-gray-500">{group-name}</span>
        [online]<span class="inline-flex items-center gap-1 text-[14px] leading-5 text-green-600">
          <span class="w-2 h-2 rounded-full bg-green-600"></span>
          В сети
        </span>[/online]
      </div>
      
      <div class="flex items-center gap-3 text-[14px] leading-5 text-gray-500">
        <time datetime="{date}">{date}</time>
        <span>#{comm-num}</span>
        [rating-type-3]
        <span class="flex items-center gap-1">
          <span class="font-medium text-foreground">{rating}</span>
        </span>
        [/rating-type-3]
      </div>
    </div>
    
    [rating-type-3]
    <div class="flex items-center gap-2 ml-auto">
      [rating-plus]
      <button 
        type="button" 
        class="p-1.5 hover:bg-gray-100 rounded transition-colors"
        aria-label="Положительная оценка"
      >
        <span class="material-symbols-outlined" style="font-size: 20px; color: #10b981;">add</span>
      </button>
      [/rating-plus]
      [rating-minus]
      <button 
        type="button" 
        class="p-1.5 hover:bg-gray-100 rounded transition-colors"
        aria-label="Отрицательная оценка"
      >
        <span class="material-symbols-outlined" style="font-size: 20px; color: #ef4444;">remove</span>
      </button>
      [/rating-minus]
    </div>
    [/rating-type-3]
  </div>
  
  <div class="text-[16px] leading-6 text-foreground prose prose-sm max-w-none">
    {comment}
  </div>
  
  [signature]
  <div class="text-[14px] leading-5 text-gray-500 border-t border-gray-100 pt-3 mt-2">
    {signature}
  </div>
  [/signature]
  
  <div class="flex items-center gap-4 flex-wrap">
    [not-aviable=lastcomments]
    [not-treecomments]
    [reply]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-foreground hover:text-[#fc5621] transition-colors inline-flex items-center gap-1"
    >
      <span class="material-symbols-outlined" style="font-size: 18px;">reply</span>
      Ответить
    </button>
    [/reply]
    [/not-treecomments]
    [fast]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-foreground hover:text-[#fc5621] transition-colors inline-flex items-center gap-1"
    >
      <span class="material-symbols-outlined" style="font-size: 18px;">format_quote</span>
      Цитата
    </button>
    [/fast]
    [/not-aviable]
    [not-group=5]
    [spam]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
    >
      Спам
    </button>
    [/spam]
    [complaint]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
    >
      Пожаловаться
    </button>
    [/complaint]
    [com-edit]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
    >
      Редактировать
    </button>
    [/com-edit]
    [com-del]
    <button 
      type="button" 
      class="text-[14px] leading-5 font-medium text-gray-500 hover:text-[#fc5621] transition-colors"
    >
      Удалить
    </button>
    [/com-del]
    {mass-action}
    [/not-group]
  </div>
</article>
