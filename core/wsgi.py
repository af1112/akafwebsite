"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os
import sys
import traceback

# Setup basic logging to a string so we can potentially see it if application fails
try:
    # Add apps directory to path for Vercel
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

    from django.core.wsgi import get_wsgi_application

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

    # Wrap application creation to catch early startup errors
    try:
        application = get_wsgi_application()
    except Exception as e:
        error_msg = traceback.format_exc()
        print(f"CRITICAL: WSGI Application failed to start:\n{error_msg}")
        
        # Fallback application to show the error in browser if Vercel allows
        def application(environ, start_response):
            status = '500 Internal Server Error'
            output = f"<h1>Startup Error</h1><pre>{error_msg}</pre>".encode('utf-8')
            response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
            start_response(status, response_headers)
            return [output]
except Exception as e:
    error_msg = traceback.format_exc()
    print(f"CRITICAL: Outer WSGI failure:\n{error_msg}")
    def application(environ, start_response):
        status = '500 Internal Server Error'
        output = f"<h1>Critical Startup Error</h1><pre>{error_msg}</pre>".encode('utf-8')
        response_headers = [('Content-type', 'text/html'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]
