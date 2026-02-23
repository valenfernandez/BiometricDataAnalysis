import { useState } from "react";

export default function ImageCard({ label, onFileSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div className="image-card">
      {preview ? (
        <img src={preview} alt="preview" />
      ) : (
        <div className="placeholder">No Image</div>
      )}

      <label className="upload-btn">
        {label}
        <input type="file" hidden onChange={handleFile} />
      </label>

      {preview && <span className="change-link">Change Image</span>}
    </div>
  );
}