"""Main ETL pipeline orchestration"""
import logging
from .extract import load_all_source_data, validate_source_data
from .transform import (
    transform_publishers,
    transform_series,
    get_category_hierarchy,
    transform_comic_issues,
    transform_roles,
    transform_contributors_and_mappings,
    transform_issue_tags,
    transform_issue_downloads,
)
from .load import save_all_outputs
from .quality import QualityReport

logger = logging.getLogger(__name__)


def run_pipeline():
    """Run the complete ETL pipeline"""
    logger.info("=" * 80)
    logger.info("Starting ETL Pipeline")
    logger.info("=" * 80)
    
    try:
        # EXTRACT
        logger.info("\n" + "=" * 80)
        logger.info("EXTRACT PHASE")
        logger.info("=" * 80)
        source_data = load_all_source_data()
        validation_issues = validate_source_data(source_data)
        
        posts_df = source_data.get('posts')
        if posts_df is None or posts_df.empty:
            logger.error("No posts data loaded. Cannot continue.")
            return False
        
        # TRANSFORM
        logger.info("\n" + "=" * 80)
        logger.info("TRANSFORM PHASE")
        logger.info("=" * 80)
        
        transformed_data = {}
        
        # Transform categories
        categories_df = source_data.get('categories')
        if not categories_df.empty:
            transformed_data['publishers'] = transform_publishers(categories_df)
            transformed_data['series'] = transform_series(categories_df)
            categories_hierarchy = get_category_hierarchy(categories_df)
        else:
            logger.warning("No categories data available")
            categories_hierarchy = {}
        
        # Transform issues
        posts_df = source_data.get('posts')
        post_extras_df = source_data.get('post_extras')
        post_extras_cats_df = source_data.get('post_extras_cats')
        
        transformed_data['comic_issues'] = transform_comic_issues(
            posts_df,
            post_extras_df,
            post_extras_cats_df,
            categories_hierarchy
        )
        
        # Transform roles
        transformed_data['roles'] = transform_roles()
        
        # Transform contributors
        users_df = source_data.get('users')
        xfsearch_df = source_data.get('xfsearch')
        
        contributors_df, issue_contributors_df = transform_contributors_and_mappings(
            posts_df,
            xfsearch_df,
            users_df
        )
        transformed_data['contributors'] = contributors_df
        transformed_data['issue_contributors'] = issue_contributors_df
        
        # Transform tags
        tags_df = source_data.get('tags')
        transformed_data['issue_tags'] = transform_issue_tags(posts_df, tags_df)
        
        # Transform downloads
        transformed_data['issue_downloads'] = transform_issue_downloads(posts_df)
        
        # LOAD
        logger.info("\n" + "=" * 80)
        logger.info("LOAD PHASE")
        logger.info("=" * 80)
        
        save_results = save_all_outputs(transformed_data)
        
        # QUALITY
        logger.info("\n" + "=" * 80)
        logger.info("QUALITY VALIDATION")
        logger.info("=" * 80)
        
        report = QualityReport()
        report.generate(source_data, transformed_data)
        report_path = report.save_to_file()
        
        # SUMMARY
        logger.info("\n" + "=" * 80)
        logger.info("PIPELINE SUMMARY")
        logger.info("=" * 80)
        
        logger.info("\nOutput files:")
        for key, result in save_results.items():
            status = "✓" if result['success'] else "✗"
            logger.info(f"  {status} {key}: {result['rows']} rows")
        
        logger.info(f"\nQuality report: {report_path}")
        
        if report.issues:
            error_count = len([i for i in report.issues if i['severity'] == 'error'])
            warning_count = len([i for i in report.issues if i['severity'] == 'warning'])
            info_count = len([i for i in report.issues if i['severity'] == 'info'])
            
            logger.info(f"\nQuality issues: {error_count} errors, {warning_count} warnings, {info_count} info")
        else:
            logger.info("\nNo quality issues detected!")
        
        logger.info("\n" + "=" * 80)
        logger.info("ETL Pipeline completed successfully")
        logger.info("=" * 80)
        
        return True
    
    except Exception as e:
        logger.error(f"Pipeline failed with error: {e}", exc_info=True)
        return False
