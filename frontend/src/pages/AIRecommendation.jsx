import { useNavigate } from "react-router-dom";
import "./AIRecommendation.css";

function AIRecommendation() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>AI Recommendation</h1>

      <div className="card">
        <h2>Recommended Lab Plan</h2>

        <p>✔ 60 Computers</p>
        <p>✔ Star Network Topology</p>
        <p>✔ 2 Switches</p>
        <p>✔ 1 Server Rack</p>
        <p>✔ 2 Air Conditioners</p>
        <p>✔ Smart Board</p>

        <button onClick={() => navigate("/budget")}>
          Continue →
        </button>
      </div>
    </div>
  );
}

export default AIRecommendation;