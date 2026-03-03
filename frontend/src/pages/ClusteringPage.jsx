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
    <div className="cluster-page">
      <h2>Face Clustering</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFiles}
      />

      {images.length > 0 && (
        <div className="selected-files">
          <h4>Selected Images:</h4>
          <ul>
            {images.map((img, index) => (
              <li key={index}>{img.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleCluster}
        disabled={loading || !images.length}
      >
        {loading ? "Processing..." : "Run Clustering"}
      </button>

      {images.length > 0 && (
        <button
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      )}

      {error && <p className="error">{error}</p>}

      {results && (
        <div className="cluster-results">
          <h3>Results</h3>
          <p>Total Faces: {results.total_faces}</p>
          <p>Total Clusters: {results.total_clusters}</p>

          {results.total_faces === 0 && (
            <p>No faces detected in uploaded images.</p>
          )}

          {results.faces.length > 0 && (
            <>
              <ClusterPlot faces={results.faces} />

              <div className="clusters">
                {Object.entries(grouped).map(
                  ([clusterId, faces]) => (
                    <div
                      key={clusterId}
                      className="cluster-card"
                    >
                      <h4>
                        {clusterId === "-1"
                          ? "Noise / Unclustered"
                          : `Cluster ${clusterId}`}
                      </h4>

                      <p>{faces.length} face(s)</p>

                      {faces.map((face, index) => (
                        <div key={index}>
                          {face.image} – Face #
                          {face.face_index}
                        </div>
                      ))}
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