# Руководство по импорту данных в Supabase

Документ описывает последовательность ручной загрузки подготовленных CSV-файлов в проект Supabase, а также альтернативный способ импорта напрямую из репозитория без использования локальных инструментов. Руководство рассчитано на операторов, сопровождающих витрину комиксов, и предполагает, что схема таблиц уже создана миграциями.

## 1. Исходные CSV и порядок загрузки

Финальные CSV размещены в репозитории в каталоге `data/processed/` после выполнения ETL-пайплайна. Загружать их необходимо в строгом порядке, чтобы сохранить внешние ключи и зависимости.

| Шаг | Таблица Supabase (`public.*`) | CSV-файл | Ключевые поля | Зависимости |
| --- | --- | --- | --- | --- |
| 1 | `publishers` | `data/processed/publishers.csv` | `id`, `name`, `slug`, `description`, `created_at`, `active` | — |
| 2 | `series` | `data/processed/series.csv` | `id`, `publisher_id`, `name`, `slug`, `description`, `created_at`, `active` | `publishers` |
| 3 | `contributors` | `data/processed/contributors.csv` | `id`, `name`, `dle_user_id`, `email`, `source` | — |
| 4 | `roles` | `data/processed/roles.csv` | `id`, `name`, `name_en`, `description` | — |
| 5 | `comic_issues` | `data/processed/comic_issues.csv` | `id`, `series_id`, `title`, `slug`, `issue_number`, `volume`, `description`, `cover_image_url`, `published_date`, `author`, `view_count`, `rating`, `vote_count`, `allow_comments`, `approved` | `series` |
| 6 | `issue_contributors` | `data/processed/issue_contributors.csv` | `id`, `issue_id`, `contributor_id`, `role_id`, `order` | `comic_issues`, `contributors`, `roles` |
| 7 | `issue_downloads` | `data/processed/issue_downloads.csv` | `id`, `issue_id`, `link_type`, `url` | `comic_issues` |
| 8 | `issue_tags` | `data/processed/issue_tags.csv` | `id`, `issue_id`, `tag` | `comic_issues` |

> **Примечание.** Все CSV-файлы генерируются автоматически ETL-пайплайном из исходных данных DLE. Статистика последнего запуска доступна в файле `ETL_RUN_SUMMARY.md`. Согласно последнему запуску, обработано: 85 издателей, 919 серий, 7,691 выпусков, 649 участников, 25,141 связей участников и 7,700 ссылок на скачивание.

## 2. Сценарий A: Импорт через Supabase UI

1. Войдите в проект Supabase и откройте раздел **Database → Tables**.
2. Для первой таблицы (`publishers`) нажмите кнопку **Import data**.
3. В диалоге импорта:
   - Загрузите соответствующий CSV-файл из локальной копии репозитория (каталог `data/processed/`).
   - Выберите формат **CSV**.
   - Укажите параметры:
     - **Delimiter**: `,`
     - **Text qualifier (Quote)**: `"`
     - **Encoding**: `UTF-8`
     - **First row is header**: включено
     - **Null string**: оставить по умолчанию (пустая строка)
   - Проверьте сопоставление колонок. Все поля CSV должны совпадать с названиями столбцов таблицы.
4. Запустите импорт и дождитесь подтверждения завершения.
5. Повторите шаги для остальных таблиц, соблюдая порядок из таблицы выше. Для связывающих таблиц обязательно убедитесь, что внешние ключи (`issue_id`, `contributor_id`, `role_id`, `series_id`, `publisher_id`) сопоставлены корректно.
6. После импорта каждой таблицы выполняйте контрольные SELECT-запросы (см. раздел «Проверка данных»), чтобы вовремя отловить проблемы.

### Рекомендации при работе с UI

- Если в таблице уже есть данные, перед повторной загрузкой выполните `TRUNCATE` (см. раздел 5) или включите опцию **Truncate table before import** в диалоге (если она доступна).
- При ошибке импорта Supabase покажет строку CSV, где произошёл сбой. Исправьте данные в файле или удалите конфликтующую запись в базе и повторите попытку.
- Для крупных CSV (более 50 МБ) предпочтительнее использовать сценарий B, так как UI может прерывать загрузку.

## 3. Сценарий B: Импорт напрямую из GitHub (без локального скачивания)

### 3.1 Копирование CSV по Raw-URL с помощью расширения `httpfs`

1. Откройте **Database → SQL Editor** и выполните подготовительные команды (однократно):

```sql
-- Подключаем расширение для чтения файлов по HTTP(S)
create extension if not exists httpfs;

-- По желанию можно указать заголовок User-Agent, чтобы GitHub не блокировал запросы
set httpfs.headers = 'User-Agent=SupabaseImport/1.0';
```

