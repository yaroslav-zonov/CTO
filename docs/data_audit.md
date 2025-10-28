# Аудит данных DLE для миграции в Supabase

## Обзор

Данный документ содержит полный аудит CSV-экспортов из DataLife Engine (DLE), включающий структуру таблиц, их взаимосвязи, описание полей и рекомендации по миграции данных в Supabase.

**Дата экспорта:** 2025-10-28 16:39  
**Общее количество файлов:** 61 CSV файл  
**Общий объем данных:** ~14 МБ

---

## 1. Инвентаризация CSV-файлов

### 1.1 Основные таблицы сущностей (Core Entities)

| Файл | Записей | Назначение |
|------|---------|------------|
| `dle_post_202510281639.csv` | 14,139 | Основная таблица постов (комиксов) |
| `dle_post_extras_202510281639.csv` | 7,692 | Расширенные метаданные постов |
| `dle_post_extras_cats_202510281639.csv` | 7,680 | Связь постов с категориями (many-to-many) |
| `dle_category_202510281639.csv` | 1,005 | Иерархия категорий (издатели/серии) |
| `dle_xfsearch_202510281639.csv` | 29,747 | Индекс пользовательских полей для поиска |
| `dle_images_202510281639.csv` | 7,655 | Галереи изображений для постов |
| `dle_users_202510281639.csv` | 606 | Учетные записи пользователей |
| `dle_usergroups_202510281639.csv` | - | Группы пользователей и права доступа |
| `dle_tags_202510281639.csv` | 45 | Теги постов |
| `dle_comments_202510281639.csv` | 173 | Комментарии к постам |

### 1.2 Статические страницы и контент

| Файл | Записей | Назначение |
|------|---------|------------|
| `dle_static_202510281639.csv` | 15 | Статические страницы (правила, хронологии) |
| `dle_metatags_202510281639.csv` | - | SEO метатеги |
| `dle_redirects_202510281639.csv` | 254 | Перенаправления URL |

### 1.3 Вспомогательные таблицы

| Файл | Записей | Назначение |
|------|---------|------------|
| `dle_vote_202510281639.csv` | - | Опросы/голосования |
| `dle_vote_result_202510281639.csv` | - | Результаты голосований |
| `m_rating_202510281639.csv` | - | Пользовательские рейтинги постов |
| `dle_pm_202510281639.csv` | - | Личные сообщения пользователей |
| `dle_social_login_202510281639.csv` | 407 | Привязки социальных сетей |

### 1.4 Технические/служебные таблицы (для исключения)

| Файл | Записей | Назначение |
|------|---------|------------|
| `dle_admin_logs_202510281639.csv` | 16,009 | Логи административных действий |
| `dle_logs_202510281639.csv` | 15,392 | Общие логи системы |
| `dle_email_202510281639.csv` | 194 | Email уведомления |
| `dle_banned_202510281639.csv` | - | Забанены пользователи/IP |
| `dle_flood_202510281639.csv` | - | Защита от флуда |
| `dle_spam_log_202510281639.csv` | - | Логи спама |
| `dle_login_log_202510281639.csv` | - | Логи входов в систему |
| `dle_mail_log_202510281639.csv` | - | Логи отправки почты |
| `dle_sendlog_202510281639.csv` | - | Логи массовых рассылок |
| `dle_plugins_*` | - | Данные плагинов DLE |
| `dle_banners_*` | - | Баннеры и их статистика |
| `dle_rss_*` | - | RSS-каналы (специфика DLE) |

---

## 2. Детальное описание основных таблиц

### 2.1 dle_post (Посты комиксов)

**Количество записей:** 14,139  
**Основная сущность:** Комикс/выпуск

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | Уникальный идентификатор поста | ✅ PRIMARY KEY |
| `autor` | VARCHAR | Имя автора поста (не переводчика) | ✅ Сохранить |
| `date` | DATETIME | Дата публикации | ✅ Сохранить |
| `short_story` | TEXT | Краткое описание (HTML с превью-изображением) | ✅ Сохранить |
| `full_story` | TEXT | Полное описание комикса (HTML) | ✅ Сохранить |
| `xfields` | TEXT | **Критически важно**: Сериализованные пользовательские поля | ✅ Распарсить |
| `title` | VARCHAR | Название выпуска | ✅ Сохранить |
| `descr` | TEXT | Мета-описание для SEO | ✅ Сохранить |
| `keywords` | TEXT | Ключевые слова для SEO | ✅ Сохранить |
| `category` | VARCHAR | ID категорий через запятую | 🔄 Использовать post_extras_cats |
| `alt_name` | VARCHAR | ЧПУ URL (человеко-читаемый slug) | ✅ Сохранить |
| `comm_num` | INT | Количество комментариев | 🔄 Вычислять динамически |
| `allow_comm` | TINYINT | Разрешить комментарии | ❌ DLE-специфика |
| `allow_main` | TINYINT | Показывать на главной | ❌ DLE-специфика |
| `approve` | TINYINT | Публикация одобрена | ❌ DLE workflow |
| `fixed` | TINYINT | Закрепить пост | ❌ DLE-специфика |
| `allow_br` | TINYINT | Разрешить переносы строк | ❌ DLE форматирование |
| `symbol` | VARCHAR | Защитный символ | ❌ DLE технический |
| `tags` | VARCHAR | Теги (через запятую) | 🔄 Использовать dle_tags |
| `metatitle` | VARCHAR | Мета-заголовок | ✅ Сохранить |
| `m_rating` | TEXT | Сериализованные оценки | ✅ Распарсить или игнорировать |
| `scrin` | VARCHAR | Скриншоты | ✅ Проверить содержимое |

#### Формат xfields (пользовательские поля):

```
volume|Том 6||story|Secrets and Origins||perevodchik|Getuerk||oformlenie|Тигра||redaktor|Filis, Xailex||download|https://yadi.sk/d/...||reader|
```

**Структура:** `fieldname|value||fieldname2|value2||...`

**Ключевые поля xfields:**
- `volume` - Номер тома
- `story` - Название сюжетной арки
- `perevodchik` - Переводчик(и)
- `oformlenie` - Оформитель(и)
- `taiper` - Наборщик текста
- `redaktor` - Редактор(ы)
- `download` - Ссылка на скачивание
- `reader` - Ссылка на онлайн-читалку
- `status` - Статус перевода (в категориях)
- `number-com` - Количество комиксов в серии

