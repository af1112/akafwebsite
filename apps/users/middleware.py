from apps.organizations.models import Organization

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.organization = None
        if request.user.is_authenticated:
            try:
                if hasattr(request.user, 'profile'):
                    request.organization = request.user.profile.organization
            except Exception:
                # Handle cases where DB migration hasn't been run yet
                pass
        
        response = self.get_response(request)
        return response
