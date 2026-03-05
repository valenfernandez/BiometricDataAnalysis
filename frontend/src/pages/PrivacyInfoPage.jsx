export default function PrivacyInfoPage() {
  return (
    <div className="page-container">

      <div className="page-header">
        <h2>Privacy & Information</h2>
        <p className="page-subtitle">
          This tool demonstrates biometric analysis techniques for educational
          and research purposes.
        </p>
      </div>

      <div className="card">
        <h3>How This Tool Works</h3>

        <p>
          The Biometric Analysis System allows users to experiment with facial
          recognition techniques including:
        </p>

        <ul>
          <li>Face similarity comparison</li>
          <li>Facial landmark detection</li>
          <li>Unsupervised clustering of facial embeddings</li>
        </ul>

        <p>
          Uploaded images are processed using computer vision models to extract
          facial features (embeddings). These embeddings can then be compared or
          grouped to identify similar faces.
        </p>
      </div>

      <div className="card">
        <h3>Privacy Notice</h3>

        <p>
          This application is designed as a demonstration tool and does not
          store uploaded images permanently.
        </p>

        <ul>
          <li>Images are processed temporarily for analysis.</li>
          <li>No biometric data is stored in a database.</li>
          <li>No images are shared with third parties.</li>
        </ul>

        <p>
          For best privacy practices, avoid uploading sensitive or personal
          photographs.
        </p>
      </div>

      <div className="card">
        <h3>Ethical Use</h3>

        <p>
          Facial recognition technologies should be used responsibly. This
          system is intended only for experimentation and learning.
        </p>

        <p>
          The project highlights how biometric systems work but does not claim
          to provide production-grade identification or verification.
        </p>
      </div>

      <div className="card">
        <h3>About the Project</h3>

        <p>
          This project was developed as part of a biometric data analysis
          exploration combining:
        </p>

        <ul>
          <li>Computer Vision</li>
          <li>Machine Learning</li>
          <li>Interactive Data Visualization</li>
          <li>Web Application Development</li>
        </ul>

        <p>
          Technologies include Python, FastAPI, React, and facial embedding
          models.
        </p>
      </div>

    </div>
  );
}