import React, { useState } from "react";

const EXPECTED = { 
  ch1: "flag{hidden_in_comments}", 
  ch2: "flag{base64_decoded}", 
  ch3: "flag{log_leaked}"
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
  conceptTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#111827'
  },
  conceptList: {
    marginLeft: '20px',
    color: '#374151',
    lineHeight: '1.8',
    marginBottom: '10px'
  },
  securityBox: {
    background: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '6px',
    padding: '15px',
    marginTop: '15px'
  },
  securityTitle: {
    fontWeight: '600',
    color: '#92400e',
    marginBottom: '8px'
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

function Essential() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Essential Concepts - Mini CTF Practice</h1>
      <p style={styles.subtitle}>Understand essential cybersecurity concepts through simple Capture The Flag challenges.</p>

      <div style={styles.conceptsBox}>
        <h3 style={styles.conceptTitle}>🎯 Essential Concepts Covered</h3>
        <ul style={styles.conceptList}>
          <li><strong>Information Disclosure</strong> - Sensitive data may be hidden inside comments, unused code, or metadata</li>
          <li><strong>Hidden Data in Files</strong> - Attackers often inspect files carefully to locate such information</li>
          <li><strong>Encoding and Decoding</strong> - Methods like Base64 and Hex are reversible and not secure</li>
          <li><strong>Log Analysis</strong> - Debug logs may expose confidential tokens, keys, or internal data</li>
        </ul>
        
        <div style={styles.securityBox}>
          <div style={styles.securityTitle}>🔐 Security Best Practices</div>
          <ul style={{...styles.conceptList, marginBottom: 0}}>
            <li>Remove comments before deployment</li>
            <li>Never store secrets in source code</li>
            <li>Secure and monitor log files</li>
            <li>Use encryption, not encoding, for sensitive data</li>
          </ul>
        </div>
      </div>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: Hidden in Comments</h3>
          <p style={styles.description}>
            Developers may forget to remove comments that contain sensitive data. Comments in source code are often overlooked but remain accessible to anyone who can view the code.
          </p>
          <div style={styles.meta}>Source File: ch1_note.txt</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>💡 Concept: Hidden Information</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Sensitive data may be hidden inside comments, unused code, or metadata. Attackers often inspect files carefully to locate such information.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Example Source:</strong>
              <pre style={styles.code}>{`<!-- This is a public page -->
<html>
  <body>
    <h1>Welcome</h1>
    <!-- TODO: Remove this before production
         API_KEY: flag{hidden_in_comments}
    -->
  </body>
</html>`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Look for HTML comments (&lt;!-- --&gt;), JavaScript comments (// or /* */), or any commented-out code that might contain sensitive information.
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch1.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch1')} disabled={!answers.ch1.trim()}>Submit</button>
            {results.ch1 !== null && (
              <div style={{...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad)}}>
                {results.ch1 ? "Correct! ✅" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch1}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Base Trouble</h3>
          <p style={styles.description}>
            Encoded data was found in a JavaScript file. Encoding methods like Base64 are used for data representation, not protection. They are easily reversible.
          </p>
          <div style={styles.meta}>Source File: ch2_script.js</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>💡 Concept: Encoding vs Encryption</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Encoding methods like Base64 and Hex are reversible and not secure. They are commonly used for data representation, not protection. Anyone can decode them!
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Example Source:</strong>
              <pre style={styles.code}>{`// JavaScript configuration
const config = {
  apiEndpoint: "/api/v1",
  secret: "ZmxhZ3tiYXNlNjRfZGVjb2RlZH0="
};`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> The string ends with "=" which is a common Base64 padding character. Decode it using an online Base64 decoder or command: <code>echo "string" | base64 -d</code>
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch2.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch2')} disabled={!answers.ch2.trim()}>Submit</button>
            {results.ch2 !== null && (
              <div style={{...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad)}}>
                {results.ch2 ? "Correct! ✅" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch2}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 3: Leaked Logs</h3>
          <p style={styles.description}>
            Sensitive data was found inside system logs. Debug logs may expose confidential tokens, keys, or internal data if not properly sanitized before being written to disk or sent to logging services.
          </p>
          <div style={styles.meta}>Source File: ch3_logs.txt</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>💡 Concept: Log File Leakage</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Debug logs may expose confidential tokens, keys, or internal data if not properly sanitized. Logs are often overlooked as a security risk but can contain valuable information for attackers.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Example Log File:</strong>
              <pre style={styles.code}>{`[2024-01-15 10:23:45] INFO: Application started
[2024-01-15 10:23:46] DEBUG: Loading configuration
[2024-01-15 10:23:47] DEBUG: API Key: flag{log_leaked}
[2024-01-15 10:23:48] INFO: Server listening on port 8080
[2024-01-15 10:23:49] ERROR: Failed to connect to database`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Look for DEBUG level logs or any entries that contain credentials, tokens, API keys, or sensitive configuration data. Grep for keywords like "key", "token", "password", "secret", or "flag".
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch3.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch3')} disabled={!answers.ch3.trim()}>Submit</button>
            {results.ch3 !== null && (
              <div style={{...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad)}}>
                {results.ch3 ? "Correct! ✅" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch3}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <div style={{background: '#eff6ff', padding: '15px', borderRadius: '6px', border: '1px solid #93c5fd'}}>
            <h4 style={{marginTop: 0, color: '#1e40af'}}>📚 Conclusion</h4>
            <p style={{color: '#374151', lineHeight: '1.6', marginBottom: 0}}>
              Understanding these essential concepts helps prevent common security mistakes and strengthens basic cybersecurity awareness. Always remember: encoding is not encryption, comments are not private, and logs can be treasure troves of sensitive information for attackers.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Essential;