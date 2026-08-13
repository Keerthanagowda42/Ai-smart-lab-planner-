import "./Budget.css";
import { useNavigate } from "react-router-dom";

function Budget() {
  const navigate = useNavigate();

  return (
    <div className="budget-page">

      <div className="budget-card">

        <h1>Budget Planning</h1>

        <div className="budget-grid">

          <div className="budget-box">
            <h3>🖥 Desktop Computers</h3>
            <p>60 Systems</p>
            <h2>₹24,00,000</h2>
          </div>

          <div className="budget-box">
            <h3>🌐 Networking Equipment</h3>
            <p>Router + Switches + Cables</p>
            <h2>₹2,00,000</h2>
          </div>

          <div className="budget-box">
            <h3>⚡ Electrical Installation</h3>
            <p>Power & Wiring</p>
            <h2>₹1,50,000</h2>
          </div>

          <div className="budget-box">
            <h3>🪑 Furniture</h3>
            <p>Tables & Chairs</p>
            <h2>₹4,00,000</h2>
          </div>

          <div className="budget-box">
            <h3>🔋 UPS System</h3>
            <p>Backup Power</p>
            <h2>₹1,25,000</h2>
          </div>

          <div className="budget-box">
            <h3>📽 Projector</h3>
            <p>Ceiling Mounted</p>
            <h2>₹75,000</h2>
          </div>

        </div>

        <div className="total-budget">
          <h2>Total Estimated Budget</h2>
          <h1>₹33,50,000</h1>
        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/network")}
        >
          Continue to Network →
        </button>

      </div>

    </div>
  );
}

export default Budget;