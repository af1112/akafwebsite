from django import forms
from .models import ExpenseItem, ExpenseReport, Trip, Advance

class TripForm(forms.ModelForm):
    class Meta:
        model = Trip
        fields = ['name', 'travel_type', 'business_purpose']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Trip Name'}),
            'travel_type': forms.RadioSelect(attrs={'class': 'form-check-input'}),
            'business_purpose': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }

class AdvanceForm(forms.ModelForm):
    class Meta:
        model = Advance
        fields = ['amount', 'date', 'paid_through', 'reference_number', 'notes', 'trip']
        widgets = {
            'amount': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.001', 'placeholder': '0.000'}),
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'paid_through': forms.Select(attrs={'class': 'form-select'}),
            'reference_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Tap to Enter'}),
            'notes': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'trip': forms.Select(attrs={'class': 'form-select'}),
        }

class ExpenseItemForm(forms.ModelForm):
    # Field to trigger file input separately if needed, but standard widget works
    receipt_image_trigger = forms.ImageField(required=False, widget=forms.FileInput(attrs={'style': 'display: none;', 'capture': 'environment', 'accept': 'image/*'}))

    class Meta:
        model = ExpenseItem
        fields = [
            'report', 'date', 'merchant', 'category', 'amount', 'currency', 
            'description', 'claim_reimbursement', 'payment_mode', 'reference_number', 'receipt_image'
        ]
        widgets = {
            'report': forms.Select(attrs={'class': 'form-select'}),
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'merchant': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Tap to select'}),
            'category': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Tap to select', 'list': 'category-list'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.001', 'placeholder': '0.000'}),
            'currency': forms.TextInput(attrs={'class': 'form-control', 'value': 'OMR', 'readonly': 'readonly'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 3, 'placeholder': 'Description'}),
            'payment_mode': forms.Select(attrs={'class': 'form-select'}),
            'reference_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Tap to Enter'}),
            'receipt_image': forms.ClearableFileInput(attrs={'class': 'd-none', 'accept': 'image/*'}),
            'claim_reimbursement': forms.CheckboxInput(attrs={'class': 'form-check-input', 'role': 'switch'}),
        }
