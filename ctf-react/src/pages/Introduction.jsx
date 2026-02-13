import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EXPECTED = {
  ch1: "http",
  ch2: "HTTP Cookie",
  ch3: "any HTTP packet with long encoded cookie value",
  ch4: "Cookie header",
  ch5: "Base64"
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
    marginBottom: '20px'
  },
  conceptsBox: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
  description: {
    marginBottom: '15px',
    color: '#374151',
    lineHeight: '1.6'
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

function Introduction() {
  const location = useLocation();
  const level = location.state?.level || "Beginner";
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null, ch5: null });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const validate = (k, val) => {
    const v = (val || "").trim();
    switch(k){
      case 'ch1': return v.toLowerCase() === 'http';
      case 'ch2': return v.toLowerCase() === 'http cookie';
      case 'ch3': return v.length > 0;
      case 'ch4': return v.toLowerCase() === 'cookie header';
      case 'ch5': return v.toLowerCase().includes('base64');
      default: return false;
    }
  };
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: validate(k, answers[k]) }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Introduction - {level}</h1>
      <p style={styles.subtitle}>Serialization-based challenges - {level.toLowerCase()} level. {level === "Beginner" ? "Replace content below." : "Advanced challenges coming soon."}</p>

      {level === "Beginner" ? (
        <div>
          <section style={styles.challenge}>
            <h3 style={styles.challengeTitle}>QUESTION 1: Identify the Application Protocol</h3>
            <p style={styles.description}>Task: Open the PCAP file and identify the main protocol used to transfer serialized data. Hint: Most serialized objects in web apps travel over HTTP.</p>
            <input style={styles.input} placeholder="Enter answer (http)" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
            <div style={styles.actions}>
              <button style={answers.ch1.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch1')} disabled={!answers.ch1.trim()}>Submit</button>
              {results.ch1 !== null && (
                <div style={{...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad)}}>
                  {results.ch1 ? "Correct!" : (<>Incorrect — expected something like <span style={styles.correctFlag}>{EXPECTED.ch1}</span></>)}
                </div>
              )}
            </div>
          </section>

          <section style={styles.challenge}>
            <h3 style={styles.challengeTitle}>QUESTION 2: Where Is the Serialized Data Located?</h3>
            <p style={styles.description}>In which part of the HTTP request does the serialized or encoded data appear?</p>
            <input style={styles.input} placeholder="Enter answer (HTTP Cookie)" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
            <div style={styles.actions}>
              <button style={answers.ch2.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch2')} disabled={!answers.ch2.trim()}>Submit</button>
              {results.ch2 !== null && (
                <div style={{...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad)}}>
                  {results.ch2 ? "Correct!" : (<>Incorrect — expected <span style={styles.correctFlag}>{EXPECTED.ch2}</span></>)}
                </div>
              )}
            </div>
          </section>

          <section style={styles.challenge}>
            <h3 style={styles.challengeTitle}>QUESTION 3: Find Packet Carrying Serialized Data</h3>
            <p style={styles.description}>Task: Find one packet number that contains encoded/serialized data. Tool Steps: Filter http, click packets, look for long encoded strings in request.</p>
            <input style={styles.input} placeholder="Enter any packet description" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
            <div style={styles.actions}>
              <button style={answers.ch3.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch3')} disabled={!answers.ch3.trim()}>Submit</button>
              {results.ch3 !== null && (
                <div style={{...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad)}}>
                  {results.ch3 ? "Correct!" : (<>Incorrect — any HTTP packet with long encoded cookie value works.</>)}
                </div>
              )}
            </div>
          </section>

          <section style={styles.challenge}>
            <h3 style={styles.challengeTitle}>QUESTION 4: Locate Serialized Data Location</h3>
            <p style={styles.description}>Task: Identify where exactly the serialized data is present.</p>
            <input style={styles.input} placeholder="Enter answer (Cookie header)" value={answers.ch4} onChange={(e)=>handleChange('ch4', e.target.value)} />
            <div style={styles.actions}>
              <button style={answers.ch4.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch4')} disabled={!answers.ch4.trim()}>Submit</button>
              {results.ch4 !== null && (
                <div style={{...styles.result, ...(results.ch4 ? styles.resultOk : styles.resultBad)}}>
                  {results.ch4 ? "Correct!" : (<>Incorrect — expected <span style={styles.correctFlag}>{EXPECTED.ch4}</span></>)}
                </div>
              )}
            </div>
          </section>

          <section style={styles.challenge}>
            <h3 style={styles.challengeTitle}>QUESTION 5: Identify Encoding Pattern</h3>
            <p style={styles.description}>Task: Using Wireshark output, identify the encoding style used. Look at cookie value characters: A–Z a–z 0–9 + / =</p>
            <input style={styles.input} placeholder="Enter answer (Base64)" value={answers.ch5} onChange={(e)=>handleChange('ch5', e.target.value)} />
            <div style={styles.actions}>
              <button style={answers.ch5.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch5')} disabled={!answers.ch5.trim()}>Submit</button>
              {results.ch5 !== null && (
                <div style={{...styles.result, ...(results.ch5 ? styles.resultOk : styles.resultBad)}}>
                  {results.ch5 ? "Correct!" : (<>Incorrect — expected something like <span style={styles.correctFlag}>{EXPECTED.ch5}</span></>)}
                </div>
              )}
            </div>
          </section>
        </div>
      ) : level === "Intermediate" ? (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Intermediate Challenges Coming Soon</h3>
          <p>Intermediate-level Serialize challenges are under development.</p>
        </div>
      ) : (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Advanced Challenges Coming Soon</h3>
          <p>Advanced-level Serialize challenges are under development.</p>
        </div>
      )}
    </div>
  );
}

export default Introduction;
