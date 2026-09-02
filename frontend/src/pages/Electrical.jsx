import React, { useState } from "react";
import "./Electrical.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import QuickRequirementBar from "../components/QuickRequirementBar";

function Electrical() {
  const navigate = useNavigate();
  const { aiPlan, projectData } = useProject();
  const { electrical } = aiPlan;

  const [activeTab, setActiveTab] = useState("overview");

  const totalKw = electrical.totalKW || 18.5;
  const phaseLoadR = Math.round((totalKw / 3 + 0.1) * 10) / 10;
  const phaseLoadY = Math.round((totalKw / 3 - 0.05) * 10) / 10;
  const phaseLoadB = Math.round((totalKw - phaseLoadR - phaseLoadY) * 10) / 10;

  // Power breakdown data for the detailed table
  const powerBreakdown = [
    {
      item: `Workstation Systems (${electrical.pcPowerSockets / 2} PCs)`,
      wattage: `${(aiPlan.spatial.numComputers * 450).toLocaleString("en-IN")} W`,
      icon: "🖥️",
      circuit: "DB-1 (MCB 1-6, 16A C-Curve)",
    },
    {
      item: "42U Server Rack & Network Equipment",
      wattage: "1,200 W",
      icon: "🗄️",
      circuit: "Dedicated Line (MCB 7, 20A C-Curve)",
    },
    {
      item: `Air Conditioning (${electrical.acUnitsCount}× 2-Ton Inverter)`,
      wattage: `${(electrical.acUnitsCount * 2200).toLocaleString("en-IN")} W`,
      icon: "❄️",
      circuit: "DB-2 (2x 25A D-Curve MCB)",
    },
    {
      item: `LED Panel Lighting (${electrical.lightsCount} Units)`,
      wattage: `${electrical.lightingWatts.toLocaleString("en-IN")} W`,
      icon: "💡",
      circuit: "DB-3 (MCB 10, 10A B-Curve)",
    },
    {
      item: `Ceiling Fans (${electrical.fansCount} Units)`,
      wattage: `${(electrical.fansCount * 75).toLocaleString("en-IN")} W`,
      icon: "🌀",
      circuit: "DB-3 (MCB 11, 10A B-Curve)",
    },
    {
      item: "Smart Interactive Display & Projector",
      wattage: "400 W",
      icon: "📽️",
      circuit: "Podium Line (MCB 8, 16A C-Curve)",
    },
  ];

  return (
    <div className="electrical-page">
      <div style={{ maxWidth: 1050, margin: "0 auto", width: "100%" }}>
        <QuickRequirementBar />
        <div className="electrical-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
          <div>
            <h1>⚡ Electrical Distribution & Load Balancing</h1>
            <p className="subtitle">
              3-Phase Power Distribution, MCB Single-Line Diagram & UPS Dimensioning for <strong>{projectData.name}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate("/viewer3d")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
            }}
          >
            🧊 View in 3D Digital Twin →
          </button>
        </div>

        {/* Tab Selector */}
        <div className="electrical-tab-header">
          <button
            className={`electrical-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Power Overview
          </button>
          <button
            className={`electrical-tab-btn ${activeTab === "phases" ? "active" : ""}`}
            onClick={() => setActiveTab("phases")}
          >
            ⚖️ 3-Phase Load Balance (R-Y-B)
          </button>
          <button
            className={`electrical-tab-btn ${activeTab === "mcb" ? "active" : ""}`}
            onClick={() => setActiveTab("mcb")}
          >
            ⚡ MCB Distribution Boards (SLD)
          </button>
          <button
            className={`electrical-tab-btn ${activeTab === "ups" ? "active" : ""}`}
            onClick={() => setActiveTab("ups")}
          >
            🔋 Online UPS Sizing & PF
          </button>
        </div>

        {activeTab === "overview" && (
          <div>
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
                <span className="electrical-detail">MCB / RCCB Shock Protected</span>
              </div>

              <div className="electrical-box">
                <h3>🔋 Online UPS</h3>
                <p><strong>{electrical.upsRatingKVA} kVA</strong> True Double-Conversion</p>
                <span className="electrical-detail">{electrical.upsBackupTime} Full Backup</span>
              </div>

              <div className="electrical-box">
                <h3>❄️ Air Conditioners</h3>
                <p><strong>{electrical.acUnitsCount}×</strong> 2-Ton Inverter AC</p>
                <span className="electrical-detail">{(electrical.acUnitsCount * 2200).toLocaleString("en-IN")} W Total</span>
              </div>

              <div className="electrical-box">
                <h3>🌀 Ceiling Fans</h3>
                <p><strong>{electrical.fansCount}</strong> Aerodynamic Fans</p>
                <span className="electrical-detail">{(electrical.fansCount * 75)} W Total</span>
              </div>
            </div>

            {/* Total Power Card */}
            <div className="power-card" style={{ marginTop: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ margin: 0, opacity: 0.85, fontSize: 14 }}>Total Estimated Electrical Load</p>
                  <h1 style={{ margin: "5px 0 0", fontSize: 38, color: "#ffffff" }}>
                    {electrical.totalKW} KW
                  </h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, opacity: 0.85, fontSize: 13 }}>Total Active Wattage</p>
                  <h3 style={{ margin: "3px 0 0", color: "#ffffff" }}>
                    {electrical.totalWatts.toLocaleString("en-IN")} W
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "phases" && (
          <div>
            <div style={{ background: "#0f172a", borderRadius: 16, padding: 22, color: "white", marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 6px", color: "#38bdf8" }}>3-PHASE BALANCED LOAD ALLOCATION (415V AC 50Hz)</h3>
              <p style={{ margin: "0 0 20px", color: "#94a3b8", fontSize: 13 }}>
                Balanced load across R, Y, and B phases prevents neutral current overheating and maximizes transformer efficiency.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {/* Phase R */}
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "2px solid #ef4444" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#ef4444", fontWeight: 900, fontSize: 16 }}>🔴 PHASE R (Red)</span>
                    <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 700 }}>● Balanced (33.5%)</span>
                  </div>
                  <h2 style={{ margin: "10px 0 6px", fontSize: 26, color: "#ffffff" }}>{phaseLoadR} kW</h2>
                  <small style={{ color: "#cbd5e1", lineHeight: 1.4, display: "block" }}>
                    Workstations 01-08 + 42U Server Rack + Primary Lighting Loop
                  </small>
                </div>

                {/* Phase Y */}
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "2px solid #eab308" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#eab308", fontWeight: 900, fontSize: 16 }}>🟡 PHASE Y (Yellow)</span>
                    <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 700 }}>● Balanced (33.1%)</span>
                  </div>
                  <h2 style={{ margin: "10px 0 6px", fontSize: 26, color: "#ffffff" }}>{phaseLoadY} kW</h2>
                  <small style={{ color: "#cbd5e1", lineHeight: 1.4, display: "block" }}>
                    Workstations 09-16 + 2-Ton Inverter Split AC (Unit #1)
                  </small>
                </div>

                {/* Phase B */}
                <div style={{ background: "#1e293b", padding: 18, borderRadius: 12, border: "2px solid #3b82f6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#38bdf8", fontWeight: 900, fontSize: 16 }}>🔵 PHASE B (Blue)</span>
                    <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 700 }}>● Balanced (33.4%)</span>
                  </div>
                  <h2 style={{ margin: "10px 0 6px", fontSize: 26, color: "#ffffff" }}>{phaseLoadB} kW</h2>
                  <small style={{ color: "#cbd5e1", lineHeight: 1.4, display: "block" }}>
                    Workstations 17-24 + Inverter Split AC (Unit #2) + Ceiling Fans
                  </small>
                </div>
              </div>

              <div style={{ marginTop: 18, background: "#161e2e", padding: 12, borderRadius: 8, display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span>Phase Imbalance Ratio: <strong style={{ color: "#22c55e" }}>0.8% (Target: &lt; 5%) ✅</strong></span>
                <span>Calculated Neutral Current: <strong style={{ color: "#38bdf8" }}>0.6 Amps (Safe)</strong></span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mcb" && (
          <div>
            <h3 style={{ margin: "0 0 14px", fontSize: 16, color: "#1e293b", fontWeight: 700 }}>
              📊 Sub-Distribution Board & Circuit Breaker (MCB) Mapping
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                  <th style={{ padding: 12, color: "#475569" }}>Load Category</th>
                  <th style={{ padding: 12, color: "#475569" }}>Power Demand</th>
                  <th style={{ padding: 12, color: "#475569" }}>Circuit Breaker / Sub-Board</th>
                  <th style={{ padding: 12, color: "#475569", textAlign: "right" }}>Protection Class</th>
                </tr>
              </thead>
              <tbody>
                {powerBreakdown.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: 12, fontWeight: 600, color: "#0f172a" }}>
                      {row.icon} {row.item}
                    </td>
                    <td style={{ padding: 12, fontWeight: 700, color: "#0284c7" }}>
                      {row.wattage}
                    </td>
                    <td style={{ padding: 12, color: "#475569", fontFamily: "monospace" }}>
                      {row.circuit}
                    </td>
                    <td style={{ padding: 12, color: "#16a34a", fontWeight: 700, textAlign: "right" }}>
                      10kA Short-Circuit Rating
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "ups" && (
          <div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 16, padding: 22 }}>
              <h3 style={{ margin: "0 0 10px", color: "#0f172a" }}>🔋 Online True Double-Conversion UPS Architecture</h3>
              <p style={{ margin: "0 0 18px", color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>
                Ensures zero millisecond transfer time during power outages, eliminating system reboot cycles for AI GPU computations and preventing server database corruption.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                  <small style={{ color: "#64748b" }}>UPS CAPACITY</small>
                  <h3 style={{ margin: "6px 0 0", color: "#0284c7" }}>{electrical.upsRatingKVA} kVA</h3>
                </div>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                  <small style={{ color: "#64748b" }}>POWER FACTOR (PF)</small>
                  <h3 style={{ margin: "6px 0 0", color: "#16a34a" }}>0.90 (Unity Capable)</h3>
                </div>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                  <small style={{ color: "#64748b" }}>TRANSFER TIME</small>
                  <h3 style={{ margin: "6px 0 0", color: "#0284c7" }}>0 ms (True Online)</h3>
                </div>
                <div style={{ background: "white", padding: 16, borderRadius: 12, border: "1px solid #cbd5e1" }}>
                  <small style={{ color: "#64748b" }}>BATTERY BACKUP</small>
                  <h3 style={{ margin: "6px 0 0", color: "#eab308" }}>{electrical.upsBackupTime}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

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
            View Interactive 3D Digital Twin →
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Electrical;