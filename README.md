# BiometricDataAnalysis

> A full-stack biometric analysis platform demonstrating face
> verification, facial landmark detection, and unsupervised identity
> clustering — built as a technical companion to published research
> on biometric data governance and AI-generated image ethics.

## Background

This platform was built independently to demonstrate the biometric processing concepts explored in published research. 
The underlying analysis — face embeddings, similarity thresholds, and clustering — informed the paper "¿Dónde están los datos biométricos?" presented at CIIDDI 2025. 
The UI was designed afterward to make those concepts interactive and accessible.

> **Co-authors:** María Belén Álvarez Cestona · Valentina Fernández
> · Antonela D'Onofrio — Info-Lab, Universidad Nacional de Mar del
> Plata (2025)

---

## Features

### Face Verification
Upload two images and compute facial similarity using deep learning
embeddings and cosine distance. The system returns a similarity score,
match status, and confidence level based on a configurable threshold.

![alt text](<assets/screenshots/Screenshot 2026-03-05 142010.png>)

### Facial Landmark Visualization
Detects and overlays facial landmarks (eyes, nose, mouth, jawline)
on an uploaded image. Outputs geometric measurements: eye distance,
mouth width, face width, and face height — illustrating how facial
geometry is extracted prior to biometric processing.

![alt text](<assets/screenshots/Screenshot 2026-03-05 142101.png>)

### Face Clustering
Upload up to 10 images and automatically group faces by identity
using unsupervised clustering on face embeddings. Results are
visualized as a 2D scatter plot with cluster assignments shown
below.

![alt text](<assets/screenshots/Screenshot 2026-03-05 142144.png>)

---

## Architecture

```
Frontend (React + Vite)
        │
        │  REST API (Axios)
        ▼
Backend (FastAPI + Python)
        │
        ▼
Face Embedding Model
        │
        ▼
Similarity / Clustering Algorithms
```

---

## Tech stack

| Layer | Technologies |
|---|---|
| Backend | Python · FastAPI · NumPy · scikit-learn |
| Frontend | React · Vite · Axios · CSS Grid |
| Computer vision | Face embeddings · Cosine similarity · Facial landmark detection · Unsupervised clustering (DBSCAN/K-means) |

---

## Installation

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## Ethical note

This project handles facial data. All images used in development and
screenshots are either stock photos or public figures used for
illustrative purposes only. No biometric data is stored or persisted
by this application.

The system is intended as an educational and research tool to
demonstrate how biometric processing works — not as a production
identity verification system.

---


