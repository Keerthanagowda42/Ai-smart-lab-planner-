import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "🤖", title: "AI Planning Engine", desc: "Constraint-solving algorithms optimize workstation layout, spacing, and room utilization automatically." },
  { icon: "💰", title: "Budget Optimization", desc: "Itemized Bill of Materials with cost breakdown — know exactly where every rupee goes." },
  { icon: "🌐", title: "Network Design", desc: "Star topology cabling, switch port calculations, and shortest-path fiber cable routing." },
  { icon: "⚡", title: "Electrical Planning", desc: "Load analysis, 10 kVA UPS sizing, MCB distribution, and 3-phase power recommendations." },
  { icon: "🎮", title: "3D WebGL Visualization", desc: "Interactive 3D lab model with 6 room layout modes, animated fiber data pulses, and dark neon matrix lighting." },
  { icon: "📄", title: "Executive Report Generator", desc: "Complete project reports with specifications, costs, and 1-click printable PDF exports." },
];

const institutionTypes = [
  { icon: "🏫", title: "Universities & Colleges", desc: "Multi-department computer centers, 3-phase UPS power distribution, and 1 Gbps Star/Mesh network topologies." },
  { icon: "🎓", title: "Schools & K-12 Institutes", desc: "Ergonomic STEM & coding labs designed for student safety, clear sightlines, and emergency exit walkways." },
  { icon: "🤖", title: "AI & Data Science Labs", desc: "High-power GPU workstation pods with liquid cooling clearance and dedicated fiber optic data trunking." },
  { icon: "🏢", title: "Corporate Training Centers", desc: "High-density boardroom hollow square and chevron auditorium computer room configurations." },
];

