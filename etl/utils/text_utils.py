"""Text processing utilities"""
import re
from html import unescape
from bs4 import BeautifulSoup


def clean_html(html_text):
    """Remove HTML tags and return clean text"""
    if not html_text:
        return ''
    
    # Handle NaN values
    if not isinstance(html_text, str):
        return ''
    
    if html_text.strip() == '':
        return ''
    
    try:
        soup = BeautifulSoup(html_text, 'html.parser')
        text = soup.get_text(separator=' ', strip=True)
        text = unescape(text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    except Exception:
        return ''


def extract_first_image_url(html_text):
    """Extract the first image URL from HTML"""
    if not html_text:
        return ''
    
    try:
        soup = BeautifulSoup(html_text, 'html.parser')
        img = soup.find('img')
        if img:
            return img.get('src', '') or img.get('href', '')
        
        # Try to find image in anchor tag
        a = soup.find('a', class_='highslide')
        if a:
            return a.get('href', '')
        
        return ''
    except Exception:
        return ''


def normalize_name(name):
    """Normalize contributor name (trim, title case)"""
    if not name:
        return ''
    
    name = name.strip()
    name = re.sub(r'\s+', ' ', name)
    return name


def extract_issue_number(title):
    """Extract issue number from title"""
    if not title:
        return ''
    
    # Try to match patterns like "#123", "# 123", "№123"
    patterns = [
        r'#\s*(\d+)',
        r'№\s*(\d+)',
        r'\b(\d+)\b',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, title)
        if match:
            return match.group(1)
    
    return ''


def parse_xfields(xfields_str):
    """Parse xfields string into dictionary"""
    if not xfields_str:
        return {}
    
    result = {}
    
    # Split by || delimiter
    parts = xfields_str.split('||')
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
        
        # Split by first |
        if '|' in part:
            key, value = part.split('|', 1)
            key = key.strip()
            value = value.strip()
            
            if key and value:
                # Handle multiple values (comma or slash separated)
                if key in result:
                    # Append to existing value
                    if isinstance(result[key], list):
                        result[key].append(value)
                    else:
                        result[key] = [result[key], value]
                else:
                    result[key] = value
    
    return result


def split_multiple_values(value_str):
    """Split string containing multiple values by comma or slash"""
    if not value_str:
        return []
    
    # Split by comma or slash
    values = re.split(r'[,/]', value_str)
    values = [v.strip() for v in values if v.strip()]
    
    return values


def create_slug(text):
    """Create URL-friendly slug from text"""
    if not text:
        return ''
    
    # Handle already-slugified text
    if re.match(r'^[a-z0-9\-]+$', text):
        return text
    
    # Convert to lowercase
    slug = text.lower()
    
    # Remove special characters
    slug = re.sub(r'[^\w\s-]', '', slug)
    
    # Replace spaces with hyphens
    slug = re.sub(r'[-\s]+', '-', slug)
    
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    
    return slug
