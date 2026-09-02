import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

export default function QuickRequirementBar() {
  const navigate = useNavigate();
  const { projectData, updateProject, aiPlan } = useProject();
  const [isEditing, setIsEditing] = useState(false);

  const pcCount = projectData?.numComputers || 28;
  const roomLength = projectData?.roomLength || 40;
  const roomWidth = projectData?.roomWidth || 30;
  const seating = projectData?.seatingPreference || "grid";
  const labType = projectData?.labType || "ai-ds";
  const budget = projectData?.budget || 2500000;

  const seatingLabels = {
    grid: "📐 Dual Grid",
    "u-shape": "🔄 U-Shape",
    pods: "🧩 Team Pods",
    "high-density": "🏢 High Density",
  };

  const labTypeLabels = {
    "ai-ds": "🤖 AI & Data Science",
    "cad-graphics": "🎨 3D CAD & Graphics",
    networking: "🔒 Cybersecurity Lab",
    basic: "💻 Basic Computing",
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        border: "1px solid rgba(56, 189, 248, 0.35)",
        borderRadius: "14px",
        padding: "10px 18px",
        marginBottom: "20px",
        color: "#ffffff",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Active Requirements Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            🎯 Active Requirements:
          </span>

          <span
            style={{
              background: "rgba(56, 189, 248, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              color: "#38bdf8",
              fontSize: "12px",
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            🖥️ {pcCount} PCs
          </span>

          <span
            style={{
              background: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#22c55e",
              fontSize: "12px",
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            📏 {roomLength}ft × {roomWidth}ft ({roomLength * roomWidth} sq ft)
          </span>

          <span
            style={{
              background: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              color: "#c084fc",
              fontSize: "12px",
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {seatingLabels[seating] || "📐 Dual Grid"}
          </span>

          <span
            style={{
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#fbbf24",
              fontSize: "12px",
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {labTypeLabels[labType] || "🤖 AI & Data Science"}
          </span>

          <span
            style={{
              background: "rgba(236, 72, 153, 0.15)",
              border: "1px solid rgba(236, 72, 153, 0.4)",
              color: "#f472b6",
              fontSize: "12px",
              fontWeight: 800,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            💰 ₹{(budget / 100000).toFixed(1)}L
          </span>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              background: isEditing ? "#0284c7" : "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isEditing ? "✕ Close Editor" : "⚙️ Change Requirements"}
          </button>

          <button
            onClick={() => navigate("/viewer3d")}
            style={{
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              border: "none",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: 800,
              padding: "6px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(2, 132, 199, 0.3)",
            }}
          >
            🧊 View in 3D →
          </button>
        </div>
      </div>

      {/* Expanded Quick Requirement Editor Panel */}
      {isEditing && (
        <div
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Workstations Slider */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1" }}>🖥️ Computers Count</label>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#38bdf8" }}>{pcCount} PCs</span>
            </div>
            <input
              type="range"
              min="6"
              max="60"
              step="2"
              value={pcCount}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                updateProject({ numComputers: val, numStudents: val });
              }}
              style={{ width: "100%", accentColor: "#38bdf8", cursor: "pointer" }}
            />
          </div>

          {/* Room Length */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1" }}>📏 Room Length (ft)</label>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#22c55e" }}>{roomLength} ft</span>
            </div>
            <input
              type="range"
              min="25"
              max="65"
              step="1"
              value={roomLength}
              onChange={(e) => updateProject({ roomLength: parseInt(e.target.value) })}
              style={{ width: "100%", accentColor: "#22c55e", cursor: "pointer" }}
            />
          </div>

          {/* Room Width */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1" }}>📐 Room Width (ft)</label>
              <span style={{ fontSize: "11px", fontWeight: 900, color: "#22c55e" }}>{roomWidth} ft</span>
            </div>
            <input
              type="range"
              min="18"
              max="45"
              step="1"
              value={roomWidth}
              onChange={(e) => updateProject({ roomWidth: parseInt(e.target.value) })}
              style={{ width: "100%", accentColor: "#22c55e", cursor: "pointer" }}
            />
          </div>

          {/* Seating Preference */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "4px" }}>
              🪑 Seating Layout
            </label>
            <select
              value={seating}
              onChange={(e) => updateProject({ seatingPreference: e.target.value })}
              style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: "6px",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <option value="grid">Dual-Block Grid</option>
              <option value="u-shape">U-Shape Perimeter</option>
              <option value="pods">Team Pods</option>
              <option value="high-density">High Density Rows</option>
            </select>
          </div>

          {/* Lab Specialization */}
          <div>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#cbd5e1", display: "block", marginBottom: "4px" }}>
              🎯 Hardware Tier
            </label>
            <select
              value={labType}
              onChange={(e) => updateProject({ labType: e.target.value })}
              style={{
                width: "100%",
                padding: "6px 8px",
                borderRadius: "6px",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <option value="ai-ds">AI & Data Science (RTX 4060 Ti)</option>
              <option value="cad-graphics">3D CAD Rendering (RTX 4070 Ti)</option>
              <option value="networking">Cybersecurity (Dual-NIC)</option>
              <option value="basic">Basic Academic (Core-i5)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
