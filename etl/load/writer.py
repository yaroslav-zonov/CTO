"""Write transformed data to output CSV files"""
import pandas as pd
import logging
from pathlib import Path
from ..config import OUTPUT_FILES, DATA_PROCESSED, CSV_ENCODING

logger = logging.getLogger(__name__)


def ensure_output_directory():
    """Ensure output directory exists"""
    DATA_PROCESSED.mkdir(parents=True, exist_ok=True)
    logger.info(f"Output directory ready: {DATA_PROCESSED}")


def write_csv(df, file_path, encoding=CSV_ENCODING):
    """Write dataframe to CSV file"""
    try:
        if df.empty:
            logger.warning(f"Skipping empty dataframe for {Path(file_path).name}")
            return False
        
        df.to_csv(file_path, index=False, encoding=encoding)
        logger.info(f"Wrote {len(df)} rows to {Path(file_path).name}")
        return True
    except Exception as e:
        logger.error(f"Error writing {file_path}: {e}")
        return False


def save_all_outputs(transformed_data):
    """Save all transformed data to CSV files"""
    logger.info("Saving transformed data to CSV files...")
    
    ensure_output_directory()
    
    results = {}
    
    for key, file_path in OUTPUT_FILES.items():
        if key in transformed_data:
            df = transformed_data[key]
            success = write_csv(df, file_path)
            results[key] = {'success': success, 'rows': len(df) if not df.empty else 0}
        else:
            logger.warning(f"No data for {key}")
            results[key] = {'success': False, 'rows': 0}
    
    return results
