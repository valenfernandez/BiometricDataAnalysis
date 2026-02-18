from fastapi import FastAPI
from app.api import compare


app = FastAPI(
    title="Biometric Data API",
    description="Face comparison",
    version="1.0.0"
)


app.include_router(compare.router, prefix="/compare", tags=["Compare"])



@app.get("/")
def root():
    return {"message": "Biometric API is running"}