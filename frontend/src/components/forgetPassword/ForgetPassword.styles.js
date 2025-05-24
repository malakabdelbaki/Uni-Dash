export const styles = {
    
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#d79a27",
  },
  leftPanel: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: "2rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  giuText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#1f2937",
  },
  universityText: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    width: "100%",
  },
  description: {
    color: "#6b7280",
    marginBottom: "2rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#374151",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    color: "#1f2937",
    "&:focus": {
      outline: "none",
      borderColor: "#d79a27",
      boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.1)",
    },
  },
  passwordInput: {
    position: "relative",
  },
  togglePassword: {
    position: "absolute",
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6b7280",
    "&:hover": {
      color: "#d79a27",
    },
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#d79a27",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#d79a27",
    },
    "&:disabled": {
      opacity: "0.7",
      cursor: "not-allowed",
    },
  },
  backLink: {
    marginTop: "1rem",
    textAlign: "center",
  },
  backLinkText: {
    color: "#d79a27",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  rightPanel: {
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "url('/home.png') no-repeat center center",
    backgroundSize: "cover",
    minHeight: "100vh",
    "@media (max-width: 1024px)": {
      display: "none"
    }
  },

  rightContent: {
    maxWidth: "500px",
  },
  errorMessage: {
    color: "#ef4444",
    marginBottom: "1rem",
    textAlign: "center",
  },
  logoUni: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "700",
    fontSize: "40px",
    color: "#d6212a",
  },
  logoDash: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: "700",
    fontSize: "30px",
    color: "#d79a27",
    marginLeft: "8px",
    alignSelf: "flex-end",
  },
  
};