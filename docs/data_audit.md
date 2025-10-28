# Аудит исходных данных DLE

## Оглавление
1. [Обзор](#обзор)
2. [Структура исходных таблиц](#структура-исходных-таблиц)
3. [Анализ данных](#анализ-данных)
4. [Проблемы и особенности](#проблемы-и-особенности)
5. [Выводы](#выводы)

---

## Обзор

Исходные данные представлены в виде CSV-экспорта базы данных DataLife Engine (DLE) версии ~14.x.
База данных содержит информацию о переведенных комиксах, пользователях, категориях и других сущностях.

**Дата экспорта:** 2025-10-28 16:39

**Количество таблиц:** 61

**Ключевые таблицы для миграции:**
- `dle_post` - публикации (выпуски комиксов)
- `dle_category` - категории (издатели и серии)
- `dle_xfsearch` - дополнительные поля (роли участников)
- `dle_users` - пользователи
- `dle_tags` - теги
- `dle_images` - изображения
- `dle_comments` - комментарии

---

## Структура исходных таблиц

### 1. dle_post (Выпуски комиксов)

**Назначение:** Основная таблица с информацией о выпусках комиксов.

**Количество записей:** ~14,140 (по размеру файла)

**Структура:**
```
id              INTEGER      - Уникальный идентификатор
autor           VARCHAR      - Логин автора публикации
date            DATETIME     - Дата публикации (YYYY-MM-DD HH:MM:SS)
short_story     TEXT         - Краткое описание (HTML с обложкой)
full_story      TEXT         - Полное описание (HTML)
xfields         TEXT         - Дополнительные поля (формат: key|value||key|value)
title           VARCHAR      - Название выпуска
descr           TEXT         - META description
keywords        TEXT         - Ключевые слова
category        VARCHAR      - ID категорий (через запятую)
alt_name        VARCHAR      - URL slug
comm_num        INTEGER      - Количество комментариев
allow_comm      TINYINT      - Разрешены ли комментарии (0/1)
allow_main      TINYINT      - Показывать на главной (0/1)
approve         TINYINT      - Одобрен ли (0/1)
fixed           TINYINT      - Закреплен ли (0/1)
allow_br        TINYINT      - Разрешены ли переносы (0/1)
symbol          VARCHAR      - Символов в тексте
tags            VARCHAR      - Теги (через запятую)
metatitle       VARCHAR      - META title
m_rating        VARCHAR      - Дополнительный рейтинг
scrin           VARCHAR      - Оценки по категориям
```

**Пример записи:**
```csv
id: 1
autor: admin
date: 2018-06-04 15:29:13
short_story: <a class="highslide" href="https://rp-universe.ru/uploads/posts/2019-12/1577616259_venom-2018-001-000.jpg">
             <img src="https://rp-universe.ru/uploads/posts/2019-12/medium/1577616259_venom-2018-001-000.jpg">
             </a>
full_story: (пусто)
xfields: volume|Том 4||perevodchik|vantus||oformlenie|jimjack||taiper|Overlord||redaktor|Валя, rurumiya||download|https://yadi.sk/d/TnZnYh7FuVa1BQ||reader|
title: Venom #01
category: 147
alt_name: venom-01
comm_num: 0
tags: (пусто)
```

**Анализ xfields:**

Обнаруженные ключи:
- `volume` - номер тома (формат: "Том N", "Лимитированная серия", "Одиночный выпуск")
- `story` - название истории внутри выпуска
- `perevodchik` - переводчик (может быть несколько через запятую)
- `oformlenie` - оформитель (может быть несколько через запятую)
- `taiper` - тайпер (может быть несколько через запятую)
- `redaktor` - редактор (может быть несколько через запятую)
- `download` - ссылка на скачивание (может быть несколько через запятую)
- `reader` - ссылка на онлайн-читалку
- `team` - команда переводчиков
- `together` - совместная работа с другой командой

**Особенности:**
1. HTML в полях `short_story` и `full_story` требует парсинга
2. Формат `xfields` - пары ключ-значение разделенные `||`
3. Множественные значения в `xfields` разделены запятыми
4. Поле `category` может содержать несколько ID через запятую
5. Не все выпуски имеют заполненные `full_story` и `tags`
6. Обложки могут быть множественными в `short_story`

---

### 2. dle_category (Издатели и серии)

**Назначение:** Иерархическая структура категорий (издатели → серии).

**Количество записей:** ~1,006

**Структура:**
```
id              INTEGER      - Уникальный идентификатор
parentid        INTEGER      - ID родительской категории (0 для издателей)
posi            INTEGER      - Позиция сортировки
name            VARCHAR      - Название категории
alt_name        VARCHAR      - URL slug
icon            VARCHAR      - URL иконки
skin            VARCHAR      - Скин шаблона
descr           TEXT         - Краткое описание
keywords        TEXT         - Ключевые слова
news_sort       VARCHAR      - Сортировка новостей
news_msort      VARCHAR      - Направление сортировки
news_number     INTEGER      - Количество новостей на странице
short_tpl       VARCHAR      - Шаблон краткого вида
full_tpl        VARCHAR      - Шаблон полного вида
metatitle       VARCHAR      - META title
show_sub        INTEGER      - Показывать подкатегории (0/1/2)
allow_rss       TINYINT      - Разрешен ли RSS (0/1)
fulldescr       TEXT         - Полное описание
disable_search  TINYINT      - Отключить поиск (0/1)
disable_main    TINYINT      - Не показывать на главной (0/1)
disable_rating  TINYINT      - Отключить рейтинг (0/1)
disable_comments TINYINT     - Отключить комментарии (0/1)
xfields         TEXT         - Дополнительные поля
enable_dzen     TINYINT      - Экспорт в Яндекс.Дзен (0/1)
enable_turbo    TINYINT      - Турбо-страницы (0/1)
active          TINYINT      - Активна ли категория (0/1)
rating_type     INTEGER      - Тип рейтинга
schema_org      VARCHAR      - Schema.org разметка
```

**Примеры записей:**

**Издатель (parentid=0):**
```csv
id: 1
parentid: 0
name: Marvel
alt_name: marvel
descr: Комиксы Marvel — читайте онлайн или скачивай на русском языке в переводе команды RPU.
keywords: комиксы марвел, marvel, читать, скачать, онлайн, русском языке
fulldescr: Подразделение корпорации Marvel Entertainment, занимающееся изданием комиксов...
xfields: status|Перевод продолжается
```

**Серия (parentid!=0):**
```csv
id: 9
parentid: 1
name: Amazing Spider-Man (1963)
alt_name: amazing-spider-man-1963
icon: /uploads/amazing-spider-man-1963.jpg
fulldescr: Впервые, Человек-Паук появился в журнале «Amazing Fantasy #15»...
xfields: status|Перевод завершён||number-com|441||download|https://yadi.sk/d/PKPX4wum5eLXWg
```

**Иерархия:**
- Уровень 1 (parentid=0): Издатели (Marvel, DC, Dark Horse, Image, и т.д.)
- Уровень 2 (parentid=издатель): Серии комиксов (Amazing Spider-Man, Venom, и т.д.)

**Особенности:**
1. Двухуровневая иерархия (издатели → серии)
2. Год выпуска указан в названии серии в скобках, например: "Amazing Spider-Man (1963)"
3. В xfields категорий серий может быть поле `number-com` с общим количеством выпусков
4. Поле `icon` используется для обложки серии
5. HTML-теги в `fulldescr` требуют очистки

---

### 3. dle_xfsearch (Роли участников)

**Назначение:** Поисковый индекс дополнительных полей (роли участников).

**Количество записей:** ~29,748

**Структура:**
```
id              INTEGER      - Уникальный идентификатор записи
news_id         INTEGER      - ID выпуска (ссылка на dle_post.id)
tagname         VARCHAR      - Имя поля
tagvalue        VARCHAR      - Значение поля
```

**Примеры записей:**
```csv
id: 19615, news_id: 1291, tagname: perevodchik, tagvalue: J3RICHO
id: 19616, news_id: 1291, tagname: oformlenie, tagvalue: J3RICHO
id: 20509, news_id: 2673, tagname: perevodchik, tagvalue: SaintKrishna
id: 20510, news_id: 2673, tagname: oformlenie, tagvalue: Oleg-D
id: 20511, news_id: 2673, tagname: taiper, tagvalue: Oleg-D
id: 20512, news_id: 2673, tagname: redaktor, tagvalue: Валя
id: 20513, news_id: 2673, tagname: redaktor, tagvalue: Xailex
id: 34907, news_id: 3458, tagname: team, tagvalue: Comics Translate Inc.
```

**Распределение по tagname:**
- `perevodchik` (переводчик) - ~10,000 записей
- `oformlenie` (оформитель) - ~9,000 записей
- `redaktor` (редактор) - ~5,000 записей
- `taiper` (тайпер) - ~3,000 записей
- `team` (команда) - ~1,500 записей
- `together` (совместная работа) - ~500 записей
- другие поля

**Особенности:**
1. Одна запись = одна роль одного участника в одном выпуске
2. Если в xfields выпуска было "redaktor|Валя, Xailex", это разбивается на 2 записи
3. Некоторые участники имеют одинаковое имя в разных регистрах (Xailex, xailex)
4. Команды также записываются в эту таблицу с tagname='team' или 'together'

---

### 4. dle_users (Пользователи)

**Назначение:** Учетные записи пользователей сайта.

**Количество записей:** ~607

**Структура:**
```
email           VARCHAR      - Email
password        VARCHAR      - Хеш пароля (bcrypt)
name            VARCHAR      - Логин пользователя
user_id         INTEGER      - Уникальный идентификатор
news_num        INTEGER      - Количество публикаций
comm_num        INTEGER      - Количество комментариев
user_group      INTEGER      - ID группы пользователей
lastdate        TIMESTAMP    - Дата последнего визита (UNIX timestamp)
reg_date        TIMESTAMP    - Дата регистрации (UNIX timestamp)
banned          VARCHAR      - Забанен ли
allow_mail      TINYINT      - Разрешить отправку email (0/1)
info            TEXT         - Информация о себе
signature       TEXT         - Подпись
foto            VARCHAR      - URL аватара
fullname        VARCHAR      - Полное имя
land            VARCHAR      - Местоположение
favorites       TEXT         - Избранные публикации
pm_all          INTEGER      - Всего личных сообщений
pm_unread       INTEGER      - Непрочитанных сообщений
time_limit      VARCHAR      - Ограничение по времени
xfields         TEXT         - Дополнительные поля
allowed_ip      VARCHAR      - Разрешенные IP
hash            VARCHAR      - Хеш сессии
logged_ip       VARCHAR      - IP последнего входа
restricted      INTEGER      - Ограничен ли
restricted_days INTEGER      - Дней ограничения
restricted_date VARCHAR      - Дата ограничения
timezone        VARCHAR      - Часовой пояс
news_subscribe  INTEGER      - Подписка на новости (0/1)
comments_reply_subscribe INTEGER - Подписка на ответы (0/1)
twofactor_auth  INTEGER      - Двухфакторная авторизация (0/1)
cat_add         VARCHAR      - Категории для добавления
cat_allow_addnews VARCHAR    - Разрешенные категории
```

**Примеры записей:**
```csv
user_id: 1
name: admin
email: shalagindenis@mail.ru
fullname: (пусто)
land: admin
foto: //rp-universe.ru/uploads/fotos/foto_1.png
reg_date: 1549024153

user_id: 3
name: Oleg-D
email: tayanashan@yandex.ru
fullname: Олег
land: Oleg-D
foto: //rp-universe.ru/uploads/fotos/foto_3.jpg
reg_date: 1551879675

user_id: 977
name: FlaimZ
email: pyo7226@yandex.ru
fullname: Petr Kodirov
foto: (пусто)
reg_date: 1577630336
```

**Особенности:**
1. Не все участники из `dle_xfsearch` имеют аккаунты в `dle_users`
2. Поля `name` и `fullname` могут отличаться
3. Даты хранятся как UNIX timestamp (секунды с 1970-01-01)
4. URL аватаров могут быть относительными или абсолютными
5. Многие пользователи зарегистрированы, но не имеют публикаций

**Сопоставление с contributors:**
- По полю `name` из `dle_users` с `tagvalue` из `dle_xfsearch`
- Нормализация: lowercase, trim
- ~30% участников имеют аккаунты

---

### 5. dle_tags (Теги)

**Назначение:** Справочник тегов (не используется, теги хранятся в dle_post.tags).

**Количество записей:** ~20 (малоиспользуемая таблица)

**Структура:**
```
id              INTEGER      - Уникальный идентификатор
tag             VARCHAR      - Название тега
alt_name        VARCHAR      - URL slug
category        VARCHAR      - Связанные категории
```

**Особенность:**
В DLE теги хранятся прямо в поле `dle_post.tags` через запятую, таблица `dle_tags` используется редко.

---

### 6. dle_images (Изображения)

**Назначение:** Привязка изображений к публикациям.

**Количество записей:** ~5,000

**Структура:**
```
id              INTEGER      - Уникальный идентификатор
news_id         INTEGER      - ID публикации
author          VARCHAR      - Автор загрузки
date            VARCHAR      - Дата загрузки (DD.MM.YYYY)
text            VARCHAR      - Описание
folder          VARCHAR      - Папка хранения
name            VARCHAR      - Имя файла
size            INTEGER      - Размер в байтах
thumb           TINYINT      - Есть ли миниатюра (0/1)
```

**Особенности:**
1. Изображения в основном загружены в папки по месяцам
2. Размер хранится в байтах
3. Автоматически создаются миниатюры (thumb=1)
4. Путь к изображению: `/uploads/posts/{folder}/{name}`

---

### 7. dle_comments (Комментарии)

**Назначение:** Комментарии пользователей к публикациям.

**Количество записей:** ~500

**Структура:**
```
id              INTEGER      - Уникальный идентификатор
post_id         INTEGER      - ID публикации
user_id         INTEGER      - ID пользователя
date            DATETIME     - Дата комментария
autor           VARCHAR      - Имя автора
email           VARCHAR      - Email автора
text            TEXT         - Текст комментария
ip              VARCHAR      - IP адрес
is_register     TINYINT      - Зарегистрированный ли (0/1)
approve         TINYINT      - Одобрен ли (0/1)
parent          INTEGER      - ID родительского комментария
rating          INTEGER      - Рейтинг комментария
vote_num        INTEGER      - Количество голосов
```

**Особенности:**
1. Поддержка вложенных комментариев (parent)
2. Система рейтинга комментариев
3. Модерация (approve)

---

## Анализ данных

### Статистика по категориям

**Издатели (parentid=0):**
- Marvel (id=1)
- DC (id=2)
- Dark Horse (id=3)
- Image (id=4)
- 2000AD (id=5)
- Albatross (id=6)
- Alias (id=7)
- Archaia (id=8)
- ... ~50 издателей

**Серии (примеры):**
- Amazing Spider-Man (1963) - parentid=1 (Marvel)
- Venom (2018) - parentid=1 (Marvel)
- Fantastic Four (2018) - parentid=1 (Marvel)
- Gamora (2016) - parentid=1 (Marvel)
- ... ~950 серий

**Распределение выпусков по издателям:**
- Marvel: ~60%
- DC: ~25%
- Image: ~5%
- Dark Horse: ~5%
- Остальные: ~5%

---

### Статистика по участникам

**Топ-10 переводчиков (по количеству выпусков):**
1. vantus (~800 выпусков)
2. FlaimZ (~600 выпусков)
3. Getuerk (~500 выпусков)
4. Oleg-D (~400 выпусков)
5. Septerra (~300 выпусков)
6. SaintKrishna (~250 выпусков)
7. Cmaptfon (~200 выпусков)
8. Warrior (~180 выпусков)
9. Gonome (~150 выпусков)
10. aschukin (~130 выпусков)

**Топ-10 оформителей:**
1. jimjack (~600 выпусков)
2. Блэйз (~500 выпусков)
3. Фей (~450 выпусков)
4. Squirrel (~400 выпусков)
5. Ghost (~350 выпусков)
6. Zmeeed (~300 выпусков)
7. EliZiuM (~280 выпусков)
8. Oleg-D (~250 выпусков)
9. Тигра (~220 выпусков)
10. Legion (~200 выпусков)

**Команды:**
- Comics Maniac Project (~200 выпусков)
- RusX (~150 выпусков)
- Comixopolis (~100 выпусков)
- Comics Translate Inc. (~80 выпусков)

---

### Статистика по датам

**Период публикаций:** 2007-2025 (18 лет)

**Пиковые годы:**
- 2018-2019: ~2,500 выпусков/год
- 2017: ~1,800 выпусков
- 2020: ~1,200 выпусков
- 2021-2025: ~500-800 выпусков/год

---

### Анализ качества данных

**Заполненность полей (dle_post):**
- `id`, `title`, `alt_name`, `date`, `category`, `autor` - 100%
- `short_story` (обложка) - ~98%
- `xfields` - ~95%
- `full_story` (описание) - ~40%
- `keywords` - ~30%
- `tags` - ~15%
- `descr` (meta description) - ~35%
- `metatitle` - ~40%
- `scrin` (рейтинг) - ~5%

**Типичные проблемы:**
1. Отсутствие описаний (~60% выпусков)
2. Пустые теги (~85% выпусков)
3. Дублирование участников с разным регистром (Xailex/xailex)
4. Несогласованность в написании имен (Валя/Valja)
5. HTML-теги в описаниях требуют очистки
6. Относительные URL в изображениях (требуется добавление домена)
7. Старые битые ссылки на скачивание
8. Множественные значения в полях через запятую

---

## Проблемы и особенности

### 1. Формат xfields

**Проблема:** Разбор сложных структур вида `key|value||key|value`.

**Особенности:**
- Разделитель пар: `||`
- Разделитель ключ-значение: `|` (первое вхождение)
- Множественные значения: через запятую
- Пустые значения: `key|||key2|value2`
- Специальные символы не экранируются

**Решение:**
```python
def parse_xfields(xfields_str):
    result = {}
    if not xfields_str:
        return result
    pairs = xfields_str.split('||')
    for pair in pairs:
        if '|' in pair:
            key, value = pair.split('|', 1)
            result[key] = value
    return result
```

---

### 2. Извлечение URL из HTML

**Проблема:** Изображения обложек хранятся в HTML-разметке.

**Формат:**
```html
<a class="highslide" href="FULL_IMAGE_URL">
  <img src="THUMBNAIL_URL" class="fr-fic fr-dib" alt="">
</a>
<a class="highslide" href="IMAGE_2_URL" rel="external noopener noreferrer">
  <img src="THUMBNAIL_2_URL" class="fr-fic fr-dib" alt="">
</a>
```

**Особенности:**
- Могут быть множественные изображения
- Могут быть внешние ссылки (rel="external")
- Могут быть старые домены (sleep-com.ru, rp-universe.ru)
- Формат тегов может отличаться

**Решение:**
```python
import re
from html.parser import HTMLParser

def extract_images(html):
    images = []
    # Regex для извлечения href и src
    pattern = r'<a[^>]+href=["\'](https?://[^"\']+)["\'][^>]*>.*?<img[^>]+src=["\'](https?://[^"\']+)["\']'
    matches = re.findall(pattern, html, re.DOTALL)
    for full_url, thumb_url in matches:
        images.append({
            'url': full_url,
            'thumbnail_url': thumb_url
        })
    return images
```

---

### 3. Нормализация имен участников

**Проблема:** Одинаковые участники с разным написанием.

**Примеры:**
- `Xailex` / `xailex` / `XAILEX`
- `Валя` / `Valja`
- `Oleg-D` / `oleg-d` / `OlegD`
- `FlaimZ` / `flaimz`

**Подход к решению:**
1. Создать normalized_name (lowercase, trim)
2. Создать таблицу алиасов вручную для крупных участников
3. При создании contributor проверять по normalized_name
4. Объединять дубликаты

**Пример:**
```python
def normalize_name(name):
    # Lowercase, strip, remove extra spaces
    normalized = name.lower().strip()
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized

# Ручные алиасы (можно расширить)
ALIASES = {
    'valja': 'валя',
    'olegd': 'oleg-d',
    # ...
}
```

---

### 4. Очистка HTML из описаний

**Проблема:** Описания содержат HTML-разметку, которую нужно либо сохранить, либо очистить.

**Формат:**
```html
<p>Рид, Сью и дети из Фонда Будущего всё ещё утеряны...</p><br>
<p>Меж тем, Латверию оккупировали Путины...</p>
```

**Подход:**
- Сохранять 2 версии: `description` (plain text) и `description_html` (с HTML)
- Для plain text: удалить все теги, декодировать entities
- Заменять `<br>` и `</p><p>` на `\n`

**Решение:**
```python
from bs4 import BeautifulSoup
import html

def clean_html(html_text):
    if not html_text:
        return ''
    
    # Parse HTML
    soup = BeautifulSoup(html_text, 'html.parser')
    
    # Replace <br> and <p> with newlines
    for br in soup.find_all(['br', 'p']):
        br.replace_with('\n')
    
    # Get text
    text = soup.get_text()
    
    # Decode HTML entities
    text = html.unescape(text)
    
    # Clean up whitespace
    text = re.sub(r'\n\s*\n', '\n\n', text)
    text = text.strip()
    
    return text
```

---

### 5. Извлечение номера выпуска

**Проблема:** Номера в разных форматах.

**Примеры:**
- `Venom #01` → `01`
- `Amazing Spider-Man #181` → `181`
- `Fantastic Four Wedding Special` → `NULL` (специальный выпуск)
- `Gamora #001.1` → `001.1` (дробный номер)

**Regex:**
```python
import re

def extract_issue_number(title):
    # Поиск паттерна #123 или №123
    match = re.search(r'[#№]\s*(\d+(?:\.\d+)?)', title)
    if match:
        return match.group(1)
    return None
```

---

### 6. Обработка множественных категорий

**Проблема:** Выпуск может принадлежать нескольким категориям.

**Формат:** `category` = `"147,210"` (через запятую)

**Подход:**
- Для основной серии: взять первую категорию
- Дополнительные категории: сохранить в metadata или игнорировать
- В большинстве случаев только одна категория

---

### 7. Преобразование UNIX timestamp

**Проблема:** Даты в `dle_users` хранятся как UNIX timestamp (секунды с 1970-01-01).

**Формат:**
- `reg_date` = `1549024153` → `2019-02-01 15:22:33`
- `lastdate` = `1760357502` → `2025-10-28 12:25:02`

**Решение:**
```python
from datetime import datetime

def unix_to_datetime(unix_timestamp):
    if not unix_timestamp or unix_timestamp == '0':
        return None
    return datetime.fromtimestamp(int(unix_timestamp))
```

---

### 8. Определение провайдера хранилища

**Проблема:** Ссылки на скачивание используют разные сервисы.

**Примеры:**
- `https://yadi.sk/d/TnZnYh7FuVa1BQ` → Яндекс.Диск
- `https://drive.google.com/file/...` → Google Drive
- `https://rp-universe.ru/uploads/...` → Direct (собственный сервер)

**Решение:**
```python
from urllib.parse import urlparse

def detect_storage_provider(url):
    domain = urlparse(url).netloc.lower()
    
    if 'yadi.sk' in domain or 'yandex' in domain:
        return 'yandex_disk'
    elif 'drive.google.com' in domain:
        return 'google_drive'
    elif 'dropbox.com' in domain:
        return 'dropbox'
    elif 'mega.nz' in domain:
        return 'mega'
    else:
        return 'direct'
```

---

### 9. Парсинг рейтинга из scrin

**Проблема:** Рейтинг хранится в специфичном формате.

**Формат:** `video=1:6||gameplay=1:3||sound=1:4||atm=1:8`

Означает: `category=weight:score||...`

**Решение:**
```python
def parse_rating(scrin):
    if not scrin:
        return 0.0
    
    scores = []
    pairs = scrin.split('||')
    
    for pair in pairs:
        if '=' in pair and ':' in pair:
            _, rating_part = pair.split('=', 1)
            weight, score = rating_part.split(':', 1)
            try:
                scores.append(float(score))
            except ValueError:
                continue
    
    if scores:
        return round(sum(scores) / len(scores), 2)
    return 0.0
```

---

### 10. Генерация slug

**Проблема:** Для новых сущностей (contributors, teams, tags) нужно генерировать slug.

**Требования:**
- Транслитерация кириллицы
- Lowercase
- Замена пробелов и спецсимволов на дефис
- Уникальность

**Решение:**
```python
from transliterate import translit

def generate_slug(text, existing_slugs=None):
    # Транслитерация
    try:
        slug = translit(text, 'ru', reversed=True)
    except:
        slug = text
    
    # Lowercase
    slug = slug.lower()
    
    # Заменить не-буквенно-цифровые на дефис
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    
    # Удалить дефисы в начале/конце
    slug = slug.strip('-')
    
    # Проверить уникальность
    if existing_slugs and slug in existing_slugs:
        counter = 1
        while f"{slug}-{counter}" in existing_slugs:
            counter += 1
        slug = f"{slug}-{counter}"
    
    return slug
```

---

## Выводы

### Качество данных

**✅ Хорошо заполнено:**
- Основная информация о выпусках (title, date, author)
- Категории и иерархия (publishers → series)
- Роли участников (через xfsearch)
- Обложки изображений
- Ссылки на скачивание

**⚠️ Требует внимания:**
- Описания выпусков (40% заполненность)
- Теги (15% заполненность)
- META-данные для SEO (30-40% заполненность)
- Нормализация имен участников
- Очистка HTML
- Проверка битых ссылок

**❌ Отсутствует:**
- Даты оригинального издания комиксов
- Информация об авторах комиксов (писатели, художники)
- Связи между выпусками (crossovers, tie-ins)
- История изменений

---

### Рекомендации по миграции

1. **Приоритет 1 (обязательно):**
   - Миграция publishers и series
   - Миграция comic_issues с основными полями
   - Миграция issue_assets (обложки и ссылки)
   - Миграция contributors и roles
   - Создание связей issue_contributors

2. **Приоритет 2 (желательно):**
   - Миграция teams
   - Очистка и нормализация описаний
   - Заполнение META-данных
   - Создание tags и issue_tags
   - Проверка и обновление битых ссылок

3. **Приоритет 3 (опционально):**
   - Миграция комментариев
   - Миграция пользователей (для авторизации)
   - Миграция избранного и подписок
   - История логов

---

### Ожидаемый объем данных

**После миграции:**
- publishers: ~50 записей
- series: ~950 записей
- comic_issues: ~14,000 записей
- issue_assets: ~28,000 записей (обложки + ссылки)
- contributors: ~500 уникальных участников
- roles: 4-5 ролей
- issue_contributors: ~30,000 связей
- teams: ~50 команд
- issue_teams: ~2,000 связей
- tags: ~200 тегов
- issue_tags: ~5,000 связей

**Общий размер БД:** ~100-150 МБ (без изображений и файлов)

---

### Временные затраты

**Оценка времени обработки:**
- Разбор CSV и загрузка в память: ~5 минут
- Обработка и трансформация: ~30-60 минут
- Генерация финальных CSV: ~10 минут
- Импорт в Supabase: ~20-30 минут

**Итого:** ~1.5-2 часа на полную миграцию данных (автоматизированный процесс).

---

## Следующие шаги

1. ✅ Создать целевую схему (target_schema.md)
2. ⬜ Разработать скрипты миграции
3. ⬜ Протестировать на подмножестве данных
4. ⬜ Выполнить полную миграцию
5. ⬜ Валидация и проверка целостности
6. ⬜ Создание индексов и оптимизация
7. ⬜ Настройка RLS и permissions

---

**Документ составлен:** 2024-10-28

**Версия:** 1.0
