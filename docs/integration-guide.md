# Integration Guide: Using Modern Assets in DLE Templates

This guide shows you how to integrate the modern CSS, JavaScript, and design patterns into your DLE templates.

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Using Tailwind Utilities](#using-tailwind-utilities)
3. [JavaScript Features](#javascript-features)
4. [Design Patterns](#design-patterns)
5. [Examples](#examples)

## Basic Setup

### Update main.tpl Header

Add these lines to the `<head>` section of your `main.tpl`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  
  <!-- Modern Fonts & Icons -->
  <link rel="stylesheet" href="{THEME}/style/fonts.css">
  
  <!-- Modern Compiled CSS -->
  <link rel="stylesheet" href="{THEME}/style/styles.css">
  
  <!-- Legacy/Component CSS (if needed) -->
  <link rel="stylesheet" href="{THEME}/style/components.css">
  <link rel="stylesheet" href="{THEME}/style/engine.css">
  
  <!-- DLE System CSS -->
  <link rel="stylesheet" href="{THEME}/dleimages/dleicons.css">
  
  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="{THEME}/images/icon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="{THEME}/images/icon-light-32x32.png">
  <link rel="apple-touch-icon" href="{THEME}/images/apple-icon.png">
</head>
```

### Update main.tpl Footer

Add before closing `</body>` tag:

```html
  <!-- DLE Required Scripts -->
  {AJAX}
  
  <!-- Modern Theme JavaScript (No jQuery!) -->
  <script src="{THEME}/js/theme.js"></script>
</body>
</html>
```

## Using Tailwind Utilities

### Layout

```html
<!-- Container -->
<div class="max-w-content mx-auto px-4">
  <!-- Content -->
</div>

<!-- Flex Layout -->
<div class="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Typography

```html
<!-- Headings -->
<h1 class="text-4xl font-bold text-foreground mb-4">Heading 1</h1>
<h2 class="text-3xl font-semibold text-foreground mb-3">Heading 2</h2>
<h3 class="text-2xl font-semibold text-foreground mb-2">Heading 3</h3>

<!-- Body Text -->
<p class="text-base text-foreground leading-relaxed">
  Regular paragraph text with proper line height.
</p>

<!-- Muted Text -->
<p class="text-sm text-muted-foreground">
  Secondary information
</p>

<!-- Accent Text -->
<span class="text-accent font-semibold">Highlighted text</span>
```

### Colors

```html
<!-- Background Colors -->
<div class="bg-background">White background</div>
<div class="bg-muted">Muted background</div>
<div class="bg-accent">Accent background</div>

<!-- Text Colors -->
<p class="text-foreground">Primary text</p>
<p class="text-muted-foreground">Muted text</p>
<p class="text-accent">Accent text</p>

<!-- Border Colors -->
<div class="border border-border">With border</div>
```

### Spacing

```html
<!-- Padding -->
<div class="p-4">Padding all sides</div>
<div class="px-4 py-2">Horizontal and vertical padding</div>

<!-- Margin -->
<div class="mb-4">Margin bottom</div>
<div class="mx-auto">Centered with auto margins</div>

<!-- Gap (in flex/grid) -->
<div class="flex gap-4">Items with gap</div>
```

### Responsive Design

```html
<!-- Mobile first approach -->
<div class="w-full lg:w-1/2">
  <!-- Full width on mobile, half on large screens -->
</div>

<div class="hidden lg:block">
  <!-- Hidden on mobile, visible on large screens -->
</div>

<div class="text-base lg:text-lg">
  <!-- Responsive text size -->
</div>
```

## JavaScript Features

### Search Toggle

```html
<!-- In your header -->
<button id="search-toggle" class="w-10 h-10 flex items-center justify-center">
  <span class="material-symbols-outlined text-foreground icon-lg">search</span>
</button>

<!-- Search container (initially hidden) -->
<div id="search-container" style="display: none;" class="flex-1 max-w-md relative flex items-center h-12">
  <input
    type="text"
    placeholder="Поиск"
    class="w-full h-full bg-transparent border-b border-foreground pr-12 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
  />
</div>
```

### Mobile Menu

```html
<!-- Toggle button -->
<button id="mobile-menu-toggle" class="w-10 h-10 flex items-center justify-center lg:hidden">
  <span class="material-symbols-outlined text-foreground icon-lg">menu</span>
</button>

<!-- Mobile menu overlay -->
<div id="mobile-menu" class="hidden lg:hidden fixed inset-0 bg-background z-50 p-4">
  <div class="flex justify-between items-center mb-8">
    <a href="/">Logo</a>
    <button id="mobile-menu-close" class="w-10 h-10 flex items-center justify-center">
      <span class="material-symbols-outlined text-foreground icon-lg">close</span>
    </button>
  </div>
  <nav class="flex flex-col gap-6">
    <a href="/" class="text-2xl font-semibold text-foreground">Главная</a>
    <a href="/comics" class="text-2xl font-semibold text-foreground">Комиксы</a>
    <a href="/collections" class="text-2xl font-semibold text-foreground">Подборки</a>
  </nav>
</div>
```

### Dropdown Menu

```html
<!-- Trigger -->
<button data-dropdown-trigger="user-menu" class="w-11 h-11 rounded-full overflow-hidden">
  <img src="{THEME}/images/placeholder-user.jpg" alt="User" class="w-full h-full object-cover">
</button>

<!-- Dropdown content -->
<div id="user-menu" data-dropdown class="hidden absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg">
  <a href="/profile" class="block px-4 py-2 text-foreground hover:bg-muted">Профиль</a>
  <a href="/settings" class="block px-4 py-2 text-foreground hover:bg-muted">Настройки</a>
  <a href="/logout" class="block px-4 py-2 text-foreground hover:bg-muted">Выйти</a>
</div>
```

### Tabs

```html
<div class="tabsbox">
  <!-- Tab buttons -->
  <div class="tabs-sel flex gap-3 border-b border-border mb-4">
    <span class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:border-accent">Tab 1</span>
    <span class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:border-accent">Tab 2</span>
    <span class="px-4 py-2 cursor-pointer border-b-2 border-transparent hover:border-accent">Tab 3</span>
  </div>
  
  <!-- Tab content -->
  <div class="tabs-b" style="display: none;">Content 1</div>
  <div class="tabs-b" style="display: none;">Content 2</div>
  <div class="tabs-b" style="display: none;">Content 3</div>
</div>
```

### Grid View Toggle

```html
<div id="grid-select" class="flex gap-2">
  <span data-type="grid-list" class="cursor-pointer px-3 py-1 rounded hover:bg-muted">Список</span>
  <span data-type="grid-thumb" class="cursor-pointer px-3 py-1 rounded hover:bg-muted">Сетка</span>
</div>

<div id="grid" data-view="grid-list" class="grid-list">
  <!-- Items here -->
</div>
```

## Design Patterns

### Card Component

```html
<div class="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
  <img src="{THEME}/images/comic-book-cover.png" alt="Cover" class="w-full h-48 object-cover">
  <div class="p-4">
    <h3 class="text-lg font-semibold text-card-foreground mb-2">Card Title</h3>
    <p class="text-sm text-muted-foreground">Card description text</p>
  </div>
</div>
```

### Button Component

```html
<!-- Primary Button -->
<button class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
  Click Me
</button>

<!-- Secondary Button -->
<button class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors">
  Secondary
</button>

<!-- Accent Button -->
<button class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent text-inverted-text font-medium hover:opacity-90 transition-opacity">
  Accent Action
</button>
```

### Input Component

```html
<input
  type="text"
  placeholder="Enter text..."
  class="flex h-10 w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
/>
```

### Badge Component

```html
<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-accent text-inverted-text">
  New
</span>

<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-muted text-foreground">
  Tag
</span>
```

### Navigation Link

```html
<a
  href="/page"
  class="font-semibold text-sm leading-4 text-foreground hover:text-accent transition-colors"
>
  Link Text
</a>

<!-- Active state -->
<a
  href="/page"
  class="font-semibold text-sm leading-4 text-accent underline decoration-accent decoration-1 underline-offset-[5px]"
>
  Active Link
</a>
```

## Examples

### Header Component

```html
<header class="bg-background w-full border-b border-border">
  <div class="hidden lg:flex items-end justify-between px-4 py-2 mx-auto h-[60px] max-w-content">
    <!-- Logo -->
    <div class="flex gap-4 items-end">
      <a href="/" class="w-[120px] h-11">
        <img src="{THEME}/images/rpu-logo.svg" alt="Logo" class="w-full h-full">
      </a>
      
      <!-- Navigation -->
      <nav class="flex gap-3 h-11 pt-1">
        <a href="/" class="font-semibold text-sm text-foreground hover:text-accent transition-colors">
          Главная
        </a>
        <a href="/comics" class="font-semibold text-sm text-foreground hover:text-accent transition-colors">
          Комиксы
        </a>
        <a href="/collections" class="font-semibold text-sm text-foreground hover:text-accent transition-colors">
          Подборки
        </a>
      </nav>
    </div>
    
    <!-- Search & User -->
    <div class="flex gap-4 items-center">
      <button id="search-toggle" class="w-10 h-10 flex items-center justify-center">
        <span class="material-symbols-outlined text-foreground" style="font-size: 32px; font-weight: 600;">search</span>
      </button>
      
      <button data-dropdown-trigger="user-menu" class="w-11 h-11 rounded-full overflow-hidden">
        <img src="{THEME}/images/placeholder-user.jpg" alt="User" class="w-full h-full object-cover">
      </button>
    </div>
  </div>
</header>
```

### Comic Card

```html
<div class="comic-item group cursor-pointer">
  <a href="/comic/[id]" class="block">
    <!-- Cover -->
    <div class="relative w-full aspect-[2/3] overflow-hidden rounded-lg mb-3">
      <img
        src="{THEME}/images/comic-book-cover.png"
        alt="Comic Title"
        class="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
    </div>
    
    <!-- Info -->
    <div class="space-y-1">
      <h3 class="text-base font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
        Comic Title Here
      </h3>
      <p class="text-sm text-muted-foreground">
        Issue #42
      </p>
    </div>
  </a>
</div>
```

### Comment Form

```html
<div id="add-comm-form" style="display: none;" class="bg-card border border-border rounded-lg p-4 mb-4">
  <form method="post" action="">
    <textarea
      name="comments"
      rows="5"
      placeholder="Ваш комментарий..."
      class="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-3"
    ></textarea>
    
    <div class="flex gap-2 justify-end">
      <button
        type="button"
        onclick="document.getElementById('add-comm-form').style.display='none'"
        class="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80"
      >
        Отмена
      </button>
      <button
        type="submit"
        class="px-4 py-2 rounded-lg bg-accent text-inverted-text font-medium hover:opacity-90"
      >
        Отправить
      </button>
    </div>
  </form>
</div>

<button id="add-commbtn" class="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90">
  Добавить комментарий
</button>
```

### Loading State

```html
<div class="flex items-center justify-center p-8">
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
</div>
```

### Empty State

```html
<div class="text-center py-12">
  <span class="material-symbols-outlined text-muted-foreground icon-xl mb-4">inbox</span>
  <p class="text-lg text-muted-foreground">Контент скоро появится</p>
</div>
```

## Tips & Best Practices

### 1. Use Design Tokens

Always use CSS variables for colors:
```html
<!-- Good -->
<div class="text-foreground bg-background">

<!-- Avoid -->
<div class="text-[#212121] bg-[#ffffff]">
```

### 2. Responsive First

Build mobile-first, then enhance for larger screens:
```html
<div class="w-full lg:w-1/2">
  <!-- Full width on mobile, half on desktop -->
</div>
```

### 3. Semantic HTML

Use proper HTML elements:
```html
<!-- Good -->
<nav>
  <a href="/">Home</a>
</nav>

<!-- Avoid -->
<div onclick="location.href='/'">Home</div>
```

### 4. Accessibility

- Use semantic HTML
- Include `alt` text for images
- Use proper heading hierarchy
- Ensure keyboard navigation works

### 5. Performance

- Lazy load images below the fold
- Use SVG for logos and icons
- Minimize custom CSS (use Tailwind utilities)
- Optimize images before upload

## Troubleshooting

### Classes not working?

1. Check if the class is in your template
2. Rebuild CSS: `npm run build:css`
3. Clear browser cache

### JavaScript not working?

1. Check browser console for errors
2. Ensure jQuery is NOT loaded
3. Verify element IDs match the script

### Icons not showing?

1. Ensure `fonts.css` is loaded
2. Use class `material-symbols-outlined`
3. Check icon name at [fonts.google.com/icons](https://fonts.google.com/icons)

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Material Symbols](https://fonts.google.com/icons)
- [Inter Font](https://rsms.me/inter/)
- [Asset Build Guide](./asset-build.md)
