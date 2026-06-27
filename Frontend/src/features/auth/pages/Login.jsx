import { useState } from "react";
import "../auth.form.scss";
import Button from "../components/Button.jsx";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.js";
import LoadingState from "../../../components/LoadingState.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormError("");
  };

  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    try {
      await handleLogin(formData);
      navigate("/home"); // now this only runs if login actually succeeded
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password."
      );
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="auth-page">

      {/* ── Left: Form ── */}
      <div className="auth-page__form">
        <div className="auth-page__brand" onClick={() => navigate("/")}>
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>

        <div className="auth">
          <div className="auth__card">
            <div className="auth__header">
              <h1>Welcome Back</h1>
              <p>Login to continue your journey</p>
            </div>

            <form className="auth__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {formError && <p className="form-error">{formError}</p>}

              <Button type="submit" text="Login" />
            </form>

            <div className="auth__footer">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Visual ── */}
      <div className="auth-page__visual">
        <div className="auth-page__visual-glow auth-page__visual-glow--1" />
        <div className="auth-page__visual-glow auth-page__visual-glow--2" />
        <div className="auth-page__visual-frame">
          <img
            src="/assets/auth-illustration.png"
            alt="HireSync AI-powered interview preparation"
          />
        </div>
        <div className="auth-page__visual-overlay">
          <h2>Ace Your Next Interview</h2>
          <p>AI-tailored questions, skill gap analysis, and a prep roadmap — built around your resume.</p>
        </div>
      </div>

    </div>
  );
};

export default Login;