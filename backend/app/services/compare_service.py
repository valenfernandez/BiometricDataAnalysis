import numpy as np
import cv2
from app.core.model_loader import get_models


def extract_embedding(image: np.ndarray) -> np.ndarray:
    detector, predictor, face_rec_model = get_models()

    img_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    detections = detector(img_rgb, 1)

    if len(detections) == 0:
        raise ValueError("No face detected.")

    if len(detections) > 1:
        raise ValueError("Multiple faces detected. Please upload an image with only one face.")

    shape = predictor(img_rgb, detections[0])
    face_descriptor = face_rec_model.compute_face_descriptor(img_rgb, shape)

    return np.array(face_descriptor)


def decode_image(image_bytes: bytes) -> np.ndarray:
    image = cv2.imdecode(
        np.frombuffer(image_bytes, np.uint8),
        cv2.IMREAD_COLOR
    )

    if image is None:
        raise ValueError("Invalid image file.")

    return image


async def compare_faces(image1, image2, threshold=0.6):
    img1_bytes = await image1.read()
    img2_bytes = await image2.read()

    img1 = decode_image(img1_bytes)
    img2 = decode_image(img2_bytes)

    desc1 = extract_embedding(img1)
    desc2 = extract_embedding(img2)

    dist = np.linalg.norm(desc1 - desc2)

    return {
        "distance": float(dist),
        "is_same_person": float(dist) < threshold
    }