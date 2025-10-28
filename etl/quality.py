"""Data quality validation and reporting"""
import pandas as pd
import logging
from pathlib import Path
from .config import LOGS_DIR

logger = logging.getLogger(__name__)


class QualityReport:
    """Data quality report generator"""
    
    def __init__(self):
        self.issues = []
        self.stats = {}
    
    def add_issue(self, severity, message):
        """Add a quality issue"""
        self.issues.append({'severity': severity, 'message': message})
        logger.log(
            logging.WARNING if severity == 'warning' else logging.ERROR,
            f"[{severity.upper()}] {message}"
        )
    
    def add_stat(self, key, value):
        """Add a statistic"""
        self.stats[key] = value
    
    def generate(self, source_data, transformed_data):
        """Generate quality report"""
        logger.info("Generating quality report...")
        
        # Count source records
        self.add_stat('source_posts', len(source_data.get('posts', pd.DataFrame())))
        self.add_stat('source_categories', len(source_data.get('categories', pd.DataFrame())))
        self.add_stat('source_users', len(source_data.get('users', pd.DataFrame())))
        self.add_stat('source_tags', len(source_data.get('tags', pd.DataFrame())))
        
        # Count transformed records
        self.add_stat('publishers', len(transformed_data.get('publishers', pd.DataFrame())))
        self.add_stat('series', len(transformed_data.get('series', pd.DataFrame())))
        self.add_stat('comic_issues', len(transformed_data.get('comic_issues', pd.DataFrame())))
        self.add_stat('contributors', len(transformed_data.get('contributors', pd.DataFrame())))
        self.add_stat('roles', len(transformed_data.get('roles', pd.DataFrame())))
        self.add_stat('issue_contributors', len(transformed_data.get('issue_contributors', pd.DataFrame())))
        self.add_stat('issue_tags', len(transformed_data.get('issue_tags', pd.DataFrame())))
        self.add_stat('issue_downloads', len(transformed_data.get('issue_downloads', pd.DataFrame())))
        
        # Validate comic issues
        self._validate_comic_issues(transformed_data.get('comic_issues', pd.DataFrame()))
        
        # Validate referential integrity
        self._validate_referential_integrity(transformed_data)
        
        # Check for unmapped contributors
        self._check_unmapped_contributors(transformed_data.get('contributors', pd.DataFrame()))
        
        return self
    
    def _validate_comic_issues(self, issues_df):
        """Validate comic issues data quality"""
        if issues_df.empty:
            self.add_issue('error', "No comic issues generated")
            return
        
        # Check for missing series
        missing_series = issues_df['series_id'].isna().sum()
        if missing_series > 0:
            self.add_issue('warning', f"{missing_series} comic issues without series mapping")
        
        # Check for missing titles
        missing_titles = issues_df['title'].isna().sum()
        if missing_titles > 0:
            self.add_issue('error', f"{missing_titles} comic issues without titles")
        
        # Check for empty descriptions
        empty_descriptions = (issues_df['description'].fillna('') == '').sum()
        if empty_descriptions > 0:
            self.add_issue('warning', f"{empty_descriptions} comic issues with empty descriptions")
        
        # Check for missing cover images
        missing_covers = (issues_df['cover_image_url'].fillna('') == '').sum()
        if missing_covers > 0:
            self.add_issue('info', f"{missing_covers} comic issues without cover images")
    
    def _validate_referential_integrity(self, data):
        """Validate foreign key relationships"""
        # Validate series -> publishers
        series_df = data.get('series', pd.DataFrame())
        publishers_df = data.get('publishers', pd.DataFrame())
        
        if not series_df.empty and not publishers_df.empty:
            publisher_ids = set(publishers_df['id'])
            invalid_series = series_df[~series_df['publisher_id'].isin(publisher_ids)]
            if len(invalid_series) > 0:
                self.add_issue('error', f"{len(invalid_series)} series with invalid publisher_id")
        
        # Validate issue_contributors -> issues
        issue_contributors_df = data.get('issue_contributors', pd.DataFrame())
        issues_df = data.get('comic_issues', pd.DataFrame())
        
        if not issue_contributors_df.empty and not issues_df.empty:
            issue_ids = set(issues_df['id'])
            invalid_mappings = issue_contributors_df[~issue_contributors_df['issue_id'].isin(issue_ids)]
            if len(invalid_mappings) > 0:
                self.add_issue('error', f"{len(invalid_mappings)} contributor mappings with invalid issue_id")
        
        # Validate issue_contributors -> contributors
        contributors_df = data.get('contributors', pd.DataFrame())
        
        if not issue_contributors_df.empty and not contributors_df.empty:
            contributor_ids = set(contributors_df['id'])
            invalid_mappings = issue_contributors_df[~issue_contributors_df['contributor_id'].isin(contributor_ids)]
            if len(invalid_mappings) > 0:
                self.add_issue('error', f"{len(invalid_mappings)} contributor mappings with invalid contributor_id")
    
    def _check_unmapped_contributors(self, contributors_df):
        """Check for contributors not mapped to DLE users"""
        if contributors_df.empty:
            return
        
        unmapped = (contributors_df['dle_user_id'] == 0).sum()
        if unmapped > 0:
            self.add_issue('info', f"{unmapped} contributors not matched with DLE users")
            
            # List some examples
            examples = contributors_df[contributors_df['dle_user_id'] == 0]['name'].head(10).tolist()
            if examples:
                self.add_issue('info', f"Example unmapped contributors: {', '.join(examples)}")
    
    def save_to_file(self, filename='etl_report.md'):
        """Save report to markdown file"""
        LOGS_DIR.mkdir(parents=True, exist_ok=True)
        report_path = LOGS_DIR / filename
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write("# ETL Pipeline Quality Report\n\n")
            
            f.write("## Statistics\n\n")
            f.write("### Source Data\n\n")
            f.write(f"- Posts: {self.stats.get('source_posts', 0)}\n")
            f.write(f"- Categories: {self.stats.get('source_categories', 0)}\n")
            f.write(f"- Users: {self.stats.get('source_users', 0)}\n")
            f.write(f"- Tags: {self.stats.get('source_tags', 0)}\n\n")
            
            f.write("### Transformed Data\n\n")
            f.write(f"- Publishers: {self.stats.get('publishers', 0)}\n")
            f.write(f"- Series: {self.stats.get('series', 0)}\n")
            f.write(f"- Comic Issues: {self.stats.get('comic_issues', 0)}\n")
            f.write(f"- Contributors: {self.stats.get('contributors', 0)}\n")
            f.write(f"- Roles: {self.stats.get('roles', 0)}\n")
            f.write(f"- Issue-Contributor Mappings: {self.stats.get('issue_contributors', 0)}\n")
            f.write(f"- Issue Tags: {self.stats.get('issue_tags', 0)}\n")
            f.write(f"- Issue Downloads: {self.stats.get('issue_downloads', 0)}\n\n")
            
            if self.issues:
                f.write("## Quality Issues\n\n")
                
                # Group by severity
                errors = [i for i in self.issues if i['severity'] == 'error']
                warnings = [i for i in self.issues if i['severity'] == 'warning']
                info = [i for i in self.issues if i['severity'] == 'info']
                
                if errors:
                    f.write("### Errors\n\n")
                    for issue in errors:
                        f.write(f"- {issue['message']}\n")
                    f.write("\n")
                
                if warnings:
                    f.write("### Warnings\n\n")
                    for issue in warnings:
                        f.write(f"- {issue['message']}\n")
                    f.write("\n")
                
                if info:
                    f.write("### Information\n\n")
                    for issue in info:
                        f.write(f"- {issue['message']}\n")
                    f.write("\n")
            else:
                f.write("## Quality Issues\n\n")
                f.write("No quality issues detected!\n\n")
        
        logger.info(f"Quality report saved to {report_path}")
        return report_path
