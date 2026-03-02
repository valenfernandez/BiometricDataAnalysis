import numpy as np
import cv2
from fastapi import UploadFile
from sklearn.cluster import AgglomerativeClustering
from sklearn.decomposition import PCA
from app.services.compare_service import decode_image, extract_embedding
from app.core.model_loader import get_models

async def cluster_faces(images: list[UploadFile], threshold: float = 0.6):

    if len(images) > 10:
        raise ValueError("Maximum 10 images allowed")

    embeddings = []
    image_names = []
    face_detector, shape_predictor, face_rec_model = get_models()

    for image in images:
        img_bytes = await image.read()
        img = decode_image(img_bytes)
        if img is None:
            raise ValueError(f"Invalid image: {image.filename}")
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_detector(gray)

        for idx, face in enumerate(faces):
            shape = shape_predictor(gray, face)
            embedding = face_rec_model.compute_face_descriptor(img, shape)
            embeddings.append(np.array(embedding))
            image_names.append(f"{image.filename}_face_{idx}")

    embeddings = np.array(embeddings)

    clustering = AgglomerativeClustering(
        n_clusters=None,
        metric="euclidean",
        linkage="average",
        distance_threshold=threshold
    )

    labels = clustering.fit_predict(embeddings)

    pca = PCA(n_components=2)
    reduced = pca.fit_transform(embeddings)

    images_output = []

    for i in range(len(image_names)):
        images_output.append({
            "filename": image_names[i],
            "cluster_id": int(labels[i]),
            "x": float(reduced[i][0]),
            "y": float(reduced[i][1])
        })

    return {
        "total_images": len(images),
        "total_clusters": len(set(labels)),
        "images": images_output
    }