def user_settings(request):
    if request.user.is_authenticated:
        # Check session first to avoid DB hit every time
        settings_key = f'user_settings_{request.user.id}'
        cached_settings = request.session.get(settings_key)
        
        if cached_settings:
            return cached_settings
            
        if hasattr(request.user, 'profile'):
            profile = request.user.profile
            settings_data = {
                'user_currency_code': profile.currency_code,
                'user_currency_symbol': profile.currency_symbol,
                'user_decimal_places': profile.currency_decimal_places,
            }
            # Cache in session
            request.session[settings_key] = settings_data
            return settings_data
            
    return {
        'user_currency_code': 'OMR',
        'user_currency_symbol': 'ر.ع.',
        'user_decimal_places': 3,
    }
