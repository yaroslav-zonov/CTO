# Design Prototype Location

## RPU Project Next.js Prototype

The modern TypeScript/React prototype has been extracted and is available at:

**Location:** `design/rpu-prj/`

### Structure Overview

The extracted prototype contains a complete Next.js application with the following key directories:

- **`app/`** - Next.js App Router pages and layouts
  - Dynamic routes for comics, series, collections, publishers, members
  - Main application pages (home, team stats, etc.)
- **`components/`** - React components library
- **`public/`** - Static assets and media files
- **`DLE TPL/`** - Original DLE template files (legacy reference)
- **Configuration files:**
  - `package.json` - Dependencies and scripts
  - `next.config.mjs` - Next.js configuration
  - `tsconfig.json` - TypeScript configuration
  - `components.json` - Component library configuration

### Key Features

The prototype includes pages for:
- Comic browsing and management
- Series and collections
- Publisher and member profiles
- Team statistics
- Issue tracking
- Release scheduling

### Usage

This prototype serves as a reference for the modern web application implementation. It can be used to:
- Understand the intended UI/UX design
- Reference component structure and patterns
- Extract reusable components and styles
- Guide the development of the production application

### Notes

- All macOS system files (`__MACOSX`, `.DS_Store`, `._*` files) have been removed
- The archive has been cleaned and organized for easy access
- Original file structure and UTF-8 encoding have been preserved