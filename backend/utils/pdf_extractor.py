import fitz  # This is PyMuPDF
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    try:
        # Open the PDF directly from the byte stream in memory (blazing fast)
        pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
        
        # Loop through all the pages and extract text
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            # PyMuPDF extracts text much cleaner than PyPDF2
            text += page.get_text() + "\n"
            
        # Free up the memory
        pdf_document.close()
        
    except Exception as e:
        return f"Error reading PDF: {e}"
        
    return text.strip()