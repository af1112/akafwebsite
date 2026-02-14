from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.conf import settings
from .models import UserProfile
from .forms import LanguageSettingsForm, UserCreateForm, UserPermissionsForm
from django.utils.translation import activate
from django.utils.translation import gettext as _
from django.contrib.auth.models import User, Permission

def is_admin(user):
    return user.is_superuser or user.is_staff

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
            # Clear the session cache to force context processor to re-calculate
            settings_key = f'user_settings_{request.user.id}'
            if settings_key in request.session:
                del request.session[settings_key]
            # Activate the new language immediately for this request
            activate(user_profile.preferred_language)
            messages.success(request, _('Language settings updated successfully.'))
            return redirect('users:settings')
    else:
        form = LanguageSettingsForm(instance=profile)

    return render(request, 'users/settings.html', {'form': form})

@login_required
@user_passes_test(is_admin)
def user_list(request):
    users = User.objects.all().order_by('-date_joined')
    return render(request, 'users/user_list.html', {'users': users})

@login_required
@user_passes_test(is_admin)
def user_create(request):
    if request.method == 'POST':
        user_form = UserCreateForm(request.POST)
        perm_form = UserPermissionsForm(request.POST)
        if user_form.is_valid() and perm_form.is_valid():
            user = user_form.save(commit=False)
            user.set_password(user_form.cleaned_data['password'])
            user.save()
            
            # Create profile for new user with selected language and role
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.preferred_language = user_form.cleaned_data.get('preferred_language', 'en')
            profile.role = user_form.cleaned_data.get('role', 'user')
            profile.save()
            
            # Update user staff status based on role
            if profile.role in ['admin', 'supervisor']:
                user.is_staff = True
                user.save()
            
            # We need the ContentType for UserProfile since that's where perms are defined
            from django.contrib.contenttypes.models import ContentType
            content_type = ContentType.objects.get_for_model(UserProfile)
            
            # Save permissions
            for field, value in perm_form.cleaned_data.items():
                if field == 'REQUIRE_PHOTO':
                    profile.require_photo = value
                    profile.save()
                    continue
                    
                if value:
                    perm_codename = field.lower()
                    try:
                        # Find the permission specifically for our model
                        permission = Permission.objects.filter(
                            codename=perm_codename,
                            content_type=content_type
                        ).first()
                        
                        if not permission:
                            # Create if missing
                            permission = Permission.objects.create(
                                codename=perm_codename,
                                name=f'Can access {perm_codename.split("_")[-1].capitalize()}',
                                content_type=content_type,
                            )
                        
                        user.user_permissions.add(permission)
                    except Exception as e:
                        print(f"DEBUG: Error adding permission {perm_codename}: {e}")
            
            messages.success(request, _('User created successfully.'))
            return redirect('users:user_list')
    else:
        user_form = UserCreateForm()
        perm_form = UserPermissionsForm()
    
    return render(request, 'users/user_form.html', {
        'user_form': user_form,
        'perm_form': perm_form,
        'title': _('Create New User'),
        'LANGUAGES': settings.LANGUAGES,
        'ROLES': UserProfile.ROLE_CHOICES
    })

@login_required
@user_passes_test(is_admin)
def user_edit(request, pk):
    user = get_object_or_404(User, pk=pk)
    try:
        profile = user.profile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=user)

    if request.method == 'POST':
        # Update basic info
        user.first_name = request.POST.get('first_name', user.first_name)
        user.last_name = request.POST.get('last_name', user.last_name)
        user.email = request.POST.get('email', user.email)
        user.save()
        
        # Update profile language and role
        profile.preferred_language = request.POST.get('preferred_language', profile.preferred_language)
        profile.role = request.POST.get('role', profile.role)
        profile.save()
        
        # Update user staff status based on role
        if profile.role in ['admin', 'supervisor']:
            user.is_staff = True
        else:
            user.is_staff = False
        user.save()
        
        perm_form = UserPermissionsForm(request.POST)
        if perm_form.is_valid():
            # Clear existing permissions and add new ones
            user.user_permissions.clear()
            
            # We need the ContentType for UserProfile since that's where perms are defined
            from django.contrib.contenttypes.models import ContentType
            content_type = ContentType.objects.get_for_model(UserProfile)
            
            for field, value in perm_form.cleaned_data.items():
                if field == 'REQUIRE_PHOTO':
                    profile.require_photo = value
                    profile.save()
                    continue

                if value:
                    perm_codename = field.lower()
                    try:
                        # Find the permission specifically for our model
                        permission = Permission.objects.filter(
                            codename=perm_codename,
                            content_type=content_type
                        ).first()
                        
                        if not permission:
                            # Create if missing
                            permission = Permission.objects.create(
                                codename=perm_codename,
                                name=f'Can access {perm_codename.split("_")[-1].capitalize()}',
                                content_type=content_type,
                            )
                        
                        user.user_permissions.add(permission)
                    except Exception as e:
                        print(f"DEBUG: Error adding permission {perm_codename}: {e}")
            
            messages.success(request, _('User updated successfully.'))
            # Clear the session cache for the edited user
            settings_key = f'user_settings_{user.id}'
            if settings_key in request.session:
                del request.session[settings_key]
            return redirect('users:user_list')
        else:
            messages.error(request, _('Please correct the errors below.'))
    else:
        perm_form = UserPermissionsForm(user=user)
    
    return render(request, 'users/user_form.html', {
        'edit_user': user,
        'perm_form': perm_form,
        'title': _('Edit User'),
        'LANGUAGES': settings.LANGUAGES,
        'ROLES': UserProfile.ROLE_CHOICES
    })

@login_required
@user_passes_test(is_admin)
def user_delete(request, pk):
    if request.method == 'POST':
        user = get_object_or_404(User, pk=pk)
        if user != request.user:
            user.delete()
            messages.success(request, _('User deleted successfully.'))
        else:
            messages.error(request, _('You cannot delete yourself.'))
    return redirect('users:user_list')
