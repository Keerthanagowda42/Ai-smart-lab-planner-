import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>AI Smart Lab</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>📁 My Projects</li>
          <li>➕ Create Project</li>
          <li>🤖 AI Planner</li>
          <li>💰 Budget</li>
          <li>🌐 Network</li>
          <li>⚡ Electrical</li>
          <li>📄 Reports</li>
        </ul>
      </aside>

      <main className="main-content">

        <div className="topbar">
          <h1>Dashboard</h1>

          <button
    className="new-project"
    onClick={() => navigate("/create-project")}
>
    + New Project
</button>
        </div>

        <div className="cards">

          <div className="card">
            <h2>12</h2>
            <p>Total Projects</p>
          </div>

          <div className="card">
            <h2>5</h2>
            <p>Completed Plans</p>
          </div>

          <div className="card">
            <h2>₹24L</h2>
            <p>Total Budget</p>
          </div>

          <div className="card">
            <h2>98%</h2>
            <p>AI Efficiency</p>
          </div>

        </div>

        <div className="recent">

          <h2>Recent Projects</h2>

          <table>

            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Budget</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Computer Lab A</td>
                <td>Completed</td>
                <td>₹12,00,000</td>
              </tr>

              <tr>
                <td>Networking Block</td>
                <td>Planning</td>
                <td>₹8,50,000</td>
              </tr>

              <tr>
                <td>AI Lab</td>
                <td>In Progress</td>
                <td>₹4,20,000</td>
              </tr>

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;