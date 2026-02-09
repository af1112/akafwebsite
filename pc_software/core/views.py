from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def main_dashboard(request):
    """
    Main landing dashboard showing all available modules.
    """
    return render(request, 'main_dashboard.html')
