# Listing Partials Refactor - Summary of Changes

## Overview
This refactor updates all listing-related DLE templates to use the modern design language based on IssueCard, CollectionCard, and SeriesCard components from the TSX architecture. The changes eliminate inline styles, legacy classes, and jQuery wrappers in favor of Tailwind CSS utility classes and semantic HTML markup.

## Templates Updated

### Issue/Item Templates (3:2 aspect ratio - pb-[150%])

#### `shortstory.tpl`
- **Before**: Old `.item` class with inline background-image styles
- **After**: IssueCard component markup with:
  - `flex flex-col gap-2 group shrink-0` for responsive card layout
  - Semantic `<img>` tag with `absolute top-0 left-0 w-full h-full object-cover`
  - Padding-bottom technique for 3:2 aspect ratio
  - Lazy loading enabled
  - Group hover opacity transition

#### `shortstory-main.tpl`
- **Before**: Old `.item-main` class with inline styles
- **After**: Same as shortstory.tpl - IssueCard structure

#### `custom-side.tpl`
- **Before**: Old `.mov-side` class with complex nested divs
- **After**: IssueCard structure with same responsive and lazy loading features

#### `relatednews.tpl`
- **Before**: `.mov` class with jQuery data-link attribute
- **After**: IssueCard structure using semantic href attributes

### Collection/Series Templates (16-9 aspect ratio - pb-[56.25%])

#### `custom-carou.tpl`
- **Before**: Old `.item-main` class with inline background images
- **After**: CollectionCard structure with:
  - `flex flex-col gap-2 group` layout
  - 16-9 aspect ratio using `pb-[56.25%]`
  - Modern info section with title and count
  - Proper declination support maintained

#### `collection-item.tpl`
- **Before**: Semantic classes like `.collection-link`, `.collection-cover`, `.collection-title`
- **After**: Tailwind utility classes following component pattern
  - 16-9 aspect ratio for consistency

#### `series-item.tpl`
- **Before**: Semantic classes like `.series-link`, `.series-cover`, `.series-title`
- **After**: Tailwind utilities with 3:2 aspect ratio (shrink-0 pattern)

#### `stat_cat.tpl`
- **Before**: Hardcoded placeholder items with inline styles
- **After**: Dynamic template using `[item]...[/item]` loop with real data
  - 16-9 aspect ratio for consistency with collections
  - Proper DLE data binding (url, image, name, news-count)

### Sidebar/Widget Templates

#### `topnews.tpl`
- **Before**: `.short1-item` class with separate image div
- **After**: Modern flex sidebar item with:
  - `flex gap-3 group` layout
  - Fixed-size thumbnail (w-16 h-16)
  - Hover background color change
  - Line clamping for title

#### `speedbar.tpl`
- **Before**: Direct output without wrapper
- **After**: Semantic `<nav>` wrapper with:
  - `flex items-center gap-2` for breadcrumb layout
  - `text-sm` and `text-muted-foreground` for styling

#### `informer.tpl`
- **Before**: `.informer` and `.discript` classes
- **After**: Modern card styling with:
  - `bg-secondary` background
  - `rounded-lg p-4` styling
  - `space-y-3` for content spacing

#### `vote.tpl`
- **Before**: `.vote-box`, `.vote-title`, `.vote-list` classes
- **After**: Modern card component with:
  - `bg-card border border-border` styling
  - `rounded-lg p-6` padding
  - Button styling with `bg-primary`, `bg-secondary`
  - `space-y-4` for proper spacing

#### `votes.tpl`
- **Before**: Direct output
- **After**: Wrapper with `space-y-4` for vertical stacking

### Search Templates

#### `search.tpl`
- **Before**: Old `.search-page` markup with jQuery:
  ```javascript
  $(".short2-item").wrapAll("<div class='clearfix' style='margin-top:20px;' />");
  ```
- **After**: Modern semantic markup with:
  - `space-y-8` for section spacing
  - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for responsive grid
  - `text-3xl font-bold` header styling
  - Information box with `bg-blue-50 border border-blue-200`
  - **jQuery completely removed**

#### `searchresult.tpl`
- **Before**: `.mov` class with jQuery data-link attributes and inline styles
- **After**: Modern article/grid card layout:
  - Posts use 16-9 aspect ratio collection cards
  - Rating overlays with `absolute top-2 right-2`
  - Comments use semantic flex layout with avatar image
  - **jQuery data-link removed**, now uses semantic href
  - No inline styles, all Tailwind utilities

## Design Language Consistency

### Shared Classnames
All updated templates now use these consistent Tailwind utilities:

#### Layout Classes
- `flex flex-col gap-2` - Primary card layout
- `group` - For hover state coordination
- `shrink-0` - For carousel/horizontal scroll contexts
- `flex items-center gap-2` - For sidebars/breadcrumbs
- `space-y-*` - Vertical spacing between sections

#### Image/Aspect Ratio Classes
- `pb-[150%]` - Issue cards (3:2 aspect ratio)
- `pb-[56.25%]` - Collection cards (16-9 aspect ratio)
- `object-cover object-center` - Image fill behavior
- `loading="lazy"` - Performance optimization

#### Typography Classes
- `font-semibold text-base leading-[18px]` - Card titles
- `font-normal text-sm leading-4` - Card descriptions
- `text-foreground` - Primary text color
- `text-muted-foreground` - Secondary text color
- `group-hover:opacity-90` - Hover effect

#### State & Interactive Classes
- `group-hover:opacity-90` - Hover opacity transition
- `hover:bg-secondary` - Sidebar hover state
- `hover:text-primary` - Link hover state
- `transition-colors` - Smooth transitions

### Removed Anti-patterns
- ✅ All inline `style=""` attributes removed
- ✅ No hardcoded color hex values in markup (using CSS variables)
- ✅ No jQuery wrappers or data attributes for styling
- ✅ No legacy CSS class names (.mov, .item, .short1-item, etc.)
- ✅ No hardcoded placeholder items

## Responsive Behavior

All templates maintain or improve responsive behavior:

- Mobile: Full-width cards with side padding
- Tablet: 2-column grid layouts where applicable
- Desktop: 3+ column grids with optimal spacing

Key responsive utilities used:
- `w-[calc((100vw-48px)/2)] md:w-auto md:flex-1 md:min-w-[128px]` for issue cards
- `md:flex-1` for flexible grid items
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for search results
- `hidden md:flex` for hiding/showing on breakpoints

## Data Binding Verification

All templates properly use DLE data tags:
- `{full-link}`, `{url}`, `{link-category}` - Links
- `{image-1}`, `{icon}` - Images
- `{title}`, `{name}`, `{category}` - Titles
- `{news-count}`, `{news-num}` - Counters
- `{rating}`, `{vote-num}` - Rating data
- `{comment}`, `{news}` - Content

## Acceptance Criteria Met

✅ All listing-oriented templates render cards/rows using the new design language  
✅ No legacy inline styling or outdated classes  
✅ Search pages use semantic markup without jQuery  
✅ Breadcrumbs (speedbar) styled with modern design  
✅ Poll widgets (vote) use modern UI  
✅ Shared components present consistent markup  
✅ All use Tailwind classes for consistency  
✅ Responsive behavior verified across breakpoints  

## Migration Notes

- The collection-item.tpl and series-item.tpl maintain the same DLE data variable names
- stat_cat.tpl now requires proper data source configuration (was using hardcoded placeholders)
- search.tpl no longer needs jQuery - can be safely removed from page if not needed elsewhere
- All templates remain backward compatible with existing DLE installations
