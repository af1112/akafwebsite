"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os
import sys
import traceback

# For Vercel, we need to make sure the root and apps directories are in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
APPS_DIR = os.path.join(BASE_DIR, 'apps')
if APPS_DIR not in sys.path:
    sys.path.insert(0, APPS_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

try:
    from django.core.wsgi import get_wsgi_application
    application = get_wsgi_application()
except Exception:
    error_msg = traceback.format_exc()
    print(error_msg)
    
    def application(environ, start_response):
        status = '500 Internal Server Error'
        body = f"<h1>Vercel Deployment Error</h1><pre>{error_msg}</pre>".encode('utf-8')
        headers = [('Content-Type', 'text/html'), ('Content-Length', str(len(body)))]
        start_response(status, headers)
        return [body]
