import "./Electrical.css";
import { useNavigate } from "react-router-dom";

function Electrical() {
  const navigate = useNavigate();

  return (
    <div className="electrical-page">

      <div className="electrical-card">

        <h1>Electrical Planning</h1>

        <div className="electrical-grid">

          <div className="electrical-box">
            <h3>💡 LED Lights</h3>
            <p>12 LED Panel Lights</p>
          </div>

          <div className="electrical-box">
            <h3>🔌 Power Sockets</h3>
            <p>65 Power Outlets</p>
          </div>

          <div className="electrical-box">
            <h3>⚡ Switch Boards</h3>
            <p>8 Smart Switch Boards</p>
          </div>

          <div className="electrical-box">
            <h3>🔋 UPS Backup</h3>
            <p>30 Minutes Backup</p>
          </div>

          <div className="electrical-box">
            <h3>❄ Air Conditioners</h3>
            <p>2 × 2 Ton AC Units</p>
          </div>

          <div className="electrical-box">
            <h3>⚙ Circuit Breakers</h3>
            <p>6 MCB Protection Units</p>
          </div>

        </div>

        <div className="power-card">
          <h2>Total Estimated Load</h2>
          <h1>18.5 KW</h1>
        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/viewer3d")}
        >
          View 3D Smart Lab →
        </button>

      </div>

    </div>
  );
}

export default Electrical;