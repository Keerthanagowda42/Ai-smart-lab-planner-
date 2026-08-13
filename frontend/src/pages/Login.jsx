import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    // Login successful
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      
      {/* Background decoration */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={styles.loginCard}>

        {/* Logo */}
        <div style={styles.logo}>
          🖥️
        </div>

        <h1 style={styles.title}>
          Welcome Back 👋
        </h1>

        <p style={styles.subtitle}>
          Login to continue planning your smart lab.
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Email Address
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>✉️</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Password
            </label>

            <div style={styles.inputWrapper}>
              <span style={styles.icon}>🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={styles.options}>

            <label style={styles.remember}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              style={styles.forgot}
              onClick={() => alert("Password reset feature coming soon.")}
            >
              Forgot Password?
            </button>

          </div>

          {/* Login button */}
          <button
            type="submit"
            style={styles.loginButton}
          >
            Login
            <span style={styles.arrow}>→</span>
          </button>

        </form>

        {/* Register */}
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={styles.registerLink}
          >
            Create Account
          </Link>
        </p>

        {/* Footer */}
        <div style={styles.footer}>
          AI-Based Smart Computer Lab Planner
        </div>

      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #0f172a 0%, #172554 50%, #1e3a8a 100%)",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  circle1: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.15)",
    top: "-180px",
    left: "-150px",
    filter: "blur(2px)",
  },

  circle2: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(96,165,250,0.12)",
    bottom: "-250px",
    right: "-180px",
    filter: "blur(2px)",
  },

  loginCard: {
    width: "420px",
    maxWidth: "90%",
    padding: "42px 45px",
    background: "rgba(255,255,255,0.98)",
    borderRadius: "22px",
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.35)",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  logo: {
    width: "62px",
    height: "62px",
    margin: "0 auto 18px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.3)",
  },

  title: {
    margin: "0",
    textAlign: "center",
    color: "#0f172a",
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "15px",
    marginTop: "10px",
    marginBottom: "30px",
    lineHeight: "1.5",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  inputWrapper: {
    height: "50px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    background: "#f8fafc",
    boxSizing: "border-box",
    transition: "0.2s",
  },

  icon: {
    marginLeft: "14px",
    marginRight: "10px",
    fontSize: "17px",
  },

  input: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px",
    color: "#0f172a",
    padding: "0 10px 0 0",
    boxSizing: "border-box",
  },

  eyeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "12px",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    fontSize: "13px",
  },

  remember: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    color: "#475569",
    cursor: "pointer",
  },

  forgot: {
    border: "none",
    background: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "13px",
    padding: 0,
  },

  loginButton: {
    width: "100%",
    height: "52px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow:
      "0 10px 20px rgba(37,99,235,0.25)",
    transition: "0.2s",
  },

  arrow: {
    marginLeft: "10px",
    fontSize: "20px",
  },

  registerText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    marginTop: "25px",
    marginBottom: "0",
  },

  registerLink: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },

  footer: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "11px",
    marginTop: "28px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
  },
};

export default Login;