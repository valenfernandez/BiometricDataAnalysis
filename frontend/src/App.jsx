import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import VerificationPage from "./pages/VerificationPage";
import FacialLandmarkPage from "./pages/FacialLandmarkPage";
import ClusteringPage from "./pages/ClusteringPage";
import PrivacyInfoPage from "./pages/PrivacyInfoPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<VerificationPage />} />
            <Route path="/landmarks" element={<FacialLandmarkPage />} />
            <Route path="/clustering" element={<ClusteringPage />} />
            <Route path="/privacy" element={<PrivacyInfoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;