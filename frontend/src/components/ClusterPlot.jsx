import Plot from "react-plotly.js";

export default function ClusterPlot({ faces }) {
  if (!faces || !faces.length) return null;

  const clusters = {};

  faces.forEach((face) => {
    if (!clusters[face.cluster_id]) {
      clusters[face.cluster_id] = [];
    }
    clusters[face.cluster_id].push(face);
  });

  // Convert grouped data into Plotly traces
  const plotData = Object.entries(clusters).map(([clusterId, clusterFaces]) => ({
    x: clusterFaces.map((f) => f.x),
    y: clusterFaces.map((f) => f.y),
    mode: "markers",
    type: "scatter",
    name: `Cluster ${clusterId}`,
    text: clusterFaces.map(
      (f) => `${f.image} (Face ${f.face_index})`
    ),
    hoverinfo: "text",
    marker: {
      size: 10,
    },
  }));

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Cluster Visualization</h3>

      <Plot
        data={plotData}
        layout={{
          width: 700,
          height: 500,
          title: "Face Embedding Clusters",
          xaxis: { title: "X" },
          yaxis: { title: "Y" },
        }}
      />
    </div>
  );
}