**Критически важно:** xfields содержат всю информацию о команде переводчиков и ссылках на контент!

---

### 2.2 dle_post_extras (Расширенные данные постов)

**Количество записей:** 7,692  
**Связь:** 1:1 с dle_post через `news_id`

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `eid` | INT | ID записи | - |
| `news_id` | INT | ID поста | ✅ FOREIGN KEY |
| `news_read` | INT | Количество просмотров | ✅ Сохранить |
| `allow_rate` | TINYINT | Разрешить рейтинг | ❌ DLE-специфика |
| `rating` | INT | Рейтинг поста | ✅ Сохранить |
| `vote_num` | INT | Количество голосов | ✅ Сохранить |
| `votes` | TEXT | Сериализованные голоса | ❌ DLE технический |
| `view_edit` | TINYINT | Показывать историю правок | ❌ DLE UI |
| `disable_index` | TINYINT | Запретить индексацию | ❌ DLE SEO |
| `related_ids` | VARCHAR | Связанные посты (через запятую) | ✅ Сохранить как связи |
| `access` | VARCHAR | Группы доступа | 🔄 Переделать в Supabase RLS |
| `editdate` | INT | Дата последнего редактирования | ✅ Сохранить |
| `editor` | VARCHAR | Имя редактора | ✅ Сохранить |
| `reason` | TEXT | Причина редактирования | ✅ Сохранить |
| `user_id` | INT | ID автора | ✅ Сохранить |
| `disable_search` | TINYINT | Исключить из поиска | ❌ DLE-специфика |
| `need_pass` | TINYINT | Требуется пароль | ❌ DLE-специфика |
| `allow_rss` | TINYINT | Разрешить в RSS | ❌ DLE RSS |
| `allow_rss_turbo` | TINYINT | Яндекс.Турбо | ❌ DLE RSS |
| `allow_rss_dzen` | TINYINT | Яндекс.Дзен | ❌ DLE RSS |
| `edited_now` | VARCHAR | Блокировка редактирования | ❌ DLE технический |

---

### 2.3 dle_post_extras_cats (Связь постов и категорий)

**Количество записей:** 7,680  
**Тип:** Junction table (Many-to-Many)

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID записи | - |
| `news_id` | INT | ID поста | ✅ FOREIGN KEY → posts |
| `cat_id` | INT | ID категории | ✅ FOREIGN KEY → categories |

**Важно:** Эта таблица обеспечивает many-to-many связь между постами и категориями. Один пост может быть в нескольких категориях.

---

### 2.4 dle_category (Категории/Издатели/Серии)

**Количество записей:** 1,005  
**Структура:** Иерархическое дерево через `parentid`

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID категории | ✅ PRIMARY KEY |
| `parentid` | INT | ID родительской категории (0 = корень) | ✅ Сохранить (self-reference) |
| `posi` | INT | Порядок сортировки | ✅ Сохранить |
| `name` | VARCHAR | Название категории | ✅ Сохранить |
| `alt_name` | VARCHAR | ЧПУ URL | ✅ Сохранить |
| `icon` | VARCHAR | Иконка категории | ✅ Сохранить |
| `skin` | VARCHAR | Шаблон оформления | ❌ DLE themes |
| `descr` | TEXT | Краткое описание | ✅ Сохранить |
| `keywords` | TEXT | Ключевые слова | ✅ Сохранить |
| `news_sort` | VARCHAR | Поле сортировки | ❌ DLE UI |
| `news_msort` | VARCHAR | Порядок сортировки | ❌ DLE UI |
| `news_number` | INT | Количество новостей на странице | ❌ DLE UI |
| `short_tpl` | VARCHAR | Шаблон превью | ❌ DLE themes |
| `full_tpl` | VARCHAR | Шаблон полного поста | ❌ DLE themes |
| `metatitle` | VARCHAR | SEO заголовок | ✅ Сохранить |
| `show_sub` | TINYINT | Показывать подкатегории | ❌ DLE UI |
| `allow_rss` | TINYINT | Разрешить RSS | ❌ DLE RSS |
| `fulldescr` | TEXT | Полное описание категории | ✅ Сохранить |
| `disable_search` | TINYINT | Исключить из поиска | ❌ DLE-специфика |
| `disable_main` | TINYINT | Не показывать на главной | ❌ DLE-специфика |
| `disable_rating` | TINYINT | Запретить рейтинг | ❌ DLE-специфика |
| `disable_comments` | TINYINT | Запретить комментарии | ❌ DLE-специфика |
| `xfields` | TEXT | Пользовательские поля категории | ✅ Распарсить |
| `enable_dzen` | TINYINT | Яндекс.Дзен | ❌ DLE RSS |
| `enable_turbo` | TINYINT | Яндекс.Турбо | ❌ DLE RSS |
| `active` | TINYINT | Категория активна | ✅ Сохранить |
| `rating_type` | VARCHAR | Тип рейтинга | ❌ DLE-специфика |
| `schema_org` | VARCHAR | Schema.org разметка | ✅ Сохранить |

**Иерархия категорий:**
```
Marvel (id=1, parentid=0)
  ├─ Amazing Spider-Man (1963) (id=9, parentid=1)
  ├─ Venom (id=147, parentid=1)
  └─ Superboy (id=210, parentid=1)
DC (id=2, parentid=0)
  └─ ...
Dark Horse (id=3, parentid=0)
Image (id=4, parentid=0)
```

---

### 2.5 dle_xfsearch (Индекс пользовательских полей)

**Количество записей:** 29,747  
**Назначение:** Денормализованная таблица для быстрого поиска по xfields

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID записи | - |
| `news_id` | INT | ID поста | ✅ FOREIGN KEY |
| `tagname` | VARCHAR | Имя поля (perevodchik, oformlenie, etc.) | ✅ Использовать для индексации |
| `tagvalue` | VARCHAR | Значение поля | ✅ Сохранить |

**Важно:** В Supabase можно заменить на нормализованные таблицы:
- `post_translators` (perevodchik)
- `post_designers` (oformlenie)
- `post_typists` (taiper)
- `post_editors` (redaktor)

