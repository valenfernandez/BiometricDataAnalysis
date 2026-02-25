import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function LandmarkPage() {
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [landmarks, setLandmarks] = useState([]);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
 
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setLandmarks([]);
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
        formData
      );
      setLandmarks(response.data.landmarks);
    } 
    catch (error) {
      console.error(error);
      alert("Error processing image.");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!landmarks.length || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imageRef.current;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / img.naturalWidth;
    const scaleY = canvas.height / img.naturalHeight;

    ctx.fillStyle = "red";

    landmarks.forEach((point) => {
      ctx.beginPath();
      ctx.arc(
        point.x * scaleX,
        point.y * scaleY,
        2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    });
  }, [landmarks]);

  return (
    <div className="main-content">
      <h1>Facial Landmark Visualization</h1>

      <div className="image-section">
        <div className="image-card">
          {preview ? (
            <div style={{ position: "relative" }}>
              <img
                ref={imageRef}
                src={preview}
                alt="uploaded"
                style={{ width: "100%", borderRadius: "10px" }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          ) : (
            <div className="placeholder">Upload an Image</div>
          )}

          <label className="upload-btn">
            Upload Image
            <input type="file" hidden onChange={handleFile} />
          </label>
        </div>

        
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="primary-btn"
        
      >
        {loading ? "Processing..." : "Detect Landmarks"}
      </button>
    </div>
  );
}