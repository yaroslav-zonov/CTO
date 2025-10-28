# Руководство по импорту данных в Supabase

Документ описывает последовательность ручной загрузки подготовленных CSV-файлов в проект Supabase, а также альтернативный способ импорта напрямую из репозитория без использования локальных инструментов. Руководство рассчитано на операторов, сопровождающих витрину комиксов, и предполагает, что схема таблиц уже создана миграциями.

## 1. Исходные CSV и порядок загрузки

Финальные CSV размещены в репозитории в каталоге `data/final` (подкаталог `link_tables` содержит таблицы связей). Загружать их необходимо в строгом порядке, чтобы сохранить внешние ключи и зависимости.

| Шаг | Таблица Supabase (`public.*`) | CSV-файл | Ключевые поля | Зависимости |
| --- | --- | --- | --- | --- |
| 1 | `publishers` | `data/final/01_publishers.csv` | `id`, `name`, `country_code`, `founded_year` | — |
| 2 | `series` | `data/final/02_series.csv` | `id`, `publisher_id`, `title`, `volume`, `start_year`, `end_year` | `publishers`
| 3 | `contributors` | `data/final/03_contributors.csv` | `id`, `full_name`, `given_name`, `family_name`, `country_code` | — |
| 4 | `roles` | `data/final/04_roles.csv` | `id`, `slug`, `title` | — |
| 5 | `issues` | `data/final/10_issues.csv` | `id`, `series_id`, `publisher_id`, `issue_number`, `cover_date`, `price`, `page_count` | `series`, `publishers`
| 6 | `issue_contributors` | `data/final/link_tables/issue_contributors.csv` | `issue_id`, `contributor_id`, `role_id`, `sequence` | `issues`, `contributors`, `roles`
| 7 | `issue_publishers` | `data/final/link_tables/issue_publishers.csv` | `issue_id`, `publisher_id`, `imprint` | `issues`, `publishers`
| 8 | `issue_assets` | `data/final/link_tables/issue_assets.csv` | `issue_id`, `asset_type`, `source_url`, `checksum` | `issues`
| 9 | `issue_references` | `data/final/link_tables/issue_references.csv` | `issue_id`, `ref_issue_id`, `reference_type` | `issues`

> **Примечание.** Если в каталоге `link_tables` присутствуют дополнительные CSV (например, `issue_stories.csv`, `story_contributors.csv`), импортируйте их после загрузки базовых таблиц, двигаясь от менее зависимых к более зависимым (сначала сущности, затем их связи).

## 2. Сценарий A: Импорт через Supabase UI

1. Войдите в проект Supabase и откройте раздел **Database → Tables**.
2. Для первой таблицы (`publishers`) нажмите кнопку **Import data**.
3. В диалоге импорта:
   - Загрузите соответствующий CSV-файл из репозитория.
   - Выберите формат **CSV**.
   - Укажите параметры:
     - **Delimiter**: `,`
     - **Text qualifier (Quote)**: `"`
     - **Encoding**: `UTF-8`
     - **First row is header**: включено
     - **Null string**: оставить по умолчанию (пустая строка)
   - Проверьте сопоставление колонок. Все поля CSV должны совпадать с названиями столбцов таблицы.
4. Запустите импорт и дождитесь подтверждения завершения.
5. Повторите шаги для остальных таблиц, соблюдая порядок из таблицы выше. Для связывающих таблиц обязательно убедитесь, что внешние ключи (`issue_id`, `contributor_id`, `role_id`, `publisher_id`) сопоставлены корректно.
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

copy public.publishers (id, name, country_code, founded_year)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/01_publishers.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.series (id, publisher_id, title, volume, start_year, end_year)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/02_series.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.contributors (id, full_name, given_name, family_name, country_code)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/03_contributors.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.roles (id, slug, title)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/04_roles.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issues (id, series_id, publisher_id, issue_number, cover_date, on_sale_date, price, page_count, synopsis)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/10_issues.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_publishers (issue_id, publisher_id, imprint)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/link_tables/issue_publishers.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_contributors (issue_id, contributor_id, role_id, sequence, credited_as)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/link_tables/issue_contributors.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_assets (issue_id, asset_type, source_url, checksum)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/link_tables/issue_assets.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

copy public.issue_references (issue_id, ref_issue_id, reference_type)
from 'https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/link_tables/issue_references.csv'
with (format csv, header true, delimiter ',', quote '"', encoding 'UTF8');

commit;
```

3. При необходимости добавьте оставшиеся связывающие таблицы, следуя тому же шаблону `COPY`.

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
    "objectName": "final/01_publishers.csv",
    "source": "https://raw.githubusercontent.com/yaroslav-zonov/CTO/main/data/final/01_publishers.csv"
  }'
```

