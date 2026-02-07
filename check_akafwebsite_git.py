import subprocess
import os

target_dir = r"D:\AKAFMenu\akafwebsite_temp"

def run_git_command(command):
    try:
        result = subprocess.run(command, cwd=target_dir, capture_output=True, text=True, shell=True)
        return f"Command: {command}\nSTDOUT:\n{result.stdout}\nSTDERR:\n{result.stderr}\n"
    except Exception as e:
        return f"Error running {command}: {e}\n"

output = ""
output += run_git_command("git status")
output += run_git_command("git log -n 2")
output += run_git_command("git remote -v")
output += run_git_command("git push origin main")

print(output)
