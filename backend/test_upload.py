import requests

url = "http://127.0.0.1:8000/upload-resume/"
pdf_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n>>\nendobj\n"
files = {
    'file': ('test.pdf', pdf_content, 'application/pdf')
}

jd = """You are an expert backend coding mentor helping a student who only has 40 minutes a day to learn web development. I will give you a video title, topic, or transcript from my Node.js/Express/MongoDB course.

Your strict job is to extract only the most essential, reusable code and format it exactly into this 3-line structure:

Action: [Explain what the code does in 3 to 5 words]
Code: [The exact, minimal syntax to copy/paste]
Trap: [One short, 1-sentence warning about a common error or rule]

Rules:

Do not include any greetings, explanations, or extra text. Output only the 3-line format.

If the video or topic contains multiple important commands, create a separate 3-line block for each one.

If the topic is purely theoretical (like "What is Node?") and has no practical code, just reply with: "No code to note. Just watch and learn."
"""

data = {
    'job_description': jd
}

try:
    response = requests.post(url, files=files, data=data)
    print("Status:", response.status_code)
    print("Body:", response.text)
except Exception as e:
    print("Error:", e)
