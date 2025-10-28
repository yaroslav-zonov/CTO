"""Transform categories into publishers and series"""
import pandas as pd
import logging
from ..utils import create_slug

logger = logging.getLogger(__name__)


def transform_publishers(categories_df):
    """Transform categories with parentid=0 into publishers"""
    logger.info("Transforming publishers...")
    
    if categories_df.empty:
        logger.warning("Categories dataframe is empty")
        return pd.DataFrame()
    
    # Filter for top-level categories (parentid = 0)
    publishers = categories_df[categories_df['parentid'] == 0].copy()
    
    # Create output dataframe
    result = pd.DataFrame()
    result['id'] = publishers['id']
    result['name'] = publishers['name']
    result['slug'] = publishers['alt_name'].apply(lambda x: create_slug(str(x)) if pd.notna(x) else '')
    result['description'] = publishers['fulldescr'].fillna('')
    result['created_at'] = pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
    result['active'] = publishers['active'].fillna(1).astype(int)
    
    logger.info(f"Transformed {len(result)} publishers")
    return result


def transform_series(categories_df):
    """Transform categories with parentid>0 into series"""
    logger.info("Transforming series...")
    
    if categories_df.empty:
        logger.warning("Categories dataframe is empty")
        return pd.DataFrame()
    
    # Filter for child categories (parentid > 0)
    series = categories_df[categories_df['parentid'] > 0].copy()
    
    # Create output dataframe
    result = pd.DataFrame()
    result['id'] = series['id']
    result['publisher_id'] = series['parentid']
    result['name'] = series['name']
    result['slug'] = series['alt_name'].apply(lambda x: create_slug(str(x)) if pd.notna(x) else '')
    result['description'] = series['fulldescr'].fillna('')
    result['created_at'] = pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
    result['active'] = series['active'].fillna(1).astype(int)
    
    logger.info(f"Transformed {len(result)} series")
    return result


def get_category_hierarchy(categories_df):
    """Build category hierarchy mapping"""
    hierarchy = {}
    
    for _, row in categories_df.iterrows():
        cat_id = row['id']
        parent_id = row['parentid']
        hierarchy[cat_id] = {
            'id': cat_id,
            'name': row['name'],
            'parentid': parent_id,
            'level': 0 if parent_id == 0 else 1
        }
    
    # Handle multi-level nesting (if any)
    for cat_id in hierarchy:
        if hierarchy[cat_id]['level'] == 0:
            continue
        
        parent_id = hierarchy[cat_id]['parentid']
        if parent_id in hierarchy and hierarchy[parent_id]['parentid'] > 0:
            # This is a nested series (level 2+), point to grandparent
            hierarchy[cat_id]['publisher_id'] = hierarchy[parent_id]['parentid']
            hierarchy[cat_id]['parent_series_id'] = parent_id
            hierarchy[cat_id]['level'] = 2
        else:
            hierarchy[cat_id]['publisher_id'] = parent_id
    
    logger.info(f"Built hierarchy for {len(hierarchy)} categories")
    return hierarchy
