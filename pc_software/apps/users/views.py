from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import UserProfile
from .forms import LanguageSettingsForm
from django.utils.translation import activate
from django.utils.translation import gettext as _

@login_required
def settings_view(request):
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)

    if request.method == 'POST':
        form = LanguageSettingsForm(request.POST, instance=profile)
        if form.is_valid():
            user_profile = form.save()
            # Activate the new language immediately for this request
            activate(user_profile.preferred_language)
            # Use a simple English message to avoid encoding issues with default backend
            messages.success(request, 'Language settings updated successfully.')
            return redirect('settings')
    else:
        form = LanguageSettingsForm(instance=profile)

    return render(request, 'users/settings.html', {'form': form})
