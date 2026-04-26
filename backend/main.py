import asyncio
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_extractor import extract_text_from_pdf
from core.ai_engine import analyze_resume

app = FastAPI(title="AI Resume Optimizer API")

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello! The AI Resume Optimizer Backend is running successfully."}

@app.post("/upload-resume/")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    # 1. Validation
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported!")

    try:
        # Read file into memory (I/O operation - already awaited!)
        file_bytes = await file.read()
        
        # 2. OPTIMIZATION: Offload CPU-bound PDF extraction to a separate thread
        # This stops the PDF parsing math from freezing your server
        extracted_text = await asyncio.to_thread(extract_text_from_pdf, file_bytes)
        
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF. Is it empty or scanned?")

        # 3. OPTIMIZATION: Await the Network I/O bound AI call
        # Your AI engine must be updated to an async function for this to work
        analysis_result = await analyze_resume(extracted_text, job_description)
        
        # 4. Return the AI's analysis
        return {
            "filename": file.filename,
            "results": analysis_result
        }
        
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")