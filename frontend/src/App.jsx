import Sidebar from "./components/Sidebar";
import VerificationPage from "./pages/VerificationPage";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <VerificationPage />
    </div>
  );
}

export default App;