import React from "react";
import "./Network.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function Network() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { network, hardware } = aiPlan;

  return (
    <div className="network-page">
      <div className="network-card" style={{ maxWidth: 900 }}>
        <h1>🌐 Star Network Topology Planning</h1>
        <p className="subtitle">Shortest-path cable routing & switch port calculations for {projectData.name}</p>

        <div className="network-grid">
          <div className="network-box">
            <h3>🌐 Network Topology</h3>
            <p><strong>{network.topology}</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Centralized Server Rack</span>
          </div>

          <div className="network-box">
            <h3>🖥 Server Rack Specs</h3>
            <p><strong>{hardware.serverSpec}</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>42U Cabinet + PDU</span>
          </div>

          <div className="network-box">
            <h3>🔀 Managed Switches</h3>
            <p><strong>{network.switchesNeeded24Port}x 24-Port Gigabit Switches</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>{hardware.switchSpec}</span>
          </div>

          <div className="network-box">
            <h3>🔌 CAT6 Ethernet Cable</h3>
            <p><strong>{network.totalCableMeters} Meters Total</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Wall & Floor Trunking</span>
          </div>

          <div className="network-box">
            <h3>🛡 Router & Gateway</h3>
            <p><strong>{hardware.routerSpec}</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Hardware Firewall</span>
          </div>

          <div className="network-box">
            <h3>🌍 Uplink Capacity</h3>
            <p><strong>1 Gbps Fiber Dedicated</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Structured Patch Panels</span>
          </div>
        </div>

        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 14, padding: 18, marginTop: 20 }}>
          <h4 style={{ margin: "0 0 6px", color: "#1e40af" }}>ℹ️ Cable Routing Logic (Star Topology)</h4>
          <p style={{ margin: 0, fontSize: 13, color: "#1e3a8a", lineHeight: 1.5 }}>
            All Ethernet cables originate from the central Server Rack switch patch panels and follow organized perimeter trunking channels. Shortest Manhattan path routing reduces total installation cost and keeps walking paths clear.
          </p>
        </div>

        <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
          <button className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/budget")}>
            ← Back to Budget
          </button>
          <button className="next-btn" style={{ flex: 1 }} onClick={() => navigate("/electrical")}>
            Continue to Electrical Plan →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Network;