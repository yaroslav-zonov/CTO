# Asset Build Process

This document explains how to rebuild and maintain the modern CSS/JS assets for the RPU DLE theme.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Development Setup](#development-setup)
4. [Building Assets](#building-assets)
5. [File Structure](#file-structure)
6. [CSS Architecture](#css-architecture)
7. [JavaScript Architecture](#javascript-architecture)
8. [Fonts and Icons](#fonts-and-icons)
9. [Deployment](#deployment)
10. [Troubleshooting](#troubleshooting)

## Overview

The RPU DLE theme uses a modern build pipeline based on:

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Vanilla JavaScript** - No jQuery dependencies
- **Inter Font** - Modern typography
- **Material Symbols** - Icon system

## Prerequisites

Before you can build the assets, you need:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- Basic command line knowledge

Check your installation:
```bash
node --version  # Should show v16.0.0 or higher
npm --version   # Should show 7.0.0 or higher
```

## Development Setup

### 1. Navigate to the Theme Directory

```bash
cd "DLE TPL"
```

### 2. Install Dependencies

First time setup:
```bash
npm install
```

This will install Tailwind CSS and other build dependencies defined in `package.json`.

## Building Assets

### Production Build (Minified)

For deployment, build minified CSS:

```bash
npm run build:css
```

This command:
- Reads `src/input.css`
- Processes Tailwind directives
- Scans all `.tpl` and `.js` files for class usage
- Generates minified output to `style/styles.css`

### Development Build (Watch Mode)

For active development with auto-rebuild:

```bash
npm run watch:css
# or
npm run dev
```

This will:
- Watch for changes in source files
- Automatically rebuild when changes are detected
- Output to `style/styles.css` without minification (for debugging)

Press `Ctrl+C` to stop the watch process.

## File Structure

```
DLE TPL/
├── package.json              # Build scripts and dependencies
├── tailwind.config.js        # Tailwind configuration
│
├── src/                      # Source files
│   └── input.css             # Main CSS input file
│
├── style/                    # Output and legacy CSS
│   ├── styles.css            # ✅ GENERATED - Main compiled CSS
│   ├── fonts.css             # Font imports (Inter, Material Symbols)
│   ├── components.css        # Legacy component styles
│   ├── engine.css            # Legacy DLE engine styles
│   ├── offline.css           # Offline page styles
│   └── print.css             # Print styles
│
├── js/
│   ├── theme.js              # ✅ NEW - Modern vanilla JS
│   └── libs.js               # ❌ DEPRECATED - Old jQuery code
│
├── images/                   # Media assets
│   └── README.md             # Image reference guide
│
└── fonts/                    # Font files
```

## CSS Architecture

### Source: `src/input.css`

This file contains:

1. **Tailwind Directives**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. **Design Tokens** (CSS Custom Properties)
   ```css
   :root {
     --text: #212121;
     --accent: #fc5621;
     --background: #ffffff;
     /* ... more tokens */
   }
   ```

3. **Base Styles**
   - Global resets
   - Typography settings
   - Material Symbols icon styling

### Configuration: `tailwind.config.js`

Key settings:

- **Content paths**: Tells Tailwind which files to scan
  ```javascript
  content: [
    "./**/*.tpl",
    "./js/**/*.js",
  ]
  ```

- **Theme extensions**: Custom colors, fonts, spacing
- **Plugins**: Additional utilities (none currently)

### Output: `style/styles.css`

Generated file that includes:
- Tailwind base styles
- All utility classes used in templates
- Custom design tokens
- Minified for production

**⚠️ Never edit this file directly!** It will be overwritten on build.

### Legacy CSS Files

These files are preserved for backward compatibility:

- `engine.css` - Original DLE styles (navigation, forms, etc.)
- `components.css` - Component-specific enhancements
- `offline.css` - Offline/maintenance page
- `print.css` - Print media queries

To use them, include in your template:
```html
<link rel="stylesheet" href="{THEME}/style/engine.css">
<link rel="stylesheet" href="{THEME}/style/components.css">
```

## JavaScript Architecture

### Modern: `js/theme.js`

This file replaces jQuery with vanilla JavaScript:

**Features:**
- Search toggle functionality
- Mobile menu toggle
- Dropdown menus
- Tab switching
- Carousel/slider
- Rating system (AJAX)
- Cookie management
- Scroll-to-top button

**No dependencies** - Pure vanilla JS, works in all modern browsers.

### Including in Templates

Add to your `main.tpl` before `</body>`:

```html
<!-- Modern theme JavaScript -->
<script src="{THEME}/js/theme.js"></script>
```

### Legacy: `js/libs.js`

**❌ DEPRECATED** - Old jQuery-based code. Only use if you need backward compatibility.

If migrating from the old theme, you should:
1. Remove jQuery script tags
2. Remove references to `libs.js`
3. Add `theme.js` instead

## Fonts and Icons

### Inter Font

Modern sans-serif font used throughout the design.

**CDN Loading** (Recommended):
```html
<link rel="stylesheet" href="{THEME}/style/fonts.css">
```

This loads Inter from Google Fonts.

**Self-Hosted** (Alternative):
1. Download Inter from [rsms.me/inter](https://rsms.me/inter/)
2. Place font files in `fonts/` directory
3. Update `style/fonts.css` with `@font-face` declarations

### Material Symbols

Icon font for UI elements (search, menu, close, etc.)

**CDN Loading** (Recommended):
Already included in `style/fonts.css`

**Usage in Templates:**
```html
<span class="material-symbols-outlined">search</span>
<span class="material-symbols-outlined">menu</span>
<span class="material-symbols-outlined">close</span>
```

**Available Icons:**
- `search` - Search icon
- `menu` - Hamburger menu
- `close` - Close/X icon
- `bookmark` - Bookmark icon
- `arrow_upward` - Up arrow
- Many more at [fonts.google.com/icons](https://fonts.google.com/icons)

**Size Utilities:**
```html
<span class="material-symbols-outlined icon-sm">search</span>  <!-- 18px -->
<span class="material-symbols-outlined icon-md">search</span>  <!-- 24px (default) -->
<span class="material-symbols-outlined icon-lg">search</span>  <!-- 32px -->
<span class="material-symbols-outlined icon-xl">search</span>  <!-- 48px -->
```

## Deployment

### 1. Build Production Assets

```bash
cd "DLE TPL"
npm run build:css
```

### 2. Upload to Server

Upload these files to your DLE theme directory:

```
DLE TPL/
├── style/
│   ├── styles.css        ← Upload this
│   ├── fonts.css         ← Upload this
│   ├── components.css    ← Upload this
│   ├── engine.css        ← Upload this
│   ├── offline.css       ← Upload this
│   └── print.css         ← Upload this
├── js/
│   └── theme.js          ← Upload this
├── images/               ← Upload entire directory
└── fonts/                ← Upload if self-hosting
```

### 3. Update Templates

Ensure your `main.tpl` includes:

```html
<head>
  <!-- Modern CSS -->
  <link rel="stylesheet" href="{THEME}/style/fonts.css">
  <link rel="stylesheet" href="{THEME}/style/styles.css">
  <link rel="stylesheet" href="{THEME}/style/components.css">
  <link rel="stylesheet" href="{THEME}/style/engine.css">
</head>
<body>
  <!-- Your content -->
  
  <!-- Modern JavaScript -->
  <script src="{THEME}/js/theme.js"></script>
</body>
```

### 4. Clear Cache

After deployment:
1. Clear DLE cache (Admin Panel → System → Clear Cache)
2. Clear browser cache
3. Test functionality

## Troubleshooting

### Build Fails

**Problem**: `npm run build:css` fails

**Solutions**:
1. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Update Tailwind CSS:
   ```bash
   npm update tailwindcss
   ```

3. Check Node.js version:
   ```bash
   node --version  # Should be v16+
   ```

### Styles Not Updating

**Problem**: Changes don't appear after rebuild

**Solutions**:
1. Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Check file upload - ensure new `styles.css` is on server
3. Clear DLE cache
4. Verify template is loading correct CSS file

### Missing Utilities

**Problem**: Tailwind utility class doesn't work

**Cause**: Class not detected during build (unused classes are removed)

**Solution**: 
1. Ensure class is present in a `.tpl` or `.js` file
2. Add to safelist in `tailwind.config.js`:
   ```javascript
   module.exports = {
     safelist: ['bg-red-500', 'text-center'],
     // ... rest of config
   }
   ```
3. Rebuild CSS

### JavaScript Not Working

**Problem**: Interactive features don't work

**Solutions**:
1. Check browser console for errors (F12 → Console)
2. Verify `theme.js` is loaded (Network tab)
3. Ensure jQuery is NOT loaded (conflicts)
4. Check element IDs match those in `theme.js`

### Icons Not Showing

**Problem**: Material Symbols appear as text

**Solutions**:
1. Ensure `fonts.css` is loaded in `<head>`
2. Check internet connection (if using CDN)
3. Verify class name: `material-symbols-outlined`
4. Check icon name is valid

## Making Changes

### Adding New Utilities

1. Use standard Tailwind classes in templates
2. Rebuild CSS
3. New utilities will be included automatically

### Custom CSS

Add to `src/input.css`:
```css
/* Custom component */
.my-component {
  /* styles */
}
```

Then rebuild.

### Design Token Changes

Update CSS variables in `src/input.css`:
```css
:root {
  --accent: #fc5621;  /* Change this */
}
```

Then rebuild.

### JavaScript Features

Edit `js/theme.js` directly - no build step required for JS.

## Support

For issues or questions:
1. Check this documentation
2. Review Tailwind CSS docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)
3. Inspect browser console for errors
4. Check DLE forum for theme-specific issues

## Version History

- **v1.0.0** - Initial modern asset pipeline
  - Tailwind CSS integration
  - jQuery removal (vanilla JS)
  - Inter font + Material Symbols
  - Design system tokens
  - Build documentation
