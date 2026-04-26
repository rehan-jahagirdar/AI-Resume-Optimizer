import requests

url = "http://127.0.0.1:8000/upload-resume/"

try:
    response = requests.post(
        url,
        data=b"dummy data",
        headers={"Content-Type": "multipart/form-data"}
    )
    print("Status:", response.status_code)
    print("Body:", response.text)
except Exception as e:
    print("Error:", e)
