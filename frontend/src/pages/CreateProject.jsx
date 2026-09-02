import React, { useState } from "react";
import "./CreateProject.css";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

function CreateProject() {
  const navigate = useNavigate();
  const { projectData, updateProject } = useProject();

  const [formData, setFormData] = useState({
    name: projectData.name || "AI Computer Lab",
    institution: projectData.institution || "ABC Engineering College",
    roomLength: projectData.roomLength || 40,
    roomWidth: projectData.roomWidth || 30,
    roomHeight: projectData.roomHeight || 12,
    numStudents: projectData.numStudents || 36,
    numComputers: projectData.numComputers || 36,
    budget: projectData.budget || 2500000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("room") || name.includes("num") || name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(formData);
    navigate("/requirements");
  };

  return (
    <div className="project-page">
      <div className="project-card">
        <h1>Create New Lab Project</h1>
        <p className="subtitle">Enter your room dimensions and computer lab requirements</p>

        <form onSubmit={handleSubmit}>
          <div className="project-grid">
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. AI Computer Lab"
                required
              />
            </div>

            <div className="form-group">
              <label>Institution Name</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="e.g. ABC College"
                required
              />
            </div>

            <div className="form-group">
              <label>Room Length (Feet)</label>
              <input
                type="number"
                name="roomLength"
                min="15"
                max="100"
                value={formData.roomLength}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Width (Feet)</label>
              <input
                type="number"
                name="roomWidth"
                min="15"
                max="80"
                value={formData.roomWidth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Room Height (Feet)</label>
              <input
                type="number"
                name="roomHeight"
                min="8"
                max="25"
                value={formData.roomHeight}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Students</label>
              <input
                type="number"
                name="numStudents"
                min="10"
                max="120"
                value={formData.numStudents}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Computers</label>
              <input
                type="number"
                name="numComputers"
                min="10"
                max="120"
                value={formData.numComputers}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Budget (₹)</label>
              <input
                type="number"
                name="budget"
                step="50000"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 15, marginTop: 15 }}>
            <button type="submit" className="next-btn" style={{ flex: 1 }}>
              Continue to Detailed Requirements →
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

export default CreateProject;