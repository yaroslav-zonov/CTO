"""Transform xfields and xfsearch into contributors and roles"""
import pandas as pd
import logging
from ..utils import normalize_name, parse_xfields, split_multiple_values
from ..config import ROLE_MAPPINGS

logger = logging.getLogger(__name__)


def transform_roles():
    """Create roles dictionary from config"""
    logger.info("Creating roles dictionary...")
    
    roles_data = []
    role_id = 1
    
    for role_name, role_info in ROLE_MAPPINGS.items():
        roles_data.append({
            'id': role_id,
            'name': role_name,
            'name_en': role_info['name_en'],
            'description': role_info['description']
        })
        role_id += 1
    
    result = pd.DataFrame(roles_data)
    logger.info(f"Created {len(result)} roles")
    
    return result


def transform_contributors_and_mappings(posts_df, xfsearch_df, users_df):
    """Transform xfields and xfsearch into contributors and issue_contributors"""
    logger.info("Transforming contributors...")
    
    # Build user lookup dictionary
    user_lookup = _build_user_lookup(users_df)
    
    # Get role name to ID mapping
    roles_df = transform_roles()
    role_name_to_id = dict(zip(roles_df['name'], roles_df['id']))
    
    # Track all contributors
    contributors_dict = {}
    contributor_id = 1
    issue_contributors_list = []
    
    # Process xfields from posts
    for _, post in posts_df.iterrows():
        issue_id = post['id']
        xfields_str = post.get('xfields', '')
        
        if not xfields_str:
            continue
        
        xfields = parse_xfields(xfields_str)
        
        # Process each role field
        for role_name in ROLE_MAPPINGS.keys():
            if role_name not in xfields:
                continue
            
            value = xfields[role_name]
            
            # Skip non-contributor roles (volume, story, etc.)
            if role_name in ['volume', 'story', 'download', 'reader']:
                continue
            
            # Split multiple values
            if isinstance(value, list):
                contributor_names = value
            else:
                contributor_names = split_multiple_values(value)
            
            # Process each contributor
            for order, name in enumerate(contributor_names, start=1):
                name = normalize_name(name)
                if not name:
                    continue
                
                # Get or create contributor
                if name not in contributors_dict:
                    matched_user = _match_user(name, user_lookup)
                    contributors_dict[name] = {
                        'id': contributor_id,
                        'name': name,
                        'dle_user_id': matched_user.get('user_id') if matched_user else None,
                        'email': matched_user.get('email') if matched_user else '',
                        'source': 'xfields'
                    }
                    contributor_id += 1
                
                contrib_id = contributors_dict[name]['id']
                
                # Add to issue_contributors
                if role_name in role_name_to_id:
                    issue_contributors_list.append({
                        'issue_id': issue_id,
                        'contributor_id': contrib_id,
                        'role_id': role_name_to_id[role_name],
                        'order': order
                    })
    
    # Process xfsearch table
    if not xfsearch_df.empty:
        for _, row in xfsearch_df.iterrows():
            issue_id = row['news_id']
            role_name = row['tagname']
            value = row['tagvalue']
            
            # Skip if not a contributor role
            if role_name not in ROLE_MAPPINGS or role_name in ['volume', 'story', 'download', 'reader']:
                continue
            
            contributor_names = split_multiple_values(value)
            
            for order, name in enumerate(contributor_names, start=1):
                name = normalize_name(name)
                if not name:
                    continue
                
                # Get or create contributor
                if name not in contributors_dict:
                    matched_user = _match_user(name, user_lookup)
                    contributors_dict[name] = {
                        'id': contributor_id,
                        'name': name,
                        'dle_user_id': matched_user.get('user_id') if matched_user else None,
                        'email': matched_user.get('email') if matched_user else '',
                        'source': 'xfsearch'
                    }
                    contributor_id += 1
                
                contrib_id = contributors_dict[name]['id']
                
                # Add to issue_contributors (avoid duplicates)
                if role_name in role_name_to_id:
                    mapping = {
                        'issue_id': issue_id,
                        'contributor_id': contrib_id,
                        'role_id': role_name_to_id[role_name],
                        'order': order
                    }
                    
                    # Check if not already added
                    if not any(
                        ic['issue_id'] == issue_id and 
                        ic['contributor_id'] == contrib_id and 
                        ic['role_id'] == mapping['role_id']
                        for ic in issue_contributors_list
                    ):
                        issue_contributors_list.append(mapping)
    
    # Convert to dataframes
    contributors_df = pd.DataFrame(list(contributors_dict.values()))
    issue_contributors_df = pd.DataFrame(issue_contributors_list)
    
    # Add ID column to issue_contributors
    if not issue_contributors_df.empty:
        issue_contributors_df.insert(0, 'id', range(1, len(issue_contributors_df) + 1))
    
    # Fill NaN values
    if not contributors_df.empty:
        contributors_df['dle_user_id'] = contributors_df['dle_user_id'].fillna(0).astype(int)
        contributors_df['email'] = contributors_df['email'].fillna('')
    
    logger.info(f"Transformed {len(contributors_df)} unique contributors")
    logger.info(f"  - Matched with DLE users: {(contributors_df['dle_user_id'] > 0).sum()}")
    logger.info(f"  - Unmatched contributors: {(contributors_df['dle_user_id'] == 0).sum()}")
    logger.info(f"Created {len(issue_contributors_df)} issue-contributor mappings")
    
    return contributors_df, issue_contributors_df


def _build_user_lookup(users_df):
    """Build user lookup dictionary"""
    if users_df.empty:
        return {}
    
    lookup = {}
    
    for _, user in users_df.iterrows():
        user_id = user['user_id']
        name = normalize_name(str(user.get('name', '')))
        fullname = normalize_name(str(user.get('fullname', '')))
        email = str(user.get('email', ''))
        
        if name:
            lookup[name.lower()] = {'user_id': user_id, 'name': name, 'email': email}
        if fullname and fullname != name:
            lookup[fullname.lower()] = {'user_id': user_id, 'name': fullname, 'email': email}
    
    logger.info(f"Built user lookup with {len(lookup)} entries from {len(users_df)} users")
    return lookup


def _match_user(contributor_name, user_lookup):
    """Try to match contributor with DLE user"""
    if not contributor_name or not user_lookup:
        return None
    
    # Try exact match (case-insensitive)
    key = contributor_name.lower()
    if key in user_lookup:
        return user_lookup[key]
    
    # Try partial match
    for lookup_key, user_data in user_lookup.items():
        if lookup_key in key or key in lookup_key:
            return user_data
    
    return None
