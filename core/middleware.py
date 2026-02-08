import logging

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log basic request info
        print(f"--------------------------------------------------")
        print(f"DEBUG_DJANGO: Incoming Request: {request.method} {request.get_full_path()}")
        print(f"DEBUG_DJANGO: Host: {request.get_host()}")
        
        # Log specific headers that might affect redirects
        interesting_headers = ['X-Forwarded-Proto', 'X-Forwarded-Host', 'X-Vercel-Forwarded-For']
        for header in interesting_headers:
            val = request.headers.get(header)
            if val:
                print(f"DEBUG_DJANGO: {header}: {val}")

        response = self.get_response(request)

        # Log response status
        print(f"DEBUG_DJANGO: Response Status: {response.status_code}")
        if response.status_code in (301, 302, 307, 308):
            print(f"DEBUG_DJANGO: Redirecting to: {response.get('Location')}")

        # Add debug header to trace response back to Django
        response['X-Debug-Django'] = 'Active'
        response['X-Debug-Django-Path'] = request.path
        
        print(f"--------------------------------------------------")
        return response
