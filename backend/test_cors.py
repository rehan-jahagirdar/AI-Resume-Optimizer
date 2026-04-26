import requests

headers = {
    'Origin': 'http://localhost:3000',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type'
}

response = requests.options('http://127.0.0.1:8000/upload-resume/', headers=headers)
print("Status:", response.status_code)
print("Headers:", response.headers)
