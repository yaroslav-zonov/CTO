# ETL Module Documentation

This directory contains the modular ETL pipeline for processing DLE comic book data.

## Module Structure

```
etl/
├── extract/          # Data extraction from source CSVs
│   └── loader.py    # CSV loading and validation
├── transform/        # Data transformation modules
│   ├── categories.py     # Publishers and series transformation
│   ├── issues.py         # Comic issues transformation
│   ├── contributors.py   # Contributors and roles
│   └── extras.py         # Tags and downloads
├── load/            # Output writing
│   └── writer.py    # CSV writer
├── utils/           # Utility functions
│   └── text_utils.py     # Text processing, HTML cleaning
├── config.py        # Configuration and constants
├── pipeline.py      # Main pipeline orchestration
└── quality.py       # Data quality validation and reporting
```

## Key Components

### Extract Phase
- **loader.py**: Loads all source CSV files, validates data integrity, checks for duplicates

### Transform Phase
- **categories.py**: Separates categories into publishers (parentid=0) and series (parentid>0)
- **issues.py**: Transforms posts into comic issues, extracts cover images, cleans HTML descriptions
- **contributors.py**: Parses xfields to extract contributors, matches with DLE users, builds role mappings
- **extras.py**: Extracts tags and download/reader links

### Load Phase
- **writer.py**: Writes all transformed data to output CSV files

### Quality Phase
- **quality.py**: Validates referential integrity, generates quality report with statistics and issues

## Data Flow

```
Source CSVs → Extract → Transform → Load → Quality Report
                ↓          ↓          ↓          ↓
            Validate   Clean HTML   Write CSV   Report
                       Parse XML
                       Match Users
```

## Adding New Transformations

1. Create a new transformation function in the appropriate transform module
2. Import it in `transform/__init__.py`
3. Call it in the appropriate place in `pipeline.py`
4. Add quality checks in `quality.py` if needed

## Configuration

Edit `config.py` to:
- Change file paths
- Add new role mappings
- Adjust data quality thresholds
- Modify CSV encoding settings
