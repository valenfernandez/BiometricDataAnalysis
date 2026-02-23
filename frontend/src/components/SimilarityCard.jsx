export default function SimilarityCard({ similarity, threshold })
{
  if (similarity === undefined || similarity === null) {
    return null;
  }
  
  const percentage = Math.round(similarity * 100);
  const isMatch = similarity > threshold;

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
    </div>
  );
}