import { useState } from "react";
import ImageCard from "../components/ImageCard";
import SimilarityCard from "../components/SimilarityCard";
import { compareFaces } from "../services/api";

export default function VerificationPage() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async () => {
    if (!image1 || !image2) {
      alert("Please upload both images.");
      return;
    }

    setLoading(true);
    try {
      const data = await compareFaces(image1, image2);
      console.log("Backend response:", data);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error comparing faces.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h1>Face Verification</h1>

      <div className="image-section">
        <ImageCard onFileSelect={setImage1} />
        <ImageCard onFileSelect={setImage2} />
      </div>

      <button
        onClick={handleCompare}
        disabled={loading}
        class  = "compare-btn"
      >
        {loading ? "Comparing..." : "Compare Faces"}
      </button>

      {result && (
        <SimilarityCard
          similarity={1 - result.distance}
          threshold={0.4}
        />
      )}
    </div>
  );
}