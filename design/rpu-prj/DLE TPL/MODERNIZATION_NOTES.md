# DLE Template Modernization Notes

## Overview
This document describes the modernization of DLE templates to align with the contemporary design system used in the Next.js prototype.

## Changes Summary

### 1. fullstory.tpl (Issue Detail Page)
**Changes:**
- Replaced legacy container classes with Tailwind utility classes
- Updated typography to match design system (font-extrabold, specific text sizes)
- Modernized download button with new accent color (#fc5621)
- Added Material Symbols icons for read/favorite/bookmark actions
- Improved responsive layout with mobile-first approach
- Updated metadata row styling with proper spacing
- Modernized credits grid layout
- Enhanced related sections with contemporary styling

**Key Features:**
- Hero header with responsive title sizing
- Cover image with 2:3 aspect ratio
- Action buttons row with proper spacing
- Description with modern typography
- Team credits in responsive grid
- Related issues section
- Publisher news section with horizontal scroll

### 2. comments.tpl (Comment Display)
**Changes:**
- Removed Font Awesome icons, replaced with Material Symbols
- Modern avatar styling (rounded-full, proper sizing)
- Clean button designs with hover states
- Better spacing and layout using flexbox
- Removed legacy wrapper classes
- Updated rating buttons with modern icons
- Added semantic HTML (article, time elements)

**Key Features:**
- Clean card-based layout
- Avatar with status indicator
- Metadata row (author, group, date)
- Rating buttons with + and - icons
- Action buttons (reply, quote, edit, delete)
- Proper text hierarchy

### 3. addcomments.tpl (Comment Form)
**Changes:**
- Modern form input styling with focus states
- Clean button design matching design system
- Better spacing and organization
- Removed legacy inline scripts
- Modern social login button grid
- Collapsible form with toggle button

**Key Features:**
- Bordered container with rounded corners
- Collapsible form header
- Social login buttons grid
- Modern input fields with labels
- CAPTCHA/security question styling
- Submit button with proper styling

### 4. login.tpl (Login Dropdown)
**Changes:**
- Dropdown menu instead of legacy box
- Material Symbols icons for all menu items
- Modern styling with proper shadows and borders
- Separated logged-in and guest states
- Clean form fields for login
- Social login buttons

**Key Features:**
- Avatar-based trigger button
- Dropdown with shadow and border
- User info section
- Menu items with icons
- Login form for guests
- Proper z-index for overlay

### 5. lostpassword.tpl (Password Recovery)
**Changes:**
- Centered card layout
- Modern form styling
- Clean input fields with focus states
- Proper spacing and typography

### 6. profile_popup.tpl (User Profile Popup)
**Changes:**
- Card-based layout
- Modern avatar display
- Clean info rows
- Status indicators

### 7. pm.tpl (Private Messages)
**Changes:**
- Tab navigation for inbox/outbox/new
- Progress bar for storage
- Modern message display
- Clean form styling

### 8. statustpl.tpl (Status Indicator)
**Changes:**
- Replaced Font Awesome icon with CSS dot
- Simple, clean design
- Green color for online status

### 9. informer.tpl (News Widget)
**Changes:**
- Card-based layout
- Hover effects
- Modern typography
- Clean spacing

## Design System Values

### Colors
- Text: #212121
- Accent: #fc5621 (hover: #e04d1c)
- Background: #ffffff
- Border/Details: rgba(33, 33, 33, 0.1)
- Gray shades: gray-50, gray-100, gray-200, gray-500, gray-600

### Typography
- Headings: font-extrabold
- Body: font-normal, font-medium
- Sizes: text-[14px], text-[16px], text-[20px], text-[28px], text-[56px]
- Line heights: leading-5, leading-6, leading-8, leading-[32px], leading-[64px]

### Spacing
- Gaps: gap-2, gap-3, gap-4, gap-6, gap-8
- Margins: mb-2, mb-4, mb-6, mb-8
- Padding: p-2, p-4, p-6, px-4, py-2.5

### Components
- Rounded corners: rounded-lg (10px)
- Borders: border, border-gray-200
- Shadows: shadow-lg
- Transitions: transition-colors, transition-all

## Icons

### Material Symbols Used
- `menu_book` - Read online
- `favorite` - Favorites
- `bookmark` - Bookmarks
- `expand_more` / `expand_less` - Dropdowns/toggles
- `person` - User profile
- `admin_panel_settings` - Admin panel
- `add_circle` - Add content
- `forum` - Forum
- `groups` - Groups
- `mail` - Messages
- `bar_chart` - Statistics
- `comment` - Comments
- `logout` - Logout
- `reply` - Reply
- `format_quote` - Quote
- `add` / `remove` - Rating buttons

### Icon Implementation
Icons use inline styles for size and weight:
```html
<span class="material-symbols-outlined" style="font-size: 20px; font-variation-settings: 'wght' 500;">icon_name</span>
```

## JavaScript Interactions

### interactions.js
Created vanilla JS file to handle:
- Dropdown menus (login, etc.)
- Comment form toggle
- Tab navigation
- Button feedback
- Keyboard navigation (Escape to close)

### DLE Integration
- Maintains DLE onclick handlers (e.g., `doFavorite()`)
- Uses data attributes for JS hooks
- Graceful degradation when JS disabled

## DLE Template Tags Preserved

All DLE functionality maintained:
- `{title}`, `{category}`, `{full-story}`, etc.
- `[xfgiven_*]` conditionals
- `[group=*]` and `[not-group=*]` conditionals
- `{custom}` tags for related content
- `{editor}` for WYSIWYG
- All links (`{profile-link}`, `{pm-link}`, etc.)

## Accessibility

- ARIA labels on interactive elements
- Semantic HTML (article, nav, time, etc.)
- Focus states on all interactive elements
- Keyboard navigation support
- Proper heading hierarchy

## Responsive Design

- Mobile-first approach
- Breakpoints: md (768px), lg (1024px), xl (1280px)
- Flexible layouts with flexbox and grid
- Hidden elements on mobile when appropriate
- Horizontal scroll for overflow content

## Browser Support

Modern browsers supporting:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6 JavaScript
- Material Symbols web font

## Installation

1. Copy all `.tpl` files to your DLE template directory
2. Copy `interactions.js` to your template's js directory
3. Include Material Symbols font in your main template:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
   ```
4. Include Tailwind CSS or ensure your CSS includes all used utility classes
5. Include `interactions.js` before closing `</body>` tag:
   ```html
   <script src="{THEME}/js/interactions.js"></script>
   ```

## Notes

- All templates maintain backward compatibility with DLE functions
- No breaking changes to DLE core functionality
- Templates can be used immediately without migration
- Progressive enhancement approach ensures functionality without JS
