# Target Schema Documentation

This document describes the target schema for the ETL pipeline processing DLE comic book data.

## Output Files

The ETL pipeline generates the following CSV files in `data/processed/`:

### 1. publishers.csv
Publishers of comic books (top-level categories with parentid=0).

**Columns:**
- `id` (int): Unique publisher identifier
- `name` (str): Publisher name (e.g., "Marvel", "DC")
- `slug` (str): URL-friendly slug (e.g., "marvel", "dc")
- `description` (text): Full description of the publisher
- `created_at` (datetime): Creation timestamp
- `active` (bool): Whether publisher is active

### 2. series.csv
Comic book series (categories with parentid>0).

**Columns:**
- `id` (int): Unique series identifier
- `publisher_id` (int): Foreign key to publishers.id
- `name` (str): Series name (e.g., "Venom", "Superboy")
- `slug` (str): URL-friendly slug
- `description` (text): Full description of the series
- `created_at` (datetime): Creation timestamp
- `active` (bool): Whether series is active

### 3. comic_issues.csv
Individual comic book issues (posts).

**Columns:**
- `id` (int): Unique issue identifier (from dle_post.id)
- `series_id` (int): Foreign key to series.id
- `title` (str): Issue title
- `slug` (str): URL-friendly slug
- `issue_number` (str): Issue number extracted from title/xfields
- `volume` (str): Volume information
- `description` (text): Cleaned description text (HTML removed)
- `cover_image_url` (str): URL of cover image (extracted from short_story)
- `published_date` (datetime): Publication date
- `author` (str): DLE author/uploader
- `view_count` (int): Number of views
- `rating` (int): Rating score
- `vote_count` (int): Number of votes
- `allow_comments` (bool): Whether comments are allowed
- `approved` (bool): Approval status

### 4. contributors.csv
Unique contributors (translators, editors, designers, etc.).

**Columns:**
- `id` (int): Auto-generated unique identifier
- `name` (str): Normalized contributor name
- `dle_user_id` (int): Linked DLE user ID (nullable)
- `email` (str): Email if matched with DLE user (nullable)
- `source` (str): Source of contributor data ('xfields', 'matched_user', etc.)

### 5. roles.csv
Dictionary of contributor roles.

**Columns:**
- `id` (int): Auto-generated unique identifier
- `name` (str): Role name in Russian (e.g., "perevodchik", "oformlenie")
- `name_en` (str): English translation (e.g., "translator", "designer")
- `description` (str): Role description

### 6. issue_contributors.csv
Many-to-many relationship between issues and contributors.

**Columns:**
- `id` (int): Auto-generated unique identifier
- `issue_id` (int): Foreign key to comic_issues.id
- `contributor_id` (int): Foreign key to contributors.id
- `role_id` (int): Foreign key to roles.id
- `order` (int): Order of contributor in the role (for multiple contributors)

### 7. issue_tags.csv
Tags associated with issues.

**Columns:**
- `id` (int): Auto-generated unique identifier
- `issue_id` (int): Foreign key to comic_issues.id
- `tag` (str): Tag text

### 8. issue_downloads.csv
Download and reader links for issues.

**Columns:**
- `id` (int): Auto-generated unique identifier
- `issue_id` (int): Foreign key to comic_issues.id
- `link_type` (str): Type of link ('download' or 'reader')
- `url` (str): URL of the link

## Data Quality Requirements

- All IDs must be unique and non-null
- Foreign keys must reference existing records
- Dates must be in ISO format (YYYY-MM-DD HH:MM:SS)
- Text fields must be UTF-8 encoded
- Boolean fields: 1 for true, 0 for false
- Empty strings are preferred over NULL for text fields (unless specified as nullable)

## Referential Integrity

- `series.publisher_id` → `publishers.id`
- `comic_issues.series_id` → `series.id`
- `issue_contributors.issue_id` → `comic_issues.id`
- `issue_contributors.contributor_id` → `contributors.id`
- `issue_contributors.role_id` → `roles.id`
- `issue_tags.issue_id` → `comic_issues.id`
- `issue_downloads.issue_id` → `comic_issues.id`