---

### 2.6 dle_images (Галереи изображений)

**Количество записей:** 7,655

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID записи | - |
| `images` | TEXT | Список изображений через `|||` | ✅ Распарсить и нормализовать |
| `news_id` | INT | ID поста | ✅ FOREIGN KEY |
| `author` | VARCHAR | Автор загрузки | ✅ Сохранить |
| `date` | INT | Timestamp загрузки | ✅ Сохранить |

**Формат images:**
```
2019-02/1550310040_2551.jpg|||2019-12/1577616114_1549138332_0_98548700.jpg
```

**Критически важно:** Изображения обложек комиксов! Нужно:
1. Распарсить строку по разделителю `|||`
2. Создать отдельные записи для каждого изображения
3. Мигрировать файлы в Supabase Storage
4. Обновить пути в базе данных

---

### 2.7 dle_users (Пользователи)

**Количество записей:** 606

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `email` | VARCHAR | Email (уникальный) | ✅ Сохранить |
| `password` | VARCHAR | Хеш пароля (bcrypt) | ⚠️ Потребуется повторная аутентификация |
| `name` | VARCHAR | Логин пользователя | ✅ Сохранить |
| `user_id` | INT | ID пользователя | ✅ PRIMARY KEY |
| `news_num` | INT | Количество постов | 🔄 Вычислять динамически |
| `comm_num` | INT | Количество комментариев | 🔄 Вычислять динамически |
| `user_group` | INT | ID группы пользователя | 🔄 Преобразовать в Supabase roles |
| `lastdate` | INT | Timestamp последнего визита | ✅ Сохранить |
| `reg_date` | INT | Timestamp регистрации | ✅ Сохранить |
| `banned` | VARCHAR | Статус бана | ✅ Сохранить |
| `allow_mail` | TINYINT | Разрешить email уведомления | ✅ Сохранить |
| `info` | TEXT | Информация о себе | ✅ Сохранить |
| `signature` | TEXT | Подпись в комментариях | ✅ Сохранить |
| `foto` | VARCHAR | Аватар пользователя | ✅ Мигрировать в Storage |
| `fullname` | VARCHAR | Полное имя | ✅ Сохранить |
| `land` | VARCHAR | Страна/город | ✅ Сохранить |
| `favorites` | TEXT | Избранное (список ID) | ✅ Нормализовать в отдельную таблицу |
| `pm_all` | INT | Количество личных сообщений | 🔄 Вычислять динамически |
| `pm_unread` | INT | Непрочитанных сообщений | 🔄 Вычислять динамически |
| `time_limit` | INT | Ограничение времени (сессия) | ❌ DLE технический |
| `xfields` | TEXT | Дополнительные поля пользователя | ✅ Распарсить |
| `allowed_ip` | VARCHAR | Разрешенные IP | ❌ DLE безопасность |
| `hash` | VARCHAR | Хеш сессии | ❌ DLE технический |
| `logged_ip` | VARCHAR | IP последнего входа | ✅ Сохранить для аудита |
| `restricted` | TINYINT | Ограничен | ✅ Сохранить |
| `restricted_days` | INT | Дней ограничения | ✅ Сохранить |
| `restricted_date` | INT | Дата окончания ограничения | ✅ Сохранить |
| `timezone` | VARCHAR | Часовой пояс | ✅ Сохранить |
| `news_subscribe` | TINYINT | Подписка на новости | ✅ Сохранить |
| `comments_reply_subscribe` | TINYINT | Подписка на ответы | ✅ Сохранить |
| `twofactor_auth` | TINYINT | 2FA включен | ❌ Использовать Supabase Auth |
| `cat_add` | TEXT | Категории, где может добавлять | ✅ Сохранить |
| `cat_allow_addnews` | TEXT | Разрешенные категории | ✅ Сохранить |

**Важно по паролям:** 
- DLE использует bcrypt ($2y$10$...), совместимый с современными системами
- Supabase Auth не поддерживает прямой импорт паролей
- Решение: Миграция через временные пароли или сброс паролей для всех пользователей

---

### 2.8 dle_comments (Комментарии)

**Количество записей:** 173

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID комментария | ✅ PRIMARY KEY |
| `post_id` | INT | ID поста | ✅ FOREIGN KEY |
| `user_id` | INT | ID пользователя (0 = гость) | ✅ FOREIGN KEY (nullable) |
| `date` | DATETIME | Дата комментария | ✅ Сохранить |
| `autor` | VARCHAR | Имя автора | ✅ Сохранить |
| `email` | VARCHAR | Email (для гостей) | ✅ Сохранить |
| `text` | TEXT | Текст комментария (HTML) | ✅ Сохранить |
| `ip` | VARCHAR | IP адрес | ✅ Сохранить для модерации |
| `is_register` | TINYINT | Зарегистрированный пользователь | 🔄 Вычислять по user_id |
| `approve` | TINYINT | Одобрен модератором | ❌ DLE workflow |
| `rating` | INT | Рейтинг комментария | ✅ Сохранить |
| `vote_num` | INT | Количество голосов | ✅ Сохранить |
| `parent` | INT | ID родительского комментария (threading) | ✅ Сохранить (self-reference) |

**Важно:** Комментарии поддерживают древовидную структуру через поле `parent`.

---

### 2.9 dle_tags (Теги)

**Количество записей:** 45

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID записи | - |
| `news_id` | INT | ID поста | ✅ FOREIGN KEY |
| `tag` | VARCHAR | Название тега | ✅ Нормализовать в таблицу tags |

**Рекомендация:** Создать отдельную таблицу `tags` и junction table `post_tags`.

---

### 2.10 dle_static (Статические страницы)

**Количество записей:** 15

#### Структура полей:

