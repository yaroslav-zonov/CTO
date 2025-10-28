"""Transform tags and downloads"""
import pandas as pd
import logging
from ..utils import parse_xfields

logger = logging.getLogger(__name__)


def transform_issue_tags(posts_df, tags_df):
    """Transform tags into issue_tags"""
    logger.info("Transforming issue tags...")
    
    if tags_df.empty:
        logger.warning("Tags dataframe is empty")
        return pd.DataFrame()
    
    result = pd.DataFrame()
    result['issue_id'] = tags_df['news_id']
    result['tag'] = tags_df['tag']
    
    # Add ID column
    result.insert(0, 'id', range(1, len(result) + 1))
    
    logger.info(f"Transformed {len(result)} issue tags")
    return result


def transform_issue_downloads(posts_df):
    """Transform download and reader links from xfields"""
    logger.info("Transforming issue downloads...")
    
    downloads_list = []
    download_id = 1
    
    for _, post in posts_df.iterrows():
        issue_id = post['id']
        xfields_str = post.get('xfields', '')
        
        if not xfields_str:
            continue
        
        xfields = parse_xfields(xfields_str)
        
        # Extract download link
        if 'download' in xfields:
            download_url = xfields['download']
            if download_url:
                downloads_list.append({
                    'id': download_id,
                    'issue_id': issue_id,
                    'link_type': 'download',
                    'url': download_url
                })
                download_id += 1
        
        # Extract reader link
        if 'reader' in xfields:
            reader_url = xfields['reader']
            if reader_url:
                downloads_list.append({
                    'id': download_id,
                    'issue_id': issue_id,
                    'link_type': 'reader',
                    'url': reader_url
                })
                download_id += 1
    
    result = pd.DataFrame(downloads_list)
    
    logger.info(f"Transformed {len(result)} download/reader links")
    return result
