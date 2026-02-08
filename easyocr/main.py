from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware   # ✅ import this
import easyocr, cv2, numpy as np
import easyocr

app = FastAPI()


origins = ["http://localhost:5173"] 

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # exact URLs
    allow_credentials=True,      # needed if using cookies/auth
    allow_methods=["*"],         # allow all methods
    allow_headers=["*"],         # allow all headers
)


@app.get("/")
def root():
    return{'Hello'}

@app.post("/ocr")
async def ocr_endpoint( file: UploadFile = File(...), language: str = Form(...)):
    # print(language)
    contents = await file.read()
    npimg = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Invalid image"}
    if language == "kn":
        reader = easyocr.Reader(['kn', 'en'], gpu=False)
    elif language == "ar":
        reader = easyocr.Reader(['ar', 'en'], gpu=False)
    elif language == "hi":
        reader = easyocr.Reader(['hi', 'en'], gpu=False)
    elif language == "en":
        reader = easyocr.Reader(['en'], gpu=False)
    else:
        return {"error": f"Unsupported language: {language}"}
    text_list = reader.readtext(img, detail=0)
    text = " ".join(text_list)
    return {"result": text}
