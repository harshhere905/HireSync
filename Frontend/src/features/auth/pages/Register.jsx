import { useState, useEffect, useRef } from "react";
import "../auth.form.scss";
import Button from "../components/Button.jsx";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.js";
import LoadingState from "../../../components/LoadingState.jsx";

const useDebounce = (value, delay = 600) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const OtpModal = ({ email, onVerified, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);

  const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleOtpChange = (index, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    if (val && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (res.ok) {
        onVerified();
      } else {
        setError(data.message || "Invalid OTP. Try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(30);
    setError("");
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    try {
      await fetch(`${API_BASE}/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setError("Failed to resend OTP.");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <button className="otp-modal__close" onClick={onClose}>✕</button>
        <div className="otp-modal__icon">📧</div>
        <h2>Verify your email</h2>
        <p>
          We sent a 6-digit code to <strong>{email}</strong>.<br />
          Enter it below to complete registration.
        </p>

        <div className="otp-modal__inputs" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`otp-input${error ? " otp-input--error" : ""}`}
              autoFocus={i === 0}
            />
          ))}
        </div>

        {error && <p className="otp-modal__error">{error}</p>}

        <Button
          type="button"
          text={loading ? "Verifying..." : "Verify OTP"}
          onClick={handleVerify}
          disabled={loading}
        />

        <p className="otp-modal__spam-note">
          Can't find the email? Please check your <strong>spam / junk folder</strong> as well.
        </p>

        <p className="otp-modal__resend">
          {resendTimer > 0 ? (
            <>Resend code in <strong>{resendTimer}s</strong></>
          ) : (
            <button type="button" onClick={handleResend}>Resend OTP</button>
          )}
        </p>
      </div>
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const [usernameStatus, setUsernameStatus] = useState(null);
  const [emailStatus, setEmailStatus]       = useState(null);

  const [showOtpModal, setShowOtpModal]     = useState(false);
  const [formError, setFormError]           = useState("");
  const [submitLoading, setSubmitLoading]   = useState(false);
  const [isOtpSent, setIsOtpSent]           = useState(false);
  const [emailVerified, setEmailVerified]   = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

  const debouncedUsername = useDebounce(formData.username);
  const debouncedEmail    = useDebounce(formData.email);

  const { loading } = useAuth();
  const navigate    = useNavigate();

  useEffect(() => {
    if (!debouncedUsername) { setUsernameStatus(null); return; }
    fetch(`${API_BASE}/check-availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field: "username", value: debouncedUsername }),
    })
      .then((r) => r.json())
      .then((d) => setUsernameStatus(d.available));
  }, [debouncedUsername]);

  useEffect(() => {
    if (!debouncedEmail) { setEmailStatus(null); return; }
    fetch(`${API_BASE}/check-availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ field: "email", value: debouncedEmail }),
    })
      .then((r) => r.json())
      .then((d) => setEmailStatus(d.available));
  }, [debouncedEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");

    if (name === "username") {
      setUsernameStatus(null);
      setIsOtpSent(false);
      setEmailVerified(false);
      setVerificationMessage("");
    }
    if (name === "email") {
      setEmailStatus(null);
      setIsOtpSent(false);
      setEmailVerified(false);
      setVerificationMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.username || !formData.email || !formData.password) {
      setFormError("All fields are required."); return;
    }
    if (usernameStatus === false) {
      setFormError("Username is already taken."); return;
    }
    if (emailStatus === false) {
      setFormError("Email is already registered."); return;
    }

    setSubmitLoading(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsOtpSent(true);
        setVerificationMessage("Verification code sent to your email.");
        setShowOtpModal(true);
      } else {
        setFormError(data.message || "Registration failed.");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="auth-page">

      {showOtpModal && (
        <OtpModal
          email={formData.email}
          onVerified={() => {
            setShowOtpModal(false);
            setEmailVerified(true);
            setVerificationMessage("Email verified! You can now log in.");
          }}
          onClose={() => setShowOtpModal(false)}
        />
      )}

      <div className="auth-page__form">
        <div className="auth-page__brand" onClick={() => navigate("/")}>
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>

        <div className="auth">
          <div className="auth__card">
            <div className="auth__header">
              <h1>Create Account</h1>
              <p>Join us and get started today</p>
            </div>

            <form className="auth__form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  className={usernameStatus === false ? "input--invalid" : ""}
                />
                {usernameStatus === false && (
                  <span className="field-msg field-msg--error">
                    Username already taken
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={emailStatus === false ? "input--invalid" : ""}
                />
                {emailStatus === false && (
                  <span className="field-msg field-msg--error">
                    Email already registered
                  </span>
                )}
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
              {verificationMessage && (
                <p className={`form-success ${emailVerified ? "form-success--verified" : ""}`}>
                  {verificationMessage}
                </p>
              )}

              {emailVerified ? (
                <Button
                  type="button"
                  text="Continue to Login"
                  onClick={() => navigate("/login")}
                />
              ) : (
                <Button
                  type="submit"
                  text={
                    submitLoading ? "Sending..." :
                    isOtpSent ? "Awaiting OTP verification" :
                    "Send Verification Code"
                  }
                  disabled={
                    submitLoading ||
                    isOtpSent ||
                    emailStatus !== true ||
                    usernameStatus !== true ||
                    !formData.password
                  }
                />
              )}
            </form>

            <div className="auth__footer">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

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
          <h2>Your Interview Prep, Personalized</h2>
          <p>Upload your resume, paste the job description, and get a tailored plan in 30 seconds.</p>
        </div>
      </div>

    </div>
  );
};

export default Register;