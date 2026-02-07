import subprocess
import os

target_dir = r"D:\AKAFMenu\akafwebsite_temp"

def run_git_command(command):
    try:
        print(f"Running: {command}")
        result = subprocess.run(command, cwd=target_dir, capture_output=True, text=True, shell=True)
        print(f"STDOUT: {result.stdout}")
        print(f"STDERR: {result.stderr}")
        return result.returncode
    except Exception as e:
        print(f"Error running {command}: {e}")
        return 1

# Add middleware.ts
run_git_command("git add middleware.ts")

# Commit
run_git_command('git commit -m "Update middleware matcher to explicitly exclude pc_software"')

# Push
run_git_command("git push origin main")
