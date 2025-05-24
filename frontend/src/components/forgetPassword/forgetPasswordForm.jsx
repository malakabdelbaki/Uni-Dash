"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { styles } from "./ForgetPassword.styles"
import { LogoUni, LogoDash } from "../Login/Login.styles"

export default function ForgetPasswordForm({ token }) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [tokenValid, setTokenValid] = useState(false)
  const [verifying, setVerifying] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Invalid reset link")
        setVerifying(false)
        return
      }

      try {
        // Try to verify token by making a POST request with a dummy password
        const res = await fetch(`http://localhost:5050/api/users/reset-password/${token}`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ password: "dummy" })
        })

        const data = await res.json()

        // If we get a 400 or 404, the token is invalid
        if (!res.ok) {
          throw new Error(data.message || "Invalid or expired token")
        }

        // If we get here, the token is valid
        setTokenValid(true)
      } catch (error) {
        console.error("Token verification error:", error)
        setError(error.message || "This password reset link is invalid or has expired")
      } finally {
        setVerifying(false)
      }
    }

    verifyToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!tokenValid) {
      setError("Token is invalid or expired")
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`http://localhost:5050/api/users/reset-password/${token}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ password: newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password")
      }

      alert("Password has been reset successfully. You can now login with your new password.")
      navigate("/login")
    } catch (error) {
      console.error("Password reset error:", error)
      setError(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <div style={styles.formContainer}>
            <h1>Verifying token...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (!tokenValid) {
    return (
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <div style={styles.formContainer}>
            <h1>Invalid Reset Link</h1>
            <p style={styles.description}>
              {error || "This password reset link is invalid or has expired."}
            </p>
            <div style={styles.backLink}>
              <a href="/forgot-password" style={styles.backLinkText}>Request a new reset link</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
          <h1>Reset password</h1>
          <p style={styles.description}>
            Enter your new password below to reset it.
          </p>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="newPassword" style={styles.label}>New Password</label>
              <div style={styles.passwordInput}>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  placeholder="min. 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  style={styles.togglePassword}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm New Password</label>
              <div style={styles.passwordInput}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="min. 6 characters"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  style={styles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
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
  )
}

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
)
