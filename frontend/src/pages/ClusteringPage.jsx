import { clusterFaces } from "../services/api";
import { useState } from "react";
import Plot from "react-plotly.js";
import ClusterPlot from "../components/ClusterPlot";


export default function ClusteringPage() {
    const [images, setImages] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 10) {
            alert("Maximum 10 images allowed.");
            e.target.value = null;
            return;
        }

        setError(null);
        setImages(files);
        setResults(null);
    };

    const handleCluster = async () => {
        if (!images.length) {
            alert("Upload images first.");
            return;
        }

        setLoading(true);
        setError(null);
         try {
            const data = await clusterFaces(images);
            setResults(data);
        } catch (err) {
            console.error(err);
            alert("Clustering failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setImages([]);
        setResults(null);
        setError(null);
    };
            
    const grouped =
    results?.faces?.reduce((acc, face) => {
      const key = face.cluster_id;
      if (!acc[key]) acc[key] = [];
      acc[key].push(face);
      return acc;
    }, {}) || {};

return (
  <div className="page-container">
    <div className="page-header">
      <h2>Face Clustering</h2>
      <p className="page-subtitle">
        Upload up to 10 images to group detected faces into clusters.
      </p>
    </div>

    <div className="card">
      <div className="card-section">
        <label className="file-input-label">
          Select Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFiles}
          />
        </label>

        {images.length > 0 && (
          <span className="file-count">
            {images.length} file(s) selected
          </span>
        )}
      </div>

      {images.length > 0 && (
        <div className="selected-files">
          <h4>Selected Images</h4>
          <ul>
            {images.map((img, index) => (
              <li key={index}>{img.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="button-row">
        <button
          className="btn-primary"
          onClick={handleCluster}
          disabled={loading || !images.length}
        >
          {loading ? "Processing..." : "Run Clustering"}
        </button>

        <button
          className="btn-secondary"
          onClick={handleReset}
          disabled={!images.length}
        >
          Reset
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}
    </div>

    {results && (
      <div className="card results-card">
        <div className="results-summary">
          <div className="stat-box">
            <span>Total Faces</span>
            <strong>{results.total_faces}</strong>
          </div>

          <div className="stat-box">
            <span>Total Clusters</span>
            <strong>{results.total_clusters}</strong>
          </div>
        </div>

        {results.total_faces === 0 && (
          <p className="empty-message">
            No faces detected in uploaded images.
          </p>
        )}

        {results.faces.length > 0 && (
          <>
            <ClusterPlot faces={results.faces} />

            <div className="clusters">
              {Object.entries(grouped).map(
                ([clusterId, faces]) => (
                  <div
                    key={clusterId}
                    className="cluster-group-card"
                  >
                    <h4>
                      {clusterId === "-1"
                        ? "Noise / Unclustered"
                        : `Cluster ${clusterId}`}
                    </h4>

                    <p>{faces.length} face(s)</p>

                    <div className="cluster-faces">
                      {faces.map((face, index) => (
                        <div key={index} className="face-item">
                          {face.image} – Face #{face.face_index}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    )}
  </div>
);




}