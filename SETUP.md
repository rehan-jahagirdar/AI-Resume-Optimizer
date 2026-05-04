# Running AI Resume Optimizer on a New Laptop

This guide provides step-by-step instructions to get the AI Resume Optimizer up and running on a brand-new machine.

## Prerequisites

Before starting, ensure the laptop has the following software installed. If not, download and install them:

1. **Git**: To clone the repository. [Download Git](https://git-scm.com/downloads)
2. **Node.js**: Required to run the React frontend. [Download Node.js](https://nodejs.org/) (Choose the LTS version).
3. **Python (3.10+)**: Required to run the FastAPI backend. [Download Python](https://www.python.org/downloads/)
   - **Important for Windows**: When installing Python, make sure to check the box that says **"Add python.exe to PATH"** at the bottom of the installer window.
4. **Code Editor**: Such as [Visual Studio Code](https://code.visualstudio.com/).

---

## Step 1: Clone the Repository

1. Open a terminal (Command Prompt, PowerShell, or Git Bash).
2. Navigate to the folder where you want to keep the project (e.g., Desktop):
   ```bash
   cd Desktop
   ```
3. Clone the repository using the GitHub URL:
   ```bash
   git clone https://github.com/rehan-jahagirdar/AI-Resume-Optimizer.git
   ```
4. Open the project in your code editor:
   ```bash
   cd AI-Resume-Optimizer
   code .
   ```

---

## Step 2: Set Up the Backend

The backend is built with Python and FastAPI. It requires a virtual environment and an API key from Groq.

1. Open a terminal inside the project root folder.
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
4. Activate the virtual environment:
   - **Windows (PowerShell/CMD)**:
     ```bash
     venv\Scripts\activate
     ```
   - **Mac/Linux**:
     ```bash
     source venv/bin/activate
     ```
   *(You should see `(venv)` appear at the beginning of your terminal line).*
5. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
6. Create the Environment Variables file:
   - In the `backend` folder, create a new file named `.env`.
   - Add your Groq API key to this file exactly like this:
     ```env
     GROQ_API_KEY=your_actual_api_key_here
     ```
7. Start the backend server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *Leave this terminal running. The backend should now be accessible at `http://localhost:8000`.*

---

## Step 3: Set Up the Frontend

The frontend is built with React and Vite. It runs in a separate terminal.

1. Open a **new, separate terminal window** (leave the backend one running).
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install the Node.js dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Step 4: Use the Application

1. Open your web browser.
2. Go to the URL provided by Vite, usually: [http://localhost:5173](http://localhost:5173)
3. You should see the AI Resume Optimizer interface. Upload a resume, paste a job description, and hit the analyze button!

> [!IMPORTANT]
> Since this relies on the Groq API, ensure your laptop is connected to the internet. If you encounter any "Server Error" upon uploading, double-check that the backend server is running and the `GROQ_API_KEY` in the `.env` file is valid and correctly named.