function Home() {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({ name: "", email: "", institution: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setContactForm({ name: "", email: "", institution: "", subject: "", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>
          🖥️ AI Smart Lab Planner
        </div>

        <ul className="nav-links">
          <li onClick={() => scrollToSection("home")}>Home</li>
          <li onClick={() => scrollToSection("features")}>Features</li>
          <li onClick={() => scrollToSection("about")}>About</li>
          <li onClick={() => scrollToSection("contact")}>Contact</li>
        </ul>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="register-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero / Home Section */}
      <div id="home" className="hero">
        <div className="hero-left">
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", padding: "6px 16px", borderRadius: 20, color: "#60a5fa", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
            ✨ HKBK College of Engineering Lab Design Engine
          </div>

          <h1>AI-Powered Smart Computer Lab & Network Planner</h1>

          <p>
            Design intelligent computer laboratories using AI constraint solving,
            automated budget optimization, star-topology network planning,
            electrical load analysis, and immersive 3D WebGL visualization — all in one platform.
          </p>

          <div className="hero-buttons">
            <button className="start-btn" onClick={() => navigate("/login")}>
              🚀 Get Started Free
            </button>
            <button className="demo-btn" onClick={() => navigate("/viewer3d")}>
              ▶ Live 3D WebGL Demo
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="info-card">
            <h3>AI Planner</h3>
            <h2>Smart Lab Score</h2>
            <h1>98%</h1>
            <p>✔ AI Spatial Layout Optimization</p>
            <p>✔ Budget Planning & Itemized BOM</p>
            <p>✔ 1 Gbps Star Topology Network</p>
            <p>✔ 10 kVA UPS Electrical Load Analysis</p>
            <p>✔ 6 Interactive 3D Room Layout Modes</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" style={{ padding: "80px 60px", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ color: "#38bdf8", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>CORE CAPABILITIES</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginTop: 8 }}>Everything You Need to Plan a Smart Lab</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "rgba(30, 41, 59, 0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: "30px 26px",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" style={{ padding: "80px 60px", background: "rgba(15, 23, 42, 0.6)", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ color: "#818cf8", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>ABOUT OUR PLATFORM</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginTop: 8 }}>Empowering Educational Institutions with AI Design</h2>
          <p style={{ maxWidth: 750, margin: "12px auto 0", color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>
            AI Smart Lab Planner bridges the gap between architectural spatial constraints, network engineering, electrical safety, and institutional budget planning.
          </p>
        </div>

        {/* Institution Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 60 }}>
          {institutionTypes.map((item) => (
            <div key={item.title} style={{ background: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "26px", display: "flex", gap: 20 }}>
              <div style={{ fontSize: 36, background: "rgba(99,102,241,0.15)", width: 64, height: 64, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 19, fontWeight: 700, color: "#f8fafc", marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Counter */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, background: "rgba(30, 41, 59, 0.7)", borderRadius: 20, padding: "30px", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#38bdf8" }}>500+</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>Labs Planned</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>98%</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>Spatial Efficiency</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#a855f7" }}>100%</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>Electrical Compliance</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#f59e0b" }}>₹45L+</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>Cost Savings</div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" style={{ padding: "80px 60px", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>GET IN TOUCH</span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#f8fafc", marginTop: 8 }}>Contact Our Lab Planning Experts</h2>
          <p style={{ maxWidth: 650, margin: "12px auto 0", color: "#94a3b8", fontSize: 15 }}>
            Have questions about institutional lab deployment or custom AI recommendations? Send us a message and our team will get back to you within 24 hours.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 1100, margin: "0 auto" }}>

          {/* Contact Info Card */}
          <div style={{ background: "rgba(30, 41, 59, 0.5)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#f8fafc", marginBottom: 20 }}>Inquiry Details</h3>

              <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, background: "rgba(59,130,246,0.15)", padding: 12, borderRadius: 12 }}>📍</span>
                <div>
                  <strong style={{ color: "#f8fafc", display: "block", fontSize: 15 }}>Headquarters</strong>
                  <span style={{ color: "#94a3b8", fontSize: 14 }}>Manyata Tech Park, Nagawara, Bangalore, India</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, background: "rgba(34,197,94,0.15)", padding: 12, borderRadius: 12 }}>📧</span>
                <div>
                  <strong style={{ color: "#f8fafc", display: "block", fontSize: 15 }}>Email Support</strong>
                  <span style={{ color: "#38bdf8", fontSize: 14 }}>support@smartlabplanner.edu</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, background: "rgba(245,158,11,0.15)", padding: 12, borderRadius: 12 }}>📞</span>
                <div>
                  <strong style={{ color: "#f8fafc", display: "block", fontSize: 15 }}>Inquiry Hotline</strong>
                  <span style={{ color: "#94a3b8", fontSize: 14 }}>+91 80507 42738</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, background: "rgba(168,85,247,0.15)", padding: 12, borderRadius: 12 }}>🕒</span>
                <div>
                  <strong style={{ color: "#f8fafc", display: "block", fontSize: 15 }}>Support Hours</strong>
                  <span style={{ color: "#94a3b8", fontSize: 14 }}>Monday – Saturday (9:00 AM – 6:00 PM IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <form onSubmit={handleContactSubmit} style={{ background: "rgba(30, 41, 59, 0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "36px" }}>
            {submitted && (
              <div style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", padding: 14, borderRadius: 12, color: "#22c55e", fontSize: 14, fontWeight: 700, marginBottom: 20 }}>
                ✅ Thank you! Your inquiry has been submitted successfully. Our lab experts at HKBK College of Engineering will contact you soon.
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="e.g. Keerthana Gowda"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 14 }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="admin@institution.edu"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: "#cbd5e1", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Institution Name</label>
                <input
                  type="text"
                  value={contactForm.institution}
                  onChange={(e) => setContactForm({ ...contactForm, institution: e.target.value })}
                  placeholder="HKBK College of Engineering"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 14 }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="Inquiry for AI Computer Lab Planning"
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 14 }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", color: "#cbd5e1", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Message / Requirements *</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Describe your lab dimensions, budget, PC requirements..."
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: 14, fontFamily: "sans-serif" }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #2563eb, #4f46e5)",
                color: "white",
                border: "none",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(37,99,235,0.4)",
              }}
            >
              Send Inquiry →
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ padding: "30px 60px", background: "rgba(10, 15, 30, 0.95)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 14, color: "#94a3b8" }}>
          © 2026 AI Smart Lab Planner. All rights reserved.
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#94a3b8" }}>
          <span onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>Home</span>
          <span onClick={() => scrollToSection("features")} style={{ cursor: "pointer" }}>Features</span>
          <span onClick={() => scrollToSection("about")} style={{ cursor: "pointer" }}>About</span>
          <span onClick={() => scrollToSection("contact")} style={{ cursor: "pointer" }}>Contact</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;