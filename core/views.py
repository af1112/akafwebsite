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
        
        # Step 1: Just try to connect and run a simple query
        output.append("Testing database connection...")
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                output.append("✅ Database connection test successful!")
        except Exception as conn_err:
            output.append(f"⚠️ Direct connection failed: {str(conn_err)}")
            output.append("Attempting to ensure database exists via pymysql...")
            try:
                import pymysql
                temp_conn = pymysql.connect(
                    host=db_conf['HOST'],
                    user=db_conf['USER'],
                    password=db_conf['PASSWORD'],
                    port=int(db_conf.get('PORT', 4000)),
                    ssl={'ca': None} if 'ssl' in db_conf.get('OPTIONS', {}) else None,
                    connect_timeout=5
                )
                with temp_conn.cursor() as cursor:
                    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_conf['NAME']}")
                temp_conn.close()
                output.append(f"✅ Database {db_conf['NAME']} verified/created.")
            except Exception as py_err:
                output.append(f"❌ Pymysql connection failed: {str(py_err)}")
                # Don't raise yet, try migrate anyway
        
        # Step 2: Run migrate
        output.append("Running migrations...")
        try:
            call_command('migrate', interactive=False, fake_initial=True)
            output.append("✅ Migration successful!")
        except Exception as mig_err:
            output.append(f"❌ Migration failed: {str(mig_err)}")
            if "already exists" in str(mig_err):
                output.append("Tip: Use fake-initial if tables already exist.")
            raise mig_err
        
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
