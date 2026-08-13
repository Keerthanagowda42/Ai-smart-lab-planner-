import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const navItems = [
  { icon: "🏠", label: "Dashboard",      path: "/dashboard"      },
  { icon: "📁", label: "My Projects",    path: "/dashboard"      },
  { icon: "➕", label: "Create Project", path: "/create-project" },
  { icon: "🤖", label: "AI Planner",     path: "/ai"             },
  { icon: "💰", label: "Budget",         path: "/budget"         },
  { icon: "🌐", label: "Network",        path: "/network"        },
  { icon: "⚡", label: "Electrical",     path: "/electrical"     },
  { icon: "🎮", label: "3D Viewer",      path: "/viewer3d"       },
  { icon: "📄", label: "Reports",        path: "/reports"        },
];

const recentProjects = [
  { name: "Computer Lab A",   status: "Completed",   budget: "₹12,00,000", statusClass: "status-completed"  },
  { name: "Networking Block", status: "Planning",    budget: "₹8,50,000",  statusClass: "status-planning"   },
  { name: "AI Lab",           status: "In Progress", budget: "₹4,20,000",  statusClass: "status-inprogress" },
];

function Dashboard() {
  const navigate   = useNavigate();
  const location   = useLocation();

  return (
    <div className="dashboard">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🖥️</span>
          <span className="logo-text">AI Smart Lab</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ icon, label, path }) => {
            const isActive = location.pathname === path && label !== "My Projects";
            return (
              <div
                key={label}
                className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                onClick={() => navigate(path)}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-label">{label}</span>
                {isActive && <span className="nav-indicator" />}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => navigate("/")}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="main-content">

        {/* Top bar */}
        <div className="topbar">
          <div>
            <p className="topbar-greeting">Good Morning 👋</p>
            <h1 className="topbar-title">Dashboard</h1>
          </div>
          <button className="new-project" onClick={() => navigate("/create-project")}>
            + New Project
          </button>
        </div>

        {/* Stats cards */}
        <div className="cards">
          {[
            { value: "12",   label: "Total Projects",  icon: "📁", color: "#2563eb" },
            { value: "5",    label: "Completed Plans", icon: "✅", color: "#16a34a" },
            { value: "₹24L", label: "Total Budget",    icon: "💰", color: "#d97706" },
            { value: "98%",  label: "AI Efficiency",   icon: "🤖", color: "#7c3aed" },
          ].map(({ value, label, icon, color }) => (
            <div className="card" key={label}>
              <div className="card-icon" style={{ background: color + "18", color }}>
                {icon}
              </div>
              <h2 className="card-value" style={{ color }}>{value}</h2>
              <p className="card-label">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent projects */}
        <div className="recent">
          <div className="recent-header">
            <h2>Recent Projects</h2>
            <button className="view-all-btn" onClick={() => navigate("/create-project")}>
              View All →
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map(({ name, status, budget, statusClass }) => (
                <tr key={name}>
                  <td className="td-name">{name}</td>
                  <td><span className={`status-badge ${statusClass}`}>{status}</span></td>
                  <td className="td-budget">{budget}</td>
                  <td>
                    <button className="open-btn" onClick={() => navigate("/viewer3d")}>
                      Open →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            {[
              { icon: "🤖", label: "AI Recommendation", path: "/ai",        bg: "#ede9fe", color: "#7c3aed" },
              { icon: "💰", label: "Budget Planner",     path: "/budget",    bg: "#fef3c7", color: "#d97706" },
              { icon: "🌐", label: "Network Design",     path: "/network",   bg: "#dbeafe", color: "#2563eb" },
              { icon: "🎮", label: "View 3D Lab",        path: "/viewer3d",  bg: "#dcfce7", color: "#16a34a" },
            ].map(({ icon, label, path, bg, color }) => (
              <div
                key={label}
                className="action-card"
                style={{ background: bg, color }}
                onClick={() => navigate(path)}
              >
                <span className="action-icon">{icon}</span>
                <span className="action-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;