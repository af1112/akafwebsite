def user_settings(request):
    if request.user.is_authenticated and hasattr(request.user, 'profile'):
        profile = request.user.profile
        return {
            'user_currency_code': profile.currency_code,
            'user_currency_symbol': profile.currency_symbol,
            'user_decimal_places': profile.currency_decimal_places,
        }
    return {
        'user_currency_code': 'OMR',
        'user_currency_symbol': 'ر.ع.',
        'user_decimal_places': 3,
    }
