# Vercel Deployment Trigger: 2026-02-12 12:25
import os
import sys
import traceback
from django.core.wsgi import get_wsgi_application
from django.conf import settings
from django.contrib.staticfiles.handlers import StaticFilesHandler

# Add current directory to path
path = os.path.dirname(os.path.abspath(__file__))
parent_path = os.path.dirname(path)
if parent_path not in sys.path:
    sys.path.insert(0, parent_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

try:
    print("STARTING VERCEL BOOT...")
    django_app = get_wsgi_application()
    # Wrap with StaticFilesHandler for Vercel
    app = StaticFilesHandler(django_app)
    print("VERCEL BOOT SUCCESSFUL")
except Exception as e:
    error_msg = traceback.format_exc()
    print(f"CRITICAL BOOT ERROR: {error_msg}")
    
    def app(environ, start_response):
        status = '500 Internal Server Error'
        # Displaying error directly in browser for emergency debugging
        body = f"""
        <html>
        <body style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
            <h1 style="color: #d9534f;">❌ Vercel Boot Error</h1>
            <p>The application failed to start. This is usually due to a configuration or dependency issue.</p>
            <div style="background: #f8f9fa; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
                <strong>Error Details:</strong>
                <pre style="white-space: pre-wrap;">{error_msg}</pre>
            </div>
            <p style="margin-top: 20px;">Check your <code>requirements.txt</code> and <code>settings.py</code>.</p>
        </body>
        </html>
        """.encode('utf-8')
        headers = [('Content-Type', 'text/html'), ('Content-Length', str(len(body)))]
        start_response(status, headers)
        return [body]
