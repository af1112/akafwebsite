import shutil
import os

source = r"D:\AKAFMenu\Project digitalmenu\PC Software\custom_middleware.ts"
dest = r"D:\AKAFMenu\akafwebsite_temp\middleware.ts"

try:
    shutil.copy2(source, dest)
    print(f"Successfully copied to {dest}")
except Exception as e:
    print(f"Error copying file: {e}")
