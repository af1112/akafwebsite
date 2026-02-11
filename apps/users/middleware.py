from django.utils import translation
from django.conf import settings
from django.shortcuts import redirect
from django.urls import reverse
from .models import UserProfile

class UserLanguageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            try:
                # Try to access profile safely
                if hasattr(request.user, 'profile'):
                    user_profile = request.user.profile
                    language = user_profile.preferred_language
                    if language:
                        translation.activate(language)
                        request.LANGUAGE_CODE = translation.get_language()
                    else:
                        # Force default language (English) if user hasn't chosen one
                        # This overrides LocaleMiddleware's browser detection
                        translation.activate(settings.LANGUAGE_CODE)
                        request.LANGUAGE_CODE = settings.LANGUAGE_CODE
                else:
                    # Create profile if it doesn't exist (for old users)
                    UserProfile.objects.get_or_create(user=request.user)
                    # Force default
                    translation.activate(settings.LANGUAGE_CODE)
                    request.LANGUAGE_CODE = settings.LANGUAGE_CODE
            except Exception:
                # Fallback to default behavior if anything goes wrong
                pass
        
        response = self.get_response(request)
        return response

class LoginRequiredMiddleware:
    """
    Middleware to ensure user is logged in for all pages except login, logout, and static files.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.user.is_authenticated:
            path = request.path_info
            
            # Use lazy evaluation for URLs
            login_url = reverse('login')
            exempt_urls = [
                login_url,
                '/admin/', 
                '/static/',
                '/media/',
                '/card/', 
                '/favicon.ico',
                '/restore-data/',
            ]
            
            # Check if path is exempt
            is_exempt = False
            for url in exempt_urls:
                if path.startswith(url):
                    is_exempt = True
                    break
            
            if not is_exempt:
                return redirect(f"{login_url}?next={request.path}")

        return self.get_response(request)
