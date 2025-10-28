#!/usr/bin/env python3
"""Verify ETL output data integrity"""
import pandas as pd
from pathlib import Path

def verify_outputs():
    """Verify all output files meet requirements"""
    data_dir = Path(__file__).parent / 'data' / 'processed'
    
    print("Verifying ETL output files...")
    print("=" * 80)
    
    all_valid = True
    
    # Load all files
    files = {
        'publishers': data_dir / 'publishers.csv',
        'series': data_dir / 'series.csv',
        'comic_issues': data_dir / 'comic_issues.csv',
        'contributors': data_dir / 'contributors.csv',
        'roles': data_dir / 'roles.csv',
        'issue_contributors': data_dir / 'issue_contributors.csv',
        'issue_tags': data_dir / 'issue_tags.csv',
        'issue_downloads': data_dir / 'issue_downloads.csv',
    }
    
    data = {}
    
    # Check files exist and are not empty
    print("\n1. Checking files exist and are not empty...")
    for name, path in files.items():
        if not path.exists():
            print(f"  ✗ {name}: File not found")
            all_valid = False
            continue
        
        df = pd.read_csv(path)
        data[name] = df
        
        if df.empty:
            print(f"  ✗ {name}: Empty file")
            all_valid = False
        else:
            print(f"  ✓ {name}: {len(df)} rows")
    
    if not all_valid:
        return False
    
    # Check ID uniqueness
    print("\n2. Checking ID uniqueness...")
    for name in ['publishers', 'series', 'comic_issues', 'contributors', 'roles', 
                 'issue_contributors', 'issue_tags', 'issue_downloads']:
        if name not in data:
            continue
        
        df = data[name]
        if 'id' not in df.columns:
            print(f"  ✗ {name}: Missing 'id' column")
            all_valid = False
            continue
        
        duplicates = df['id'].duplicated().sum()
        if duplicates > 0:
            print(f"  ✗ {name}: {duplicates} duplicate IDs")
            all_valid = False
        else:
            print(f"  ✓ {name}: All IDs unique")
    
    # Check referential integrity
    print("\n3. Checking referential integrity...")
    
    # series -> publishers
    if 'series' in data and 'publishers' in data:
        publisher_ids = set(data['publishers']['id'])
        invalid = data['series'][~data['series']['publisher_id'].isin(publisher_ids)]
        if len(invalid) > 0:
            print(f"  ✗ series -> publishers: {len(invalid)} invalid references")
            all_valid = False
        else:
            print(f"  ✓ series -> publishers: All valid")
    
    # comic_issues -> series (allow nulls)
    if 'comic_issues' in data and 'series' in data:
        series_ids = set(data['series']['id'])
        issues_with_series = data['comic_issues'][data['comic_issues']['series_id'].notna()]
        invalid = issues_with_series[~issues_with_series['series_id'].isin(series_ids)]
        if len(invalid) > 0:
            print(f"  ✗ comic_issues -> series: {len(invalid)} invalid references")
            all_valid = False
        else:
            print(f"  ✓ comic_issues -> series: All valid")
    
    # issue_contributors -> comic_issues
    if 'issue_contributors' in data and 'comic_issues' in data:
        issue_ids = set(data['comic_issues']['id'])
        invalid = data['issue_contributors'][~data['issue_contributors']['issue_id'].isin(issue_ids)]
        if len(invalid) > 0:
            print(f"  ✗ issue_contributors -> comic_issues: {len(invalid)} invalid references")
            all_valid = False
        else:
            print(f"  ✓ issue_contributors -> comic_issues: All valid")
    
    # issue_contributors -> contributors
    if 'issue_contributors' in data and 'contributors' in data:
        contributor_ids = set(data['contributors']['id'])
        invalid = data['issue_contributors'][~data['issue_contributors']['contributor_id'].isin(contributor_ids)]
        if len(invalid) > 0:
            print(f"  ✗ issue_contributors -> contributors: {len(invalid)} invalid references")
            all_valid = False
        else:
            print(f"  ✓ issue_contributors -> contributors: All valid")
    
    # issue_contributors -> roles
    if 'issue_contributors' in data and 'roles' in data:
        role_ids = set(data['roles']['id'])
        invalid = data['issue_contributors'][~data['issue_contributors']['role_id'].isin(role_ids)]
        if len(invalid) > 0:
            print(f"  ✗ issue_contributors -> roles: {len(invalid)} invalid references")
            all_valid = False
        else:
            print(f"  ✓ issue_contributors -> roles: All valid")
    
    # Check required columns
    print("\n4. Checking required columns...")
    
    required_columns = {
        'publishers': ['id', 'name', 'slug', 'description', 'created_at', 'active'],
        'series': ['id', 'publisher_id', 'name', 'slug', 'description', 'created_at', 'active'],
        'comic_issues': ['id', 'series_id', 'title', 'slug', 'issue_number', 'volume', 
                         'description', 'cover_image_url', 'published_date', 'author',
                         'view_count', 'rating', 'vote_count', 'allow_comments', 'approved'],
        'contributors': ['id', 'name', 'dle_user_id', 'email', 'source'],
        'roles': ['id', 'name', 'name_en', 'description'],
        'issue_contributors': ['id', 'issue_id', 'contributor_id', 'role_id', 'order'],
        'issue_tags': ['id', 'issue_id', 'tag'],
        'issue_downloads': ['id', 'issue_id', 'link_type', 'url'],
    }
    
    for name, required_cols in required_columns.items():
        if name not in data:
            continue
        
        df = data[name]
        missing = [col for col in required_cols if col not in df.columns]
        
        if missing:
            print(f"  ✗ {name}: Missing columns: {', '.join(missing)}")
            all_valid = False
        else:
            print(f"  ✓ {name}: All required columns present")
    
    print("\n" + "=" * 80)
    if all_valid:
        print("✓ All validation checks passed!")
        return True
    else:
        print("✗ Some validation checks failed")
        return False


if __name__ == '__main__':
    import sys
    success = verify_outputs()
    sys.exit(0 if success else 1)
