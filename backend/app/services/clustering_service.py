import numpy as np
import cv2
from fastapi import UploadFile
from sklearn.cluster import AgglomerativeClustering
from sklearn.decomposition import PCA
from app.services.compare_service import decode_image, extract_embedding
from app.core.model_loader import get_models
from sklearn.metrics.pairwise import cosine_distances

async def cluster_faces(images: list[UploadFile], threshold: float = 0.12):

    if len(images) > 10:
        raise ValueError("Maximum 10 images allowed")

    embeddings = []
    image_names = []
    face_metadata = []
    face_detector, shape_predictor, face_rec_model = get_models()

    for image in images:
        img_bytes = await image.read()
        img = decode_image(img_bytes)
        if img is None:
            raise ValueError(f"Invalid image: {image.filename}")
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        faces = face_detector(gray)

        for idx, face in enumerate(faces):
            shape = shape_predictor(gray, face)
            embedding = face_rec_model.compute_face_descriptor(rgb, shape)
            # embedding = face_rec_model.compute_face_descriptor(img, shape)
            embeddings.append(np.array(embedding))
            image_names.append(f"{image.filename}_face_{idx}")  
            face_metadata.append({
                "image": image.filename,
                "face_index": idx
            })
            
    if len(embeddings) == 0:
        raise ValueError("No faces detected in provided images")

    embeddings = np.array(embeddings)
    embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True) 

    if len(embeddings) == 1:
        reduced = np.array([[0.0, 0.0]])
        labels = np.array([0])
    else:
        clustering = AgglomerativeClustering(
            n_clusters=None,
            metric="cosine",
            linkage="average",
            distance_threshold=threshold
        )
        labels = clustering.fit_predict(embeddings)

        pca = PCA(n_components=2)
        reduced = pca.fit_transform(embeddings)

    faces_output = []

    for meta, label, coords in zip(face_metadata, labels, reduced):
        faces_output.append({
            "image": meta["image"],
            "face_index": meta["face_index"],
            "cluster_id": int(label),
            "x": float(coords[0]),
            "y": float(coords[1])
        })
    


    dist_matrix = cosine_distances(embeddings)

    print("Cosine distance matrix:")
    print(np.round(dist_matrix, 3))


    return {
        "total_images": len(images),
        "total_faces": len(embeddings),
        "total_clusters": len(set(labels)),
        "faces": faces_output
}