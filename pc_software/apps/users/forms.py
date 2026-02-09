from django import forms
from .models import UserProfile
from django.conf import settings

class LanguageSettingsForm(forms.ModelForm):
    preferred_language = forms.ChoiceField(
        choices=settings.LANGUAGES,
        widget=forms.Select(attrs={'class': 'form-select'}),
        label='Preferred Language / زبان ترجیحی'
    )
    
    currency_code = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'OMR'}),
        label='Currency Code (e.g. OMR)'
    )
    
    currency_symbol = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'ر.ع.'}),
        label='Currency Symbol (e.g. $)'
    )
    
    currency_decimal_places = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control', 'min': 0, 'max': 4}),
        label='Decimal Places (e.g. 3)'
    )

    class Meta:
        model = UserProfile
        fields = ['preferred_language', 'currency_code', 'currency_symbol', 'currency_decimal_places']
