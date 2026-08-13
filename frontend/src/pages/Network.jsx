import "./Network.css";
import { useNavigate } from "react-router-dom";

function Network() {
  const navigate = useNavigate();

  return (
    <div className="network-page">

      <div className="network-card">

        <h1>Network Planning</h1>

        <div className="network-grid">

          <div className="network-box">
            <h3>🌐 Topology</h3>
            <p>Star Topology</p>
          </div>

          <div className="network-box">
            <h3>🖥 Router</h3>
            <p>Cisco 2901 Router</p>
          </div>

          <div className="network-box">
            <h3>🔀 Switch</h3>
            <p>24-Port Managed Switch</p>
          </div>

          <div className="network-box">
            <h3>🔌 Cabling</h3>
            <p>CAT6 Ethernet Cable</p>
          </div>

          <div className="network-box">
            <h3>🗄 Server Rack</h3>
            <p>42U Rack Cabinet</p>
          </div>

          <div className="network-box">
            <h3>🌍 Internet</h3>
            <p>1 Gbps Fiber Connection</p>
          </div>

        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/electrical")}
        >
          Continue to Electrical →
        </button>

      </div>

    </div>
  );
}

export default Network;