3. Получите публичную ссылку на загруженный объект (в UI или через API) и выполните импорт:

```sql
copy public.publishers (id, name, country_code, founded_year)
from 'https://<PROJECT_ID>.supabase.co/storage/v1/object/public/etl-staging/final/01_publishers.csv'
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
select 'issues', count(*) from public.issues
union all
select 'issue_contributors', count(*) from public.issue_contributors
union all
select 'issue_publishers', count(*) from public.issue_publishers
union all
select 'issue_assets', count(*) from public.issue_assets
union all
select 'issue_references', count(*) from public.issue_references;
```

Сравните полученные значения с отчётом ETL (см. раздел 6) либо с ожидаемыми цифрами, указанными в спецификации выгрузки.

### 4.2 Проверка внешних ключей и обязательных полей

```sql
-- Серии без издателя (должно быть 0)
select count(*)
from public.series s
left join public.publishers p on p.id = s.publisher_id
where p.id is null;

-- Выпуски без серии или издателя
select count(*)
from public.issues i
left join public.series s on s.id = i.series_id
left join public.publishers p on p.id = i.publisher_id
where s.id is null or p.id is null;

-- Присвоения ролей без контрибьюторов/ролей/выпусков
select count(*)
from public.issue_contributors ic
left join public.issues i on i.id = ic.issue_id
left join public.contributors c on c.id = ic.contributor_id
left join public.roles r on r.id = ic.role_id
where i.id is null or c.id is null or r.id is null;

-- Обязательные поля (пример: номер выпуска и дата выхода)
select count(*) from public.issues where issue_number is null;
select count(*) from public.issues where cover_date is null;
```

### 4.3 Проверка уникальности и дубликатов

```sql
-- Поиск дублей издателей по имени
select name, count(*)
from public.publishers
group by name
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
truncate table public.issue_references restart identity cascade;
truncate table public.issue_assets restart identity cascade;
truncate table public.issue_contributors restart identity cascade;
truncate table public.issue_publishers restart identity cascade;
truncate table public.issues restart identity cascade;
truncate table public.roles restart identity cascade;
truncate table public.contributors restart identity cascade;
truncate table public.series restart identity cascade;
truncate table public.publishers restart identity cascade;
commit;
```

После очистки повторите импорт по выбранному сценарию.

### 5.2 Идемпотентная загрузка через staging-схему

Для регулярных обновлений рекомендуется использовать временную схему `stg`:

1. Создайте временные таблицы с той же структурой (`create schema if not exists stg;` + `create table stg.publishers (...) like public.publishers including all;`).
2. Загружайте CSV в staging (`copy stg.publishers from ...`).
3. Обновляйте боевые таблицы через `insert ... on conflict do update`, сохраняя историю изменений:

```sql
insert into public.publishers as tgt (id, name, country_code, founded_year)
select id, name, country_code, founded_year
from stg.publishers
on conflict (id) do update
set name = excluded.name,
    country_code = excluded.country_code,
    founded_year = excluded.founded_year;

truncate table stg.publishers;
```

4. Аналогично обработайте остальные таблицы. Такой подход позволяет выполнять дельта-обновления без полной очистки данных.

## 6. Логи и контроль качества ETL

- Автоматический ETL сохраняет отчёты и критичные расхождения в Supabase Storage, бакет `etl-monitoring`, файл `reports/latest_run.json`. Прямая ссылка: `https://<PROJECT_ID>.supabase.co/storage/v1/object/public/etl-monitoring/reports/latest_run.json`.
- В отчёте содержатся контрольные суммы строк по каждой таблице, количество добавленных/обновлённых записей и перечень записей с незаполненными критичными атрибутами.
- Для просмотра из UI откройте **Storage → etl-monitoring → reports → latest_run.json**. Файл можно скачать и сравнить с результатами SQL-проверок.

### Действия при обнаружении несоответствий

1. Зафиксируйте проблему в тикете (описание, таблица, идентификаторы записей).
2. Сверьте данные с исходным CSV (через GitHub history или storage-бакет) и определите, связано ли отклонение с самим источником.
3. При необходимости повторно выполните ETL-процесс или ручную загрузку затронутых таблиц (используйте `TRUNCATE` + импорт либо сценарием staging).
4. Обновите `latest_run.json` повторным прогоном ETL и убедитесь, что контрольные суммы совпадают.

---

При возникновении вопросов по структуре таблиц или миграциям обращайтесь к разделу архитектурной документации проекта. Для автоматизации импорта рекомендовано перенести команды из сценария B в SQL-скрипт и использовать cron-задачи Supabase (pg_cron).
