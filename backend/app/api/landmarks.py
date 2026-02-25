from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.landmarks_service import extract_landmarks

router = APIRouter()


@router.post("/")
async def landmarks(image: UploadFile = File(...)):
    try:
        result = await extract_landmarks(image)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))