import React, { useState } from "react";
import "./CreateProject.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function RequirementForm() {
  const navigate = useNavigate();
  const { projectData, updateProject } = useProject();

  const [reqData, setReqData] = useState({
    seatingPreference: projectData.seatingPreference || "grid",
    labType: projectData.labType || "ai-ds",
    doorPosition: projectData.doorPosition || "front-left",
    windowCount: projectData.windowCount || 4,
    upsBackup: projectData.upsBackup || "30-min",
    networkReq: projectData.networkReq || "gigabit-redundant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReqData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(reqData);
    navigate("/ai");
  };

  return (
    <div className="project-page">
      <div className="project-card" style={{ maxWidth: 850 }}>
        <h1>Detailed Infrastructure Requirements</h1>
        <p className="subtitle">Customize lab layout, course workload, network & electrical specifications</p>

        <form onSubmit={handleSubmit}>
          <div className="project-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <div className="form-group">
              <label>🪑 Preferred Seating Layout</label>
              <select name="seatingPreference" value={reqData.seatingPreference} onChange={handleChange}>
                <option value="grid">Dual-Block Grid (Standard Rows & Central Aisle)</option>
                <option value="u-shape">U-Shaped Peripheral Layout</option>
                <option value="pods">Pods / Workstation Clusters (4-PC Groups)</option>
              </select>
            </div>

            <div className="form-group">
              <label>🎓 Lab Workload / Course Type</label>
              <select name="labType" value={reqData.labType} onChange={handleChange}>
                <option value="ai-ds">AI & Data Science (High GPU/CPU Demand)</option>
                <option value="cad-graphics">3D CAD & Graphics Rendering (Max GPU/RAM)</option>
                <option value="networking">Cybersecurity & Computer Networks (Multi-NIC)</option>
                <option value="basic">Basic Programming & General Computing</option>
              </select>
            </div>

            <div className="form-group">
              <label>🚪 Room Door Location</label>
              <select name="doorPosition" value={reqData.doorPosition} onChange={handleChange}>
                <option value="front-left">Front Left (Near Teacher Area)</option>
                <option value="front-right">Front Right</option>
                <option value="back-center">Back Center Exit</option>
              </select>
            </div>

            <div className="form-group">
              <label>🪟 Windows Count</label>
              <select name="windowCount" value={reqData.windowCount} onChange={handleChange}>
                <option value={2}>2 Windows</option>
                <option value={4}>4 Windows</option>
                <option value={6}>6 Windows</option>
              </select>
            </div>

            <div className="form-group">
              <label>⚡ Dedicated UPS Backup Duration</label>
              <select name="upsBackup" value={reqData.upsBackup} onChange={handleChange}>
                <option value="15-min">15 Minutes (Graceful Shutdown)</option>
                <option value="30-min">30 Minutes (Standard Academic Backup)</option>
                <option value="60-min">60 Minutes (Full Extended Backup)</option>
              </select>
            </div>

            <div className="form-group">
              <label>🌐 Network Specification</label>
              <select name="networkReq" value={reqData.networkReq} onChange={handleChange}>
                <option value="gigabit-redundant">Gigabit Ethernet Star Topology + Fiber Uplink</option>
                <option value="10g-backbone">10G High-Speed Backbone + VLAN</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: 15, marginTop: 25 }}>
            <button type="button" className="next-btn" style={{ background: "#64748b" }} onClick={() => navigate("/create-project")}>
              ← Back
            </button>
            <button type="submit" className="next-btn" style={{ flex: 1 }}>
              Generate AI Recommendation & Plan →
            </button>
            <button
              type="button"
              className="next-btn"
              style={{ background: "linear-gradient(135deg, #0284c7, #2563eb)", flex: 1 }}
              onClick={(e) => {
                handleSubmit(e);
                navigate("/viewer3d");
              }}
            >
              🎮 Save & Open 3D Viewer →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequirementForm;