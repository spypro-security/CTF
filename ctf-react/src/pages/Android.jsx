import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EXPECTED = { 
  ch1: "FLAG{GOOGLE_CLOUD}", 
  ch2: "FLAG{LONG_TERM_EXPOSURE}",
  ch3: "FLAG{CLOUD_ENVIRONMENT}",
  ch4: "FLAG{FIRST_BOOT:2026-01-08:00}"
};

// intermediate-level correct flags
const EXPECTED_I = {
  // question1 has no flag
  ch2: "CTF{assets_are_public}",
  ch3: "HQX{admin:admin@123",
  ch4: "CTF{hidden_activity_exposed}"
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
  methodologyList: {
    marginTop: '10px',
    paddingLeft: '20px',
    color: '#374151',
    fontSize: '0.875rem',
    lineHeight: '1.6'
  },
  securityNote: {
    background: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '4px',
    padding: '10px',
    marginTop: '10px',
    fontSize: '0.875rem',
    color: '#92400e'
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
  },
  toolsList: {
    background: '#eff6ff',
    border: '1px solid #93c5fd',
    borderRadius: '4px',
    padding: '10px',
    marginTop: '10px',
    fontSize: '0.875rem'
  }
};

function Android() {
  const location = useLocation();
  const level = location.state?.level || "Beginner";

  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false, ch4: false });

  // intermediate state
  const [answersI, setAnswersI] = useState({ ch2: "", ch3: "", ch4: "" });
  const [resultsI, setResultsI] = useState({ ch2: null, ch3: null, ch4: null });
  const [showHintsI, setShowHintsI] = useState({ ch2: false, ch3: false, ch4: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  const handleChangeI = (k, v) => setAnswersI((s) => ({ ...s, [k]: v }));
  const handleSubmitI = (k) => setResultsI((r) => ({ ...r, [k]: (answersI[k] || "").trim() === EXPECTED_I[k] }));
  const toggleHintI = (k) => setShowHintsI((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Android Application Analysis</h1>
      <p style={styles.subtitle}>Android reverse engineering challenges from PentesterLab - Learn APK analysis and mobile security.</p>

      <div>
        {level === "Beginner" ? (
        <>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>QUESTION 1: Cloud Provider Used</h3>
          <p style={styles.description}>Task: Identify which cloud provider hosts the Android backend. Tool: Shodan. Hint: AWS / Google / Azure.</p>
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. FLAG{GOOGLE_CLOUD})"
            value={answers.ch1}
            onChange={(e) => handleChange('ch1', e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch1.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit('ch1')}
              disabled={!answers.ch1.trim()}
            >
              Submit
            </button>
            {results.ch1 !== null && (
              <div style={{ ...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad) }}>
                {results.ch1 ? "Correct!" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>QUESTION 2: Android Device Exposure Duration</h3>
          <p style={styles.description}>Task: Identify how long the Android device has been visible on the internet. Tool: Shodan.io. Hint: Check “Last Seen” and “First Seen”.</p>
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. FLAG{LONG_TERM_EXPOSURE})"
            value={answers.ch2}
            onChange={(e) => handleChange('ch2', e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch2.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit('ch2')}
              disabled={!answers.ch2.trim()}
            >
              Submit
            </button>
            {results.ch2 !== null && (
              <div style={{ ...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad) }}>
                {results.ch2 ? "Correct!" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>QUESTION 3: Android Network Environment Analysis</h3>
          <p style={styles.description}>Task: Identify whether the Android device is hosted in: Home network, Cloud, Corporate network. Tool: Shodan.io. Hint: Cloud providers are clearly named.</p>
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. FLAG{CLOUD_ENVIRONMENT})"
            value={answers.ch3}
            onChange={(e) => handleChange('ch3', e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch3.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit('ch3')}
              disabled={!answers.ch3.trim()}
            >
              Submit
            </button>
            {results.ch3 !== null && (
              <div style={{ ...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad) }}>
                {results.ch3 ? "Correct!" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>QUESTION 4: First seen device boot time</h3>
          <p style={styles.description}>File: eventlogs/ Task: Using ALE APP, identify the first boot event. Tool: ALEAPP. Hint: Look under- System Events -&gt; Boot Time</p>
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. FLAG{FIRST_BOOT:2026-01-08:00})"
            value={answers.ch4}
            onChange={(e) => handleChange('ch4', e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch4.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit('ch4')}
              disabled={!answers.ch4.trim()}
            >
              Submit
            </button>
            {results.ch4 !== null && (
              <div style={{ ...styles.result, ...(results.ch4 ? styles.resultOk : styles.resultBad) }}>
                {results.ch4 ? "Correct!" : "Incorrect"}
              </div>
            )}
          </div>
        </section>
        </>
        ) : (
        <>
        {/* Intermediate questions */}
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>Question 1 – Flag Discovery (APK Analysis)</h3>
          <p style={styles.description}>
            The bank provides an official Android application for customers. Analyze the mobile application and identify any sensitive information disclosure.
          </p>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>Question 2 – Find the hidden flag</h3>
          <p style={styles.description}>
            The APK contains a hidden file in the assets directory.
          </p>
          <div style={styles.meta}>Vulnerability Location: APK assets folder</div>

          <button style={styles.hintBtn} onClick={() => toggleHintI('ch2')}>
            {showHintsI.ch2 ? "Hide Methodology" : "Show Methodology"}
          </button>
          {showHintsI.ch2 && (
            <div style={styles.hint}>
              <strong>📋 How to solve:</strong>
              <ol style={styles.methodologyList}>
                <li>Download the APK file from the banking site</li>
                <li>Decode with apktool: <pre style={styles.code}>apktool d app.apk</pre></li>
                <li>Navigate into the <code>assets/</code> folder</li>
                <li>Open any suspicious files to reveal the flag</li>
              </ol>
            </div>
          )}

          <input style={styles.input} placeholder="Enter flag (e.g. CTF{...})" value={answersI.ch2} onChange={(e)=>handleChangeI('ch2', e.target.value)} />
          <div style={styles.actions}>
            <button style={answersI.ch2.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmitI('ch2')} disabled={!answersI.ch2.trim()}>Submit</button>
            {resultsI.ch2 !== null && (
              <div style={{...styles.result, ...(resultsI.ch2 ? styles.resultOk : styles.resultBad)}}>
                {resultsI.ch2 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>Question 3 – Credential Exposure</h3>
          <p style={styles.description}>
            The mobile banking application includes a login feature. Determine whether authentication credentials are securely implemented.
          </p>
          <div style={styles.meta}>Vulnerability Location: Hardcoded login logic in MainActivity</div>

          <button style={styles.hintBtn} onClick={() => toggleHintI('ch3')}>
            {showHintsI.ch3 ? "Hide Methodology" : "Show Methodology"}
          </button>
          {showHintsI.ch3 && (
            <div style={styles.hint}>
              <strong>📋 How to solve:</strong>
              <ol style={styles.methodologyList}>
                <li>Open the APK in jadx decompiler</li>
                <li>Search for strings like "admin" or "password"</li>
                <li>Inspect MainActivity or auth classes for hardcoded credentials</li>
              </ol>
            </div>
          )}

          <input style={styles.input} placeholder="Enter flag (e.g. HQX{...})" value={answersI.ch3} onChange={(e)=>handleChangeI('ch3', e.target.value)} />
          <div style={styles.actions}>
            <button style={answersI.ch3.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmitI('ch3')} disabled={!answersI.ch3.trim()}>Submit</button>
            {resultsI.ch3 !== null && (
              <div style={{...styles.result, ...(resultsI.ch3 ? styles.resultOk : styles.resultBad)}}>
                {resultsI.ch3 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>Question 4 – Secret Key Exposure</h3>
          <p style={styles.description}>
            The banking application communicates with backend services. Check whether any secret keys or sensitive tokens are exposed.
          </p>
          <div style={styles.meta}>Vulnerability Location: Base64 encoded string in utility class</div>

          <button style={styles.hintBtn} onClick={() => toggleHintI('ch4')}>
            {showHintsI.ch4 ? "Hide Methodology" : "Show Methodology"}
          </button>
          {showHintsI.ch4 && (
            <div style={styles.hint}>
              <strong>📋 How to solve:</strong>
              <ol style={styles.methodologyList}>
                <li>Search within jadx for common encodings</li>
                <li>Spot Base64-like strings in utility or config classes</li>
                <li>Decode with <code>base64 -d</code> to reveal the flag</li>
              </ol>
            </div>
          )}

          <input style={styles.input} placeholder="Enter flag (e.g. CTF{...})" value={answersI.ch4} onChange={(e)=>handleChangeI('ch4', e.target.value)} />
          <div style={styles.actions}>
            <button style={answersI.ch4.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmitI('ch4')} disabled={!answersI.ch4.trim()}>Submit</button>
            {resultsI.ch4 !== null && (
              <div style={{...styles.result, ...(resultsI.ch4 ? styles.resultOk : styles.resultBad)}}>
                {resultsI.ch4 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>
        </>
        )}
      </div>
    </div>
  );
}

export default Android;
