import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function LandmarkPage() {
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [landmarks, setLandmarks] = useState([]);
  const [measurements, setMeasurements] = useState(null);
  
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

  const landmarkRegions = {
    jaw: { start: 0, end: 16, color: "#4f46e5" },   
    rightBrow: { start: 17, end: 21, color: "#d97706" },
    leftBrow: { start: 22, end: 26, color: "#d97706" },
    nose: { start: 27, end: 35, color: "#7c3aed" },
    rightEye: { start: 36, end: 41, color: "#059669" },
    leftEye: { start: 42, end: 47, color: "#059669" },
    mouth: { start: 48, end: 67, color: "#dc2626" }
  };

  const distance = (p1, p2) => {
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) +
      Math.pow(p1.y - p2.y, 2)
    );
  };

  const getCenter = (points) => {
    const sum = points.reduce(
      (acc, p) => ({
        x: acc.x + p.x,
        y: acc.y + p.y
      }),
      { x: 0, y: 0 }
    );

    return {
      x: sum.x / points.length,
      y: sum.y / points.length
    };
  };

  useEffect(() => {
    if (!landmarks.length || !imageRef.current) return;

    const leftEye = getCenter(landmarks.slice(42, 48));
    const rightEye = getCenter(landmarks.slice(36, 42));
    const mouthWidth = distance(landmarks[48], landmarks[54]);
    const faceWidth = distance(landmarks[0], landmarks[16]);
    const faceHeight = distance(landmarks[8], landmarks[27]);
    const eyeDistance = distance(leftEye, rightEye);

    setMeasurements({
      eyeDistance: eyeDistance.toFixed(2),
      mouthWidth: mouthWidth.toFixed(2),
      faceWidth: faceWidth.toFixed(2),
      faceHeight: faceHeight.toFixed(2)
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = imageRef.current;

    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scaleX = canvas.width / img.naturalWidth;
    const scaleY = canvas.height / img.naturalHeight;

    Object.values(landmarkRegions).forEach((region) => {
    ctx.fillStyle = region.color;

    for (let i = region.start; i <= region.end; i++) {
      const point = landmarks[i];

      ctx.beginPath();
      ctx.arc(
        point.x * scaleX,
        point.y * scaleY,
        2.5,
        0,
        2 * Math.PI
      );
      ctx.fill();

      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  });


  }, [landmarks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [preview]);

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
              
              {measurements && (
                <div className="measurements">
                  <h3>Facial Measurements</h3>
                  <p>Eye Distance: {measurements.eyeDistance}px</p>
                  <p>Mouth Width: {measurements.mouthWidth}px</p>
                  <p>Face Width: {measurements.faceWidth}px</p>
                  <p>Face Height: {measurements.faceHeight}px</p>
                </div>
              )}

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