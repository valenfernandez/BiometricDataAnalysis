from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.services.clustering_service import cluster_faces

router = APIRouter()


@router.post("/")
async def cluster(
    images: List[UploadFile] = File(...)
):
    try:
        result = await cluster_faces(images)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))