| Поле | Тип | Описание | Миграция |
|------|-----|----------|----------|
| `id` | INT | ID страницы | ✅ PRIMARY KEY |
| `name` | VARCHAR | URL slug страницы | ✅ Сохранить |
| `descr` | TEXT | Краткое описание | ✅ Сохранить |
| `template` | TEXT | HTML контент страницы | ✅ Сохранить |
| `allow_br` | TINYINT | Разрешить переносы | ❌ DLE форматирование |
| `allow_template` | TINYINT | Разрешить PHP-шаблоны | ❌ DLE технический |
| `grouplevel` | VARCHAR | Группы доступа | 🔄 Переделать в RLS |
| `tpl` | VARCHAR | Файл шаблона | ❌ DLE themes |
| `metadescr` | TEXT | SEO описание | ✅ Сохранить |
| `metakeys` | TEXT | SEO ключевые слова | ✅ Сохранить |
| `views` | INT | Количество просмотров | ✅ Сохранить |
| `template_folder` | VARCHAR | Папка шаблона | ❌ DLE themes |
| `date` | INT | Дата создания | ✅ Сохранить |
| `metatitle` | VARCHAR | SEO заголовок | ✅ Сохранить |
| `allow_count` | TINYINT | Считать просмотры | ❌ DLE-специфика |
| `sitemap` | TINYINT | Включить в sitemap | ✅ Сохранить |
| `disable_index` | TINYINT | Запретить индексацию | ❌ DLE SEO |
| `disable_search` | TINYINT | Исключить из поиска | ❌ DLE-специфика |
| `password` | VARCHAR | Пароль доступа | ❌ DLE-специфика |

**Примеры статических страниц:**
- `dle-rules-page` - Правила сайта
- `absolute-carnage` - Хронология "Абсолютной резни"
- `cataclysm` - Хронология "Катаклизма"

---

## 3. Карта связей между таблицами

### 3.1 Текстовая диаграмма связей

```
┌─────────────────┐
│   dle_users     │
│  (606 records)  │
└────────┬────────┘
         │ 1
         │
         │ N
┌────────▼────────────────────────────────────────────┐
│              dle_post (Posts/Comics)                │
│                  (14,139 records)                   │
│                                                     │
│  • id (PK)                                          │
│  • autor (author name)                              │
│  • title, short_story, full_story                   │
│  • xfields (volume, translator, download links)     │
│  • date, alt_name                                   │
└───┬─────────────┬──────────────┬──────────────┬────┘
    │ 1           │ 1            │ 1            │ N
    │             │              │              │
    │ 1           │ 1            │ N            │ N
┌───▼────────┐┌───▼────────┐┌───▼────────┐┌───▼────────┐
│dle_post_   ││dle_images  ││ dle_post_  ││  dle_tags  │
│  extras    ││ (7,655)    ││ extras_cats││   (45)     │
│  (7,692)   ││            ││  (7,680)   ││            │
│            ││ • images   ││            ││ • tag      │
│ • rating   ││   (|||-    ││ • news_id  ││            │
│ • views    ││    delim)  ││ • cat_id   ││            │
│ • related  ││ • date     │└─────┬──────┘└────────────┘
│   _ids     ││ • author   │      │ N
│ • editor   │└────────────┘      │
│ • editdate │                    │ 1
└────────────┘            ┌───────▼────────────────────┐
                          │    dle_category            │
                          │     (1,005 records)        │
                          │                            │
                          │  • id (PK)                 │
                          │  • parentid (self-ref FK)  │
                          │  • name (Marvel, DC, etc.) │
                          │  • alt_name, icon          │
                          │  • descr, fulldescr        │
                          │  • xfields                 │
                          └────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│          dle_xfsearch (Search Index)                │
│             (29,747 records)                        │
│                                                     │
│  Denormalized table for searching xfields:          │
│  • news_id → post                                   │
│  • tagname (perevodchik, oformlenie, etc.)          │
│  • tagvalue                                         │
│                                                     │
│  Can be replaced with normalized tables:            │
│  - post_translators                                 │
│  - post_designers                                   │
│  - post_editors                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────┐         ┌─────────────────┐
│  dle_comments   │         │   m_rating      │
│   (173 records) │         │                 │
│                 │         │ • news_id → post│
│ • post_id → post│         │ • ip            │
│ • user_id → user│         │ • member        │
│ • parent (self) │         │ • area          │
│ • text, rating  │         └─────────────────┘
└─────────────────┘

┌─────────────────┐
│   dle_static    │
│   (15 records)  │
│                 │
│ • name (slug)   │
│ • template      │
│ • metadescr     │
└─────────────────┘
```

### 3.2 Связи и кардинальности

| Откуда | Куда | Тип | Ключ | Описание |
|--------|------|-----|------|----------|
| `dle_post` | `dle_users` | N:1 | `user_id` (через extras) | Автор поста |
| `dle_post` | `dle_post_extras` | 1:1 | `id` → `news_id` | Расширенные данные |
| `dle_post` | `dle_post_extras_cats` | 1:N | `id` → `news_id` | Категории поста |
| `dle_post_extras_cats` | `dle_category` | N:1 | `cat_id` → `id` | Связь с категорией |
| `dle_post` | `dle_images` | 1:N | `id` → `news_id` | Галерея изображений |
| `dle_post` | `dle_xfsearch` | 1:N | `id` → `news_id` | Индекс пользовательских полей |
| `dle_post` | `dle_tags` | 1:N | `id` → `news_id` | Теги поста |
| `dle_post` | `dle_comments` | 1:N | `id` → `post_id` | Комментарии |
| `dle_comments` | `dle_users` | N:1 | `user_id` → `user_id` | Автор комментария |
| `dle_comments` | `dle_comments` | N:1 | `parent` → `id` | Threading (самосвязь) |
| `dle_category` | `dle_category` | N:1 | `parentid` → `id` | Иерархия (самосвязь) |
| `m_rating` | `dle_post` | N:1 | `news_id` → `id` | Рейтинги постов |

---

## 4. Перечень DLE-специфичных технических полей для исключения

### 4.1 Поля публикации и workflow

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `approve` | dle_post, dle_comments | DLE workflow модерации, не актуально для Supabase |
| `fixed` | dle_post | Закрепление постов — UI-логика |
| `allow_main` | dle_post | Показ на главной — UI-логика |
| `edited_now` | dle_post_extras | Блокировка редактирования — технический флаг |

### 4.2 RSS и интеграции

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `allow_rss` | dle_post_extras, dle_category | RSS-специфика DLE |
| `allow_rss_turbo` | dle_post_extras | Яндекс.Турбо — специфика DLE |
| `allow_rss_dzen` | dle_post_extras | Яндекс.Дзен — специфика DLE |
| `enable_dzen` | dle_category | Яндекс.Дзен — специфика DLE |
| `enable_turbo` | dle_category | Яндекс.Турбо — специфика DLE |

