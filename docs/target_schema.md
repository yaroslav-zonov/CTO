# Целевая схема базы данных Supabase

## Оглавление
1. [Обзор](#обзор)
2. [Диаграмма взаимосвязей (ER-диаграмма)](#диаграмма-взаимосвязей-er-диаграмма)
3. [Описание таблиц](#описание-таблиц)
4. [Мэппинг полей](#мэппинг-полей)
5. [Правила трансформации данных](#правила-трансформации-данных)
6. [Формат CSV для импорта](#формат-csv-для-импорта)
7. [Индексы и ограничения](#индексы-и-ограничения)

---

## Обзор

Целевая схема предназначена для хранения данных о комиксах, переведенных на русский язык. Схема нормализована и разделяет данные на логические сущности:
- **Издатели** (publishers) - Marvel, DC, Dark Horse и т.д.
- **Серии** (series) - Amazing Spider-Man, Venom, Fantastic Four и т.д.
- **Выпуски** (comic_issues) - отдельные номера комиксов
- **Ресурсы выпусков** (issue_assets) - обложки, ссылки на скачивание
- **Участники** (contributors) - переводчики, редакторы, оформители, тайперы
- **Роли** (roles) - типы участия (переводчик, редактор и т.д.)
- **Команды** (teams) - группы переводчиков
- **Теги** (tags) - метки для категоризации

---

## Диаграмма взаимосвязей (ER-диаграмма)

```
┌─────────────────┐
│   publishers    │
│─────────────────│
│ id (PK)         │
│ name            │
│ slug            │
│ description     │
│ status          │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐
│     series      │
│─────────────────│
│ id (PK)         │
│ publisher_id(FK)│
│ name            │
│ slug            │
│ description     │
│ year_start      │
│ issue_count     │
│ cover_image     │
│ status          │
│ created_at      │
│ updated_at      │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────────┐
│   comic_issues      │
│─────────────────────│
│ id (PK)             │
│ series_id (FK)      │
│ dle_post_id (legacy)│
│ title               │
│ slug                │
│ issue_number        │
│ volume_number       │
│ story_title         │
│ description         │
│ description_html    │
│ published_date      │
│ posted_date         │
│ author              │
│ keywords            │
│ rating              │
│ view_count          │
│ comment_count       │
│ created_at          │
│ updated_at          │
└──────┬──────────────┘
       │
       │ 1:N
       │
┌──────▼────────────────┐       ┌────────────────┐
│   issue_assets        │       │     roles      │
│───────────────────────│       │────────────────│
│ id (PK)               │       │ id (PK)        │
│ issue_id (FK)         │       │ name           │
│ asset_type            │       │ display_name   │
│ url                   │       │ description    │
│ file_name             │       │ created_at     │
│ file_size             │       └────────┬───────┘
│ mime_type             │                │
│ display_order         │                │
│ created_at            │                │
└───────────────────────┘                │
                                         │
┌────────────────┐                       │
│  contributors  │                       │
│────────────────│                       │
│ id (PK)        │                       │
│ name           │                       │
│ normalized_name│                       │
│ dle_user_id(FK)│                       │
│ bio            │                       │
│ created_at     │                       │
└────────┬───────┘                       │
         │                               │
         │                               │
         └──────────┐           ┌────────┘
                    │           │
                    │ N:M       │
            ┌───────▼───────────▼───┐
            │ issue_contributors    │
            │───────────────────────│
            │ id (PK)               │
            │ issue_id (FK)         │
            │ contributor_id (FK)   │
            │ role_id (FK)          │
            │ display_order         │
            │ created_at            │
            └───────────────────────┘

┌────────────────┐          ┌──────────────────┐
│     teams      │          │      tags        │
│────────────────│          │──────────────────│
│ id (PK)        │          │ id (PK)          │
│ name           │          │ name             │
│ description    │          │ slug             │
│ website        │          │ created_at       │
│ created_at     │          └────────┬─────────┘
└────────┬───────┘                   │
         │                           │
         │ N:M                       │ N:M
         │                           │
┌────────▼────────────┐     ┌────────▼──────────┐
│   issue_teams       │     │   issue_tags      │
│─────────────────────│     │───────────────────│
│ id (PK)             │     │ id (PK)           │
│ issue_id (FK)       │     │ issue_id (FK)     │
│ team_id (FK)        │     │ tag_id (FK)       │
│ contribution_type   │     │ created_at        │
│ created_at          │     └───────────────────┘
└─────────────────────┘
```

---

## Описание таблиц

### 1. publishers (Издатели)

Хранит информацию о издательских компаниях комиксов.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| name | VARCHAR(255) | Да | UNIQUE | Название издателя |
| slug | VARCHAR(255) | Да | UNIQUE | URL-совместимое имя |
| description | TEXT | Нет | - | Полное описание издателя |
| logo_url | VARCHAR(500) | Нет | - | URL логотипа |
| website | VARCHAR(255) | Нет | - | Официальный сайт |
| status | VARCHAR(50) | Да | DEFAULT 'active' | Статус: active, inactive |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `name` - из поля `name` таблицы `dle_category` где `parentid=0`
- `slug` - из поля `alt_name` таблицы `dle_category`
- `description` - из поля `fulldescr` таблицы `dle_category`
- Извлечь статус из xfields категории (если есть поле `status`)

---

### 2. series (Серии)

Хранит информацию о сериях комиксов.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| publisher_id | UUID | Да | FOREIGN KEY | Ссылка на издателя |
| name | VARCHAR(500) | Да | - | Название серии |
| slug | VARCHAR(500) | Да | UNIQUE | URL-совместимое имя |
| original_name | VARCHAR(500) | Нет | - | Оригинальное название (если отличается) |
| description | TEXT | Нет | - | Описание серии |
| year_start | INTEGER | Нет | - | Год начала выпуска |
| year_end | INTEGER | Нет | - | Год окончания (если завершена) |
| issue_count | INTEGER | Нет | DEFAULT 0 | Общее количество выпусков |
| cover_image | VARCHAR(500) | Нет | - | URL обложки серии |
| status | VARCHAR(50) | Да | DEFAULT 'ongoing' | ongoing, completed, cancelled |
| translation_status | VARCHAR(100) | Нет | - | Статус перевода из DLE xfields |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `publisher_id` - связать через `parentid` из `dle_category`
- `name` - из поля `name` таблицы `dle_category` где `parentid != 0`
- `slug` - из поля `alt_name` таблицы `dle_category`
- `description` - из поля `fulldescr`, очистить HTML
- `year_start` - извлечь из названия серии (например, "Amazing Spider-Man (1963)" → 1963)
- `issue_count` - вычислить из xfields категории или подсчитать выпуски
- `translation_status` - из xfields категории (поле `status`)

---

### 3. comic_issues (Выпуски комиксов)

Хранит информацию об отдельных выпусках комиксов.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| series_id | UUID | Да | FOREIGN KEY | Ссылка на серию |
| dle_post_id | INTEGER | Нет | UNIQUE | ID из исходной таблицы dle_post |
| title | VARCHAR(500) | Да | - | Полное название выпуска |
| slug | VARCHAR(500) | Да | UNIQUE | URL-совместимое имя |
| issue_number | VARCHAR(50) | Нет | - | Номер выпуска (может быть дробным, например "001.1") |
| volume_number | VARCHAR(50) | Нет | - | Номер тома |
| story_title | VARCHAR(500) | Нет | - | Название истории внутри выпуска |
| description | TEXT | Нет | - | Описание (очищенное от HTML) |
| description_html | TEXT | Нет | - | Оригинальное описание с HTML |
| published_date | DATE | Нет | - | Дата оригинального издания |
| posted_date | TIMESTAMPTZ | Да | - | Дата публикации перевода |
| author | VARCHAR(100) | Нет | - | Автор публикации в DLE |
| keywords | TEXT | Нет | - | Ключевые слова для SEO |
| meta_title | VARCHAR(255) | Нет | - | SEO заголовок |
| meta_description | TEXT | Нет | - | SEO описание |
| rating | DECIMAL(3,2) | Нет | DEFAULT 0 | Рейтинг (0-10) |
| view_count | INTEGER | Нет | DEFAULT 0 | Количество просмотров |
| comment_count | INTEGER | Нет | DEFAULT 0 | Количество комментариев |
| allow_comments | BOOLEAN | Да | DEFAULT true | Разрешены ли комментарии |
| is_approved | BOOLEAN | Да | DEFAULT true | Опубликован ли выпуск |
| is_featured | BOOLEAN | Да | DEFAULT false | Избранный выпуск |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `series_id` - связать через `category` из `dle_post`
- `dle_post_id` - из поля `id` таблицы `dle_post`
- `title` - из поля `title` таблицы `dle_post`
- `slug` - из поля `alt_name` таблицы `dle_post`
- `issue_number` - извлечь из названия (например, "Venom #01" → "01")
- `volume_number` - извлечь из xfields (поле `volume|Том 4` → "4")
- `story_title` - из xfields (поле `story`)
- `description` - из `full_story`, удалить все HTML теги
- `description_html` - из `full_story` как есть
- `posted_date` - из поля `date` таблицы `dle_post`
- `author` - из поля `autor` таблицы `dle_post`
- `keywords` - из поля `keywords` таблицы `dle_post`
- `meta_title` - из поля `metatitle` таблицы `dle_post`
- `meta_description` - из поля `descr` таблицы `dle_post`
- `rating` - из поля `m_rating` или вычислить из поля `scrin`
- `comment_count` - из поля `comm_num` таблицы `dle_post`
- `allow_comments` - из поля `allow_comm` таблицы `dle_post`
- `is_approved` - из поля `approve` таблицы `dle_post`
- `is_featured` - из поля `fixed` таблицы `dle_post`

---

### 4. issue_assets (Ресурсы выпусков)

Хранит обложки, изображения и ссылки на скачивание для выпусков.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| issue_id | UUID | Да | FOREIGN KEY | Ссылка на выпуск |
| asset_type | VARCHAR(50) | Да | CHECK IN (...) | Тип: cover, download_link, reader_link, preview |
| url | VARCHAR(1000) | Да | - | Полный URL ресурса |
| file_name | VARCHAR(255) | Нет | - | Имя файла |
| file_size | BIGINT | Нет | - | Размер файла в байтах |
| mime_type | VARCHAR(100) | Нет | - | MIME-тип (image/jpeg, application/zip и т.д.) |
| thumbnail_url | VARCHAR(1000) | Нет | - | URL миниатюры (для обложек) |
| storage_provider | VARCHAR(50) | Нет | - | Провайдер: yandex_disk, google_drive, direct |
| display_order | INTEGER | Нет | DEFAULT 0 | Порядок отображения |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `issue_id` - связать с comic_issues
- `asset_type`:
  - `'cover'` - из поля `short_story` (извлечь URL изображения из HTML)
  - `'download_link'` - из xfields (поле `download`)
  - `'reader_link'` - из xfields (поле `reader`)
- `url` - извлечь из HTML или xfields
- `file_name` - извлечь из URL
- `thumbnail_url` - для обложек: из URL с "/medium/" в пути
- `storage_provider` - определить по домену URL (yadi.sk → yandex_disk)
- `display_order` - порядковый номер для множественных ресурсов

**Извлечение URL из HTML:**
```
Input: <a class="highslide" href="https://rp-universe.ru/uploads/posts/2019-12/1577616259_venom-2018-001-000.jpg">
       <img src="https://rp-universe.ru/uploads/posts/2019-12/medium/1577616259_venom-2018-001-000.jpg">
       </a>

Output:
- url: https://rp-universe.ru/uploads/posts/2019-12/1577616259_venom-2018-001-000.jpg
- thumbnail_url: https://rp-universe.ru/uploads/posts/2019-12/medium/1577616259_venom-2018-001-000.jpg
```

---

### 5. contributors (Участники)

Хранит информацию о людях, работающих над переводами.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| name | VARCHAR(255) | Да | - | Отображаемое имя |
| normalized_name | VARCHAR(255) | Да | UNIQUE | Нормализованное имя для поиска |
| dle_user_id | INTEGER | Нет | - | ID пользователя из dle_users (если есть) |
| email | VARCHAR(255) | Нет | - | Email адрес |
| bio | TEXT | Нет | - | Биография |
| avatar_url | VARCHAR(500) | Нет | - | URL аватара |
| website | VARCHAR(255) | Нет | - | Личный сайт |
| is_active | BOOLEAN | Да | DEFAULT true | Активен ли участник |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `name` - из поля `tagvalue` таблицы `dle_xfsearch`
- `normalized_name` - нормализованное имя (lowercase, trim, удалить спецсимволы)
- `dle_user_id` - связать с `user_id` из `dle_users` по совпадению имени
- `email`, `bio`, `avatar_url` - из таблицы `dle_users` если найдено соответствие

**Нормализация имен:**
- Привести к нижнему регистру
- Удалить лишние пробелы
- Обрабатывать алиасы (например: "Xailex" = "xailex" = "XAILEX")
- Для объединения дубликатов использовать normalized_name

---

### 6. roles (Роли)

Справочник типов ролей участников.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| name | VARCHAR(100) | Да | UNIQUE | Системное имя роли |
| display_name | VARCHAR(100) | Да | - | Отображаемое название |
| description | TEXT | Нет | - | Описание роли |
| display_order | INTEGER | Нет | DEFAULT 0 | Порядок отображения |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |

**Предопределенные роли:**

| name | display_name | description |
|------|--------------|-------------|
| translator | Переводчик | Перевод текста комикса с оригинального языка |
| editor | Редактор | Редактура и корректура перевода |
| designer | Оформитель | Вёрстка и графическое оформление |
| typer | Тайпер | Набор текста и вставка в изображения |
| proofreader | Корректор | Проверка орфографии и пунктуации |

**Маппинг из DLE:**
- `perevodchik` → `translator`
- `redaktor` → `editor`
- `oformlenie` → `designer`
- `taiper` → `typer`

---

### 7. issue_contributors (Связь выпусков и участников)

Связывает выпуски с участниками и их ролями (many-to-many).

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| issue_id | UUID | Да | FOREIGN KEY | Ссылка на выпуск |
| contributor_id | UUID | Да | FOREIGN KEY | Ссылка на участника |
| role_id | UUID | Да | FOREIGN KEY | Ссылка на роль |
| display_order | INTEGER | Нет | DEFAULT 0 | Порядок отображения |
| notes | TEXT | Нет | - | Дополнительные заметки |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |

**Ограничения:**
- UNIQUE(issue_id, contributor_id, role_id) - один участник не может иметь одну и ту же роль в выпуске дважды

**Правила заполнения:**
- Извлечь из таблицы `dle_xfsearch` где:
  - `news_id` → `issue_id`
  - `tagname` → найти соответствующий `role_id`
  - `tagvalue` → найти или создать `contributor_id`
- Если в xfields поле содержит несколько значений через запятую (например: "redaktor|Валя, rurumiya"), создать отдельные записи для каждого

---

### 8. teams (Команды)

Хранит информацию о командах переводчиков.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| name | VARCHAR(255) | Да | UNIQUE | Название команды |
| slug | VARCHAR(255) | Да | UNIQUE | URL-совместимое имя |
| description | TEXT | Нет | - | Описание команды |
| logo_url | VARCHAR(500) | Нет | - | URL логотипа |
| website | VARCHAR(255) | Нет | - | Сайт команды |
| is_active | BOOLEAN | Да | DEFAULT true | Активна ли команда |
| metadata | JSONB | Нет | - | Дополнительные метаданные |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `name` - из xfields полей `team` или `together`
- `slug` - сгенерировать из имени (транслитерация + lowercase)

**Известные команды из данных:**
- Comics Maniac Project
- Comixopolis
- Comics Translate Inc.
- RusX

---

### 9. issue_teams (Связь выпусков и команд)

Связывает выпуски с командами (many-to-many).

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| issue_id | UUID | Да | FOREIGN KEY | Ссылка на выпуск |
| team_id | UUID | Да | FOREIGN KEY | Ссылка на команду |
| contribution_type | VARCHAR(50) | Нет | - | Тип вклада: translation, collaboration |
| notes | TEXT | Нет | - | Дополнительные заметки |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |

**Ограничения:**
- UNIQUE(issue_id, team_id)

**Правила заполнения:**
- Извлечь из xfields:
  - `team` → contribution_type='translation'
  - `together` → contribution_type='collaboration'

---

### 10. tags (Теги)

Справочник тегов для категоризации выпусков.

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| name | VARCHAR(100) | Да | UNIQUE | Название тега |
| slug | VARCHAR(100) | Да | UNIQUE | URL-совместимое имя |
| description | TEXT | Нет | - | Описание тега |
| usage_count | INTEGER | Нет | DEFAULT 0 | Количество использований |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |
| updated_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата последнего обновления |

**Правила заполнения:**
- `name` - из поля `tags` таблицы `dle_post` (разделенные запятыми)
- `slug` - сгенерировать из имени
- `usage_count` - подсчитать количество связей

---

### 11. issue_tags (Связь выпусков и тегов)

Связывает выпуски с тегами (many-to-many).

| Столбец | Тип | Обязательное | Ограничения | Описание |
|---------|-----|--------------|-------------|----------|
| id | UUID | Да | PRIMARY KEY | Уникальный идентификатор |
| issue_id | UUID | Да | FOREIGN KEY | Ссылка на выпуск |
| tag_id | UUID | Да | FOREIGN KEY | Ссылка на тег |
| created_at | TIMESTAMPTZ | Да | DEFAULT NOW() | Дата создания записи |

**Ограничения:**
- UNIQUE(issue_id, tag_id)

**Правила заполнения:**
- Разобрать поле `tags` из `dle_post` по запятым
- Создать или найти теги
- Создать связи

---

## Мэппинг полей

### Таблица: publishers

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| name | DLE | dle_category | name | Где parentid = 0 |
| slug | DLE | dle_category | alt_name | Где parentid = 0 |
| description | DLE | dle_category | fulldescr | Очистить HTML, убрать <br> |
| logo_url | DLE | dle_category | icon | Полный URL |
| website | - | - | - | NULL (нет в источнике) |
| status | DLE | dle_category | xfields | Извлечь "status" или DEFAULT 'active' |
| metadata | DLE | dle_category | * | JSON с дополнительными полями |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: series

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| publisher_id | DLE | dle_category | parentid | Найти publisher по parentid |
| name | DLE | dle_category | name | Где parentid != 0 |
| slug | DLE | dle_category | alt_name | Где parentid != 0 |
| original_name | - | - | - | Извлечь из скобок в name |
| description | DLE | dle_category | fulldescr | Очистить HTML |
| year_start | DLE | dle_category | name | Regex: \((\d{4})\) |
| year_end | - | - | - | NULL (нет в источнике) |
| issue_count | DLE | dle_category | xfields | Извлечь "number-com" или COUNT выпусков |
| cover_image | DLE | dle_category | icon | Полный URL |
| status | - | - | - | DEFAULT 'ongoing' |
| translation_status | DLE | dle_category | xfields | Извлечь "status" |
| metadata | DLE | dle_category | * | JSON с дополнительными полями |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: comic_issues

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| series_id | DLE | dle_post | category | Найти series по category |
| dle_post_id | DLE | dle_post | id | Для обратной совместимости |
| title | DLE | dle_post | title | Как есть |
| slug | DLE | dle_post | alt_name | Как есть |
| issue_number | DLE | dle_post | title | Regex: #(\d+(?:\.\d+)?) |
| volume_number | DLE | dle_post | xfields | Извлечь "volume\|Том N" |
| story_title | DLE | dle_post | xfields | Извлечь "story\|..." |
| description | DLE | dle_post | full_story | Удалить все HTML теги |
| description_html | DLE | dle_post | full_story | Как есть |
| published_date | - | - | - | NULL (нет в источнике) |
| posted_date | DLE | dle_post | date | Преобразовать в TIMESTAMPTZ |
| author | DLE | dle_post | autor | Как есть |
| keywords | DLE | dle_post | keywords | Как есть |
| meta_title | DLE | dle_post | metatitle | Как есть |
| meta_description | DLE | dle_post | descr | Как есть |
| rating | DLE | dle_post | m_rating / scrin | Парсить числовое значение |
| view_count | - | - | - | 0 (нет в источнике) |
| comment_count | DLE | dle_post | comm_num | Как есть |
| allow_comments | DLE | dle_post | allow_comm | 1 → true, 0 → false |
| is_approved | DLE | dle_post | approve | 1 → true, 0 → false |
| is_featured | DLE | dle_post | fixed | 1 → true, 0 → false |
| metadata | DLE | dle_post | * | JSON с дополнительными полями |
| created_at | DLE | dle_post | date | Преобразовать в TIMESTAMPTZ |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: issue_assets

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| issue_id | DLE | dle_post | id | Связать с comic_issues |
| asset_type | - | - | - | 'cover' / 'download_link' / 'reader_link' |
| url | DLE | dle_post | short_story / xfields | Извлечь из HTML или xfields |
| file_name | - | - | - | Извлечь из URL (последняя часть) |
| file_size | - | - | - | NULL (нет в источнике) |
| mime_type | - | - | - | Определить по расширению |
| thumbnail_url | DLE | dle_post | short_story | Извлечь из <img src="..."> |
| storage_provider | - | - | - | Определить по домену |
| display_order | - | - | - | Порядковый номер |
| metadata | - | - | - | JSON с дополнительной информацией |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

**Извлечение обложки:**
```
Input (short_story): <a class="highslide" href="URL1"><img src="URL2"></a>
Output:
  - asset_type = 'cover'
  - url = URL1 (полноразмерное изображение)
  - thumbnail_url = URL2 (миниатюра)
```

**Извлечение ссылок на скачивание:**
```
Input (xfields): download|https://yadi.sk/d/TnZnYh7FuVa1BQ||reader|
Output:
  - asset_type = 'download_link'
  - url = https://yadi.sk/d/TnZnYh7FuVa1BQ
  - storage_provider = 'yandex_disk'
```

---

### Таблица: contributors

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| name | DLE | dle_xfsearch | tagvalue | Уникальные значения |
| normalized_name | DLE | dle_xfsearch | tagvalue | Lowercase, trim, спецсимволы |
| dle_user_id | DLE | dle_users | user_id | Найти по совпадению имени |
| email | DLE | dle_users | email | Если найдено соответствие |
| bio | DLE | dle_users | info | Если найдено соответствие |
| avatar_url | DLE | dle_users | foto | Полный URL, если найдено |
| website | DLE | dle_users | land | Если найдено соответствие |
| is_active | - | - | - | DEFAULT true |
| metadata | - | - | - | JSON с дополнительными данными |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

**Алгоритм сопоставления с пользователями:**
1. Нормализовать имя участника из xfsearch
2. Нормализовать имена всех пользователей из dle_users (поле `name` и `fullname`)
3. Сопоставить по normalized_name
4. Если найдено совпадение, заполнить дополнительные поля

---

### Таблица: roles

Предзаполненная таблица, не требует мэппинга из DLE. Создается при инициализации схемы.

---

### Таблица: issue_contributors

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| issue_id | DLE | dle_xfsearch | news_id | Связать с comic_issues |
| contributor_id | DLE | dle_xfsearch | tagvalue | Найти contributor по имени |
| role_id | DLE | dle_xfsearch | tagname | Маппинг: perevodchik→translator и т.д. |
| display_order | - | - | - | Порядковый номер |
| notes | - | - | - | NULL |
| created_at | - | - | - | CURRENT_TIMESTAMP |

**Обработка множественных значений:**
```
Input: news_id=2673, tagname=redaktor, tagvalue="Валя, Xailex"
Output: 2 записи:
  - issue_id=..., contributor_id=Валя, role_id=editor, display_order=1
  - issue_id=..., contributor_id=Xailex, role_id=editor, display_order=2
```

---

### Таблица: teams

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| name | DLE | dle_xfsearch | tagvalue | Где tagname IN ('team', 'together') |
| slug | - | - | - | Транслитерация + lowercase |
| description | - | - | - | NULL (нет в источнике) |
| logo_url | - | - | - | NULL (нет в источнике) |
| website | - | - | - | NULL (нет в источнике) |
| is_active | - | - | - | DEFAULT true |
| metadata | - | - | - | JSON |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: issue_teams

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| issue_id | DLE | dle_xfsearch | news_id | Связать с comic_issues |
| team_id | DLE | dle_xfsearch | tagvalue | Найти team по имени |
| contribution_type | DLE | dle_xfsearch | tagname | 'team'→'translation', 'together'→'collaboration' |
| notes | - | - | - | NULL |
| created_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: tags

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| name | DLE | dle_post | tags | Разделить по запятым |
| slug | - | - | - | Транслитерация + lowercase |
| description | - | - | - | NULL (нет в источнике) |
| usage_count | - | - | - | COUNT связей |
| created_at | - | - | - | CURRENT_TIMESTAMP |
| updated_at | - | - | - | CURRENT_TIMESTAMP |

---

### Таблица: issue_tags

| Целевое поле | Источник | Таблица | Поле | Трансформация |
|--------------|----------|---------|------|---------------|
| id | - | - | - | UUID генерация |
| issue_id | DLE | dle_post | id | Связать с comic_issues |
| tag_id | DLE | dle_post | tags | Найти tag по имени |
| created_at | - | - | - | CURRENT_TIMESTAMP |

---

## Правила трансформации данных

### 1. Парсинг xfields (пользовательские поля)

Формат: `key1|value1||key2|value2||key3|value3`

**Алгоритм:**
1. Разделить строку по `||`
2. Для каждой части разделить по первому `|`
3. Создать словарь key-value

**Пример:**
```
Input: "volume|Том 4||perevodchik|vantus||oformlenie|jimjack||taiper|Overlord"
Output:
{
  "volume": "Том 4",
  "perevodchik": "vantus",
  "oformlenie": "jimjack",
  "taiper": "Overlord"
}
```

**Ключи xfields и их назначение:**
- `volume` → volume_number (извлечь число)
- `story` → story_title
- `perevodchik` → contributor с ролью translator
- `oformlenie` → contributor с ролью designer
- `taiper` → contributor с ролью typer
- `redaktor` → contributor с ролью editor
- `download` → issue_assets (download_link)
- `reader` → issue_assets (reader_link)
- `team` → teams + issue_teams
- `together` → teams + issue_teams (collaboration)

---

### 2. Извлечение URL изображений из HTML

**Формат short_story:**
```html
<a class="highslide" href="FULL_URL">
  <img src="THUMBNAIL_URL" class="fr-fic fr-dib" alt="">
</a>
```

**Алгоритм:**
1. Найти все теги `<a>` с атрибутом `href`
2. Извлечь URL из `href` (полноразмерное изображение)
3. Найти вложенный `<img>` и извлечь URL из `src` (миниатюра)
4. Если несколько изображений, создать отдельные записи с display_order

**Регулярное выражение:**
```regex
<a[^>]+href=["']([^"']+)["'][^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["']
```

---

### 3. Очистка HTML из описаний

**Правила:**
1. Удалить все HTML теги: `<p>`, `<br>`, `<b>`, `<i>`, `<a>`, и т.д.
2. Заменить `<br>` и `<br />` на перевод строки `\n`
3. Декодировать HTML entities: `&quot;` → `"`, `&#039;` → `'`, и т.д.
4. Удалить лишние пробелы и переводы строк
5. Обрезать пробелы в начале и конце

**Пример:**
```
Input: "<p>Рид, Сью и дети из Фонда Будущего всё ещё утеряны...</p><br><p>Меж тем...</p>"
Output: "Рид, Сью и дети из Фонда Будущего всё ещё утеряны...\n\nМеж тем..."
```

---

### 4. Генерация slug

**Правила:**
1. Если в источнике есть `alt_name`, использовать его
2. Иначе сгенерировать:
   - Транслитерация кириллицы в латиницу
   - Привести к нижнему регистру
   - Заменить пробелы и спецсимволы на дефис
   - Удалить повторяющиеся дефисы
   - Обрезать дефисы в начале и конце
3. Проверить уникальность, добавить суффикс при необходимости

**Таблица транслитерации:**
```
а→a, б→b, в→v, г→g, д→d, е→e, ё→yo, ж→zh, з→z, и→i, й→y,
к→k, л→l, м→m, н→n, о→o, п→p, р→r, с→s, т→t, у→u, ф→f,
х→h, ц→ts, ч→ch, ш→sh, щ→sch, ъ→, ы→y, ь→, э→e, ю→yu, я→ya
```

**Пример:**
```
Input: "Фантастическая Четвёрка #01"
Output: "fantasticheskaya-chetvyorka-01"
```

---

### 5. Извлечение номера выпуска

**Алгоритм:**
1. Поиск в названии паттернов: `#001`, `#01`, `#1`, `№001`, etc.
2. Регулярное выражение: `[#№]\s*(\d+(?:\.\d+)?)`
3. Убрать ведущие нули для хранения (но сохранить формат в metadata)
4. Поддержка дробных номеров: `#001.1`, `#12.5`

**Примеры:**
```
"Venom #01" → "01"
"Amazing Spider-Man #181" → "181"
"Fantastic Four Wedding Special" → NULL (одиночный выпуск)
```

---

### 6. Извлечение номера тома

**Источник:** поле `volume` в xfields

**Формат:** `Том N`, `Том N: Название`, `Лимитированная серия`, `Одиночный выпуск`

**Алгоритм:**
1. Найти паттерн: `Том\s+(\d+)`
2. Извлечь число
3. Особые случаи:
   - "Лимитированная серия" → "Limited"
   - "Одиночный выпуск" → "One-shot"

**Примеры:**
```
"Том 4" → "4"
"Том 6: Herald of Thunder" → "6"
"Лимитированная серия" → "Limited"
"Одиночный выпуск" → "One-shot"
```

---

### 7. Нормализация дат

**Источник:** поле `date` в формате `YYYY-MM-DD HH:MM:SS`

**Преобразование:**
1. Парсинг строки в timestamp
2. Добавление часового пояса (UTC или московское время)
3. Конвертация в PostgreSQL TIMESTAMPTZ

**Пример:**
```
Input: "2018-06-04 15:29:13"
Output: "2018-06-04T15:29:13+03:00" (если московское время)
```

---

### 8. Обработка множественных значений в xfields

**Проблема:** В полях типа `redaktor` могут быть несколько имен через запятую.

**Формат:** `redaktor|Валя, rurumiya||...`

**Алгоритм:**
1. Разделить значение по запятым
2. Для каждого имени:
   - Trim пробелы
   - Создать или найти contributor
   - Создать отдельную запись в issue_contributors

**Пример:**
```
Input: "redaktor|Валя, rurumiya, Xailex"
Output: 3 записи в issue_contributors с role=editor:
  - contributor: "Валя", display_order: 1
  - contributor: "rurumiya", display_order: 2
  - contributor: "Xailex", display_order: 3
```

---

### 9. Определение провайдера хранилища

**По домену URL:**

| Домен | storage_provider |
|-------|------------------|
| yadi.sk, yandex.ru/disk | yandex_disk |
| drive.google.com | google_drive |
| dropbox.com | dropbox |
| mega.nz | mega |
| rp-universe.ru/uploads | direct |
| sleep-com.ru/uploads | direct |

---

### 10. Обработка рейтинга

**Источник:** поля `m_rating` или `scrin` в dle_post

**Формат:**
- `m_rating`: может быть пустым или содержать строку
- `scrin`: формат `field=value:rating||field=value:rating`

**Примеры scrin:**
```
"video=1:6||gameplay=1:3||sound=1:4||atm=1:8"
```

**Алгоритм:**
1. Если `m_rating` не пустой, попытаться извлечь число
2. Иначе парсить `scrin` и вычислить среднее по всем категориям
3. Нормализовать к шкале 0-10
4. Округлить до 2 знаков после запятой

---

### 11. Нормализация имен участников

**Цель:** Объединить записи с одинаковыми именами в разных регистрах и написаниях.

**Правила:**
1. Привести к нижнему регистру
2. Удалить пробелы в начале и конце
3. Заменить множественные пробелы на один
4. Удалить спецсимволы (кроме букв, цифр, дефисов, подчёркиваний)

**Алиасы (manual mapping):**
```
"Xailex" = "xailex" = "XAILEX"
"FlaimZ" = "flaimz" = "FLAIMz"
"Oleg-D" = "oleg-d" = "OlegD"
```

**Алгоритм:**
1. Создать normalized_name для каждого уникального имени
2. Группировать по normalized_name
3. Выбрать основной вариант написания (самый частый)
4. Сохранить альтернативные написания в metadata

---

## Формат CSV для импорта

Все CSV файлы должны соответствовать следующим требованиям:
- **Кодировка:** UTF-8 (с BOM или без)
- **Разделитель:** запятая `,`
- **Экранирование:** двойные кавычки `"` для полей с запятыми/переводами строк
- **Заголовки:** первая строка содержит имена столбцов
- **Формат даты/времени:** ISO 8601 (`YYYY-MM-DDTHH:MM:SS+TZ` или `YYYY-MM-DD`)
- **NULL значения:** пустая строка или `\N`
- **Boolean:** `true`/`false` или `1`/`0`

### publishers.csv

```csv
id,name,slug,description,logo_url,website,status,metadata,created_at,updated_at
550e8400-e29b-41d4-a716-446655440001,Marvel,marvel,"Подразделение корпорации Marvel Entertainment...",,,active,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
550e8400-e29b-41d4-a716-446655440002,DC,dc,"Одно из крупнейших и наиболее популярных...",,,active,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

**Порядок столбцов:** как в определении таблицы

---

### series.csv

```csv
id,publisher_id,name,slug,original_name,description,year_start,year_end,issue_count,cover_image,status,translation_status,metadata,created_at,updated_at
650e8400-e29b-41d4-a716-446655440001,550e8400-e29b-41d4-a716-446655440001,Amazing Spider-Man (1963),amazing-spider-man-1963,,"Впервые, Человек-Паук появился...",1963,,441,/uploads/amazing-spider-man-1963.jpg,completed,Перевод завершён,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

---

### comic_issues.csv

```csv
id,series_id,dle_post_id,title,slug,issue_number,volume_number,story_title,description,description_html,published_date,posted_date,author,keywords,meta_title,meta_description,rating,view_count,comment_count,allow_comments,is_approved,is_featured,metadata,created_at,updated_at
750e8400-e29b-41d4-a716-446655440001,650e8400-e29b-41d4-a716-446655440001,1,Venom #01,venom-01,01,4,,"","",,2018-06-04T15:29:13+03:00,admin,"",,,0.00,0,0,true,true,false,{},2018-06-04T15:29:13+03:00,2024-10-28T15:00:00Z
```

**Важно:**
- Поле `description` - без HTML
- Поле `description_html` - с HTML (экранировать кавычки)
- Все UUID должны быть валидными

---

### issue_assets.csv

```csv
id,issue_id,asset_type,url,file_name,file_size,mime_type,thumbnail_url,storage_provider,display_order,metadata,created_at,updated_at
850e8400-e29b-41d4-a716-446655440001,750e8400-e29b-41d4-a716-446655440001,cover,https://rp-universe.ru/uploads/posts/2019-12/1577616259_venom-2018-001-000.jpg,1577616259_venom-2018-001-000.jpg,,image/jpeg,https://rp-universe.ru/uploads/posts/2019-12/medium/1577616259_venom-2018-001-000.jpg,direct,1,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
850e8400-e29b-41d4-a716-446655440002,750e8400-e29b-41d4-a716-446655440001,download_link,https://yadi.sk/d/TnZnYh7FuVa1BQ,,,,,yandex_disk,2,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

---

### contributors.csv

```csv
id,name,normalized_name,dle_user_id,email,bio,avatar_url,website,is_active,metadata,created_at,updated_at
950e8400-e29b-41d4-a716-446655440001,vantus,vantus,980,semyonov.johann@gmail.com,"",,,true,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
950e8400-e29b-41d4-a716-446655440002,jimjack,jimjack,,,,,,,true,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

---

### roles.csv

```csv
id,name,display_name,description,display_order,created_at
a50e8400-e29b-41d4-a716-446655440001,translator,Переводчик,Перевод текста комикса с оригинального языка,1,2024-10-28T15:00:00Z
a50e8400-e29b-41d4-a716-446655440002,editor,Редактор,Редактура и корректура перевода,2,2024-10-28T15:00:00Z
a50e8400-e29b-41d4-a716-446655440003,designer,Оформитель,Вёрстка и графическое оформление,3,2024-10-28T15:00:00Z
a50e8400-e29b-41d4-a716-446655440004,typer,Тайпер,Набор текста и вставка в изображения,4,2024-10-28T15:00:00Z
```

---

### issue_contributors.csv

```csv
id,issue_id,contributor_id,role_id,display_order,notes,created_at
b50e8400-e29b-41d4-a716-446655440001,750e8400-e29b-41d4-a716-446655440001,950e8400-e29b-41d4-a716-446655440001,a50e8400-e29b-41d4-a716-446655440001,1,,2024-10-28T15:00:00Z
```

---

### teams.csv

```csv
id,name,slug,description,logo_url,website,is_active,metadata,created_at,updated_at
c50e8400-e29b-41d4-a716-446655440001,Comics Maniac Project,comics-maniac-project,,,,true,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
c50e8400-e29b-41d4-a716-446655440002,RusX,rusx,,,,true,{},2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

---

### issue_teams.csv

```csv
id,issue_id,team_id,contribution_type,notes,created_at
d50e8400-e29b-41d4-a716-446655440001,750e8400-e29b-41d4-a716-446655440001,c50e8400-e29b-41d4-a716-446655440001,translation,,2024-10-28T15:00:00Z
```

---

### tags.csv

```csv
id,name,slug,description,usage_count,created_at,updated_at
e50e8400-e29b-41d4-a716-446655440001,Веном,venom,,15,2024-10-28T15:00:00Z,2024-10-28T15:00:00Z
```

---

### issue_tags.csv

```csv
id,issue_id,tag_id,created_at
f50e8400-e29b-41d4-a716-446655440001,750e8400-e29b-41d4-a716-446655440001,e50e8400-e29b-41d4-a716-446655440001,2024-10-28T15:00:00Z
```

---

## Индексы и ограничения

### Первичные ключи (PRIMARY KEY)

Все таблицы используют UUID как первичный ключ:
```sql
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

---

### Внешние ключи (FOREIGN KEY)

```sql
-- series.publisher_id
ALTER TABLE series
ADD CONSTRAINT fk_series_publisher
FOREIGN KEY (publisher_id) REFERENCES publishers(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- comic_issues.series_id
ALTER TABLE comic_issues
ADD CONSTRAINT fk_issues_series
FOREIGN KEY (series_id) REFERENCES series(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- issue_assets.issue_id
ALTER TABLE issue_assets
ADD CONSTRAINT fk_assets_issue
FOREIGN KEY (issue_id) REFERENCES comic_issues(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- issue_contributors.issue_id
ALTER TABLE issue_contributors
ADD CONSTRAINT fk_issue_contrib_issue
FOREIGN KEY (issue_id) REFERENCES comic_issues(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- issue_contributors.contributor_id
ALTER TABLE issue_contributors
ADD CONSTRAINT fk_issue_contrib_contributor
FOREIGN KEY (contributor_id) REFERENCES contributors(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- issue_contributors.role_id
ALTER TABLE issue_contributors
ADD CONSTRAINT fk_issue_contrib_role
FOREIGN KEY (role_id) REFERENCES roles(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- issue_teams.issue_id
ALTER TABLE issue_teams
ADD CONSTRAINT fk_issue_team_issue
FOREIGN KEY (issue_id) REFERENCES comic_issues(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- issue_teams.team_id
ALTER TABLE issue_teams
ADD CONSTRAINT fk_issue_team_team
FOREIGN KEY (team_id) REFERENCES teams(id)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- issue_tags.issue_id
ALTER TABLE issue_tags
ADD CONSTRAINT fk_issue_tag_issue
FOREIGN KEY (issue_id) REFERENCES comic_issues(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- issue_tags.tag_id
ALTER TABLE issue_tags
ADD CONSTRAINT fk_issue_tag_tag
FOREIGN KEY (tag_id) REFERENCES tags(id)
ON DELETE RESTRICT ON UPDATE CASCADE;
```

**Политика ON DELETE:**
- `CASCADE` - для связующих таблиц и зависимых ресурсов (assets, contributors, teams, tags)
- `RESTRICT` - для основных связей (series→publishers, issues→series) для предотвращения случайного удаления

---

### Уникальные ограничения (UNIQUE)

```sql
-- publishers
ALTER TABLE publishers ADD CONSTRAINT uq_publishers_name UNIQUE (name);
ALTER TABLE publishers ADD CONSTRAINT uq_publishers_slug UNIQUE (slug);

-- series
ALTER TABLE series ADD CONSTRAINT uq_series_slug UNIQUE (slug);

-- comic_issues
ALTER TABLE comic_issues ADD CONSTRAINT uq_issues_slug UNIQUE (slug);
ALTER TABLE comic_issues ADD CONSTRAINT uq_issues_dle_post_id UNIQUE (dle_post_id);

-- contributors
ALTER TABLE contributors ADD CONSTRAINT uq_contributors_normalized_name UNIQUE (normalized_name);

-- roles
ALTER TABLE roles ADD CONSTRAINT uq_roles_name UNIQUE (name);

-- teams
ALTER TABLE teams ADD CONSTRAINT uq_teams_name UNIQUE (name);
ALTER TABLE teams ADD CONSTRAINT uq_teams_slug UNIQUE (slug);

-- tags
ALTER TABLE tags ADD CONSTRAINT uq_tags_name UNIQUE (name);
ALTER TABLE tags ADD CONSTRAINT uq_tags_slug UNIQUE (slug);

-- issue_contributors (композитный)
ALTER TABLE issue_contributors 
ADD CONSTRAINT uq_issue_contrib UNIQUE (issue_id, contributor_id, role_id);

-- issue_teams (композитный)
ALTER TABLE issue_teams 
ADD CONSTRAINT uq_issue_team UNIQUE (issue_id, team_id);

-- issue_tags (композитный)
ALTER TABLE issue_tags 
ADD CONSTRAINT uq_issue_tag UNIQUE (issue_id, tag_id);
```

---

### Check-ограничения

```sql
-- publishers.status
ALTER TABLE publishers 
ADD CONSTRAINT chk_publishers_status 
CHECK (status IN ('active', 'inactive'));

-- series.status
ALTER TABLE series 
ADD CONSTRAINT chk_series_status 
CHECK (status IN ('ongoing', 'completed', 'cancelled'));

-- comic_issues.rating
ALTER TABLE comic_issues 
ADD CONSTRAINT chk_issues_rating 
CHECK (rating >= 0 AND rating <= 10);

-- issue_assets.asset_type
ALTER TABLE issue_assets 
ADD CONSTRAINT chk_assets_type 
CHECK (asset_type IN ('cover', 'download_link', 'reader_link', 'preview'));

-- issue_teams.contribution_type
ALTER TABLE issue_teams 
ADD CONSTRAINT chk_teams_contribution 
CHECK (contribution_type IN ('translation', 'collaboration', 'partnership'));
```

---

### Индексы производительности

```sql
-- Поиск серий по издателю
CREATE INDEX idx_series_publisher ON series(publisher_id);

-- Поиск выпусков по серии
CREATE INDEX idx_issues_series ON comic_issues(series_id);

-- Поиск выпусков по дате публикации
CREATE INDEX idx_issues_posted_date ON comic_issues(posted_date DESC);

-- Поиск выпусков по автору
CREATE INDEX idx_issues_author ON comic_issues(author);

-- Поиск ресурсов по выпуску
CREATE INDEX idx_assets_issue ON issue_assets(issue_id);

-- Поиск ресурсов по типу
CREATE INDEX idx_assets_type ON issue_assets(asset_type);

-- Поиск участников выпуска
CREATE INDEX idx_contrib_issue ON issue_contributors(issue_id);
CREATE INDEX idx_contrib_contributor ON issue_contributors(contributor_id);
CREATE INDEX idx_contrib_role ON issue_contributors(role_id);

-- Поиск команд выпуска
CREATE INDEX idx_teams_issue ON issue_teams(issue_id);
CREATE INDEX idx_teams_team ON issue_teams(team_id);

-- Поиск тегов выпуска
CREATE INDEX idx_tags_issue ON issue_tags(issue_id);
CREATE INDEX idx_tags_tag ON issue_tags(tag_id);

-- Full-text search (PostgreSQL)
CREATE INDEX idx_issues_title_fts ON comic_issues USING gin(to_tsvector('russian', title));
CREATE INDEX idx_issues_description_fts ON comic_issues USING gin(to_tsvector('russian', description));
CREATE INDEX idx_series_name_fts ON series USING gin(to_tsvector('russian', name));
```

---

### Триггеры для автоматического обновления

```sql
-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Применить к таблицам
CREATE TRIGGER update_publishers_updated_at BEFORE UPDATE ON publishers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_series_updated_at BEFORE UPDATE ON series
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON comic_issues
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON issue_assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contributors_updated_at BEFORE UPDATE ON contributors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

## Дополнительные рекомендации

### RLS (Row Level Security) для Supabase

Для безопасности данных рекомендуется настроить политики RLS:

```sql
-- Включить RLS на всех таблицах
ALTER TABLE publishers ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE comic_issues ENABLE ROW LEVEL SECURITY;
-- ... и т.д. для всех таблиц

-- Примеры политик (публичное чтение, защищенная запись)
CREATE POLICY "Allow public read" ON publishers
    FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON publishers
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON publishers
    FOR UPDATE USING (auth.role() = 'authenticated');
```

---

### Представления (Views) для удобства

```sql
-- Полная информация о выпуске с сериями и издателями
CREATE VIEW v_comic_issues_full AS
SELECT 
    ci.*,
    s.name as series_name,
    s.slug as series_slug,
    p.name as publisher_name,
    p.slug as publisher_slug
FROM comic_issues ci
JOIN series s ON ci.series_id = s.id
JOIN publishers p ON s.publisher_id = p.id;

-- Выпуски с участниками
CREATE VIEW v_issues_with_contributors AS
SELECT 
    ci.id as issue_id,
    ci.title,
    r.display_name as role,
    c.name as contributor_name,
    ic.display_order
FROM comic_issues ci
JOIN issue_contributors ic ON ci.id = ic.issue_id
JOIN contributors c ON ic.contributor_id = c.id
JOIN roles r ON ic.role_id = r.id
ORDER BY ci.id, r.display_order, ic.display_order;
```

---

### Миграции

Рекомендуется использовать систему миграций (например, Supabase Migrations):

1. **001_create_publishers.sql** - создание таблицы publishers
2. **002_create_series.sql** - создание таблицы series
3. **003_create_comic_issues.sql** - создание таблицы comic_issues
4. **004_create_issue_assets.sql** - создание таблицы issue_assets
5. **005_create_contributors.sql** - создание таблицы contributors
6. **006_create_roles.sql** - создание таблицы roles и заполнение данными
7. **007_create_issue_contributors.sql** - создание связующей таблицы
8. **008_create_teams.sql** - создание таблицы teams
9. **009_create_issue_teams.sql** - создание связующей таблицы
10. **010_create_tags.sql** - создание таблицы tags
11. **011_create_issue_tags.sql** - создание связующей таблицы
12. **012_create_indexes.sql** - создание всех индексов
13. **013_create_triggers.sql** - создание триггеров
14. **014_create_views.sql** - создание представлений
15. **015_setup_rls.sql** - настройка Row Level Security

---

## Заключение

Данная схема обеспечивает:
- ✅ Полную нормализацию данных
- ✅ Целостность через внешние ключи
- ✅ Эффективный поиск через индексы
- ✅ Поддержку full-text search
- ✅ Масштабируемость
- ✅ Простоту импорта из CSV
- ✅ Совместимость с Supabase API
- ✅ Поддержку RLS для безопасности
- ✅ Автоматическое обновление временных меток
- ✅ Сохранение обратной совместимости (dle_post_id)

Схема готова к использованию в production-окружении Supabase.
