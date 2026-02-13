# from apps.organizations.models import Organization

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.organization = None
        if request.user.is_authenticated:
            try:
                if hasattr(request.user, 'profile'):
                    profile = request.user.profile
                    # Avoid direct import to prevent circular issues or early crashes
                    request.organization = getattr(profile, 'organization', None)
            except Exception:
                # Handle cases where DB migration hasn't been run yet
                pass
        
        response = self.get_response(request)
        return response
