import React, { useState } from "react";

const EXPECTED = { 
  ch1: "flag{hardcoded_credentials}", 
  ch2: "flag{authentication_bypass}", 
  ch3: "flag{jwt_signature_not_verified}",
  ch4: "flag{missing_authorization}",
  ch5: "flag{authorization_missing}"
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

function Auth() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "", ch5: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null, ch5: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false, ch4: false, ch5: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Authentication & Authorization</h1>
      <p style={styles.subtitle}>Common authentication and authorization vulnerabilities in web applications.</p>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: Hardcoded Login</h3>
          <p style={styles.description}>A developer left authentication credentials inside a backend configuration file.</p>
          <div style={styles.meta}>Source File: auth_config.txt</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>Source Code:</strong>
              <pre style={styles.code}>{`APP_NAME=SecureApp
ADMIN_USER=admin
ADMIN_PASS=admin@123`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> Look for hardcoded credentials in configuration files. What security risk does storing credentials in plaintext pose?
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
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Authentication Bypass</h3>
          <p style={styles.description}>A login function checks only the username and ignores the password.</p>
          <div style={styles.meta}>Source File: login.js</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>Source Code:</strong>
              <pre style={styles.code}>{`function login(username, password) {
  if (username === "admin") {
    return true;
  }
}`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> Notice that the password parameter is never checked. Anyone knowing the username can authenticate without a valid password.
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
          <h3 style={styles.challengeTitle}>CHALLENGE 3: Weak JWT Validation</h3>
          <p style={styles.description}>An application decodes a JWT token but does not verify its signature.</p>
          <div style={styles.meta}>Source File: auth.js</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>Source Code:</strong>
              <pre style={styles.code}>{`const user = jwt.decode(token);
if (user.role === "admin") {
  grantAccess();
}`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> The code uses <code>jwt.decode()</code> which only decodes the token without verifying its signature. Use <code>jwt.verify()</code> instead to ensure the token hasn't been tampered with.
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

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 4: Missing Authorization Check</h3>
          <p style={styles.description}>An admin endpoint is accessible to any logged-in user.</p>
          <div style={styles.meta}>Source File: admin_route.js</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch4')}>
            {showHints.ch4 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch4 && (
            <div style={styles.hint}>
              <strong>Source Code:</strong>
              <pre style={styles.code}>{`app.get("/admin", (req, res) => {
  res.send("Welcome Admin");
});`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> The endpoint has no authorization check. Any user can access the admin route without verifying if they have admin privileges.
              </p>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch4} onChange={(e)=>handleChange('ch4', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch4.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch4')} disabled={!answers.ch4.trim()}>Submit</button>
            {results.ch4 !== null && (
              <div style={{...styles.result, ...(results.ch4 ? styles.resultOk : styles.resultBad)}}>
                {results.ch4 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch4}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 5: Authenticated but Not Authorized</h3>
          <p style={styles.description}>A normal user logs in successfully but accesses an admin-only feature.</p>
          <div style={styles.meta}>Source File: access_control.js</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch5')}>
            {showHints.ch5 ? "Hide Source" : "Show Source"}
          </button>
          {showHints.ch5 && (
            <div style={styles.hint}>
              <strong>Source Code:</strong>
              <pre style={styles.code}>{`if (req.isAuthenticated()) {
  deleteUser();
}`}</pre>
              <p style={{marginTop: '10px', fontSize: '0.875rem'}}>
                <strong>Hint:</strong> The code checks if the user is authenticated but doesn't verify if they're authorized to perform the deleteUser() action. Authentication ≠ Authorization!
              </p>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. flag{...})" value={answers.ch5} onChange={(e)=>handleChange('ch5', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch5.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch5')} disabled={!answers.ch5.trim()}>Submit</button>
            {results.ch5 !== null && (
              <div style={{...styles.result, ...(results.ch5 ? styles.resultOk : styles.resultBad)}}>
                {results.ch5 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch5}</span></>)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Auth;