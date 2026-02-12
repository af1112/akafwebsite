from django import forms
from .models import UserProfile
from django.conf import settings
from django.contrib.auth.models import User, Permission
from django.contrib.contenttypes.models import ContentType

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

class UserCreateForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), label="Password")
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}), label="Confirm Password")

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match")
        return cleaned_data

class UserPermissionsForm(forms.Form):
    # Dynamic list of modules based on your requirement
    CAN_ACCESS_EXPENSES = forms.BooleanField(required=False, label="Access Expense Manager")
    CAN_ACCESS_TICKETING = forms.BooleanField(required=False, label="Access Ticketing System")
    CAN_ACCESS_PROJECTS = forms.BooleanField(required=False, label="Access Project Control")
    CAN_ACCESS_DMS = forms.BooleanField(required=False, label="Access Document DMS")
    CAN_ACCESS_AI = forms.BooleanField(required=False, label="Access AI Engine")
    CAN_ACCESS_MENU = forms.BooleanField(required=False, label="Access Digital Menu")
    CAN_ACCESS_CLUB = forms.BooleanField(required=False, label="Access Customer Club")

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
        if user:
            # Check if user has these custom permissions
            # We will use simple codenames for these permissions
            for field in self.fields:
                perm_codename = field.lower()
                if user.has_perm(f'users.{perm_codename}'):
                    self.fields[field].initial = True
