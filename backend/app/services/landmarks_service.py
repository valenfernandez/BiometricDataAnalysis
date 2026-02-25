import numpy as np
import cv2
from fastapi import UploadFile
from app.core.model_loader import get_models


async def extract_landmarks(image: UploadFile):
    face_detector, shape_predictor, _ = get_models()

    img_bytes = await image.read()

    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Invalid image")

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_detector(gray)

    if len(faces) == 0:
        raise ValueError("No face detected")

    if len(faces) > 1:
        raise ValueError("Multiple faces detected")

    face = faces[0]
    shape = shape_predictor(gray, face)

    landmarks = []

    for i in range(68):
        part = shape.part(i)
        landmarks.append({
            "x": part.x,
            "y": part.y
        })

    return {
        "faces_detected": len(faces),
        "landmarks_count": 68,
        "landmarks": landmarks
    }