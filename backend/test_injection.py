import asyncio
from core.ai_engine import analyze_resume

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

resume_text = "Experienced Node.js developer with skills in Express and MongoDB. Worked on various backend projects."

async def run():
    result = await analyze_resume(resume_text, jd)
    print(result)

asyncio.run(run())
