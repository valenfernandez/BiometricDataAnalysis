import { useState } from "react";
import axios from "axios";

export default function LandmarkPage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setProcessedImage(null);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/landmarks/",
        formData,
        { responseType: "blob" }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setProcessedImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h1>Facial Landmark Visualization</h1>

      <div className="image-section">
        <div className="image-card">
          {preview ? (
            <img src={preview} alt="original" />
          ) : (
            <div className="placeholder">Upload an Image</div>
          )}

          <label className="upload-btn">
            Upload Image
            <input type="file" hidden onChange={handleFile} />
          </label>
        </div>

        <div className="image-card">
          {processedImage ? (
            <img src={processedImage} alt="landmarks" />
          ) : (
            <div className="placeholder">
              Landmark Visualization
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: "12px 20px",
          borderRadius: "8px",
          background: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Processing..." : "Detect Landmarks"}
      </button>
    </div>
  );
}