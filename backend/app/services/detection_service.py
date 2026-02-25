import numpy as np
import cv2
from fastapi import UploadFile
from app.core.model_loader import get_models


async def detect_faces(image: UploadFile):
    face_detector, _, _ = get_models()

    img_bytes = await image.read()

    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Invalid image")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_detector(gray)

    boxes = []

    for face in faces:
        boxes.append({
            "x": face.left(),
            "y": face.top(),
            "width": face.width(),
            "height": face.height()
        })

    return {
        "faces_detected": len(faces),
        "boxes": boxes
    }