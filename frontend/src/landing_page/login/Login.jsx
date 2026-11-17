import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await fetch(
        apiUrl("/api/auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save authentication details
      localStorage.setItem("finoraToken", data.token);
      localStorage.setItem("finoraUser", JSON.stringify(data.user));

      // Redirect after successful login
      navigate("/trading");

    } catch (err) {
      console.error("Login Error:", err);

      setError(
        err instanceof TypeError
          ? "Unable to connect to FINORA server."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finora-login">

      <div className="login-container">

        {/* Left Section */}
        <div className="login-left">

          <div className="login-brand">
            <span>F</span>
            <h2>FINORA</h2>
          </div>

          <div className="login-content">

            <p className="login-tag">
              WELCOME BACK TO FINORA
            </p>

            <h1>
              Trade Smart.
              <br />
              Grow Better.
            </h1>

            <p className="login-description">
              Access your investments, monitor your portfolio
              and manage your trades with FINORA.
            </p>

            <div className="login-features">
              <p>✓ Real-Time Portfolio Overview</p>
              <p>✓ Smart Trading Experience</p>
              <p>✓ Secure Account Access</p>
            </div>

          </div>

          <p className="login-copyright">
            © 2026 FINORA. All rights reserved.
          </p>

        </div>

        {/* Right Section */}
        <div className="login-right">

          <div className="login-form-header">
            <h2>Welcome Back!</h2>
            <p>Login to continue to your FINORA account.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="login-input-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="login-input-group">
              <label>Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <label className="login-show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            {error && (
              <p className="login-error">{error}</p>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to FINORA →"}
            </button>

          </form>

          <div className="login-signup">
            Don't have an account?
            <Link to="/signup"> Create Account</Link>
          </div>

          <p className="login-terms">
            Your account is protected with secure authentication.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;