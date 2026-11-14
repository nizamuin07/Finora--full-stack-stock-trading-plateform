import React, { useState } from "react";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:3002/api/auth/signup";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Frontend validation
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          mobile: formData.mobile,
          password: formData.password
        })
      });

      // Safely parse server response
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || `Registration failed. Status: ${response.status}`
        );
      }

      setSuccess("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: ""
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Signup Error:", err);

      if (err instanceof TypeError) {
        setError(
          "Unable to connect to FINORA server. Please check whether the backend is running."
        );
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="finora-signup">
      <div className="signup-container">

        {/* Left Section */}
        <div className="signup-left">

          <div className="signup-brand">
            <span>F</span>
            <h2>FINORA</h2>
          </div>

          <div className="signup-content">

            <p className="signup-tag">
              SMARTER TRADING STARTS HERE
            </p>

            <h1>
              Invest Smart.
              <br />
              Trade Better.
            </h1>

            <p className="signup-description">
              Open your FINORA account and experience a smarter
              way to track, manage and grow your investments.
            </p>

            <div className="signup-features">
              <p>✓ Modern Trading Interface</p>
              <p>✓ Portfolio Tracking</p>
              <p>✓ Smart Investment Tools</p>
            </div>

          </div>

          <p className="signup-copyright">
            © 2026 FINORA. All rights reserved.
          </p>

        </div>

        {/* Right Section */}
        <div className="signup-right">

          <div className="signup-form-header">
            <h2>Create your account</h2>
            <p>Enter your details to get started with FINORA.</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="signup-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                minLength="8"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-input-group">
              <label>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              Show Password
            </label>

            {error && (
              <p className="loss" style={{ marginBottom: "12px" }}>
                {error}
              </p>
            )}

            {success && (
              <p className="profit" style={{ marginBottom: "12px" }}>
                {success}
              </p>
            )}

            <button
              type="submit"
              className="signup-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          <div className="signup-login">
            Already have an account?
            <Link to="/login"> Login</Link>
          </div>

          <p className="signup-terms">
            By continuing, you agree to FINORA's Terms & Privacy Policy.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;