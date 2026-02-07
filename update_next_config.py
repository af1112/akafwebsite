import os

file_path = r'D:\AKAFMenu\akafwebsite_temp\next.config.js'
old_str = "${process.env.PC_SOFTWARE_URL || 'http://localhost:8000'}/:path*"
new_str = "${process.env.PC_SOFTWARE_URL || 'https://pcsoftware.vercel.app'}/:path*"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if old_str in content:
        new_content = content.replace(old_str, new_str)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Successfully updated {file_path}")
    else:
        print(f"String not found in {file_path}")
        # Debugging: print a part of the file
        print("File content snippet:", content[600:800])

except Exception as e:
    print(f"Error: {e}")
