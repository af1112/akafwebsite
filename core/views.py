from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
import os
import traceback
import sys

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
    
    output = []
    output.append("--- DEBUG LOGS ---")
    output.append(f"Python Version: {sys.version}")
    
    try:
        # Check DB Connection Info (Safe)
        from django.conf import settings
        from django.db import connection
        db_conf = settings.DATABASES['default']
        output.append(f"DB Engine: {db_conf['ENGINE']}")
        output.append(f"DB Host: {db_conf.get('HOST', 'N/A')}")
        output.append(f"DB User: {db_conf.get('USER', 'N/A')}")
        
        # Try to create database if it doesn't exist (MySQL/TiDB specific)
        if 'mysql' in db_conf['ENGINE']:
            import pymysql
            output.append(f"Ensuring database {db_conf['NAME']} exists...")
            temp_conn = pymysql.connect(
                host=db_conf['HOST'],
                user=db_conf['USER'],
                password=db_conf['PASSWORD'],
                port=int(db_conf.get('PORT', 3306)),
                ssl={'ca': None} if 'ssl' in db_conf.get('OPTIONS', {}) else None
            )
            with temp_conn.cursor() as cursor:
                cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_conf['NAME']}")
            temp_conn.close()
            output.append(f"✅ Database {db_conf['NAME']} is ready!")

        # Run migrate first to ensure tables exist
        output.append("Running migrate...")
        call_command('migrate', interactive=False)
        output.append("✅ Migration successful!")
        
        # Load data
        data_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data.json')
        if os.path.exists(data_file):
            output.append(f"Loading data from {data_file}...")
            call_command('loaddata', data_file)
            output.append("✅ Data restored successfully!")
            return HttpResponse("<br>".join(output), status=200)
        else:
            output.append(f"❌ ERROR: data.json not found at {data_file}")
            return HttpResponse("<br>".join(output), status=404)
            
    except Exception as e:
        error_trace = traceback.format_exc()
        output.append(f"❌ CRITICAL ERROR: {str(e)}")
        output.append("<pre>" + error_trace + "</pre>")
        return HttpResponse("<br>".join(output), status=500)
