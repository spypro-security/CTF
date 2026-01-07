import React, { useState } from "react";

const EXPECTED = { 
  ch1: "flag{http_comment_leak}", 
  ch2: "flag{http_auth_leak}", 
  ch3: "flag{http_debug_exposed}"
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
    marginBottom: '30px'
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
    marginTop: '8px'
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

function Http() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HTTP - Mini CTF Practice Lab</h1>
      <p style={styles.subtitle}>HTTP protocol security challenges focusing on information disclosure vulnerabilities.</p>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: HTTP Header Comment Leak</h3>
          <p style={styles.description}>A web server claims that its HTTP response does not expose any sensitive information. However, developers sometimes leave important data inside HTTP comments or debug headers.</p>
          <div style={styles.meta}>Source File: ch1_http.txt</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>HTTP Response:</strong>
              <pre style={styles.code}>{`HTTP/1.1 200 OK
Server: Apache/2.4.41
Content-Type: text/html
<!--
flag{http_comment_leak}
-->
<html>
  <body>
    <h2>Welcome to Secure Server</h2>
    <p>No sensitive information is exposed.</p>
  </body>
</html>`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> Look carefully at the HTML comments in the response. Developers sometimes leave sensitive information in comments thinking they won't be visible.
              </p>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch1.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch1')} disabled={!answers.ch1.trim()}>Submit</button>
            {results.ch1 !== null && (
              <div style={{...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad)}}>
                {results.ch1 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch1}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 2: HTTP Authorization Header Leak</h3>
          <p style={styles.description}>A web application uses HTTP Basic Authentication. Sometimes developers accidentally expose sensitive information inside the Authorization header.</p>
          <div style={styles.meta}>Source File: ch2_http_auth.txt</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>HTTP Request:</strong>
              <pre style={styles.code}>{`GET /admin HTTP/1.1
Host: testsite.com
Authorization: Basic ZmxhZ3todHRwX2F1dGhfbGVha30=`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> The Authorization header contains Base64 encoded data. HTTP Basic Authentication encodes credentials in Base64 format. Try decoding the value after "Basic ". You can use an online Base64 decoder or the command: <code>echo "ZmxhZ3todHRwX2F1dGhfbGVha30=" | base64 -d</code>
              </p>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch2.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch2')} disabled={!answers.ch2.trim()}>Submit</button>
            {results.ch2 !== null && (
              <div style={{...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad)}}>
                {results.ch2 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch2}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 3: HTTP Debug Mode Enabled</h3>
          <p style={styles.description}>A server is running in debug mode and exposes internal information in the HTTP response body. Such misconfigurations can lead to information disclosure.</p>
          <div style={styles.meta}>Source File: ch3_http_debug.txt</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>HTTP Response:</strong>
              <pre style={styles.code}>{`HTTP/1.1 500 Internal Server Error
Content-Type: text/plain

Debug Info:
Database connection failed
Last known secret: flag{http_debug_exposed}`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> Debug mode should never be enabled in production! When servers run in debug mode, they often expose internal error messages, stack traces, and sensitive configuration details. Look for the "Last known secret" in the debug output.
              </p>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch3.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch3')} disabled={!answers.ch3.trim()}>Submit</button>
            {results.ch3 !== null && (
              <div style={{...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad)}}>
                {results.ch3 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch3}</span></>)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Http;