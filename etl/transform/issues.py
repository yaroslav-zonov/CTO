"""Transform posts into comic issues"""
import pandas as pd
import logging
from ..utils import (
    clean_html,
    extract_first_image_url,
    extract_issue_number,
    parse_xfields,
    create_slug,
)

logger = logging.getLogger(__name__)


def transform_comic_issues(posts_df, post_extras_df, post_extras_cats_df, categories_hierarchy):
    """Transform posts into comic issues"""
    logger.info("Transforming comic issues...")
    
    if posts_df.empty:
        logger.warning("Posts dataframe is empty")
        return pd.DataFrame()
    
    # Merge with post_extras for views and ratings
    if not post_extras_df.empty:
        merged = posts_df.merge(
            post_extras_df,
            left_on='id',
            right_on='news_id',
            how='left',
            suffixes=('', '_extra')
        )
    else:
        merged = posts_df.copy()
    
    # Get series mapping from post_extras_cats
    series_mapping = {}
    if not post_extras_cats_df.empty:
        for _, row in post_extras_cats_df.iterrows():
            news_id = row['news_id']
            cat_id = row['cat_id']
            
            # Find the series (lowest level category)
            if cat_id in categories_hierarchy:
                series_mapping[news_id] = cat_id
    
    # Create output dataframe
    result = pd.DataFrame()
    result['id'] = merged['id']
    
    # Map to series
    result['series_id'] = merged['id'].map(series_mapping)
    
    # Handle posts that might be mapped to publishers (parentid=0)
    # Move them to series level if needed
    for idx, row in result.iterrows():
        if pd.notna(row['series_id']):
            cat_id = int(row['series_id'])
            if cat_id in categories_hierarchy:
                if categories_hierarchy[cat_id].get('level', 0) == 0:
                    # This is a publisher, not a series - set to null
                    result.at[idx, 'series_id'] = None
    
    result['title'] = merged['title']
    result['slug'] = merged['alt_name'].apply(lambda x: create_slug(str(x)) if pd.notna(x) else '')
    
    # Extract issue number from title
    result['issue_number'] = merged['title'].apply(extract_issue_number)
    
    # Extract volume from xfields
    result['volume'] = merged['xfields'].apply(lambda x: _extract_volume(x))
    
    # Clean HTML from descriptions
    result['description'] = merged.apply(
        lambda row: _get_cleaned_description(row),
        axis=1
    )
    
    # Extract cover image
    result['cover_image_url'] = merged['short_story'].apply(extract_first_image_url)
    
    # Date and metadata
    result['published_date'] = merged['date']
    result['author'] = merged['autor']
    
    # Stats from post_extras
    result['view_count'] = merged.get('news_read', 0).fillna(0).astype(int)
    result['rating'] = merged.get('rating', 0).fillna(0).astype(int)
    result['vote_count'] = merged.get('vote_num', 0).fillna(0).astype(int)
    
    # Flags
    result['allow_comments'] = merged['allow_comm'].fillna(0).astype(int)
    result['approved'] = merged['approve'].fillna(0).astype(int)
    
    logger.info(f"Transformed {len(result)} comic issues")
    logger.info(f"  - Issues with series mapping: {result['series_id'].notna().sum()}")
    logger.info(f"  - Issues without series: {result['series_id'].isna().sum()}")
    
    return result


def _extract_volume(xfields_str):
    """Extract volume from xfields"""
    xfields = parse_xfields(xfields_str)
    return xfields.get('volume', '')


def _get_cleaned_description(row):
    """Get cleaned description from full_story or short_story"""
    full_story = row.get('full_story', '')
    short_story = row.get('short_story', '')
    
    # Prefer full_story, fall back to short_story
    description = full_story if full_story else short_story
    
    return clean_html(description)
