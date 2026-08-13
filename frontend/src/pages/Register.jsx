import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account</h1>

        <p>Register to start planning your smart lab.</p>

        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" />
        </div>

        <button className="register-button">
          Register
        </button>

        <div className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </div>

      </div>
    </div>
  );
}

export default Register;