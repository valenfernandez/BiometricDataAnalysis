from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.detection_service import detect_faces

router = APIRouter(prefix="/detect", tags=["Face Detection"])


@router.post("/")
async def detect(image: UploadFile = File(...)):
    try:
        result = await detect_faces(image)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))