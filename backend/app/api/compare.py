from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.compare_service import compare_faces

router = APIRouter()


# POST /compare/
@router.post("/")
async def compare(
    image1: UploadFile = File(...),
    image2: UploadFile = File(...)
):
    try:
        result = await compare_faces(image1, image2)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))