### 4.3 Шаблоны и темы оформления

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `short_tpl` | dle_category | Шаблоны DLE, не применимо к Next.js/React |
| `full_tpl` | dle_category | Шаблоны DLE, не применимо к Next.js/React |
| `skin` | dle_category | Скины DLE |
| `template` | dle_static | PHP-шаблоны, будут переписаны на React |
| `template_folder` | dle_static | Папки шаблонов DLE |
| `tpl` | dle_static | Файлы шаблонов DLE |
| `allow_template` | dle_static | Разрешение PHP в шаблонах |

### 4.4 Поиск и индексация (DLE-специфика)

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `disable_index` | dle_post_extras, dle_static | SEO-настройки DLE, использовать Next.js robots.txt |
| `disable_search` | dle_post_extras, dle_category, dle_static | Внутренний поиск DLE, будет на Algolia/MeiliSearch |
| `disable_main` | dle_category | UI-логика DLE |

### 4.5 Настройки UI и сортировки

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `news_sort` | dle_category | Сортировка DLE UI |
| `news_msort` | dle_category | Порядок сортировки DLE |
| `news_number` | dle_category | Pagination DLE |
| `show_sub` | dle_category | Показ подкатегорий DLE UI |
| `view_edit` | dle_post_extras | История правок DLE UI |

### 4.6 Технические и служебные

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `symbol` | dle_post | Защитный символ DLE — технический |
| `allow_br` | dle_post, dle_static | Авто-переносы строк DLE |
| `votes` | dle_post_extras | Сериализованные данные PHP — технический формат |
| `hash` | dle_users | Сессионный хеш DLE |
| `time_limit` | dle_users | Ограничение сессии DLE |
| `allowed_ip` | dle_users | Белый список IP DLE |
| `twofactor_auth` | dle_users | 2FA DLE, использовать Supabase Auth |
| `rating_type` | dle_category | Тип рейтинга DLE |
| `schema_org` | dle_category | Schema.org разметка — будет в Next.js компонентах |

### 4.7 Права доступа и группы

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `grouplevel` | dle_static | Группы доступа DLE, использовать Supabase RLS |
| `access` | dle_post_extras | Права доступа DLE, использовать RLS |
| `need_pass` | dle_post_extras | Парольный доступ DLE |
| `allow_comm` | dle_post | Разрешение комментариев — бизнес-логика приложения |
| `allow_rate` | dle_post_extras | Разрешение рейтинга — бизнес-логика приложения |
| `disable_rating` | dle_category | Запрет рейтинга DLE |
| `disable_comments` | dle_category | Запрет комментариев DLE |

### 4.8 Вычисляемые поля

| Поле | Таблица | Причина исключения |
|------|---------|-------------------|
| `comm_num` | dle_post | Вычислять через COUNT(comments) |
| `news_num` | dle_users | Вычислять через COUNT(posts) |
| `comm_num` | dle_users | Вычислять через COUNT(comments) |
| `pm_all` | dle_users | Вычислять динамически |
| `pm_unread` | dle_users | Вычислять динамически |

### 4.9 Целые таблицы для исключения

| Таблица | Причина исключения |
|---------|-------------------|
| `dle_admin_logs` | Технические логи администрирования |
| `dle_logs` | Общие логи системы |
| `dle_email` | Очередь email-уведомлений |
| `dle_banned` | Баны пользователей/IP (устаревшие данные) |
| `dle_flood` | Защита от флуда — будет в новой системе |
| `dle_spam_log` | Логи спама |
| `dle_login_log` | Логи входов — будет в Supabase Auth |
| `dle_mail_log` | Логи отправки почты |
| `dle_sendlog` | Логи массовых рассылок |
| `dle_plugins_*` | Данные плагинов DLE |
| `dle_banners_*` | Баннеры и статистика |
| `dle_rss_*` | RSS-каналы DLE |
| `dle_dle_search_*` | Внутренний поиск DLE |
| `dle_poll_*` | Опросы (если не используются) |
| `dle_complaint_*` | Жалобы (если не используются) |
| `dle_lostdb` | Восстановление паролей — устаревшее |
| `dle_notice` | Уведомления DLE |
| `dle_read_log` | Логи просмотров |
| `dle_comment_rating_log` | Логи рейтингов комментариев |
| `dle_post_log` | Логи изменений постов |
| `dle_views` | Счетчики просмотров |
| `dle_files` | Загруженные файлы (если не используются) |

---

## 5. Критически важные данные для сохранения

### 5.1 Контент комиксов

#### Основная информация

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Название выпуска | `dle_post.title` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Описание/аннотация | `dle_post.short_story`, `dle_post.full_story` | HTML | ⭐⭐⭐⭐⭐ |
| URL slug | `dle_post.alt_name` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Дата публикации | `dle_post.date` | DATETIME | ⭐⭐⭐⭐ |

#### Метаданные переводов (из xfields)

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Номер тома | `xfields.volume` | TEXT | ⭐⭐⭐⭐⭐ |
| Название сюжетной арки | `xfields.story` | TEXT | ⭐⭐⭐⭐ |
| Переводчик(и) | `xfields.perevodchik` | TEXT (через запятую) | ⭐⭐⭐⭐⭐ |
| Оформитель(и) | `xfields.oformlenie` | TEXT (через запятую) | ⭐⭐⭐⭐⭐ |
| Наборщик(и) | `xfields.taiper` | TEXT (через запятую) | ⭐⭐⭐⭐ |
| Редактор(ы) | `xfields.redaktor` | TEXT (через запятую) | ⭐⭐⭐⭐⭐ |
| **Ссылка на скачивание** | `xfields.download` | URL | ⭐⭐⭐⭐⭐ |
| Ссылка на читалку | `xfields.reader` | URL | ⭐⭐⭐ |
| Статус перевода | `category.xfields.status` | TEXT | ⭐⭐⭐⭐ |

**Критически важно:** Все поля команды переводчиков (perevodchik, oformlenie, redaktor) и ссылки на скачивание являются ключевым контентом!

### 5.2 Изображения и медиа

