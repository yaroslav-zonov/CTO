"""Data extraction from source CSV files"""
import pandas as pd
import logging
from pathlib import Path
from ..config import SOURCE_FILES, CSV_ENCODING

logger = logging.getLogger(__name__)


def load_csv(file_path, encoding=CSV_ENCODING):
    """Load CSV file with error handling"""
    try:
        if not Path(file_path).exists():
            logger.error(f"File not found: {file_path}")
            return pd.DataFrame()
        
        df = pd.read_csv(file_path, encoding=encoding, low_memory=False)
        logger.info(f"Loaded {len(df)} rows from {Path(file_path).name}")
        return df
    except Exception as e:
        logger.error(f"Error loading {file_path}: {e}")
        return pd.DataFrame()


def load_all_source_data():
    """Load all source CSV files"""
    logger.info("Loading source data...")
    
    data = {}
    for key, file_path in SOURCE_FILES.items():
        df = load_csv(file_path)
        data[key] = df
        
        if not df.empty:
            logger.info(f"  {key}: {len(df)} records, {len(df.columns)} columns")
    
    return data


def validate_source_data(data):
    """Validate loaded source data"""
    logger.info("Validating source data...")
    
    issues = []
    
    # Check required files
    required_files = ['posts', 'categories', 'post_extras_cats']
    for file_key in required_files:
        if file_key not in data or data[file_key].empty:
            issues.append(f"Missing or empty required file: {file_key}")
    
    # Check for duplicates
    if 'posts' in data and not data['posts'].empty:
        if 'id' in data['posts'].columns:
            duplicates = data['posts']['id'].duplicated().sum()
            if duplicates > 0:
                issues.append(f"Found {duplicates} duplicate post IDs")
    
    if 'categories' in data and not data['categories'].empty:
        if 'id' in data['categories'].columns:
            duplicates = data['categories']['id'].duplicated().sum()
            if duplicates > 0:
                issues.append(f"Found {duplicates} duplicate category IDs")
    
    if issues:
        logger.warning(f"Validation issues found: {len(issues)}")
        for issue in issues:
            logger.warning(f"  - {issue}")
    else:
        logger.info("All validation checks passed")
    
    return issues
