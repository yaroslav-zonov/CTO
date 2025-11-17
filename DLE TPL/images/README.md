# DLE Theme Images Reference

This directory contains all media assets for the RPU DLE theme.

## Directory Structure

```
images/
├── Brand Assets
│   ├── rpu-logo.svg              - Main site logo
│   ├── icon.svg                  - Site icon (SVG)
│   ├── icon-dark-32x32.png       - Dark theme favicon
│   ├── icon-light-32x32.png      - Light theme favicon
│   ├── apple-icon.png            - Apple touch icon
│   ├── placeholder-logo.svg      - Logo placeholder
│   └── placeholder-logo.png      - Logo placeholder (PNG)
│
├── Comic Content
│   ├── comic-book-cover.png      - Sample comic book cover
│   ├── comic-issue-cover.jpg     - Sample issue cover
│   ├── comic-series-cover.jpg    - Sample series cover
│   ├── one-shot-comic-cover.jpg  - Sample one-shot cover
│   └── popular-comic-cover.jpg   - Sample popular comic
│
├── Collection Assets
│   ├── comic-collection.jpg          - Collection banner
│   ├── comic-collection-banner.jpg   - Collection header
│   └── featured-comic-collection.jpg - Featured collection
│
├── User Assets
│   ├── diverse-user-avatars.png  - User avatar samples
│   └── placeholder-user.jpg      - Default user avatar
│
├── Decorative
│   ├── palm-left.svg             - Left palm decoration
│   └── palm-right.svg            - Right palm decoration
│
├── Placeholders
│   ├── placeholder.svg           - Generic placeholder (SVG)
│   └── placeholder.jpg           - Generic placeholder (JPG)
│
├── Legacy Assets (from original theme)
│   ├── bg.jpg                    - Background image
│   ├── bg.png                    - Background pattern
│   ├── count.png                 - Counter sprite
│   ├── footer-soc.jpg            - Footer social icons
│   ├── logo.png                  - Original logo
│   ├── m_load.gif                - Loading animation
│   ├── patreon.png               - Patreon badge
│   ├── rkl.jpg                   - Ad banner
│   ├── serialvkpost.jpg          - VK post image
│   ├── telega.jpg                - Telegram banner
│   ├── tg-button.png             - Telegram button
│   ├── tt-fav.png                - Favorite icon
│   ├── vk-button.png             - VK button
│   └── social/                   - Social media icons
│
└── System
    ├── favicon.ico               - Site favicon
    └── .htaccess                 - Access control

```

## Usage in Templates

### Logo
```html
<img src="{THEME}/images/rpu-logo.svg" alt="RPU Logo">
```

### Comic Covers
```html
<img src="{THEME}/images/comic-book-cover.png" alt="Comic Cover">
```

### User Avatars
```html
<img src="{THEME}/images/diverse-user-avatars.png" alt="User Avatar">
<!-- Or use placeholder for users without avatars -->
<img src="{THEME}/images/placeholder-user.jpg" alt="Default Avatar">
```

### Decorative Elements
```html
<img src="{THEME}/images/palm-left.svg" alt="" aria-hidden="true">
<img src="{THEME}/images/palm-right.svg" alt="" aria-hidden="true">
```

### Generic Placeholders
```html
<!-- For missing images -->
<img src="{THEME}/images/placeholder.svg" alt="Placeholder">
```

## Image Optimization Notes

- **SVG files** are preferred for logos and icons (scalable, smaller file size)
- **WebP format** should be considered for future optimization
- **Responsive images** can use `srcset` for different screen sizes
- **Lazy loading** recommended for content below the fold

## Path Convention

All images in templates should use the DLE theme path variable:
```
{THEME}/images/[filename]
```

This ensures proper path resolution regardless of the DLE installation directory.
