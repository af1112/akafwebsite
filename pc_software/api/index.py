import os
import sys
import traceback
from django.core.wsgi import get_wsgi_application

# Add current directory to path to ensure core can be found
path = os.path.dirname(os.path.abspath(__file__))
parent_path = os.path.dirname(path)
if parent_path not in sys.path:
    sys.path.insert(0, parent_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

try:
    # Standard WSGI application - WhiteNoise in settings.py handles static files
    app = get_wsgi_application()
except Exception as e:
    error_msg = traceback.format_exc()
    print(f"CRITICAL BOOT ERROR: {error_msg}")
    raise e