| Данные | Источник | Формат | Критичность | Примечания |
|--------|----------|--------|-------------|------------|
| Обложки комиксов | `dle_images.images` | Пути к файлам (|||) | ⭐⭐⭐⭐⭐ | Требуется миграция в Supabase Storage |
| Превью изображения | `dle_post.short_story` | HTML с `<img>` | ⭐⭐⭐⭐⭐ | Извлечь URL и мигрировать |
| Аватары пользователей | `dle_users.foto` | URL | ⭐⭐⭐ | Мигрировать в Storage |
| Иконки категорий | `dle_category.icon` | URL | ⭐⭐⭐ | Мигрировать в Storage |

**Важно:** Пути к изображениям в формате:
- Абсолютные: `https://rp-universe.ru/uploads/...`
- Относительные: `//rp-universe.ru/uploads/...`
- Локальные: `2019-02/1550310040_2551.jpg`

**План миграции изображений:**
1. Скачать все файлы из `uploads/` папки
2. Загрузить в Supabase Storage в структуру: `comics/{comic_id}/{filename}`
3. Обновить все URL в базе данных
4. Обработать HTML в `short_story` и `full_story` для замены путей

### 5.3 Категории и иерархия

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Название категории | `dle_category.name` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Иерархия (parent-child) | `dle_category.parentid` | INT (self-reference) | ⭐⭐⭐⭐⭐ |
| URL slug категории | `dle_category.alt_name` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Описание | `dle_category.descr`, `fulldescr` | TEXT | ⭐⭐⭐⭐ |
| Иконка | `dle_category.icon` | URL | ⭐⭐⭐ |
| Порядок сортировки | `dle_category.posi` | INT | ⭐⭐⭐ |

**Структура категорий:**
- Уровень 1: Издатели (Marvel, DC, Dark Horse, Image, 2000AD, etc.)
- Уровень 2: Серии комиксов (Amazing Spider-Man, Venom, Superboy, etc.)
- Уровень 3: Подсерии (если есть)

### 5.4 Пользователи и авторство

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Email | `dle_users.email` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Логин | `dle_users.name` | VARCHAR | ⭐⭐⭐⭐⭐ |
| Полное имя | `dle_users.fullname` | VARCHAR | ⭐⭐⭐⭐ |
| Дата регистрации | `dle_users.reg_date` | TIMESTAMP | ⭐⭐⭐⭐ |
| Группа пользователя | `dle_users.user_group` | INT | ⭐⭐⭐⭐ |
| Информация о себе | `dle_users.info` | TEXT | ⭐⭐⭐ |
| Подпись | `dle_users.signature` | TEXT | ⭐⭐ |

**Внимание:** Пароли (`dle_users.password`) нельзя мигрировать напрямую в Supabase Auth. Требуется процедура сброса паролей.

### 5.5 Комментарии и взаимодействие

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Текст комментария | `dle_comments.text` | HTML | ⭐⭐⭐⭐⭐ |
| Автор | `dle_comments.autor`, `user_id` | VARCHAR / INT | ⭐⭐⭐⭐⭐ |
| Дата | `dle_comments.date` | DATETIME | ⭐⭐⭐⭐ |
| Иерархия (ответы) | `dle_comments.parent` | INT | ⭐⭐⭐⭐ |
| Рейтинг | `dle_comments.rating` | INT | ⭐⭐⭐ |

### 5.6 Рейтинги и статистика

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Рейтинг поста | `dle_post_extras.rating` | INT | ⭐⭐⭐⭐ |
| Количество голосов | `dle_post_extras.vote_num` | INT | ⭐⭐⭐⭐ |
| Количество просмотров | `dle_post_extras.news_read` | INT | ⭐⭐⭐⭐ |
| Связанные посты | `dle_post_extras.related_ids` | VARCHAR (через запятую) | ⭐⭐⭐⭐ |

### 5.7 SEO и метаданные

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Meta title | `dle_post.metatitle` | VARCHAR | ⭐⭐⭐⭐ |
| Meta description | `dle_post.descr` | TEXT | ⭐⭐⭐⭐ |
| Meta keywords | `dle_post.keywords` | TEXT | ⭐⭐⭐ |
| URL редиректы | `dle_redirects` | - | ⭐⭐⭐⭐ |

### 5.8 Статические страницы

| Данные | Источник | Формат | Критичность |
|--------|----------|--------|-------------|
| Название/slug | `dle_static.name` | VARCHAR | ⭐⭐⭐⭐ |
| Контент | `dle_static.template` | HTML | ⭐⭐⭐⭐⭐ |
| Описание | `dle_static.descr` | TEXT | ⭐⭐⭐ |
| Meta title/descr | `dle_static.metatitle`, `metadescr` | VARCHAR / TEXT | ⭐⭐⭐ |

**Важные статические страницы:**
- Правила сайта (`dle-rules-page`)
- Хронологии событий (`absolute-carnage`, `cataclysm`, etc.)
- Страницы с глобальными событиями

---

## 6. Рекомендации по ETL (Extract, Transform, Load)

### 6.1 Порядок миграции

1. **Базовые справочники:**
   - `dle_category` → Создать иерархию категорий
   - `dle_usergroups` → Маппинг в Supabase roles
   - `dle_users` → Миграция пользователей (без паролей)

2. **Контент:**
   - `dle_post` → Парсинг xfields, миграция постов
   - `dle_post_extras` → Расширенные данные постов
   - `dle_post_extras_cats` → Связи постов и категорий

3. **Медиа:**
   - Скачивание всех изображений из `uploads/`
   - Загрузка в Supabase Storage
   - Обновление путей в `dle_images` и HTML-контенте

4. **Дополнительные данные:**
   - `dle_xfsearch` → Нормализация в отдельные таблицы (translators, designers, etc.)
   - `dle_tags` → Создание таблицы тегов
   - `dle_comments` → Миграция с сохранением иерархии
   - `dle_static` → Миграция статических страниц

5. **Связи:**
   - Валидация всех foreign keys
   - Миграция `related_ids` в отдельную таблицу `post_relations`

### 6.2 Парсинг сериализованных данных

#### xfields формат:
```
volume|Том 6||story|Secrets and Origins||perevodchik|Getuerk||oformlenie|Тигра||redaktor|Filis, Xailex||download|https://yadi.sk/d/...||reader|
```

