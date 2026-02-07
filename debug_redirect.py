import requests

url = "https://www.akafco.com/pc_software/"

try:
    print(f"Checking URL: {url}")
    response = requests.get(url, allow_redirects=False)
    
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for k, v in response.headers.items():
        print(f"  {k}: {v}")
        
    if response.status_code in (301, 302, 307, 308):
        print(f"\nRedirect Location: {response.headers.get('Location')}")
        
except Exception as e:
    print(f"Error: {e}")