2. Выполните пакетный импорт, заменив при необходимости ветку/коммит в URL. Пример скрипта для актуальных файлов в ветке `main`:

```sql
begin;

-- Сначала загружаем справочные таблицы
copy public.publishers (id, name, slug, description, created_at, active)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/publishers.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.contributors (id, name, dle_user_id, email, source)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/contributors.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.roles (id, name, name_en, description)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/roles.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

-- Затем таблицы с зависимостями
copy public.series (id, publisher_id, name, slug, description, created_at, active)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/series.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.comic_issues (id, series_id, title, slug, issue_number, volume, description, cover_image_url, published_date, author, view_count, rating, vote_count, allow_comments, approved)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/comic_issues.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

-- И наконец связывающие таблицы
copy public.issue_contributors (id, issue_id, contributor_id, role_id, "order")
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/issue_contributors.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_downloads (id, issue_id, link_type, url)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/issue_downloads.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_tags (id, issue_id, tag)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/issue_tags.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

commit;
```

> **Примечание.** Поле `order` в таблице `issue_contributors` заключено в кавычки, так как является зарезервированным словом SQL. Если в вашей схеме используется другое название поля (например, `display_order` или `sequence`), замените его в запросе.

### 3.2 Загрузка через Supabase Storage (резервный вариант)

Если прямой доступ к GitHub ограничен, можно поручить Supabase загрузить файлы в Storage, а затем импортировать их:

1. В **Storage** создайте (или переиспользуйте) публичный бакет `etl-staging`.
2. Воспользуйтесь REST API Supabase для копирования файла из GitHub:

```bash
curl -X POST \
  'https://<PROJECT_ID>.supabase.co/storage/v1/object/from-url' \
  -H 'apikey: <SERVICE_ROLE_KEY>' \
  -H 'Authorization: Bearer <SERVICE_ROLE_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "bucketId": "etl-staging",
    "objectName": "processed/publishers.csv",
    "source": "https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/processed/publishers.csv"
  }'
```

3. Получите публичную ссылку на загруженный объект (в UI или через API) и выполните импорт:

```sql
copy public.publishers (id, name, slug, description, created_at, active)
from 'https://<PROJECT_ID>.supabase.co/storage/v1/object/public/etl-staging/processed/publishers.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');
```

4. Повторите вызовы для остальных CSV. После импорта файлы можно удалить из бакета, чтобы не занимать место.

## 4. Проверка загруженных данных

После каждого этапа загрузки выполните проверки целостности:

### 4.1 Контроль количества строк

```sql
select 'publishers' as table_name, count(*) as rows from public.publishers
union all
select 'series', count(*) from public.series
union all
select 'contributors', count(*) from public.contributors
union all
select 'roles', count(*) from public.roles
union all
select 'comic_issues', count(*) from public.comic_issues
union all
select 'issue_contributors', count(*) from public.issue_contributors
union all
select 'issue_downloads', count(*) from public.issue_downloads
union all
select 'issue_tags', count(*) from public.issue_tags;
```

Сравните полученные значения с отчётом ETL (см. раздел 6). Согласно последнему запуску ETL (28.10.2025), ожидаемые значения:
- `publishers`: 85 записей
- `series`: 919 записей
- `contributors`: 649 записей
- `roles`: 6 записей
- `comic_issues`: 7,691 записей
- `issue_contributors`: 25,141 записей
- `issue_downloads`: 7,700 записей
- `issue_tags`: 43 записей

### 4.2 Проверка внешних ключей и обязательных полей

```sql
-- Серии без издателя (должно быть 0)
select count(*)
from public.series s
left join public.publishers p on p.id = s.publisher_id
where p.id is null;

-- Выпуски без серии (согласно ETL-отчёту, ожидается ~39 записей без series_id)
select count(*)
from public.comic_issues i
where i.series_id is null;

-- Выпуски с series_id, но серия не существует в таблице series (должно быть 0)
select count(*)
from public.comic_issues i
left join public.series s on s.id = i.series_id
where i.series_id is not null and s.id is null;

-- Связи выпусков с участниками без контрибьюторов/ролей/выпусков (должно быть 0)
select count(*)
from public.issue_contributors ic
left join public.comic_issues i on i.id = ic.issue_id
left join public.contributors c on c.id = ic.contributor_id
left join public.roles r on r.id = ic.role_id
where i.id is null or c.id is null or r.id is null;

-- Ссылки на скачивание без выпусков (должно быть 0)
select count(*)
from public.issue_downloads d
left join public.comic_issues i on i.id = d.issue_id
where i.id is null;

-- Обязательные поля
select count(*) as issues_without_title from public.comic_issues where title is null or title = '';
select count(*) as issues_without_slug from public.comic_issues where slug is null or slug = '';
```

### 4.3 Проверка уникальности и дубликатов