**Алгоритм парсинга:**
```javascript
function parseXfields(xfields) {
  const result = {};
  const pairs = xfields.split('||').filter(Boolean);
  
  for (const pair of pairs) {
    const [key, value] = pair.split('|');
    if (key && value) {
      result[key] = value;
    }
  }
  
  return result;
}
```

#### images формат:
```
2019-02/1550310040_2551.jpg|||2019-12/1577616114_1549138332_0_98548700.jpg
```

**Алгоритм парсинга:**
```javascript
function parseImages(images) {
  return images.split('|||').filter(Boolean);
}
```

### 6.3 Нормализация данных

#### Из `dle_xfsearch` создать отдельные таблицы:

```sql
-- Таблица переводчиков
CREATE TABLE translators (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Связь постов с переводчиками
CREATE TABLE post_translators (
  post_id INT REFERENCES posts(id),
  translator_id UUID REFERENCES translators(id),
  PRIMARY KEY (post_id, translator_id)
);

-- Аналогично для oformlenie, taiper, redaktor
```

#### Из `dle_tags` создать нормализованную структуру:

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_id INT REFERENCES posts(id),
  tag_id UUID REFERENCES tags(id),
  PRIMARY KEY (post_id, tag_id)
);
```

### 6.4 Трансформация HTML контента

HTML в `short_story`, `full_story` и `dle_comments.text` содержит:
- Ссылки на изображения (нужно обновить пути)
- DLE-специфичные конструкции (`<!--smile:...-->`, `<!--QuoteBegin-->`)
- Старые URL (нужно обновить на новые)

**Рекомендации:**
1. Сохранить оригинальный HTML в отдельном поле (`content_html_original`)
2. Создать очищенную версию (`content_html`)
3. Создать Markdown/plaintext версию для поиска

### 6.5 Миграция изображений

**Структура в Supabase Storage:**
```
comics/
  ├── covers/
  │   ├── {comic_id}_1.jpg
  │   ├── {comic_id}_2.jpg
  ├── preview/
  │   ├── {comic_id}_medium.jpg
categories/
  ├── icons/
  │   ├── {category_id}.jpg
users/
  ├── avatars/
  │   ├── {user_id}.png
```

**Обновление URL:**
- `https://rp-universe.ru/uploads/posts/2019-12/1577616259_venom-2018-001-000.jpg`
- → `https://{supabase_url}/storage/v1/object/public/comics/covers/1_venom-2018-001-000.jpg`

---

## 7. Предложенная схема Supabase

### 7.1 Основные таблицы

```sql
-- Пользователи (интеграция с Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen_at TIMESTAMP WITH TIME ZONE,
  -- Старые ID для маппинга
  legacy_user_id INT UNIQUE
);

-- Категории (издатели/серии)
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  parent_id INT REFERENCES categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  full_description TEXT,
  icon_url TEXT,
  position INT DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  -- Старые ID для маппинга
  legacy_id INT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Посты (комиксы)
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  volume TEXT,
  story_arc TEXT,
  -- Контент
  short_story TEXT, -- HTML превью
  full_story TEXT, -- HTML полное описание
  -- Ссылки
  download_url TEXT,
  reader_url TEXT,
  -- Метаданные
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES profiles(id),
  -- Статистика
  views_count INT DEFAULT 0,
  rating INT DEFAULT 0,
  votes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  -- История изменений
  edited_at TIMESTAMP WITH TIME ZONE,
  editor_id UUID REFERENCES profiles(id),
  edit_reason TEXT,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  -- Старые ID для маппинга
  legacy_id INT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Связь постов с категориями (Many-to-Many)
CREATE TABLE post_categories (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  category_id INT REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Изображения
CREATE TABLE post_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  position INT DEFAULT 0,
  uploaded_by UUID REFERENCES profiles(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Переводчики
CREATE TABLE translators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Связь постов с переводчиками
CREATE TABLE post_translators (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  translator_id UUID REFERENCES translators(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, translator_id)
);

-- Оформители
CREATE TABLE designers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Связь постов с оформителями
CREATE TABLE post_designers (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  designer_id UUID REFERENCES designers(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, designer_id)
);

-- Редакторы
CREATE TABLE editors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Связь постов с редакторами
CREATE TABLE post_editors (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  editor_id UUID REFERENCES editors(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, editor_id)
);

-- Теги
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Связь постов с тегами
CREATE TABLE post_tags (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Связанные посты
CREATE TABLE post_relations (
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  related_post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, related_post_id),
  CHECK (post_id != related_post_id)
);

-- Комментарии
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  parent_id INT REFERENCES comments(id) ON DELETE CASCADE,
  -- Контент
  author_name TEXT NOT NULL, -- Для гостей или зарегистрированных
  author_email TEXT,
  text TEXT NOT NULL,
  -- Модерация
  ip_address INET,
  rating INT DEFAULT 0,
  votes_count INT DEFAULT 0,
  -- Метаданные
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE,
  -- Старые ID для маппинга
  legacy_id INT UNIQUE
);

-- Рейтинги постов
CREATE TABLE post_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  ip_address INET,
  rating_area TEXT, -- Для m_rating (video, gameplay, sound, atm, etc.)
  rating_value INT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (post_id, user_id, rating_area)
);

-- Статические страницы
CREATE TABLE static_pages (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE,
  -- Старые ID для маппинга
  legacy_id INT UNIQUE
);

-- URL редиректы
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  old_url TEXT UNIQUE NOT NULL,
  new_url TEXT NOT NULL,
  status_code INT DEFAULT 301,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7.2 Индексы для производительности

```sql
-- Посты
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_legacy_id ON posts(legacy_id);

-- Категории
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Комментарии
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- Изображения
CREATE INDEX idx_post_images_post_id ON post_images(post_id);

-- Связи
CREATE INDEX idx_post_categories_category_id ON post_categories(category_id);
CREATE INDEX idx_post_translators_translator_id ON post_translators(translator_id);
CREATE INDEX idx_post_designers_designer_id ON post_designers(designer_id);
CREATE INDEX idx_post_editors_editor_id ON post_editors(editor_id);
CREATE INDEX idx_post_tags_tag_id ON post_tags(tag_id);
```

### 7.3 Row Level Security (RLS) политики

```sql
-- Публичное чтение постов
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by everyone" 
  ON posts FOR SELECT 
  USING (true);

