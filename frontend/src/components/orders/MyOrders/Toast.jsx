"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle } from 'lucide-react'

const Toast = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === "success" ? (
          <CheckCircle className="toast-icon" size={20} />
        ) : (
          <AlertCircle className="toast-icon" size={20} />
        )}
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export default Toast
