import "./AIRecommendation.css";
import { useNavigate } from "react-router-dom";

function AIRecommendation() {
  const navigate = useNavigate();

  return (
    <div className="ai-page">

      <div className="ai-card">

        <h1>AI Recommendation</h1>

        <div className="recommendation-grid">

          <div className="recommend-box">
            <h3>🖥 Computers</h3>
            <p>Recommended: 60 Systems</p>
          </div>

          <div className="recommend-box">
            <h3>🪑 Seating Layout</h3>
            <p>U-Shaped Arrangement</p>
          </div>

          <div className="recommend-box">
            <h3>🌐 Network</h3>
            <p>Star Topology</p>
          </div>

          <div className="recommend-box">
            <h3>⚡ Electrical</h3>
            <p>12 Power Circuits</p>
          </div>

          <div className="recommend-box">
            <h3>🖥 Server</h3>
            <p>1 Rack Server</p>
          </div>

          <div className="recommend-box">
            <h3>📽 Projector</h3>
            <p>Ceiling Mounted</p>
          </div>

        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/budget")}
        >
          Continue to Budget →
        </button>

      </div>

    </div>
  );
}

export default AIRecommendation;