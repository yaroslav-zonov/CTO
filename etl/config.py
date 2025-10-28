"""ETL Configuration"""
import os
from pathlib import Path

# Project paths
PROJECT_ROOT = Path(__file__).parent.parent
DATA_RAW = PROJECT_ROOT / "data" / "raw"
DATA_PROCESSED = PROJECT_ROOT / "data" / "processed"
LOGS_DIR = PROJECT_ROOT / "logs"

# Source CSV files (in project root)
SOURCE_FILES = {
    'posts': PROJECT_ROOT / 'dle_post_202510281639.csv',
    'categories': PROJECT_ROOT / 'dle_category_202510281639.csv',
    'post_extras': PROJECT_ROOT / 'dle_post_extras_202510281639.csv',
    'post_extras_cats': PROJECT_ROOT / 'dle_post_extras_cats_202510281639.csv',
    'xfsearch': PROJECT_ROOT / 'dle_xfsearch_202510281639.csv',
    'users': PROJECT_ROOT / 'dle_users_202510281639.csv',
    'usergroups': PROJECT_ROOT / 'dle_usergroups_202510281639.csv',
    'tags': PROJECT_ROOT / 'dle_tags_202510281639.csv',
}

# Output CSV files
OUTPUT_FILES = {
    'publishers': DATA_PROCESSED / 'publishers.csv',
    'series': DATA_PROCESSED / 'series.csv',
    'comic_issues': DATA_PROCESSED / 'comic_issues.csv',
    'contributors': DATA_PROCESSED / 'contributors.csv',
    'roles': DATA_PROCESSED / 'roles.csv',
    'issue_contributors': DATA_PROCESSED / 'issue_contributors.csv',
    'issue_tags': DATA_PROCESSED / 'issue_tags.csv',
    'issue_downloads': DATA_PROCESSED / 'issue_downloads.csv',
}

# Role mappings (Russian to English)
ROLE_MAPPINGS = {
    'perevodchik': {'name_en': 'translator', 'description': 'Переводчик комикса'},
    'oformlenie': {'name_en': 'designer', 'description': 'Оформление и дизайн'},
    'taiper': {'name_en': 'typist', 'description': 'Набор текста'},
    'redaktor': {'name_en': 'editor', 'description': 'Редактор перевода'},
    'story': {'name_en': 'story', 'description': 'Название сюжетной линии'},
    'volume': {'name_en': 'volume', 'description': 'Том или выпуск'},
}

# CSV encoding
CSV_ENCODING = 'utf-8'

# HTML cleaning
STRIP_HTML_TAGS = True
EXTRACT_FIRST_IMAGE = True

# Data quality thresholds
MIN_TITLE_LENGTH = 3
MAX_TITLE_LENGTH = 500
