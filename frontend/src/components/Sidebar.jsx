export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">🌀</div>
        <div>
          <strong>Biometric</strong><br />
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Analysis System
          </span>
        </div>
      </div>

      <button className="nav-item active">👤 Face Verification</button>
      <button className="nav-item">🔗 Clustering</button>
      <button className="nav-item">🤖 AI Detection</button>
      <button className="nav-item">🛡 Privacy & Info</button>
    </aside>
  );
}