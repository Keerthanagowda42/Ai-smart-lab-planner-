import React, { useState } from "react";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Registration successful — navigate to login
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* Logo */}
        <div style={{
          width: 58, height: 58, margin: "0 auto 16px",
          borderRadius: 16,
          background: "linear-gradient(135deg,#2563eb,#4f46e5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          fontSize: 28,
          boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
        }}>
          🖥️
        </div>

        <h1>Create Account</h1>
        <p>Register to start planning your smart lab.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span style={{ color: "#dc2626", fontSize: 12, marginTop: 4, display: "block" }}>{errors.fullName}</span>}
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span style={{ color: "#dc2626", fontSize: 12, marginTop: 4, display: "block" }}>{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span style={{ color: "#dc2626", fontSize: 12, marginTop: 4, display: "block" }}>{errors.password}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span style={{ color: "#dc2626", fontSize: 12, marginTop: 4, display: "block" }}>{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="register-button">
            Create Account →
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}>Login</span>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", color: "#94a3b8", fontSize: 11,
          marginTop: 24, paddingTop: 16, borderTop: "1px solid #e2e8f0",
        }}>
          AI-Based Smart Computer Lab Planner
        </div>
      </div>
    </div>
  );
}

export default Register;