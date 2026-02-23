from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import compare


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



@app.get("/")
def root():
    return {"message": "Biometric API is running"}