import os
import sys
import traceback

# Add current directory to path
path = os.path.dirname(os.path.abspath(__file__))
parent_path = os.path.dirname(path)
if parent_path not in sys.path:
    sys.path.insert(0, parent_path)

try:
    from core.wsgi import application
    app = application
except Exception as e:
    error_msg = traceback.format_exc()
    print(f"CRITICAL ERROR IN api/index.py: {error_msg}")
    
    def app(environ, start_response):
        status = '500 Internal Server Error'
        body = f"<h1>Vercel Boot Error</h1><p>Error during core.wsgi import:</p><pre>{error_msg}</pre>".encode('utf-8')
        headers = [('Content-Type', 'text/html'), ('Content-Length', str(len(body)))]
        start_response(status, headers)
        return [body]
