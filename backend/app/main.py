from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import compare, detect, landmarks, clustering


app = FastAPI(
    title="Biometric Data API",
    description="Face comparison",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(compare.router, prefix="/compare", tags=["Compare"])
app.include_router(detect.router, prefix="/detect", tags=["Detect"])
app.include_router(landmarks.router, prefix="/landmarks", tags=["Landmarks"])
app.include_router(clustering.router, prefix="/cluster", tags=["Clustering"])

@app.get("/")
def root():
    return {"message": "Biometric API is running"}