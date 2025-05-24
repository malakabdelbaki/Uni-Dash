"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./ForgetPassword.styles";
import { LogoUni, LogoDash } from "../Login/Login.styles";

export default function ForgotPasswordEmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResetUrl("");

    try {
      const res = await fetch("http://localhost:5050/api/users/forgot-password", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to process request");
      }

      setSuccess(true);
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
      alert(data.message);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.header}>
            <LogoUni>Uni</LogoUni>
            <LogoDash>Dash</LogoDash>
            <br />
              <span style={styles.giuText}>GIU</span>
              <span style={styles.universityText}>
                 GERMAN INTERNATIONAL UNIVERSITY
              </span>
            </div>
        <div style={styles.formContainer}>
          <h1>Forgot Password</h1>
          <p style={styles.description}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && (
            <div style={{ ...styles.errorMessage, color: "green" }}>
              Password reset link has been sent to your email.
              {process.env.NODE_ENV === 'development' && resetUrl && (
                <div style={{ marginTop: '10px' }}>
                  <p>Development Mode: Click this link to reset password:</p>
                  <a href={resetUrl} style={{ color: 'blue', textDecoration: 'underline' }}>
                    {resetUrl}
                  </a>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div style={styles.backLink}>
            <a href="/login" style={styles.backLinkText}>Back to Login</a>
          </div>
        </div>
      </div>
      <div style={styles.rightPanel}>
      </div>
    </div>
  );
} 