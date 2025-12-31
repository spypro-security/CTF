import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ApplicationResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { status, email, internship, job, appliedDate } = state;
  const positionLabel = job || internship || 'this position';

  useEffect(() => {
    // If the page is opened directly without state, remain here and let user navigate
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px",
    },
    card: {
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "800px",
      width: "100%",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
    },
    icon: {
      fontSize: "80px",
      marginBottom: "16px",
    },
    title: {
      fontSize: "28px",
      fontWeight: 800,
      marginBottom: "8px",
    },
    text: {
      color: "#555",
      fontSize: "16px",
      marginBottom: "16px",
    },
    info: {
      marginTop: "12px",
      color: "#333",
      fontWeight: 600,
    },
    actions: {
      marginTop: "20px",
      display: "flex",
      gap: "12px",
      justifyContent: "center",
    },
    button: {
      padding: "12px 18px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
    },
    backButton: {
      background: "#e5e7eb",
      color: "#111",
    },
    homeButton: {
      background: "#2563eb",
      color: "white",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>{status === "success" ? "✅" : "⚠️"}</div>
        <div style={styles.title}>{status === "success" ? "Thanks for applying!" : "Already Applied"}</div>
        <div style={styles.text}>
          {status === "success" ? (
            <>
              Your application for <strong>{positionLabel}</strong> was submitted successfully.
            </>
          ) : (
            <>
              You have already applied for <strong>{positionLabel}</strong> {appliedDate ? `on ${appliedDate}.` : '.'}
            </>
          )}
        </div>

        {email && <div style={styles.info}>📧 Confirmation sent to: {email}</div>}

        <div style={styles.actions}>
          <button style={{ ...styles.button, ...styles.backButton }} onClick={() => navigate(-1)}>Back</button>
          <button style={{ ...styles.button, ...styles.homeButton }} onClick={() => navigate(job ? '/jobs' : '/internships')}>Browse {job ? 'Jobs' : 'Internships'}</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationResult;
