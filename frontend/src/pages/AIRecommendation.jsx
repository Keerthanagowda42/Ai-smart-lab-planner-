import React from "react";
import "./AIRecommendation.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function AIRecommendation() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();

  const { spatial, hardware, network, electrical, budget, capacityWarning } = aiPlan;

  return (
    <div className="ai-page">
      <div className="ai-card" style={{ maxWidth: 1000 }}>
        <h1>🤖 AI Automated Planning Recommendation</h1>
        <p className="subtitle">
          AI constraint solver analyzed room {spatial.roomLength}ft × {spatial.roomWidth}ft and generated an optimized lab plan for {projectData.name}.
        </p>

        {capacityWarning && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#991b1b", padding: 15, borderRadius: 12, marginBottom: 20 }}>
            ⚠️ <strong>Room Constraint Notice:</strong> {capacityWarning}
          </div>
        )}

        <div className="recommendation-grid">
          <div className="recommend-box">
            <h3>🖥 Workstations</h3>
            <p><strong>{spatial.numComputers} Systems</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>Max room cap: {aiPlan.maxCapacity} PCs</span>
          </div>

          <div className="recommend-box">
            <h3>🪑 Layout Engine</h3>
            <p><strong>{spatial.seatingPreference.toUpperCase()} Layout</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>{spatial.aisleWidth}ft Central Aisle</span>
          </div>

          <div className="recommend-box">
            <h3>🌐 Network Specs</h3>
            <p><strong>{network.topology}</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>{network.switchesNeeded24Port}x Switches · {network.totalCableMeters}m CAT6</span>
          </div>

          <div className="recommend-box">
            <h3>⚡ Electrical Load</h3>
            <p><strong>{electrical.totalKW} KW Total</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>{electrical.upsRatingKVA} kVA UPS ({electrical.upsBackupTime})</span>
          </div>

          <div className="recommend-box">
            <h3>🖥 Hardware Tier</h3>
            <p><strong>{hardware.tier}</strong></p>
            <span style={{ fontSize: 12, color: "#64748b" }}>{hardware.cpu} · {hardware.ram}</span>
          </div>

          <div className="recommend-box">
            <h3>💰 Estimated Budget</h3>
            <p><strong>₹{budget.totalCalculatedCost.toLocaleString("en-IN")}</strong></p>
            <span style={{ fontSize: 12, color: budget.isWithinBudget ? "#16a34a" : "#dc2626" }}>
              {budget.isWithinBudget ? "Within Target Budget ✅" : "Exceeds Target Budget ⚠️"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 15, marginTop: 30 }}>
          <button className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/requirements")}>
            ← Adjust Requirements
          </button>
          <button className="next-btn" style={{ flex: 1 }} onClick={() => navigate("/budget")}>
            Continue to Budget Breakdown →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIRecommendation;