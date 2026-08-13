import "./CreateProject.css";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  return (
    <div className="project-page">

      <div className="project-card">

        <h1>Create New Lab Project</h1>

        <div className="project-grid">

          <div className="form-group">
            <label>Project Name</label>
            <input type="text" placeholder="AI Computer Lab" />
          </div>

          <div className="form-group">
            <label>Institution Name</label>
            <input type="text" placeholder="ABC College" />
          </div>

          <div className="form-group">
            <label>Room Length (Feet)</label>
            <input type="number" placeholder="40" />
          </div>

          <div className="form-group">
            <label>Room Width (Feet)</label>
            <input type="number" placeholder="30" />
          </div>

          <div className="form-group">
            <label>Room Height (Feet)</label>
            <input type="number" placeholder="12" />
          </div>

          <div className="form-group">
            <label>Number of Students</label>
            <input type="number" placeholder="60" />
          </div>

          <div className="form-group">
            <label>Number of Computers</label>
            <input type="number" placeholder="60" />
          </div>

          <div className="form-group">
            <label>Budget (₹)</label>
            <input type="number" placeholder="1500000" />
          </div>

        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/requirements")}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default CreateProject;