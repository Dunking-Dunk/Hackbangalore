from fastapi import FastAPI, File, UploadFile
from pdf2image import convert_from_bytes
import easyocr
import io
import tempfile

app = FastAPI()

@app.post("/uploadfile/")
async def create_upload_file(name: str, accno: int, file: UploadFile = File(...)):
    # Initialize EasyOCR reader
    reader = easyocr.Reader(['en'])

    name = name
    accno = str(accno)

    if not name.isupper():
        return {"message": "Name should be all caps."}

    if len(accno) != 15:
        return {"message": "The account number must contain 15 digits."}

    # Read the uploaded PDF file as bytes
    pdf_content = await file.read()

    # Convert PDF to images
    images = convert_from_bytes(pdf_content)

    # Initialize text variable to store extracted text
    extracted_text = ""

    # Process each image and extract text
    for image in images:
        # Save the image to a temporary file
        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp_file:
            image.save(tmp_file.name)

            # Use EasyOCR to extract text from the temporary image file
            result = reader.readtext(tmp_file.name)
            
            # Concatenate extracted text from each image
            for detection in result:
                extracted_text += detection[1] + "\n"

    # Check if "Kishore" is present in the extracted text
    print(extracted_text)
    if name in extracted_text and accno in extracted_text:
        return {"message": "File Successfully Uploaded"}
    else:
        return {"message": "Verification failed!...Check your document."}
