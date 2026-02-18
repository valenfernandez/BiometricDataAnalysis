from fastapi import APIRouter, UploadFile, File
from app.services.compare_service import compare_faces

router = APIRouter()


# POST /compare/
@router.post("/")
async def compare(
    image1: UploadFile = File(...),
    image2: UploadFile = File(...)
):
    similarity = await compare_faces(image1, image2)

    return {
        "similarity_score": similarity,
        "is_same_person": similarity > 0.75
    }