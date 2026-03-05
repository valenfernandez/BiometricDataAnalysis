# BiometricDataAnalysis

A biometric analysis platform that demonstrates face verification, identity clustering, and AI-generated image detection using machine learning techniques.

This project was built to illustrate real-world biometric data handling concepts, including face embeddings, similarity thresholds, clustering, and ethical considerations.

---

## Features

### Facial Comparison
Upload two images and compute the similarity between faces using deep learning embeddings.

The system returns a similarity score indicating the likelihood that both images belong to the same person

![alt text](<assets/screenshots/Screenshot 2026-03-05 142010.png>)

### Facial Landmark Visualization
Detects and visualizes facial landmarks such as:

eyes

nose

mouth

jawline

This helps illustrate how facial geometry is extracted before biometric analysis.

![alt text](<assets/screenshots/Screenshot 2026-03-05 142101.png>)

### Face Clustering

Upload multiple images and automatically group them based on facial similarity.

The system uses unsupervised clustering on face embeddings to identify which images likely belong to the same person.

![alt text](<assets/screenshots/Screenshot 2026-03-05 142144.png>)


## System Architecture

The application follows a full-stack architecture with a Python backend for biometric processing and a JavaScript frontend.

`
Frontend (React + Vite)
        │
        │ REST API
        ▼
Backend (FastAPI)
        │
        ▼
Face Embedding Model
        │
        ▼
Similarity / Clustering Algorithms
`

## Tech Stack
### Backend

* Python
* FastAPI
* NumPy
* Scikit-learn
* Deep learning face embedding model

### Frontend

* React
* Vite
* Axios
* CSS Grid

### Computer Vision

* Face embeddings
* Cosine similarity
* Facial landmark detection
* Unsupervised clustering
---
## Installation


back:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

front:

cd frontend
npm install
npm run dev


