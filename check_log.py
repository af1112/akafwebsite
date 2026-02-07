import subprocess

def run_git_log():
    try:
        result = subprocess.run(["git", "log", "-n", "3"], cwd=r"D:\AKAFMenu\akafwebsite_temp", capture_output=True, text=True)
        print(result.stdout)
    except Exception as e:
        print(e)

run_git_log()
