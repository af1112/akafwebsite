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
            # Check session first to avoid DB hit every time
            lang_session_key = f'user_lang_{request.user.id}'
            language = request.session.get(lang_session_key)
            
            if not language:
                try:
                    # Try to access profile safely
                    if hasattr(request.user, 'profile'):
                        user_profile = request.user.profile
                        language = user_profile.preferred_language
                    else:
                        # Create profile if it doesn't exist (for old users)
                        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
                        language = user_profile.preferred_language
                    
                    if not language:
                        language = settings.LANGUAGE_CODE
                    
                    # Cache in session
                    request.session[lang_session_key] = language
                except Exception:
                    language = settings.LANGUAGE_CODE
            
            translation.activate(language)
            request.LANGUAGE_CODE = translation.get_language()
        
        response = self.get_response(request)
        return response

class LoginRequiredMiddleware:
    """
    Middleware to ensure user is logged in and handles redirects for staff/users.
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
                '/run-migrations/',
            ]
            
            # Check if path is exempt
            is_exempt = False
            for url in exempt_urls:
                if path.startswith(url):
                    is_exempt = True
                    break
            
            if not is_exempt:
                return redirect(f"{login_url}?next={request.path}")
        
        # Logic for redirecting users with only attendance module
        elif request.path == reverse('main_dashboard'):
            # If the user is at the main dashboard, check if they should be redirected
            # To optimize, we check permissions
            perms = request.user.get_all_permissions()
            # Count how many modules they can access
            module_perms = [p for p in perms if p.startswith('users.can_access_')]
            
            # If they ONLY have attendance access (or no specific modules but attendance is default)
            # and they are not staff/superuser
            if not request.user.is_staff and not request.user.is_superuser:
                # If they only have attendance access
                has_attendance_only = len(module_perms) == 0 or (len(module_perms) == 1 and 'users.can_access_attendance' in module_perms)
                # For now, let's assume if they aren't staff, we check if they have access to attendance
                # and redirect them if that's the intended behavior for "personnel"
                return redirect('hr_attendance:dashboard')

        return self.get_response(request)
