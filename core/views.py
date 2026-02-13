from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.core.management import call_command
import os
import traceback
import sys

@login_required
def main_dashboard(request):
    """
    Main landing dashboard showing available modules based on organization subscription.
    """
    # Get user profile and organization
    profile = getattr(request.user, 'profile', None)
    organization = profile.organization if profile else None
    
    context = {
        'organization': organization,
        # Default all to False if no organization
        'can_use_expenses': organization.can_use_expenses if organization else False,
        'can_use_ticketing': organization.can_use_ticketing if organization else False,
        'can_use_attendance': organization.can_use_attendance if organization else False,
        'can_use_projects': organization.can_use_projects if organization else False,
        'can_use_dms': organization.can_use_dms if organization else False,
        'can_use_ai': organization.can_use_ai if organization else False,
        'can_use_menu': organization.can_use_menu if organization else False,
        'can_use_club': organization.can_use_club if organization else False,
        'is_superuser': request.user.is_superuser
    }
    
    return render(request, 'main_dashboard.html', context)

    

def run_migrations_view(request):
    """
    Safely run migrations on production.
    Usage: /run-migrations/  OR  /run-migrations/?key=AKAF_SECRET_RESTORE_2026
    """
    secret_key = request.GET.get('key')
    # Use is_authenticated only if user is logged in, otherwise default to False
    is_authorized = False
    if request.user.is_authenticated:
        is_authorized = (request.user.is_superuser or request.user.is_staff)
    
    if not is_authorized and secret_key != 'AKAF_SECRET_RESTORE_2026':
        return HttpResponse("Unauthorized. Please use the secret key or login as staff.", status=403)
        
    output = []
    output.append("--- RUNNING MIGRATIONS ---")
    try:
        from django.core.management import call_command
        from io import StringIO
        
        out = StringIO()
        call_command('migrate', interactive=False, stdout=out)
        result = out.getvalue()
        output.append(result)
        output.append("✅ Migrations completed successfully!")
    except Exception as e:
        output.append(f"❌ Migration failed: {str(e)}")
        output.append(traceback.format_exc())
    
    return HttpResponse("<pre>" + "\n".join(output) + "</pre>")

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
        
        # Step 1: Force Clean Database (Drop all tables)
        output.append("🧹 Cleaning database (dropping all tables)...")
        try:
            with connection.cursor() as cursor:
                cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
                cursor.execute("SHOW TABLES")
                tables = cursor.fetchall()
                for table in tables:
                    cursor.execute(f"DROP TABLE IF EXISTS {table[0]}")
                cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")
            output.append("✅ Database cleaned successfully.")
        except Exception as clean_err:
            output.append(f"⚠️ Clean failed: {str(clean_err)}")

        # Step 2: Run fresh migrate
        output.append("Running fresh migrations...")
        try:
            call_command('migrate', interactive=False)
            output.append("✅ Fresh migration successful!")
        except Exception as mig_err:
            output.append(f"❌ Migration failed: {str(mig_err)}")
            raise mig_err
        
        # Step 3: Create Superuser if not exists
        output.append("Checking for admin user...")
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            if not User.objects.filter(username='admin').exists():
                User.objects.create_superuser('admin', 'admin@example.com', 'admin123456')
                output.append("✅ Admin user created (admin / admin123456)")
            else:
                output.append("ℹ️ Admin user already exists.")
        except Exception as user_err:
            output.append(f"⚠️ Could not create admin: {str(user_err)}")

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