-- Редактирование постов только авторами и администраторами
CREATE POLICY "Posts are editable by authors and admins" 
  ON posts FOR UPDATE 
  USING (
    auth.uid() = author_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Аналогично для других таблиц...
```

---

## 8. Чек-лист миграции

### 8.1 Подготовка

- [ ] Создать резервную копию всех CSV файлов
- [ ] Скачать все файлы из `uploads/` директории сайта
- [ ] Создать тестовую базу данных в Supabase
- [ ] Настроить Supabase Storage бакеты

### 8.2 Схема базы данных

- [ ] Создать все таблицы в Supabase
- [ ] Создать индексы
- [ ] Настроить RLS политики
- [ ] Создать необходимые функции и триггеры

### 8.3 Миграция справочников

- [ ] Импортировать `dle_category` → `categories`
- [ ] Проверить иерархию категорий (parent_id)
- [ ] Извлечь уникальных переводчиков из `dle_xfsearch` → `translators`
- [ ] Извлечь уникальных оформителей → `designers`
- [ ] Извлечь уникальных редакторов → `editors`
- [ ] Создать уникальные теги из `dle_tags` → `tags`

### 8.4 Миграция пользователей

- [ ] Импортировать `dle_users` → `profiles`
- [ ] Отправить email всем пользователям для сброса пароля
- [ ] Мигрировать аватары в Supabase Storage

### 8.5 Миграция контента

- [ ] Импортировать `dle_post` → `posts`
- [ ] Распарсить xfields (volume, story, download_url, reader_url)
- [ ] Импортировать `dle_post_extras` (rating, views, related_ids)
- [ ] Создать связи `post_categories` из `dle_post_extras_cats`
- [ ] Создать связи переводчиков/оформителей/редакторов из `dle_xfsearch`
- [ ] Создать связи тегов из `dle_tags`
- [ ] Парсинг и нормализация `related_ids` → `post_relations`

### 8.6 Миграция медиа

- [ ] Распарсить `dle_images.images` (разделитель `|||`)
- [ ] Загрузить все изображения в Supabase Storage
- [ ] Создать записи в `post_images` с новыми URL
- [ ] Обновить пути в HTML (`short_story`, `full_story`)
- [ ] Мигрировать иконки категорий

### 8.7 Миграция взаимодействий

- [ ] Импортировать `dle_comments` → `comments`
- [ ] Проверить иерархию комментариев (parent_id)
- [ ] Импортировать `m_rating` → `post_ratings`
- [ ] Импортировать статические страницы

### 8.8 Валидация

- [ ] Проверить количество записей (должно совпадать с CSV)
- [ ] Проверить все foreign keys (не должно быть сирот)
- [ ] Проверить уникальность slug'ов
- [ ] Проверить доступность всех изображений
- [ ] Проверить корректность HTML контента

### 8.9 SEO и редиректы

- [ ] Создать редиректы для старых URL
- [ ] Проверить meta-теги (title, description, keywords)
- [ ] Создать sitemap.xml с новыми URL

### 8.10 Пост-миграция

- [ ] Запустить full-text search индексацию
- [ ] Обновить счетчики (comments_count, views_count)
- [ ] Протестировать основные сценарии использования
- [ ] Уведомить пользователей о миграции

---

## 9. Потенциальные проблемы и решения

### 9.1 HTML контент

**Проблема:** DLE-специфичные конструкции в HTML  
**Решение:** Написать парсер для замены:
- `<!--smile:emoji_name-->` → React компонент эмодзи
- `<!--QuoteBegin-->...<!--QuoteEnd-->` → компонент цитирования
- Старые пути изображений → новые URL

### 9.2 Пароли пользователей

**Проблема:** Supabase Auth не поддерживает импорт bcrypt паролей  
**Решение:** 
- Вариант 1: Массовый сброс паролей для всех пользователей
- Вариант 2: Гибридная аутентификация (проверка старых паролей через custom function)

### 9.3 Большой объем изображений

**Проблема:** 7,655+ изображений нужно мигрировать  
**Решение:**
- Скрипт для пакетной загрузки в Supabase Storage
- CDN для оптимизации доставки
- Lazy loading изображений на фронтенде

### 9.4 Сложная иерархия категорий

**Проблема:** Многоуровневое дерево категорий  
**Решение:**
- Использовать materialized path или closure table
- Создать рекурсивные функции для получения дерева

### 9.5 Related posts

**Проблема:** Связи в формате CSV строки "2205,1593,2207,2454,2206"  
**Решение:**
- Парсинг и создание отдельных записей в `post_relations`
- Валидация существования связанных постов

---

## 10. Заключение

Аудит DLE CSV экспортов выявил следующее:

### Основные цифры:
- **14,139** постов комиксов
- **1,005** категорий (издатели + серии)
- **606** пользователей
- **7,655** изображений
- **173** комментария
- **29,747** индексных записей пользовательских полей

### Критически важные данные:
1. Контент комиксов (title, descriptions, download links)
2. Метаданные переводов (команда: переводчики, оформители, редакторы)
3. Изображения обложек
4. Иерархия категорий
5. Комментарии и рейтинги

### DLE-поля к исключению:
- RSS-специфика (allow_rss, enable_turbo, enable_dzen)
- Шаблоны и темы (tpl, skin, template_folder)
- Workflow флаги (approve, fixed, edited_now)
- Технические логи (admin_logs, logs, spam_log)
- Сессионные данные (hash, time_limit)

### Рекомендации:
1. Нормализовать данные (вместо денормализованной `dle_xfsearch` создать отдельные таблицы)
2. Мигрировать изображения в Supabase Storage
3. Обновить HTML контент (пути к изображениям, DLE-конструкции)
4. Использовать Supabase Auth для аутентификации (сброс паролей)
5. Применить RLS для контроля доступа

### Следующие шаги:
1. Создание ETL скриптов для миграции
2. Тестовая миграция на staging окружении
3. Валидация данных
4. Продуктовая миграция

---

**Дата создания документа:** 2024-10-28  
**Версия:** 1.0
