import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EXPECTED = {
  ch1: "shell script",
  ch2: "read only",
  ch3: "flag{firefox}",
  ch4: "flag{.local/share/trash}"
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    background: '#f9fafb',
    minHeight: '100vh'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#1f2937'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#6b7280',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  welcomeBox: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    color: 'white'
  },
  welcomeTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: 'white'
  },
  welcomeText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    opacity: 0.95
  },
  challenge: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  challengeTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#111827'
  },
  meta: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: '15px'
  },
  hintBtn: {
    margin: '10px 0',
    padding: '8px 16px',
    background: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  hint: {
    background: '#f3f4f6',
    padding: '15px',
    borderRadius: '6px',
    margin: '10px 0',
    border: '1px solid #e5e7eb'
  },
  code: {
    background: '#1f2937',
    color: '#f9fafb',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '0.875rem',
    overflowX: 'auto',
    whiteSpace: 'pre',
    fontFamily: 'monospace',
    marginBottom: '10px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '10px',
    boxSizing: 'border-box'
  },
  actions: {
    marginTop: '10px'
  },
  submit: {
    padding: '10px 20px',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  },
  submitDisabled: {
    padding: '10px 20px',
    background: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontSize: '1rem',
    fontWeight: '500'
  },
  result: {
    marginTop: '10px',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '0.875rem'
  },
  resultOk: {
    background: '#d1fae5',
    color: '#065f46',
    border: '1px solid #6ee7b7'
  },
  resultBad: {
    background: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fca5a5'
  },
  correctFlag: {
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#b91c1c'
  }
};

function Unix() {
  const location = useLocation();
  const level = location.state?.level || "Beginner";
  
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false, ch4: false });

  const handleChange = (key, value) => {
    setAnswers((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (key) => {
    const given = (answers[key] || "").trim().toLowerCase();
    let ok;
    
    if (key === 'ch1' || key === 'ch2') {
      // Case-insensitive matching for ch1 and ch2
      ok = given === EXPECTED[key].toLowerCase();
    } else {
      // Flag format validation for ch3 and ch4
      const flagRegex = /^flag\{.+\}$/;
      ok = flagRegex.test(given) && given === EXPECTED[key].toLowerCase();
    }
    
    setResults((r) => ({ ...r, [key]: ok }));
  };

  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  // compute which JSX block to render based on level
  const challengeContent = level === "Beginner" ? (
    <div>Placeholder for beginner challenges (temporarily disabled)</div>
  ) : level === "Intermediate" ? (
    <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
      <h3>Intermediate Challenges Coming Soon</h3>
      <p>Intermediate-level challenges for this topic are under development.</p>
    </div>
  ) : (
    <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
      <h3>Advanced Challenges Coming Soon</h3>
      <p>Advanced-level challenges for this topic are under development.</p>
    </div>
  );


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Unix - {level}</h1>
      <p style={styles.subtitle}>
        Welcome to the {level.toLowerCase()} level Unix fundamentals practice. Select a topic from the sidebar to begin. Below are challenges for the {level.toLowerCase()} level.
      </p>

      <div style={styles.welcomeBox}>
        <h2 style={styles.welcomeTitle}>🎯 Welcome to Neon Corp CTF - {level} Level</h2>
        <p style={styles.welcomeText}>
          {level === "Beginner" 
            ? "Master Unix fundamentals with these beginner-friendly challenges. Learn to identify file types, understand file permissions, analyze running processes, and navigate the UNIX file system. Each challenge builds essential system administration and penetration testing skills."
            : level === "Intermediate"
            ? "Take your Unix skills to the next level with intermediate challenges that require deeper understanding of system administration and scripting."
            : "Master advanced Unix techniques with expert-level challenges that test your comprehensive knowledge of system programming and security."
          }
        </p>
      </div>

      {challengeContent}
    </div>
  );
}

export default Unix;
