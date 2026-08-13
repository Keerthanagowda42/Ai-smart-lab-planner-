import React from "react";
import "./Electrical.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function Electrical() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { electrical, hardware } = aiPlan;

  // Power breakdown data for the detailed table
  const powerBreakdown = [
    {
      item: `Workstation Systems (${electrical.pcPowerSockets / 2} PCs)`,
      wattage: `${(aiPlan.spatial.numComputers * (aiPlan.budget.bom[0]?.unitCost ? 450 : 300))} W`,
      icon: "🖥️",
    },
    {
      item: "Server Rack & Network Equipment",
      wattage: "1,200 W",
      icon: "🗄️",
    },
    {
      item: `Air Conditioning (${electrical.acUnitsCount}× 2-Ton)`,
      wattage: `${(electrical.acUnitsCount * 2200).toLocaleString("en-IN")} W`,
      icon: "❄️",
    },
    {
      item: `LED Panel Lighting (${electrical.lightsCount} Units)`,
      wattage: `${electrical.lightingWatts.toLocaleString("en-IN")} W`,
      icon: "💡",
    },
    {
      item: `Ceiling Fans (${electrical.fansCount} Units)`,
      wattage: `${(electrical.fansCount * 75).toLocaleString("en-IN")} W`,
      icon: "🌀",
    },
    {
      item: "Smart Display & Projector",
      wattage: "400 W",
      icon: "📽️",
    },
  ];

  return (
    <div className="electrical-page">
      <div className="electrical-card">

        <h1>⚡ Electrical Load & Distribution Planning</h1>
        <p className="subtitle">
          AI-calculated power infrastructure for <strong>{projectData.name}</strong> — {projectData.numComputers} workstations in {aiPlan.spatial.roomLength}ft × {aiPlan.spatial.roomWidth}ft room
        </p>

        {/* Primary Stats Grid */}
        <div className="electrical-grid">
          <div className="electrical-box">
            <h3>💡 LED Panel Lights</h3>
            <p><strong>{electrical.lightsCount}</strong> LED Panels</p>
            <span className="electrical-detail">{electrical.lightingWatts} W Total</span>
          </div>

          <div className="electrical-box">
            <h3>🔌 Power Outlets</h3>
            <p><strong>{electrical.totalPowerSockets}</strong> Power Sockets</p>
            <span className="electrical-detail">{electrical.pcPowerSockets} PC + {electrical.totalPowerSockets - electrical.pcPowerSockets} Aux</span>
          </div>

          <div className="electrical-box">
            <h3>⚡ Switch Boards</h3>
            <p><strong>{electrical.switchboardsCount}</strong> Distribution Boards</p>
            <span className="electrical-detail">MCB Protected</span>
          </div>

          <div className="electrical-box">
            <h3>🔋 UPS Backup</h3>
            <p><strong>{electrical.upsRatingKVA} kVA</strong> Online UPS</p>
            <span className="electrical-detail">{electrical.upsBackupTime} Backup</span>
          </div>

          <div className="electrical-box">
            <h3>❄️ Air Conditioners</h3>
            <p><strong>{electrical.acUnitsCount}</strong> × 2-Ton Inverter AC</p>
            <span className="electrical-detail">{(electrical.acUnitsCount * 2200).toLocaleString("en-IN")} W</span>
          </div>

          <div className="electrical-box">
            <h3>🌀 Ceiling Fans</h3>
            <p><strong>{electrical.fansCount}</strong> Ceiling Fans</p>
            <span className="electrical-detail">{(electrical.fansCount * 75)} W</span>
          </div>
        </div>

        {/* Power Breakdown Table */}
        <div className="power-breakdown">
          <h3 style={{ margin: "0 0 14px", fontSize: 16, color: "#1e293b", fontWeight: 700 }}>
            📊 Detailed Power Consumption Breakdown
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                <th style={{ padding: 12, fontSize: 13, color: "#475569" }}>Equipment</th>
                <th style={{ padding: 12, fontSize: 13, color: "#475569", textAlign: "right" }}>Power Draw</th>
              </tr>
            </thead>
            <tbody>
              {powerBreakdown.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: 12, fontSize: 14, color: "#0f172a", fontWeight: 500 }}>
                    {row.icon} {row.item}
                  </td>
                  <td style={{ padding: 12, fontSize: 14, color: "#173b8f", fontWeight: 700, textAlign: "right" }}>
                    {row.wattage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Power Card */}
        <div className="power-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>Total Estimated Electrical Load</p>
              <h1 style={{ margin: "5px 0 0", fontSize: 38, color: "#ffffff" }}>
                {electrical.totalKW} KW
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Total Wattage</p>
              <h3 style={{ margin: "3px 0 0", color: "#ffffff" }}>
                {electrical.totalWatts.toLocaleString("en-IN")} W
              </h3>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={{
          background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 14,
          padding: 18, marginTop: 20,
        }}>
          <h4 style={{ margin: "0 0 6px", color: "#92400e" }}>⚡ Electrical Safety Notes</h4>
          <p style={{ margin: 0, fontSize: 13, color: "#78350f", lineHeight: 1.55 }}>
            All circuits protected by MCB/RCCB distribution boards. UPS system rated at <strong>{electrical.upsRatingKVA} kVA</strong> covers
            all workstations and server infrastructure. Dedicated 3-phase power supply recommended for loads above 15 kW.
            {electrical.totalKW > 15 && <strong> ⚠️ Your load exceeds 15 kW — 3-phase supply is required.</strong>}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
          <button
            className="next-btn"
            style={{ background: "#64748b" }}
            onClick={() => navigate("/network")}
          >
            ← Back to Network
          </button>
          <button
            className="next-btn"
            style={{ flex: 1 }}
            onClick={() => navigate("/viewer3d")}
          >
            View 3D Smart Lab →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Electrical;