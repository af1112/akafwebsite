from apps.organizations.models import Organization

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and hasattr(request.user, 'profile'):
            request.organization = request.user.profile.organization
        else:
            request.organization = None
        
        response = self.get_response(request)
        return response
