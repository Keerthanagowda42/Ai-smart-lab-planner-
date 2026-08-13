import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          AI Smart Lab Planner
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Features</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

        <div className="nav-buttons">

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <div className="hero">

        <div className="hero-left">

          <h1>
            AI-Based Smart Computer System and Network Planning
          </h1>

          <p>
            Design smart computer laboratories using Artificial Intelligence,
            Budget Planning, Network Planning, Electrical Planning and 3D
            Visualization.
          </p>

          <div className="hero-buttons">

            <button
              className="start-btn"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button
              className="demo-btn"
              onClick={() => navigate("/viewer3d")}
            >
              Watch Demo
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="info-card">

            <h3>AI Planner</h3>

            <h2>Smart Lab Score</h2>

            <h1>98%</h1>

            <p>✔ Budget Planning</p>
            <p>✔ Network Planning</p>
            <p>✔ Electrical Planning</p>
            <p>✔ 3D Lab Design</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;