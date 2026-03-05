/**
 * 
 * export default function Sidebar() {
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

      <button
        className={`nav-item ${activePage === "verification" ? "active" : ""}`}
        onClick={() => setActivePage("verification")}
      >
        👤 Face Verification
      </button>
      <button
        className={`nav-item ${activePage === "landmarks" ? "active" : ""}`}
        onClick={() => setActivePage("landmarks")}
      >
        🧠 Facial Landmark Visualization
      </button>
      <button className="nav-item">Clustering</button>
      <button className="nav-item">🛡 Privacy & Info</button>
    </aside>
  );
}

 */
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="logo">
        <div className="logo-icon"></div>
        <div>
          <strong>Biometric</strong><br />
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Analysis System
          </span>
        </div>
      </div>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
         Facial Comparison
      </NavLink>

      <NavLink
        to="/landmarks"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
       Facial Landmark Visualization
      </NavLink>

      <NavLink
        to="/clustering"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Clustering
      </NavLink>
      
      <NavLink
        to="/privacy"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        🛡 Privacy & Info
      </NavLink>

      </div>
      
    </aside>
  );
}
