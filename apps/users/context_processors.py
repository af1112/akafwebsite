def user_settings(request):
    if request.user.is_authenticated:
        # Check session first to avoid DB hit every time
        settings_key = f'user_settings_{request.user.id}'
        cached_settings = request.session.get(settings_key)
        
        if cached_settings:
            return cached_settings
            
        if hasattr(request.user, 'profile'):
            profile = request.user.profile
            org = profile.organization
            settings_data = {
                'user_currency_code': profile.currency_code,
                'user_currency_symbol': profile.currency_symbol,
                'user_decimal_places': profile.currency_decimal_places,
                'org_name': org.name if org else 'AKAF',
                'org_logo': org.logo.url if org and org.logo else None,
                'org_id': org.id if org else None,
                'organization': org,
                'can_use_expenses': org.can_use_expenses if org else False,
                'can_use_ticketing': org.can_use_ticketing if org else False,
                'can_use_attendance': org.can_use_attendance if org else False,
                'can_use_projects': org.can_use_projects if org else False,
                'can_use_dms': org.can_use_dms if org else False,
                'can_use_ai': org.can_use_ai if org else False,
                'can_use_menu': org.can_use_menu if org else False,
                'can_use_club': org.can_use_club if org else False,
            }
            # Cache in session
            request.session[settings_key] = settings_data
            return settings_data
            
    return {
        'user_currency_code': 'OMR',
        'user_currency_symbol': 'ر.ع.',
        'user_decimal_places': 3,
    }
