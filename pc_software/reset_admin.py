import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Set DB environment variables for TiDB Cloud
os.environ['DB_HOST'] = 'gateway01.us-east-1.prod.aws.tidbcloud.com'
os.environ['DB_PORT'] = '4000'
os.environ['DB_USER'] = '3T8qABXcqrWPrb4.root'
os.environ['DB_PASSWORD'] = 'DJaJl2vZMnMNLHZM'
os.environ['DB_NAME'] = 'test'
os.environ['DB_ENGINE'] = 'django.db.backends.mysql'
os.environ['DB_OPTIONS_SSL_MODE'] = 'REQUIRED'

django.setup()

from django.contrib.auth.models import User

def create_or_reset_admin():
    username = 'admin'
    password = 'admin'
    email = 'admin@example.com'
    
    try:
        user = User.objects.filter(username=username).first()
        if user:
            print(f"User '{username}' already exists. Resetting password...")
            user.set_password(password)
            user.is_superuser = True
            user.is_staff = True
            user.save()
            print(f"SUCCESS: Password for '{username}' has been reset to '{password}'.")
        else:
            print(f"Creating new superuser '{username}'...")
            User.objects.create_superuser(username, email, password)
            print(f"SUCCESS: Superuser '{username}' created successfully with password '{password}'.")
            
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == "__main__":
    create_or_reset_admin()
