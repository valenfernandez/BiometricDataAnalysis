export default function SimilarityCard({ similarity, threshold })
{
  if (similarity === undefined || similarity === null) {
    return null;
  }
  
  const percentage = Math.round(similarity * 100);
  const isMatch = similarity > threshold;
  const distance = 1 - similarity;
  const margin = Math.abs(threshold - distance).toFixed(3);

  return (
    <div className="similarity-card">
      <h2>Similarity Result</h2>

      <div className="match-score">
        <span className="percentage">{percentage}%</span>
        <span>Match</span>
      </div>

      <p>
        Status:{" "}
        <strong>
          {isMatch ? "Likely Same Person" : "Different People"}
        </strong>
      </p>

      <div className="metrics">
        <div>Cosine Similarity: {similarity.toFixed(2)}</div>
        <div>Threshold: {threshold}</div>
        <div>Confidence Level: {isMatch ? "High" : "Low"}</div>
      </div>

      <div className="explanation">
        <p>
          The system uses a facial embedding distance metric.
          If the distance between two face embeddings is below{" "}
          <strong>{threshold}</strong>, the faces are considered a match.
        </p>

        <p>
          In this case, the measured distance is{" "}
          <strong>{distance.toFixed(3)}</strong>, which is{" "}
          {isMatch ? "below" : "above"} the threshold by{" "}
          <strong>{margin}</strong>.
        </p>
      </div>

    </div>
  );
}