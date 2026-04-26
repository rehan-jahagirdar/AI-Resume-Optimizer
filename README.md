# AI Resume Optimizer

A full-stack, AI-powered applicant tracking and resume optimization engine. It analyzes candidate resumes against job descriptions to provide a realistic ATS match score, identify missing keywords, and offer actionable, brutally honest feedback to improve the application.

## Features

- **Strict ATS Scoring Engine**: Calculates realistic match scores based on core skill overlap, experience alignment, and industry fit.
- **Deep PDF Extraction**: Seamlessly extracts text from uploaded resumes using PyMuPDF.
- **Intelligent Feedback**: Leverages Llama-3.1 via the Groq API to generate prioritized, structured, and actionable resume enhancements.
- **Anti-Prompt-Injection Security**: Enforces strict document validation and Chain-of-Thought reasoning to detect and reject prompt injections or fake job descriptions.
- **Minimalist UI**: Features a beautiful, dynamic, and responsive frontend built with React and Tailwind CSS.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: FastAPI, Python, Uvicorn
- **AI/LLM**: Groq API (Llama-3.1-8b-instant)
- **Document Processing**: PyMuPDF (`fitz`)

## Quick Start

### 1. Backend Setup
Navigate to the backend directory and set up your Python environment:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory and add your Groq API key:
```env
GROQ_API_KEY=your_api_key_here
```

Start the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to use the application.

## License

MIT License
