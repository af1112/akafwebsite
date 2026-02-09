from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
import os

@login_required
def main_dashboard(request):
    """
    Main landing dashboard showing all available modules.
    """
    return render(request, 'main_dashboard.html')

def restore_data_view(request):
    """
    Emergency data restore view for Vercel/Shared Hosting.
    Usage: /restore-data/?key=AKAF_SECRET_RESTORE_2026
    """
    secret_key = request.GET.get('key')
    if secret_key != 'AKAF_SECRET_RESTORE_2026':
        return HttpResponse("Unauthorized", status=403)
    
    try:
        # Run migrate first to ensure tables exist
        call_command('migrate')
        
        # Load data
        data_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data.json')
        if os.path.exists(data_file):
            call_command('loaddata', data_file)
            return HttpResponse("✅ SUCCESS: Data restored successfully! You can now login.", status=200)
        else:
            return HttpResponse(f"❌ ERROR: data.json not found at {data_file}", status=404)
            
    except Exception as e:
        return HttpResponse(f"❌ ERROR: {str(e)}", status=500)
