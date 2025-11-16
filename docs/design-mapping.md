# Design Mapping: DLE Templates to TSX Components

## Overview

This document provides a comprehensive mapping between the existing DataLife Engine (DLE) templates and the new TSX/Next.js implementation. It catalogues layout sections, component structures, typography, spacing, interactive behaviors, and identifies all gaps that need to be addressed during the redesign implementation.

## Table of Contents

1. [Shared Primitives & Components](#shared-primitives--components)
2. [Template-to-Page Mappings](#template-to-page-mappings)
3. [Interactive Behaviors](#interactive-behaviors)
4. [Typography & Spacing System](#typography--spacing-system)
5. [Required Assets](#required-assets)
6. [Dynamic Data Considerations](#dynamic-data-considerations)
7. [Implementation Checklist](#implementation-checklist)
8. [Open Questions & Unknowns](#open-questions--unknowns)

---

## DLE Template Inventory & Mapping

### Page-Level Templates

| DLE Template | Purpose in current theme | TSX Source / Plan | Gaps / Migration Notes |
| --- | --- | --- | --- |
| `main.tpl` | Site shell & homepage aggregator | `/app/page.tsx` | Swap legacy header/footer for shared primitives, rebuild responsive rails, bind macros to Issue/Collection card components, remove duplicated section markup. |
| `fullstory.tpl` | Full issue detail page | `/app/issue/[slug]/page.tsx` | Add CTA button group, multi-column credits grid, "Читайте также" section, related collection carousel, publisher-specific rails, responsive typography. |
| `newcomics.tpl` | Release archive by year/month | `/app/releases/page.tsx` | Implement FilterTabs behaviour, dynamic month groupings, 5-column responsive grid, horizontal scroll parity. |
| `addnews.tpl` | Add comic submission form | `/app/add-comic/page.tsx` | Rework layout, spoiler instructions, uploader UX, validation messaging, contributor autocomplete, captchas. |
| `stats.tpl` | Global site/team statistics | `/app/team/stats/page.tsx` | Translate metrics blocks to cards, add charts, CTA tiles, wire DLE counters (`{news_*}`, `{comm_*}`, `{topusers}`). |
| `stat_cat.tpl` | Legacy crossover/event showcase | `/app/collections` (Глобальные события) or `/collection/[slug]` | Replace hardcoded items with CollectionCard data, attach correct images/links, allow filtering by publisher. |
| `userinfo.tpl` | Member profile & contribution stats | `/app/member/[slug]/page.tsx` | Bring hero layout, contribution tables, avatar handling, integrate role-based metrics. |
| `vakansi.tpl` | Recruitment / vacancies page | `/app/vacancies/page.tsx` | Update typography, CTA buttons, contact blocks, ensure responsive layout. |
| `zvuki.tpl` | Sound effects reference | `/app/sounds/page.tsx` | Rebuild list/audio player styling, ensure mobile playback support, add filtering if needed. |
| `searchresult.tpl` | Search result list (posts & comments) | Plan new `/app/search` route | Design issue/comment result cards, add filters & empty states, port rating interactions. |
| `search.tpl` | Standalone search form wrapper | Integrate into Header search toggle | Move fields into header overlay, manage form submission to DLE search endpoint. |
| `login.tpl` | Authentication form | Future `/app/login` or retain DLE modal | Align with design system, add field validation, social login UI. |
| `registration.tpl` | User registration flow | Future `/app/register` or retain DLE flow | Reformat field groups, add password hints, confirm email copy. |
| `lostpassword.tpl` | Password recovery page | Future `/app/forgot-password` | Update instructions, align inputs, handle confirmation messaging. |
| `pm.tpl` | Private messaging area | Not modelled in TSX yet | Decide on redesign scope or deprecate; migrate dialogs/list views if kept. |
| `rss.tpl` | RSS feed output | Server-side only (no TSX view) | Refresh branding/meta, ensure enclosure URLs and categories match new taxonomy. |
| `static.tpl` | Generic static content wrapper | Apply to future `/app/(static)/...` routes | Port typography/spacing tokens, ensure breadcrumb integration. |
| `static-cataclysm.tpl`, `static-lsnk.tpl`, `static-messiah.tpl`, `static-sd.tpl` | Event-focused static pages | Map to curated `/collection/` variants | Replace static markup with CollectionCard grids, migrate imagery & descriptions. |
| `static_print.tpl` | Printable static page | Add print-friendly stylesheet | Mirror typography with print colors, hide navigation. |
| `print.tpl` | Printable issue layout | Consider `/app/issue/[slug]/print` | Strip interactive elements, keep download metadata, add print CSS. |
| `preview.tpl` | Submission preview screen | Admin-only view (no TSX equivalent yet) | Align with IssuePage layout, ensure safe rendering of unsaved HTML. |
| `offline.tpl` | Maintenance/offline notice | Provide branded offline fallback | Include key contact links, update typography and iconography. |
| `main-seo.tpl` | SEO-heavy homepage variant | Consolidate into `/app/page.tsx` metadata | Merge meta tags into Next head config, retire duplicate layout. |

### Component & Widget Templates

| DLE Template | Usage in legacy theme | TSX Reference / Equivalent | Notes / Gaps |
| --- | --- | --- | --- |
| `shortstory.tpl` | Compact issue tile for sidebars and macros | `/components/issue-card.tsx` (`size="default"`) | Swap background div for `<img>`, add responsive width utilities, unify hover opacity. |
| `shortstory-main.tpl` | Highlighted issue tile on homepage rails | `/components/issue-card.tsx` (`size="default" with desktop min-width`) | Introduce responsive modifiers (`md:flex-1`, `md:min-w-[128px]`), ensure title truncation logic, handle conditional visibility classes. |
| `collection-item.tpl` | Collection card markup | `/components/collection-card.tsx` | Add aspect-ratio variants, issue count copy, responsive hide-on-mobile logic. |
| `series-item.tpl` | Series card markup | `/components/series-card.tsx` | Replace category macros with props, ensure issue count arrow text, apply hover and sizing tokens. |
| `custom-carou.tpl` | Category carousel item (`catmenu`) | `/components/series-card.tsx` within horizontal scrollers | Match padding for horizontal rails, add scroll snapping if desired. |
| `reliz.tpl` | Release teaser list | `/components/issue-card.tsx` (`size="large"`) | Convert to IssueCard composition, wire release metadata, ensure CTA link. |
| `relatednews.tpl` | Related posts grid | IssueCard / SeriesCard mix inside `ContentSection` | Rebuild as component block with graceful empty state and dynamic data. |
| `popular.tpl` | Popular posts widget | IssueCard carousel | Add reads-based data source, align spacing and hover states, provide fallback copy. |
| `top.tpl` | Top posts list | IssueCard list | Apply responsive grid, support ranking badges if needed. |
| `topnews.tpl` | Top news slider | IssueCard carousel | Replace legacy slider scripts, rely on horizontal scroll or CSS snap, match card styling. |
| `categorymenu.tpl` | Horizontal category navigation | `Header` secondary nav (`publishers` / `teamMenu`) | Drive active-state classes from page context, collapse into dropdown on mobile. |
| `navigation.tpl` | Standard pagination controls | New Pagination primitive | Implement button group with accessible labels, hook into DLE pagination variables. |
| `splitnewsnavigation.tpl` | Multi-page article pagination | Reuse Pagination primitive | Provide previous/next CTA styling, manage disabled states and anchors. |
| `sidebartpl.tpl` | Sidebar column wrapper | Layout grid + `ContentSection` composition | Recreate spacing, decide responsive stacking, remove table-based layout. |
| `custom-side.tpl` | Custom sidebar promo block | Compose with IssueCard/CollectionCard + SectionHeader | Turn static HTML into configurable widget, support scheduling and visibility flags. |
| `custom-lcomm.tpl` | Latest comments widget | Future compact comment component | Build avatar + excerpt list, include comment counts and deep links. |
| `informer.tpl` | Small informer/statistics panel | New StatBadge/InfoCard primitive | Align typography, integrate dynamic counters, add iconography. |

### System, Form & Utility Templates

| DLE Template | Usage | TSX Reference / Plan | Notes / Gaps |
| --- | --- | --- | --- |
| `addcomments.tpl` | Comment submission form with captcha/question | Not implemented in TSX yet | Design new comment form, hook into DLE endpoint, replicate validation and spam protection flows. |
| `comments.tpl` | Comment list rendering | Not implemented in TSX yet | Create comment thread component, support avatars, moderation actions, nested replies. |
| `feedback.tpl` | Feedback / contact form | Potential `/app/feedback` route or modal | Align layout and validation, decide on submission transport (email, webhook). |
| `attachment.tpl` | Attachment/file preview snippet | Embed within Issue detail downloads section | Convert to list of download buttons with file metadata, handle multiple assets. |
| `profile_popup.tpl` | Hover profile summary popup | Merge into `Header` dropdown/profile panel | Recreate layout in dropdown or dedicated profile page, include quick actions. |
| `poll.tpl` | Poll widget markup | Build Poll component if feature retained | Style radio options, add live results view, ensure repeat-vote protections. |
| `vote.tpl` | Thumbs up/down controls | Pair with IssueCard or comment actions | Implement accessible buttons, AJAX updates, state persistence. |
| `votes.tpl` | Vote summary snippet | Display alongside `vote.tpl` | Render totals inline with icons, manage pluralisation and zero states. |
| `tagscloud.tpl` | Tag cloud widget | Future TagList component | Replace font-size scaling with tokenized pill list, add alphabetical/grouping options. |
| `statustpl.tpl` | Status/notice wrapper | Map to `Alert` primitive (`/components/ui/alert.tsx`) | Provide variants (info/warn/error), optional dismiss button, animation. |
| `info.tpl` | Generic info message box | Use `Alert`/callout component | Standardise padding, iconography, closable behaviour across pages. |
| `speedbar.tpl` | Breadcrumb trail | Build `Breadcrumb` primitive (`/components/ui/breadcrumb.tsx`) | Generate segments from page context, add responsive truncation. |

## Shared Primitives & Components

### 1. Header Component

**TSX Source:** `/components/header.tsx`  
**DLE Template:** Embedded in `main.tpl` (lines 16-45)

**Structure:**
- Logo section
- Primary navigation (Комиксы, Подборки, Команда)
- Secondary navigation (Publishers or Team submenu)
- Search functionality
- User avatar with dropdown menu
- Mobile hamburger menu

**Key Behaviors to Reimplement (without React):**
- **Search toggle**: Opens/closes search input field with focus management
  - React implementation: `useState` for `isSearchOpen`, `useRef` for input focus, `useEffect` for auto-focus
  - DLE requirement: Vanilla JS to toggle search visibility and set focus on input element
- **Dropdown menu**: User avatar dropdown with menu items
  - React implementation: Uses `DropdownMenu` component from Radix UI
  - DLE requirement: Custom dropdown with click/hover handling, keyboard navigation, click-outside-to-close
- **Mobile menu**: Full-screen overlay menu
  - React implementation: `useState` for `isMobileMenuOpen`, conditional rendering
  - DLE requirement: Toggle class on menu element, manage body scroll, ESC key to close
- **Active state management**: Highlights current page/publisher in navigation
  - React implementation: Props-based (`currentPage`, `activePublisher`, `activeTeamPage`)
  - DLE requirement: Server-side template conditionals or JS-based URL matching

**Styling:**
- Desktop: `h-[60px]`, flex layout, max-width `1312px`
- Mobile: Simplified layout with avatar, logo, hamburger
- Search input: Bottom border only, focus state changes border color to `#fc5621`
- Active link: Orange underline (`#fc5621`), underline offset `5px`

**Gaps:**
- DLE template has basic structure but lacks:
  - Search toggle functionality (DLE uses form submission, no toggle)
  - Dropdown menu implementation (DLE has static login button)
  - Mobile menu overlay (not present in DLE)
  - Dynamic secondary navigation based on page context

---

### 2. Footer Component

**TSX Source:** `/components/footer.tsx`  
**DLE Template:** Embedded in `main.tpl` (lines 254-262)

**Structure:**
- Links: Телеграм, Вконтакте, База переводов, RSS
- Copyright text: `© 2007...2025 Russian Project Universe`

**Key Features:**
- Simple horizontal link list
- Hover effect: Links change color to `#fc5621`
- Border-top separator

**Gaps:**
- DLE template matches structure
- No behavioral differences
- Styling alignment needed

---

### 3. IssueCard Component

**TSX Source:** `/components/issue-card.tsx`  
**DLE Template:** `shortstory.tpl`, `shortstory-main.tpl`

**Structure:**
- Cover image (aspect ratio 2:3, 150% padding-bottom)
- Title text below
- Link wrapper

**Props:**
- `title`: Issue title
- `coverUrl`: Cover image URL
- `href`: Link destination
- `size`: "default" | "large"
- `className`: Additional styling

**Styling:**
- Default size: `w-[calc((100vw-48px)/2)]` on mobile, `md:w-auto md:flex-1 md:min-w-[128px]`
- Large size: `w-[calc(100vw-40px)]` on mobile, `md:flex-1 md:min-w-[272px]`
- Hover: Opacity transition on title
- Gap between image and title: `gap-2` (8px)

**Gaps:**
- DLE template uses background-image on div instead of `<img>` tag
- No size variants in DLE
- Responsive behavior needs implementation
- Title length limit: `{title limit="50"}` in DLE vs full title in TSX

---

### 4. SeriesCard Component

**TSX Source:** `/components/series-card.tsx`  
**DLE Template:** `series-item.tpl`, `custom-carou.tpl`

**Structure:**
- Cover image (aspect ratio 2:3, 150% padding-bottom)
- Title text
- Issue count with arrow: `{issueCount} выпуска ->`

**Props:**
- `title`: Series title
- `issueCount`: Number of issues
- `coverUrl`: Cover image URL
- `href`: Link destination
- `className`: Additional styling

**Styling:**
- Similar sizing to IssueCard
- Title: `font-semibold text-base leading-[18px]`
- Count: `font-normal text-sm leading-4`
- Gap between elements: `gap-1` (4px)

**Gaps:**
- DLE template structure is simpler
- Issue count needs dynamic data injection
- Responsive sizing not present in DLE

---

### 5. CollectionCard Component

**TSX Source:** `/components/collection-card.tsx`  
**DLE Template:** `collection-item.tpl`

**Structure:**
- Banner image with dynamic aspect ratio
- Title text
- Issue count with arrow

**Props:**
- `title`: Collection title
- `issueCount`: Number of issues
- `coverUrl`: Cover image URL
- `href`: Link destination
- `aspectRatio`: "16-9" | "5-3" | "1-1" | "4-3"
- `hideOnMobile`: Conditional visibility
- `hideOnTablet`: Conditional visibility

**Aspect Ratios (padding-bottom):**
- 16:9 = 56.25%
- 5:3 = 60%
- 1:1 = 75% mobile, 100% tablet/desktop
- 4:3 = 75%

**Styling:**
- Full width on mobile, flexible on desktop
- Title: `font-semibold text-base leading-[18px]`
- Count: `font-normal text-sm leading-4`

**Gaps:**
- DLE template has single aspect ratio
- Responsive visibility rules not present
- Dynamic aspect ratio switching needs implementation

---

### 6. SectionHeader Component

**TSX Source:** `/components/section-header.tsx`  
**DLE Template:** Inline `<h2>` elements in `main.tpl`

**Structure:**
- Text with underline decoration
- Optional link wrapper

**Props:**
- `children`: Header text
- `href`: Optional link

**Styling:**
- `font-extrabold text-[28px] leading-8`
- Underline: `decoration-[rgba(33,33,33,0.1)] decoration-1 underline-offset-[5px]`
- Hover: Color changes to `#fc5621` with orange underline

**Gaps:**
- DLE uses `.section-title.underlined` class
- Hover states need CSS implementation
- Consistent styling across all instances

---

### 7. ContentSection Component

**TSX Source:** `/components/content-section.tsx`  
**DLE Template:** `<section class="section">` in various templates

**Structure:**
- Optional title
- Children content
- Consistent gap spacing

**Styling:**
- `gap-4` (16px) between title and content
- Title: Same as SectionHeader

**Gaps:**
- Simple wrapper, minimal differences

---

### 8. FilterTabs Component

**TSX Source:** `/components/filter-tabs.tsx`  
**DLE Template:** `.nav-tabs` in `newcomics.tpl`

**Structure:**
- Horizontal button list
- Active state highlighting

**Props:**
- `tabs`: Array of `{id, label}`
- `activeTab`: Currently active tab ID
- `onTabChange`: Callback function

**Key Behaviors to Reimplement:**
- **Tab switching**: Click to change active tab
  - React implementation: `useState` for active tab, callback prop
  - DLE requirement: Event listeners on tab buttons, update URL or content, toggle active class

**Styling:**
- Active: `text-[#fc5621] decoration-[#fc5621]`
- Inactive: `text-[#212121] decoration-[rgba(33,33,33,0.1)]`
- Hover: Orange color and underline
- Gap: `gap-4` (16px)

**Gaps:**
- DLE template is static HTML
- Click handlers need implementation
- Active state management via JS or server-side

---

### 9. DownloadButton Component

**TSX Source:** `/components/ui/download-button.tsx`  
**DLE Template:** Inline button in `fullstory.tpl`

**Structure:**
- Styled button with download text
- Link wrapper

**Styling:**
- Primary button appearance
- Full width on mobile, auto width on desktop

**Gaps:**
- Need to verify exact styling in TSX
- Download link handling

---

### 10. UI Components (shadcn/ui)

**TSX Sources:** `/components/ui/*`  
**DLE Template:** Various inline implementations or missing

**Key Components Used:**
- **DropdownMenu**: User menu, mobile menu
- **Button**: Various actions
- **Input**: Search field, forms
- **Card**: Issue/series/collection cards
- **Dialog/Sheet**: Modals and overlays
- **Form components**: Add comic page
- **Icons**: Lucide React icons (Bookmark, BookOpen, Heart)

**Behaviors to Reimplement:**
- **Dropdown menus**: Keyboard navigation, click-outside-to-close, focus trap
- **Modals/sheets**: Focus management, ESC to close, backdrop click
- **Form validation**: Client-side validation before submission
- **Icon rendering**: Use Material Icons or Font Awesome in DLE (already present)

---

## Template-to-Page Mappings

### 1. Homepage

**TSX Source:** `/app/page.tsx`  
**DLE Template:** `main.tpl` (lines 46-248)

**Sections:**
1. **Новые релизы** (New Releases)
   - Component: 5 IssueCards in horizontal scroll
   - DLE macro: `{custom order="date" template="shortstory-main" from="0" limit="5" sort="desc"}`
   - Layout: Horizontal scrollable on mobile, static grid on desktop

2. **Свежие подборки** (Fresh Collections)
   - Component: 2 CollectionCards in grid
   - DLE: Static HTML (lines 56-75)
   - Layout: Grid, 1 column mobile, 2 columns desktop

3. **Новинки издательства** (Publisher News - repeated)
   - Component: 7 IssueCards
   - DLE macro: `{custom category="1" subcat="yes" order="date" template="shortstory-main" from="0" limit="7" sort="desc"}`
   - Layout: Horizontal scrollable
   - Note: Repeated twice with different publishers (Marvel, DC)

4. **Популярные подборки** (Popular Collections)
   - Component: 3 CollectionCards
   - DLE: Static HTML (lines 86-114)
   - Layout: Grid, 1 column mobile, 3 columns desktop

5. **Популярные серии** (Popular Series)
   - Component: 5 SeriesCards
   - DLE macro: `{catmenu id="124, 147, 9, 318, 271" template="custom-carou"}`
   - Layout: Horizontal scrollable

6. **Промо подборка** (Promo Collection - repeated 3 times)
   - Component: 1 CollectionCard (full width)
   - DLE: Static HTML
   - Layout: Single column

7. **Популярное за месяц** (Popular This Month)
   - Component: 3 large IssueCards
   - DLE macro: `{custom order="reads" days="30" template="shortstory-main" from="0" limit="5" sort="desc"}`
   - Layout: Horizontal scrollable, larger cards

8. **Коллекция подборок** (Collection of Collections)
   - Component: 5 CollectionCards
   - DLE: Static HTML (lines 172-213)
   - Layout: Grid, complex responsive rules

9. **Популярные ваншоты** (Popular One-Shots)
   - Component: 5 IssueCards
   - DLE macro: `{custom order="reads" xfields="Одиночный выпуск" template="shortstory-main" from="0" limit="5" sort="desc"}`
   - Layout: Horizontal scrollable

**Structural Gaps:**
- TSX has Header/Footer components; DLE embeds them
- TSX uses explicit responsive classes; DLE relies on CSS
- DLE uses `[aviable=main]` conditional blocks
- DLE collections are static placeholders; TSX expects dynamic data
- DLE uses custom macros for dynamic content; needs PHP/DLE backend processing

**Styling Gaps:**
- Max width container: `1312px` in TSX, needs CSS class in DLE
- Gap spacing: `gap-8` between sections (32px)
- Horizontal scroll: `.overflow-x-auto .scrollbar-hide` classes needed
- Responsive visibility: `md:hidden lg:flex` classes for conditional items

---

### 2. Issue Detail Page (Fullstory)

**TSX Source:** `/app/issue/[slug]/page.tsx`  
**DLE Template:** `fullstory.tpl`

**Sections:**
1. **Header** (with active publisher)
2. **Issue Title & Metadata**
   - Title: `font-extrabold text-[28px] md:text-[56px]`
   - Metadata: Publisher • Series • Volume (linked)
   - Mobile/Desktop responsive positioning

3. **Cover & Details Layout**
   - Left: Cover image (400px width desktop, full width mobile)
   - Right: Issue details
   - Gap: `gap-6 md:gap-8`

4. **Action Buttons**
   - Download button (primary)
   - Read online icon button
   - Favorite icon button
   - Bookmark icon button
   - Layout: Horizontal flex, `gap-4`

5. **Description**
   - Text: `text-[20px] leading-[32px]`
   - Lining nums, tabular nums

6. **Translation Team Info**
   - "Переведено совместно с [Team Link]"
   - Team name is linked

7. **Credits Table**
   - Grid: `grid-cols-2 md:grid-cols-4`
   - Sections: Перевод, Тайп, Оформление, Редактура
   - Role title: `text-[16px] leading-6 font-normal`
   - Name links: `text-[20px] leading-[32px] font-extrabold`

8. **Related Sections** (separated by HR)
   - "Читайте также" (Read Also) - mixed series/issues grid
   - "Связанные подборки" (Related Collections) - 3 collections
   - "Новинки издательства" (Publisher News) - 7 issues horizontal

**DLE Template Structure:**
- Uses xfields extensively: `[xfvalue_download]`, `[xfvalue_team]`, `[xfvalue_perevodchik]`, etc.
- Conditional blocks: `[xfgiven_taiper]`, `[xfgiven_redaktor]`
- Category conditionals: `[if category = "1"]` for publisher-specific sections
- Custom macro: `{custom category="{category-id}" template="shortstory" from="0" limit="6" sort="asc"}`

**Structural Gaps:**
- TSX uses Lucide React icons; DLE needs Material Icons or Font Awesome
- TSX has sophisticated responsive layout; DLE needs media queries
- "Читайте также" section not in DLE (only "Другие выпуски")
- Download button in DLE is simple link; TSX has styled component
- DLE collections are placeholders; need dynamic data

**Styling Gaps:**
- Complex grid layouts for credits section
- Responsive image sizing (400px desktop, full mobile)
- Icon button styling (hover effects)
- HR separators between sections

---

### 3. Releases/Comics Archive Page

**TSX Source:** `/app/releases/page.tsx`  
**DLE Template:** `newcomics.tpl`

**Sections:**
1. **Header** (with active page: comics)
2. **Page Title**: "Релизы" - `text-[56px] leading-[64px]`
3. **Year Filter Tabs**
   - Years: 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, Архив
   - Component: FilterTabs with active state
4. **Month Sections** (repeated for each month)
   - Month title: ContentSection with title
   - Issues grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
   - Gap: `gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-4 lg:gap-x-4 lg:gap-y-4`

**DLE Template Structure:**
- Similar structure but static year tabs
- No filtering functionality shown
- Hardcoded month sections with placeholder issues

**Structural Gaps:**
- TSX has interactive tab filtering; DLE needs JS implementation
- DLE template is prototype/static; needs dynamic data
- Grid layout with exact gap specifications

**Styling Gaps:**
- FilterTabs component styling
- Responsive grid with 5 columns on XL
- Year tab active state handling

---

### 4. Collections Listing Page

**TSX Source:** `/app/collections/page.tsx`  
**DLE Template:** Not present in DLE templates

**Sections:**
1. **Header** (without active page)
2. **Page Title**: "Подборки" - `text-[28px] md:text-[56px]`
3. **Collection Categories** (multiple sections):
   - Новые (2 cards)
   - Популярные (3 cards)
   - Промо подборка (1 card)
   - Издательства (3 cards)
   - Авторы (5 cards)
   - Персонажи (4 cards)
   - Глобальные события (3 cards)
   - Жанры (5 cards)

**Each section:**
- Section header (some with links)
- Grid layout matching card count
- Different aspect ratios per card position

**Structural Gaps:**
- **MISSING IN DLE**: This entire page needs to be created
- Layout rules for different card counts (1, 2, 3, 4, 5)
- Dynamic aspect ratio assignment
- Responsive visibility rules

**Required Assets:**
- Collection cover images for each category
- Collection data (title, issue count, link)

---

### 5. Collection Detail Page

**TSX Source:** `/app/collection/[slug]/page.tsx`  
**DLE Template:** Not directly present (may use category page template)

**Sections:**
1. **Header** (active: collections)
2. **Collection Title & Description**
   - Title: `text-[56px] leading-[64px]`
   - Description: `text-xl leading-8`, limited to 2/3 width on desktop
3. **Mixed Content Grid**
   - Series and Issues mixed
   - Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
   - Gap: Same as releases page
4. **Similar Collections Section**
   - HR separator
   - 3 collections in grid
   - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Structural Gaps:**
- **PARTIALLY MISSING IN DLE**: Needs proper template or enhance category template
- Mixed series/issue display logic
- Similar collections recommendation system

---

### 6. Publisher Page

**TSX Source:** `/app/publisher/[slug]/page.tsx`  
**DLE Template:** Category pages (inferred)

**Expected Sections:**
- Header with active publisher
- Publisher name/title
- Issue listings filtered by publisher category
- Possibly series listings

**Gaps:**
- **NEED TO REVIEW**: Check actual implementation in TSX and DLE category template

---

### 7. Series Detail Page

**TSX Source:** `/app/series/[slug]/page.tsx`  
**DLE Template:** Category pages (subcategory)

**Expected Sections:**
- Header with active publisher
- Series title and metadata
- Series cover/banner
- Issue listings in series order
- Related series or collections

**Gaps:**
- **NEED TO REVIEW**: Check actual implementation

---

### 8. Team Member Page

**TSX Source:** `/app/member/[slug]/page.tsx`  
**DLE Template:** `userinfo.tpl`

**Expected Sections:**
- Member profile information
- Member statistics
- Issues worked on

**Gaps:**
- **NEED TO REVIEW**: Check both implementations

---

### 9. Team Stats Page

**TSX Source:** `/app/team/stats/page.tsx`  
**DLE Template:** `stats.tpl`, `stat_cat.tpl`

**Sections:**
- Header (active: team, stats)
- Team statistics display
- Contributor listings

**Gaps:**
- **NEED TO REVIEW**: Statistics calculation and display

---

### 10. Schedule/Release Calendar

**TSX Source:** `/app/schedule/page.tsx`  
**DLE Template:** Not clearly present

**Expected Sections:**
- Header with schedule link active
- Release calendar/schedule view

**Gaps:**
- **MAY BE MISSING**: Needs template creation if not present

---

### 11. Vacancies Page

**TSX Source:** `/app/vacancies/page.tsx`  
**DLE Template:** `vakansi.tpl`

**Structure:**
- Simple content page
- Vacancy listings

**Gaps:**
- Simple page, minimal differences expected

---

### 12. Sounds Page

**TSX Source:** `/app/sounds/page.tsx`  
**DLE Template:** `zvuki.tpl`

**Structure:**
- Header (active: team, sounds)
- Sounds/audio listings

**Gaps:**
- Simple page, check media handling

---

### 13. Add Comic Page

**TSX Source:** `/app/add-comic/page.tsx`  
**DLE Template:** `addnews.tpl`

**Structure:**
- Form for adding new comics
- Fields:
  - Title (required)
  - URL slug
  - Category selection (required)
  - Cover upload (required)
  - Description
  - xfields: Переводчик, Оформитель, Тайпер, Редактор, Том, etc.
  - Comic pages upload
  - Tags
  - Security (captcha/question)

**Key Features in DLE:**
- Instructional collapsible section
- Image uploader with 4MB limit, auto-resize to 800x600
- Autocomplete for contributor names
- Page upload functionality with BB-code generation
- Preview button

**Gaps:**
- **NEED TO REVIEW TSX**: Check if form exists and compare fields
- File upload handling
- Autocomplete implementation
- Validation and preview

---

### 14. Search Results Page

**TSX Source:** Not found in app directory  
**DLE Template:** `searchresult.tpl`, `search.tpl`

**Structure:**
- Search form
- Results display (posts and comments)
- Result cards with images, titles, ratings

**Gaps:**
- **MISSING IN TSX**: Search functionality needs implementation
- Results layout and styling
- Filtering options

---

### 15. Others/Other Publishers Page

**TSX Source:** `/app/others/page.tsx`  
**DLE Template:** Not clearly defined

**Expected Structure:**
- Header (active: comics, other)
- Publishers not in main list
- Issue listings

**Gaps:**
- **NEED TO REVIEW**: Implementation details

---

### 16. Static Pages

**DLE Templates:**
- `static.tpl`
- `static-cataclysm.tpl`
- `static-lsnk.tpl`
- `static-messiah.tpl`
- `static-sd.tpl`
- `static_print.tpl`

**Structure:**
- Static content pages
- Event-specific pages

**Gaps:**
- **NEED TO DETERMINE**: If these are migrated or remain as DLE static pages

---

### 17. Comments

**DLE Templates:**
- `addcomments.tpl` - Add comment form
- `comments.tpl` - Comment display

**Gaps:**
- **MISSING IN TSX**: Comment functionality not visible in app directory
- May need to implement or keep using DLE comment system

---

### 18. User Authentication

**DLE Templates:**
- `login.tpl` - Login form
- `registration.tpl` - Registration form
- `lostpassword.tpl` - Password recovery

**Gaps:**
- **MISSING IN TSX**: Auth pages not in app directory
- Dropdown menu has profile links but no dedicated pages shown
- May rely on DLE auth system

---

### 19. Other Utility Templates

**DLE Templates Not Mapped:**
- `attachment.tpl` - File attachments
- `categorymenu.tpl` - Category menu rendering
- `custom-lcomm.tpl` - Latest comments widget
- `custom-side.tpl` - Sidebar widget
- `feedback.tpl` - Feedback form
- `info.tpl` - Info messages
- `informer.tpl` - Site informer
- `navigation.tpl` - Pagination
- `offline.tpl` - Site offline message
- `pm.tpl` - Private messages
- `poll.tpl` - Poll widget
- `popular.tpl` - Popular items widget
- `preview.css/tpl` - Preview styling
- `print.tpl` - Print version
- `profile_popup.tpl` - Profile popup
- `relatednews.tpl` - Related news widget
- `reliz.tpl` - Release widget
- `rss.tpl` - RSS feed
- `sidebartpl.tpl` - Sidebar template
- `speedbar.tpl` - Breadcrumbs
- `splitnewsnavigation.tpl` - Multi-page navigation
- `statustpl.tpl` - Status messages
- `tagscloud.tpl` - Tag cloud
- `top.tpl` - Top items
- `topnews.tpl` - Top news
- `vote.tpl` - Voting widget

**Gaps:**
- **NEED TO DETERMINE**: Which utility templates are needed in redesign
- Some may be DLE-specific and handled differently in Next.js

---

## Interactive Behaviors

### Behaviors Requiring JavaScript (No React)

#### 1. Search Toggle
**Current (React):**
- `useState` to manage `isSearchOpen`
- `useRef` to reference input element
- `useEffect` to auto-focus on open

**DLE Implementation:**
```javascript
// Vanilla JS
let searchOpen = false;
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('.search-toggle-btn');

searchButton.addEventListener('click', () => {
  searchOpen = !searchOpen;
  if (searchOpen) {
    searchContainer.classList.add('active');
    searchInput.focus();
  } else {
    searchContainer.classList.remove('active');
  }
});
```

**CSS:**
```css
.search-container {
  display: none;
}
.search-container.active {
  display: flex;
}
```

---

#### 2. Dropdown Menu (User Avatar)
**Current (React):**
- Radix UI DropdownMenu component
- Focus management
- Keyboard navigation
- Click-outside-to-close

**DLE Implementation:**
```javascript
// Vanilla JS dropdown
const dropdown = document.querySelector('.user-dropdown');
const trigger = document.querySelector('.user-avatar-btn');
const menu = document.querySelector('.dropdown-menu');

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    menu.classList.remove('active');
  }
});

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu.classList.remove('active');
  }
});

// Keyboard navigation (arrow keys)
const menuItems = menu.querySelectorAll('.dropdown-item');
let currentFocus = -1;

menu.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') {
    currentFocus = Math.min(currentFocus + 1, menuItems.length - 1);
    menuItems[currentFocus].focus();
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    currentFocus = Math.max(currentFocus - 1, 0);
    menuItems[currentFocus].focus();
    e.preventDefault();
  }
});
```

---

#### 3. Mobile Menu Toggle
**Current (React):**
- `useState` for `isMobileMenuOpen`
- Full-screen overlay with fade-in animation
- Body scroll lock

**DLE Implementation:**
```javascript
// Vanilla JS mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

function openMobileMenu() {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
mobileMenuClose.addEventListener('click', closeMobileMenu);

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});
```

**CSS:**
```css
.mobile-menu {
  position: fixed;
  inset: 0;
  background: white;
  z-index: 50;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.active {
  transform: translateX(0);
}
```

---

#### 4. Filter Tabs (Year Selection)
**Current (React):**
- `useState` for `activeTab`
- `onTabChange` callback
- Active state styling

**DLE Implementation:**
```javascript
// Vanilla JS tabs
const tabs = document.querySelectorAll('.filter-tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    const targetId = tab.dataset.tab;
    
    // Remove active from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    
    // Add active to clicked tab
    tab.classList.add('active');
    
    // Show corresponding panel
    tabPanels.forEach(panel => {
      if (panel.id === targetId) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
    
    // Optional: Update URL
    window.history.pushState({}, '', `?year=${targetId}`);
  });
});
```

---

#### 5. Horizontal Scroll Indicators
**Current (React/TSX):**
- CSS classes: `.overflow-x-auto .scrollbar-hide`
- Natural scrolling behavior

**DLE Implementation:**
- Same approach with CSS
- Optional: Add scroll arrows with JS

```javascript
// Optional: Scroll arrows for horizontal sections
const scrollContainer = document.querySelector('.issue-scroll-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

// Show/hide arrows based on scroll position
scrollContainer.addEventListener('scroll', () => {
  scrollLeftBtn.style.display = scrollContainer.scrollLeft > 0 ? 'block' : 'none';
  scrollRightBtn.style.display = 
    scrollContainer.scrollLeft < (scrollContainer.scrollWidth - scrollContainer.clientWidth) 
      ? 'block' 
      : 'none';
});
```

---

#### 6. Form Validation (Add Comic)
**Current:** Not fully visible in TSX, but DLE has basic validation

**DLE Implementation:**
```javascript
// Form validation
const addComicForm = document.querySelector('#add-comic-form');

addComicForm.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const category = document.querySelector('[name="category"]:checked');
  const coverImage = document.querySelector('#short_story').value;
  
  let errors = [];
  
  if (!title.trim()) {
    errors.push('Заголовок обязателен');
  }
  
  if (!category) {
    errors.push('Выберите категорию');
  }
  
  if (!coverImage.trim()) {
    errors.push('Загрузите обложку комикса');
  }
  
  if (errors.length > 0) {
    e.preventDefault();
    alert(errors.join('\n'));
  }
});
```

---

#### 7. Image Upload with Preview
**Current:** DLE has custom implementation in `addnews.tpl`

**DLE Implementation:** Already present, may need styling updates

---

#### 8. Autocomplete for Contributors
**Current:** DLE mentions autocomplete in instructions

**DLE Implementation:**
```javascript
// Simple autocomplete
const contributorInput = document.querySelector('#contributor-input');
const suggestions = ['FlaimZ', 'vantus', 'jimjack', 'Overlord', /* ... */];
const suggestionsList = document.createElement('ul');
suggestionsList.className = 'autocomplete-suggestions';
contributorInput.parentNode.appendChild(suggestionsList);

contributorInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  suggestionsList.innerHTML = '';
  
  if (value.length < 2) return;
  
  const matches = suggestions.filter(s => s.toLowerCase().includes(value));
  
  matches.forEach(match => {
    const li = document.createElement('li');
    li.textContent = match;
    li.addEventListener('click', () => {
      contributorInput.value = match;
      suggestionsList.innerHTML = '';
    });
    suggestionsList.appendChild(li);
  });
});

// Close suggestions on click outside
document.addEventListener('click', (e) => {
  if (!contributorInput.contains(e.target)) {
    suggestionsList.innerHTML = '';
  }
});
```

---

#### 9. Responsive Visibility Toggle
**Current (React):**
- Conditional classes: `md:hidden lg:flex`
- CSS-based, no JS needed

**DLE Implementation:**
- Same with Tailwind or custom CSS classes
- No JS needed

```css
/* Custom CSS if not using Tailwind */
.hide-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hide-mobile {
    display: flex;
  }
}

.hide-tablet {
  display: flex;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hide-tablet {
    display: none;
  }
}
```

---

#### 10. Active Navigation State
**Current (React):**
- Props: `currentPage`, `activePublisher`, `activeTeamPage`
- Conditional class application

**DLE Implementation:**
```javascript
// Server-side: PHP/DLE conditionals in template
// Example: Add active class based on current page
<?php
$currentPage = 'comics'; // Determined by DLE
$activePublisher = 'marvel'; // From category ID
?>

<a href="/releases" class="tab <?php echo $currentPage === 'comics' ? 'active' : ''; ?>">
  Комиксы
</a>

// Or client-side JS:
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-tabs .tab');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});
```

---

## Typography & Spacing System

### Typography Scale

| Element | Size | Line Height | Weight | Usage |
|---------|------|-------------|--------|-------|
| H1 (Large) | 56px | 64px | 800 (extrabold) | Page titles (desktop) |
| H1 (Small) | 28px | 32px | 800 (extrabold) | Page titles (mobile) |
| H2 (Section) | 28px | 32px | 800 (extrabold) | Section headers |
| H3 (Card) | 16px | 18px | 600 (semibold) | Card titles |
| Body (Large) | 20px | 32px | 400 (normal) | Issue descriptions, credits |
| Body (Medium) | 16px | 24px | 400 (normal) | General text |
| Body (Small) | 14px | 16px | 400 (normal) | Card subtitles, metadata |
| Nav Link | 14px | 16px | 600 (semibold) | Navigation items |
| Filter Tab | 20px | 24px | 800 (extrabold) | Year filter tabs |

### Font Features
- `font-variant-numeric: lining-nums tabular-nums` - Used for descriptions and credits
- Sans-serif font (system default or specified)

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Orange) | #fc5621 | Active states, hover, links, CTAs |
| Foreground | #212121 | Main text color |
| Muted Foreground | rgba(33,33,33,0.4) | Placeholder text |
| Border | rgba(33,33,33,0.1) | Borders, underlines |
| Background | #ffffff | Page background |
| Muted Background | #f5f5f5 (assumed) | Hover states, inactive elements |

### Spacing System (Tailwind-based)

| Value | Pixels | Usage |
|-------|--------|-------|
| gap-1 | 4px | Tight spacing (card title/count) |
| gap-2 | 8px | Card internal spacing |
| gap-3 | 12px | Desktop card grids |
| gap-4 | 16px | Section spacing, general gaps |
| gap-6 | 24px | Content area spacing |
| gap-8 | 32px | Major section spacing |
| px-4 | 16px left/right | Container padding |
| pt-8 | 32px top | Page top padding |
| pb-8 | 32px bottom | Page bottom padding |

### Container Widths

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile | 100% | 16px (px-4) |
| Tablet (md) | 1312px | 16px (px-4) |
| Desktop | 1312px | 16px (px-4) |

### Responsive Breakpoints

```css
/* Tailwind default breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px

/* Custom breakpoint for 5-column grid */
xl: 1280px (5 columns on grid)
```

---

## Required Assets

### Logo
- **File:** `/rpu-logo.svg`
- **Usage:** Header logo
- **Size:** 120x44px
- **Format:** SVG preferred

### Icons
**For TSX:** Lucide React icons
- Bookmark
- BookOpen (read online)
- Heart (favorite)
- Search
- Menu
- Close
- User

**For DLE:** Material Icons or Font Awesome
- Already using Material Symbols in header (`material-symbols-outlined`)
- Font Awesome used in other templates (`fa fa-user`, etc.)
- Need to ensure consistent icon set

### Images

#### Placeholder Images
- Comic book covers (2:3 aspect ratio)
- Series covers (2:3 aspect ratio)
- Collection banners (various aspect ratios)
- User avatars (square)

#### Specific Assets
- `/comic-book-cover.png` - Default issue cover
- `/comic-series-cover.jpg` - Default series cover
- `/comic-collection-banner.jpg` - Default collection banner (16:9)
- `/featured-comic-collection.jpg` - Featured collection (16:9)
- `/comic-collection.jpg` - Collection thumbnail
- `/popular-comic-cover.jpg` - Popular items
- `/one-shot-comic-cover.jpg` - One-shot issues
- `/diverse-user-avatars.png` - User avatar
- `/comic-issue-cover.jpg` - Issue detail page
- `/placeholder.svg` - Generic placeholder

### Fonts
- Default system font stack OR
- Google Fonts (if specified)
- Material Symbols Outlined (icon font)
- Font Awesome (if used)

### CSS Files (DLE)
- `/theme/style/styles.css` - Main styles
- `/theme/style/engine.css` - DLE engine styles
- `frame.css` - Frame styles
- `preview.css` - Preview styles

### JavaScript Files (DLE)
- `/theme/js/libs.js` - Libraries
- DLE engine JS (implicit)

---

## Dynamic Data Considerations

### DLE Macros & Variables

#### Post/Issue Data
- `{title}` - Issue title
- `{full-link}` - Full article URL
- `{image-1}` - First image (cover)
- `{full-story}` - Description/content
- `{short-story}` - Short description
- `{category}` - Category name
- `{link-category}` - Category link
- `{category-id}` - Category ID
- `{date}` - Publication date
- `{rating}` - Rating value
- `{vote-num}` - Number of votes
- `{news-id}` - Post ID

#### Custom Fields (xfields)
- `[xfvalue_volume]` - Issue volume/tom
- `[xfvalue_download]` - Download link
- `[xfvalue_reader]` - Online reader link
- `[xfvalue_team]` - Translation team
- `[xfvalue_together]` - Joint team
- `[xfvalue_perevodchik]` - Translator(s)
- `[xfvalue_taiper]` - Letterer(s)
- `[xfvalue_oformlenie]` - Designer(s)
- `[xfvalue_redaktor]` - Editor(s)
- `[xfgiven_volume]` - Conditional: volume exists
- `[xfgiven_taiper]` - Conditional: letterer exists
- `[xfgiven_redaktor]` - Conditional: editor exists
- `[xfgiven_together]` - Conditional: joint team exists

#### Category Data
- `{category}` - Category name
- `{link-category}` - Category link
- `{icon}` - Category icon/cover
- `{news-num}` - Number of posts in category
- `{news-count}` - Issue count
- `{name}` - Collection/category name
- `{url}` - Collection URL
- `{description}` - Category description

#### Custom Macros
```
{custom 
  category="1" 
  subcat="yes" 
  order="date" 
  template="shortstory-main" 
  from="0" 
  limit="7" 
  sort="desc"
}
```
- `category` - Category ID or IDs
- `categoryexclude` - Exclude category IDs
- `subcat` - Include subcategories
- `order` - Sort order (date, reads, rating)
- `days` - Filter by days (e.g., last 30 days)
- `xfields` - Filter by xfield value
- `template` - Template to use for items
- `from` - Start offset
- `limit` - Number of items
- `sort` - Sort direction (asc, desc)

#### Category Menu
```
{catmenu id="124, 147, 9, 318, 271" template="custom-carou"}
```
- Renders specific categories by ID
- Uses custom template

#### Conditional Blocks
```
[aviable=main]...[/aviable]
[not-aviable=main|cat]...[/not-aviable]
[if category = "1"]...[/if]
[if category = "2"]...[/if]
```

#### User Data
- `{login}` - Username
- `{foto}` - User photo
- `{author}` - Author name with link
- `[online]...[/online]` - Online status conditional

#### Comment Data
- `{news_title}` - Post title
- `{comment}` - Comment text
- `{date}` - Comment date
- `{signature}` - User signature

### Data Mapping Strategy

#### Homepage Sections → Data Sources
1. **Новые релизы**: Latest 5 posts, any category, order by date
2. **Свежие подборки**: Static or custom collection data
3. **Новинки издательства**: Category 1 (Marvel) or 2 (DC), latest 7, order by date
4. **Популярные подборки**: Static or curated collections
5. **Популярные серии**: Specific category IDs (124, 147, 9, 318, 271)
6. **Промо подборка**: Featured collection (static or flagged)
7. **Популярное за месяц**: Order by reads, last 30 days
8. **Коллекция подборок**: Static or tagged collections
9. **Популярные ваншоты**: xfield filter "Одиночный выпуск", order by reads

#### Issue Page → Data Sources
- Main post data: title, images, description, date, category
- xfields: team, contributors (multiple roles), download link, volume
- Related issues: Same category, sorted by date
- Related collections: Tagged or manually linked
- Publisher news: Same parent category, latest issues

#### Collections Page → Data Sources
- Need custom system to define collections:
  - Collection metadata (title, description, cover)
  - Collection type (publisher, author, character, event, genre)
  - Collection members (issue IDs or category IDs)
  - Manual curation OR automated (category-based, tag-based)

#### Releases Page → Data Sources
- All issues, grouped by year and month
- Filterable by year
- Order by date descending within each month

#### Series Page → Data Sources
- Category data (series = subcategory)
- All posts in category
- Order by issue number (parsed from title or custom field)

### Collections Implementation Strategy

**Option 1: Static Pages**
- Create static HTML pages for each collection
- Use `static.tpl` templates
- Manually maintain

**Option 2: Category-Based**
- Use DLE categories as collections
- Assign posts to multiple categories (not natively supported)
- Limited flexibility

**Option 3: Tag-Based**
- Use tags to define collections
- Tag posts with collection names
- Query by tag
- More flexible but may need custom code

**Option 4: Custom Database Table**
- Create custom table for collections
- Store collection metadata
- Link to posts via junction table
- Most flexible, requires plugin/module development

**Recommendation:** Start with Option 3 (tag-based) for quick implementation, plan Option 4 for scalability.

---

## Implementation Checklist

### Phase 1: Core Templates & Components

#### Header Component ✓ (exists in DLE, needs enhancement)
- [ ] Search toggle functionality (JS)
- [ ] User dropdown menu (JS)
- [ ] Mobile menu overlay (JS + CSS)
- [ ] Active navigation state (PHP conditionals + CSS)
- [ ] Secondary navigation (publishers/team) (PHP conditionals)
- [ ] Material Icons integration
- [ ] Responsive styling

#### Footer Component ✓ (exists, minor updates)
- [ ] Link hover effects (CSS)
- [ ] Border styling
- [ ] Copyright text

#### IssueCard Component ✓ (exists, needs updates)
- [ ] Update from background-image to `<img>` tag
- [ ] Responsive sizing classes
- [ ] Size variants (default/large)
- [ ] Hover effects (CSS)
- [ ] Conditional visibility classes

#### SeriesCard Component ✓ (exists, needs updates)
- [ ] Update structure to match TSX
- [ ] Issue count display
- [ ] Responsive sizing
- [ ] Hover effects

#### CollectionCard Component (partial, needs major work)
- [ ] Dynamic aspect ratio support (CSS + data attribute)
- [ ] Responsive visibility (CSS classes)
- [ ] Issue count display
- [ ] Multiple layout variants

#### SectionHeader Component (inline, needs component)
- [ ] Extract to reusable template part
- [ ] Link variant support
- [ ] Consistent styling

#### FilterTabs Component (needs creation)
- [ ] Tab button markup
- [ ] Active state styling
- [ ] Click handlers (JS)
- [ ] URL state management

#### DownloadButton Component (exists as link, needs styling)
- [ ] Button styling component
- [ ] Responsive sizing
- [ ] Icon integration

---

### Phase 2: Page Templates

#### Homepage (`main.tpl`) ✓ (exists, needs updates)
- [ ] Update header component integration
- [ ] Fix collection sections (remove static placeholders)
- [ ] Add dynamic data for collections
- [ ] Update card components
- [ ] Responsive grid layouts (CSS)
- [ ] Horizontal scroll sections (CSS)
- [ ] Gap/spacing consistency
- [ ] Remove duplicate section markup errors (lines 141-144, 150-153)

#### Issue Detail Page (`fullstory.tpl`) ✓ (exists, needs major updates)
- [ ] Responsive layout (cover + details)
- [ ] Action buttons section (download, read, favorite, bookmark)
- [ ] Icon integration (Material Icons)
- [ ] Credits grid layout
- [ ] Separator lines (HR)
- [ ] "Читайте также" section (add)
- [ ] Related collections section (convert from static)
- [ ] Publisher news section (conditional by category)
- [ ] Typography and spacing

#### Releases Page (`newcomics.tpl`) (partial, needs work)
- [ ] Clean up markup (remove duplicate header)
- [ ] Integrate header component properly
- [ ] Year filter tabs (FilterTabs component)
- [ ] Filter functionality (JS)
- [ ] Month section layout
- [ ] Issue grid layout
- [ ] Dynamic data integration

#### Collections Page ❌ (MISSING)
- [ ] Create `collections.tpl` template
- [ ] Page title and header
- [ ] Multiple collection sections
- [ ] Different card counts per section (1, 2, 3, 4, 5)
- [ ] Dynamic aspect ratio rules
- [ ] Collection data integration

#### Collection Detail Page ❌ (MISSING OR PARTIAL)
- [ ] Create/update category template for collections
- [ ] Collection title and description
- [ ] Mixed series/issue grid
- [ ] Similar collections section
- [ ] Layout and styling

#### Publisher Page (category template, needs review)
- [ ] Review category template implementation
- [ ] Ensure header shows active publisher
- [ ] Issue listings
- [ ] Series listings
- [ ] Styling updates

#### Series Page (category template, needs review)
- [ ] Review subcategory template
- [ ] Series title and metadata
- [ ] Issue listings in order
- [ ] Related content
- [ ] Styling updates

#### Add Comic Page (`addnews.tpl`) ✓ (exists, needs styling)
- [ ] Styling updates to match design
- [ ] Form layout improvements
- [ ] Instructional section styling
- [ ] File upload UI
- [ ] Autocomplete enhancement
- [ ] Validation improvements

#### Search Results Page (`searchresult.tpl`) (exists, needs updates)
- [ ] Card layout for results
- [ ] Styling updates
- [ ] Responsive grid
- [ ] No results state

#### Team/Member Pages (various templates, needs review)
- [ ] Review `userinfo.tpl`, `stats.tpl`, etc.
- [ ] Update layouts and styling
- [ ] Header integration

#### Other Pages
- [ ] Schedule page (review/create)
- [ ] Vacancies page (`vakansi.tpl` - update styling)
- [ ] Sounds page (`zvuki.tpl` - update styling)
- [ ] Static pages (review and update as needed)
- [ ] Auth pages (login, registration, password recovery)
- [ ] Others/Other publishers page (create/review)

---

### Phase 3: Styling & Assets

#### CSS Framework Decision
- [ ] Choose approach: Tailwind CSS, custom CSS matching Tailwind classes, or hybrid
- [ ] Create utility classes for common patterns
- [ ] Set up responsive breakpoints

#### Typography System
- [ ] Define font sizes and line heights
- [ ] Set up font weights
- [ ] Apply tabular nums where needed
- [ ] Ensure consistency across templates

#### Color System
- [ ] Define CSS custom properties for colors
- [ ] Apply primary orange color (`#fc5621`)
- [ ] Set up foreground, background, border colors
- [ ] Hover states for all interactive elements

#### Spacing System
- [ ] Define gap utilities
- [ ] Container padding and max-width
- [ ] Section spacing
- [ ] Component internal spacing

#### Grid Layouts
- [ ] 2-column grid (collections)
- [ ] 3-column grid (collections, related items)
- [ ] 4-column grid (collections)
- [ ] 5-column grid (releases, large collections)
- [ ] Mixed series/issue grids
- [ ] Responsive breakpoints for all grids

#### Component Styling
- [ ] Card hover effects
- [ ] Button styles (primary, secondary, icon buttons)
- [ ] Link styles and hover states
- [ ] Form input styles
- [ ] Dropdown menu styles
- [ ] Mobile menu styles
- [ ] Tab styles

#### Icons
- [ ] Ensure Material Icons loaded
- [ ] Icon sizing consistency
- [ ] Icon colors and hover states
- [ ] Icon button styling

#### Images & Placeholders
- [ ] Collect all required placeholder images
- [ ] Set up default covers (issue, series, collection)
- [ ] Image aspect ratio handling
- [ ] Lazy loading implementation
- [ ] Responsive images

---

### Phase 4: JavaScript & Interactions

#### Navigation
- [ ] Search toggle (vanilla JS)
- [ ] User dropdown menu (vanilla JS)
- [ ] Mobile menu toggle (vanilla JS)
- [ ] Active navigation state (JS or PHP)
- [ ] Keyboard navigation for dropdowns

#### Filtering & Tabs
- [ ] Year filter tabs (vanilla JS)
- [ ] Tab content switching
- [ ] URL state management (optional)

#### Forms
- [ ] Add comic form validation
- [ ] File upload handling
- [ ] Autocomplete for contributors
- [ ] Preview functionality

#### Utilities
- [ ] Horizontal scroll arrows (optional)
- [ ] Scroll position indicators
- [ ] Keyboard shortcuts (optional)
- [ ] Focus management

---

### Phase 5: Data Integration

#### DLE Macros
- [ ] Review all custom macro usage
- [ ] Ensure correct parameters (category, limit, order, etc.)
- [ ] Test macro output with real data

#### xfields
- [ ] Verify all xfield names match database
- [ ] Conditional xfield display
- [ ] xfield formatting (comma-separated lists, etc.)

#### Collections System
- [ ] Implement chosen collections strategy (tag-based recommended)
- [ ] Create collection data (title, description, cover, members)
- [ ] Build collection query logic
- [ ] Test collection pages with real data

#### Dynamic Content
- [ ] Homepage sections populated with real data
- [ ] Issue detail page with full metadata
- [ ] Releases page with date-based filtering
- [ ] Collections page with real collections
- [ ] Related content recommendations

---

### Phase 6: Testing & QA

#### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Android)

#### Responsive Testing
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1280px+)
- [ ] Test all breakpoints for each page

#### Functionality Testing
- [ ] Navigation (all links work)
- [ ] Search functionality
- [ ] User dropdown
- [ ] Mobile menu
- [ ] Filter tabs
- [ ] Form submission (add comic)
- [ ] Download links
- [ ] All interactive elements

#### Accessibility
- [ ] Keyboard navigation for all interactive elements
- [ ] Focus indicators
- [ ] ARIA labels where needed
- [ ] Color contrast
- [ ] Screen reader testing

#### Performance
- [ ] Image optimization
- [ ] CSS minification
- [ ] JS minification
- [ ] Lazy loading
- [ ] Page load times

---

### Phase 7: Content & Assets

#### Images
- [ ] Logo (SVG)
- [ ] Default comic covers
- [ ] Default series covers
- [ ] Default collection banners
- [ ] User avatar placeholders
- [ ] Icon fonts loaded

#### Text Content
- [ ] Instructional text (add comic page)
- [ ] Static page content
- [ ] Error messages
- [ ] Form labels and placeholders
- [ ] Footer links and copyright

#### Data
- [ ] Contributor list for autocomplete
- [ ] Publisher list
- [ ] Series/category structure
- [ ] Collections data
- [ ] Static pages content

---

### Phase 8: Deployment

#### Pre-Deployment
- [ ] Backup existing DLE templates
- [ ] Test on staging environment
- [ ] Final QA pass
- [ ] Performance testing
- [ ] User acceptance testing

#### Deployment
- [ ] Upload new templates to DLE theme directory
- [ ] Update CSS files
- [ ] Upload JS files
- [ ] Upload assets (images, fonts)
- [ ] Clear DLE cache
- [ ] Test on production

#### Post-Deployment
- [ ] Monitor for errors
- [ ] Collect user feedback
- [ ] Performance monitoring
- [ ] Fix any issues
- [ ] Document changes

---

## Open Questions & Unknowns

### 1. Collections System Implementation
**Question:** How should collections be implemented in DLE?  
**Options:**
- A) Tag-based system (easiest, limited features)
- B) Custom database table (most flexible, requires development)
- C) Category multi-assignment (not natively supported)
- D) Static pages (manual maintenance)

**Recommendation:** Start with tag-based, plan for custom table if scalability is needed.

**Impact:** Affects collections page, collection detail pages, related collections feature.

---

### 2. Search Functionality
**Question:** Will search use existing DLE search or custom implementation?  
**Current State:** 
- DLE has search form in header
- TSX has search toggle but no visible search page in app directory

**Unknowns:**
- Search results page design (exists in DLE as `searchresult.tpl` but needs updates)
- Search toggle behavior (TSX shows inline search field, DLE uses form submission)
- Advanced search features

**Impact:** Header component, search results page, user experience.

---

### 3. User Authentication & Profile
**Question:** Will auth remain DLE-based or migrate to Next.js?  
**Current State:**
- DLE templates exist for login, registration, password recovery
- TSX shows dropdown with profile links but no dedicated pages in app directory
- User avatar and dropdown present in both

**Unknowns:**
- Auth strategy (DLE sessions vs. JWT vs. hybrid)
- Profile page design (not visible in TSX app directory)
- User dashboard features

**Impact:** Authentication flow, profile pages, user-specific features.

---

### 4. Comments System
**Question:** Will comments remain DLE-based or require new implementation?  
**Current State:**
- DLE has comment templates (`addcomments.tpl`, `comments.tpl`)
- TSX pages don't show comment sections

**Unknowns:**
- Comment display design
- Comment moderation
- Nested comments
- Real-time updates

**Impact:** Issue detail pages, user engagement features.

---

### 5. Admin Panel Integration
**Question:** How will admin/moderation features integrate?  
**Current State:**
- DLE has full admin panel
- TSX has "Add Comic" page

**Unknowns:**
- Admin styling updates
- Moderation workflow
- Content management interface
- User role permissions

**Impact:** Content management, moderation efficiency.

---

### 6. Static Pages & Content Management
**Question:** Which static pages need migration?  
**Current State:**
- Multiple static templates exist in DLE
- Some are event-specific (cataclysm, messiah, etc.)
- Not clear which are active or needed

**Unknowns:**
- Active static pages list
- Content update frequency
- Who manages static content
- Migration priority

**Impact:** Content completeness, user information access.

---

### 7. RSS Feed & Integrations
**Question:** Will RSS feed design change?  
**Current State:**
- DLE has RSS template (`rss.tpl`)
- Footer links to RSS

**Unknowns:**
- RSS feed format (existing DLE feed is functional)
- Additional feed types (by category, by publisher, etc.)
- External integrations (Telegram, VK)

**Impact:** Content syndication, external platform integration.

---

### 8. Mobile App / PWA
**Question:** Is a mobile app or PWA planned?  
**Current State:**
- Responsive web design in TSX
- No indication of native app

**Unknowns:**
- PWA features (offline, push notifications)
- Mobile app development
- API requirements

**Impact:** Mobile user experience, development scope.

---

### 9. Performance & Caching
**Question:** What caching strategy will be used?  
**Current State:**
- DLE has built-in caching
- Next.js (in TSX mockups) has SSR/SSG capabilities

**Unknowns:**
- DLE caching configuration
- Custom caching layers
- CDN usage
- Database query optimization

**Impact:** Site performance, server load, user experience.

---

### 10. Multilingual Support
**Question:** Will the site support multiple languages?  
**Current State:**
- Currently Russian only
- No i18n visible in TSX

**Unknowns:**
- Future language requirements
- Translation management
- URL structure for languages

**Impact:** Template structure, data management, scalability.

---

### 11. Analytics & Tracking
**Question:** What analytics/tracking will be implemented?  
**Unknowns:**
- Google Analytics or alternative
- Event tracking (clicks, downloads, searches)
- User behavior tracking
- Privacy compliance (GDPR, etc.)

**Impact:** Script integration, privacy policy, user consent.

---

### 12. Image Storage & CDN
**Question:** How are images stored and served?  
**Current State:**
- DLE uses local uploads directory
- TSX references images like `/comic-book-cover.png`

**Unknowns:**
- Image storage location (local vs. CDN)
- Image optimization strategy
- Responsive image serving
- Backup and migration

**Impact:** Performance, storage costs, image management.

---

### 13. Custom Series Ordering
**Question:** How are issues ordered within a series?  
**Current State:**
- Issue number is part of title (e.g., "Amazing Spider-Man #099")
- Ordering likely by date or title parsing

**Unknowns:**
- Custom field for issue number
- Sorting logic
- Handling of special issues (annuals, one-shots)

**Impact:** Series page display, user navigation.

---

### 14. Download Link Management
**Question:** How are download links managed and validated?  
**Current State:**
- Download link is xfield
- Link to Yandex.Disk or other file hosts

**Unknowns:**
- Link expiration handling
- Multiple download sources
- Download tracking
- Dead link detection

**Impact:** User experience, content availability, maintenance.

---

### 15. Responsive Image Strategy
**Question:** What responsive image strategy will be used?  
**Current State:**
- TSX uses single image source
- No `srcset` or `<picture>` elements visible

**Unknowns:**
- Multiple image sizes generation
- Responsive image markup
- Lazy loading implementation
- Image format (WebP, AVIF support)

**Impact:** Performance, bandwidth, user experience.

---

### 16. Test Data Availability
**Question:** Is test data available for development?  
**Unknowns:**
- Sample issues with full metadata
- Sample collections
- Sample user data
- Sample contributor lists

**Impact:** Development speed, testing completeness.

---

### 17. Browser Support Requirements
**Question:** What browsers need to be supported?  
**Recommendation:** Modern browsers (last 2 versions), IE11 dropped

**Unknowns:**
- Specific browser versions
- Polyfill requirements
- Testing matrix

**Impact:** CSS/JS compatibility, testing effort.

---

### 18. Third-Party Integrations
**Question:** What third-party services are integrated?  
**Current State:**
- Font Awesome CDN
- Google Fonts
- jQuery

**Unknowns:**
- Payment processing (if any)
- Social login (mentioned in templates)
- Email service
- File hosting APIs

**Impact:** Dependencies, external service management.

---

### 19. Notification System
**Question:** Is a notification system needed?  
**Examples:**
- New release notifications
- Comment replies
- Favorite series updates

**Unknowns:**
- Push notifications
- Email notifications
- In-app notifications

**Impact:** User engagement, development scope.

---

### 20. Content Moderation Tools
**Question:** What moderation tools are needed?  
**Unknowns:**
- Report content feature
- Spam detection
- Content approval workflow
- Automated moderation

**Impact:** Community management, content quality.

---

## Summary

This mapping document provides a comprehensive guide for implementing the redesigned templates in DLE. Key takeaways:

1. **Shared Components:** Header, Footer, IssueCard, SeriesCard, CollectionCard, and SectionHeader are the primary reusable components. All need updates to match TSX designs.

2. **Major Gaps:**
   - Collections page entirely missing in DLE
   - Collection detail page missing or incomplete
   - Search results page needs major updates
   - Many behavioral interactions (search toggle, dropdowns, mobile menu) need JavaScript implementation

3. **Interactive Behaviors:** All React-based interactions need vanilla JavaScript equivalents. Focus management, keyboard navigation, and state management are critical.

4. **Typography & Spacing:** Consistent system defined. Need CSS implementation (Tailwind or custom utilities).

5. **Dynamic Data:** DLE macros and xfields are well-established. Collections system is the main unknown—recommend tag-based approach initially.

6. **Implementation Order:**
   1. Core components (Header, Footer, Cards)
   2. Homepage and Issue detail page (highest traffic)
   3. Releases and Collections pages
   4. Remaining pages and utilities
   5. Testing and optimization

7. **Open Questions:** 20 questions identified, primarily around:
   - Collections system implementation
   - Auth and user features
   - Content management
   - Performance and scalability

**Next Steps:**
1. Resolve open questions (prioritize collections system)
2. Set up development environment
3. Begin Phase 1 implementation (core components)
4. Iterate based on testing and feedback

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Author:** Development Team