```sql
-- Поиск дублей издателей по имени
select name, count(*)
from public.publishers
group by name
having count(*) > 1;

-- Поиск дублей серий по slug
select slug, count(*)
from public.series
group by slug
having count(*) > 1;

-- Поиск дублей выпусков по slug
select slug, count(*)
from public.comic_issues
group by slug
having count(*) > 1;

-- Дублирующие связи выпуск ↔ контрибьютор ↔ роль
select issue_id, contributor_id, role_id, count(*)
from public.issue_contributors
group by issue_id, contributor_id, role_id
having count(*) > 1;
```

Если любая проверка возвращает строки, требуется анализ данных или повторный импорт проблемных таблиц.

## 5. Повторная синхронизация и обновление данных

### 5.1 Очистка таблиц перед повторной загрузкой

Используйте обратный порядок, чтобы не нарушить зависимости:

```sql
begin;
-- Сначала очищаем связывающие таблицы
truncate table public.issue_tags restart identity cascade;
truncate table public.issue_downloads restart identity cascade;
truncate table public.issue_contributors restart identity cascade;
-- Затем основные таблицы с зависимостями
truncate table public.comic_issues restart identity cascade;
truncate table public.series restart identity cascade;
-- И наконец независимые справочники
truncate table public.publishers restart identity cascade;
truncate table public.contributors restart identity cascade;
truncate table public.roles restart identity cascade;
commit;
```

После очистки повторите импорт по выбранному сценарию.

### 5.2 Идемпотентная загрузка через staging-схему

Для регулярных обновлений рекомендуется использовать временную схему `stg`:

1. Создайте временные таблицы с той же структурой (`create schema if not exists stg;` + `create table stg.publishers (like public.publishers including all);`).
2. Загружайте CSV в staging (`copy stg.publishers from ...`).
3. Обновляйте боевые таблицы через `insert ... on conflict do update`, сохраняя историю изменений:

```sql
insert into public.publishers as tgt (id, name, slug, description, created_at, active)
select id, name, slug, description, created_at, active
from stg.publishers
on conflict (id) do update
set name = excluded.name,
    slug = excluded.slug,
    description = excluded.description,
    active = excluded.active;

truncate table stg.publishers;
```

4. Аналогично обработайте остальные таблицы. Такой подход позволяет выполнять дельта-обновления без полной очистки данных.

## 6. Логи и контроль качества ETL

ETL-пайплайн генерирует детальные логи и отчёты о качестве данных, которые хранятся локально в каталоге `logs/` проекта:

- **Краткая сводка**: `ETL_RUN_SUMMARY.md` - содержит общую статистику последнего запуска ETL (количество записей, время выполнения, статус проверок)
- **Детальный отчёт**: `logs/etl_report.md` - подробная информация о качестве данных, предупреждения и рекомендации
- **Лог выполнения**: `logs/etl_YYYYMMDD_HHMMSS.log` - технический лог с подробностями обработки каждого этапа

### Ключевые метрики из последнего запуска ETL

Согласно `ETL_RUN_SUMMARY.md`:
- ✅ Все проверки целостности пройдены
- ✅ Референсная целостность (foreign keys) валидна
- ⚠️ 39 выпусков без связи с сериями (некритично, можно исправить вручную)
- ⚠️ 1,073 выпусков с пустыми описаниями (в исходных данных не было)
- ℹ️ 499 участников не сопоставлены с пользователями DLE (нормально для псевдонимов)

### Действия при обнаружении несоответствий

1. Зафиксируйте проблему в тикете (описание, таблица, идентификаторы записей).
2. Проверьте детальный отчёт в `logs/etl_report.md` для получения контекста.
3. Сверьте данные с исходными CSV-файлами DLE (в корне проекта, файлы `dle_*.csv`).
4. При необходимости:
   - Исправьте исходные данные
   - Повторно запустите ETL: `python run_etl.py`
   - Повторите импорт обновлённых CSV в Supabase
5. Для точечных исправлений используйте SQL UPDATE запросы напрямую в Supabase.

### Повторный запуск ETL

Если требуется пересоздать CSV-файлы из исходных данных:

```bash
# Активируйте виртуальное окружение (если используется)
source venv/bin/activate

# Запустите ETL-пайплайн
python run_etl.py

# Проверьте результаты
cat ETL_RUN_SUMMARY.md
cat logs/etl_report.md
```

После успешного запуска обновлённые CSV будут в каталоге `data/processed/`.

---

**Дополнительная документация:**
- Структура целевых таблиц: `docs/target_schema.md`
- Общая информация о проекте: `README.md`
- История изменений: `CHANGELOG.md`

Для автоматизации импорта рекомендовано перенести команды из сценария B (раздел 3.1) в SQL-скрипт и использовать cron-задачи Supabase (pg_cron).
