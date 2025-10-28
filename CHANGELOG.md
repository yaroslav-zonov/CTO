# Changelog

## [Unreleased] - 2025-10-28

### Added
- Complete ETL pipeline for processing DLE comic book data
- Modular Python package structure with extract, transform, and load phases
- Target schema documentation (`docs/target_schema.md`)
- Data quality validation and reporting system
- HTML cleaning and text normalization utilities
- Contributor matching with DLE users
- Support for parsing xfields and xfsearch data
- Category hierarchy processing (publishers and series)
- Automated extraction of cover images, download links, and tags
- Comprehensive logging system
- Quality report generation in markdown format
- Output verification script (`verify_output.py`)
- Complete documentation in README.md and etl/README.md

### Output Files
The pipeline generates 8 CSV files:
- `publishers.csv` - 85 publishers
- `series.csv` - 919 comic series
- `comic_issues.csv` - 7,691 comic issues
- `contributors.csv` - 649 unique contributors
- `roles.csv` - 6 contributor roles
- `issue_contributors.csv` - 25,141 mappings
- `issue_tags.csv` - 43 tags
- `issue_downloads.csv` - 7,700 download/reader links

### Technical Details
- Language: Python 3.8+
- Dependencies: pandas, beautifulsoup4, lxml
- Encoding: UTF-8
- Input: DLE CSV exports with timestamp suffix
- Output: Normalized CSV files in `data/processed/`
- Logs: Timestamped execution logs and quality report in `logs/`

### Quality Metrics
- 100% referential integrity validation
- Contributor matching: 150/649 (23%) matched with DLE users
- Issues with series mapping: 7,652/7,691 (99.5%)
- Issues with descriptions: 6,618/7,691 (86%)
