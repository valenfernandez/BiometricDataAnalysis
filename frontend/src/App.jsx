import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import VerificationPage from "./pages/VerificationPage";
import FacialLandmarkPage from "./pages/FacialLandmarkPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<VerificationPage />} />
            <Route path="/landmarks" element={<FacialLandmarkPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;