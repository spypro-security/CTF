import React, { useState } from "react";

const EXPECTED = {
  ch1: "flag{hidden_in_comments}",
  ch2: "flag{base64_decoded}",
  ch3: "flag{log_leaked}",
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

function Introduction() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false });

  const handleChange = (key, value) => {
    setAnswers((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (key) => {
    const given = (answers[key] || "").trim();
    const ok = given === EXPECTED[key];
    setResults((r) => ({ ...r, [key]: ok }));
  };

  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Introduction</h1>
      <p style={styles.subtitle}>
        Welcome to the practice introduction. Select a topic from the sidebar to begin. Below are three simple penetration-testing style questions to try.
      </p>

      <div style={styles.welcomeBox}>
        <h2 style={styles.welcomeTitle}>🎯 Welcome to Neon Corp CTF</h2>
        <p style={styles.welcomeText}>
          Get started with these beginner-friendly challenges. Learn to find hidden information, decode encoded data, and analyze logs for security vulnerabilities. Each challenge builds essential penetration testing skills.
        </p>
      </div>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: Hidden in Comments</h3>
          <div style={styles.meta}>Source: ch1_note.txt</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Source" : "Show Source"}
          </button>
          
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>📄 Source File Content:</strong>
              <pre style={styles.code}>{`Welcome to Neon Corp Internal Network.
All systems are operational.
No secrets are stored here.

/*
flag{hidden_in_comments}
*/`}</pre>
              <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '10px'}}>
                <strong>💡 Hint:</strong> Developers sometimes leave sensitive information in code comments. Look for patterns like /* */ or // in source files. Comments are meant to be ignored by programs but are visible to anyone who inspects the code.
              </p>
            </div>
          )}

          {!showHints.ch1 && (
            <pre style={styles.code}>{`Welcome to Neon Corp Internal Network.
All systems are operational.
No secrets are stored here.

/*
flag{hidden_in_comments}
*/`}</pre>
          )}
          
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch1}
            onChange={(e) => handleChange("ch1", e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch1.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit("ch1")}
              disabled={!answers.ch1.trim()}
            >
              Submit
            </button>
            {results.ch1 !== null && (
              <div style={{...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad)}}>
                {results.ch1 ? "Correct! ✅" : (
                  <>
                    Incorrect — correct:
                    <span style={styles.correctFlag}>{EXPECTED.ch1}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Base Trouble</h3>
          <div style={styles.meta}>Source: ch2_script.js</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>💡 Decoding Hint:</strong>
              <p style={{fontSize: '0.875rem', color: '#374151', marginTop: '8px'}}>
                The string ends with "=" which is a Base64 padding character. Base64 is a common encoding scheme used to represent binary data in ASCII format. It's NOT encryption - anyone can decode it!
              </p>
              <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '8px'}}>
                <strong>How to decode:</strong>
              </p>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Use an online Base64 decoder</li>
                <li>Command line: <code>echo "string" | base64 -d</code></li>
                <li>Browser console: <code>atob("string")</code></li>
              </ul>
            </div>
          )}

          <pre style={styles.code}>{`const secret = "ZmxhZ3tiYXNlNjRfZGVjb2RlZH0=";`}</pre>
          
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch2}
            onChange={(e) => handleChange("ch2", e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch2.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit("ch2")}
              disabled={!answers.ch2.trim()}
            >
              Submit
            </button>
            {results.ch2 !== null && (
              <div style={{...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad)}}>
                {results.ch2 ? "Correct! ✅" : (
                  <>
                    Incorrect — correct:
                    <span style={styles.correctFlag}>{EXPECTED.ch2}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 3: Leaked Logs</h3>
          <div style={styles.meta}>Source: ch3_logs.txt</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>💡 Decoding Hint:</strong>
              <p style={{fontSize: '0.875rem', color: '#374151', marginTop: '8px'}}>
                This looks like hexadecimal encoding! Hex is another way to represent data, often used in logs and debugging output. Each pair of characters represents one byte.
              </p>
              <p style={{fontSize: '0.875rem', color: '#6b7280', marginTop: '8px'}}>
                <strong>How to decode hex:</strong>
              </p>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Use an online hex to ASCII converter</li>
                <li>Command line: <code>echo "hex" | xxd -r -p</code></li>
                <li>Python: <code>bytes.fromhex("hex").decode()</code></li>
              </ul>
            </div>
          )}

          <pre style={styles.code}>{`[DEBUG] Generated token: 666c61677b6c6f675f6c65616b65647d`}</pre>
          
          <input
            style={styles.input}
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch3}
            onChange={(e) => handleChange("ch3", e.target.value)}
          />
          <div style={styles.actions}>
            <button
              style={answers.ch3.trim() ? styles.submit : styles.submitDisabled}
              onClick={() => handleSubmit("ch3")}
              disabled={!answers.ch3.trim()}
            >
              Submit
            </button>
            {results.ch3 !== null && (
              <div style={{...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad)}}>
                {results.ch3 ? "Correct! ✅" : (
                  <>
                    Incorrect — correct:
                    <span style={styles.correctFlag}>{EXPECTED.ch3}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <div style={{background: '#eff6ff', padding: '15px', borderRadius: '6px', border: '1px solid #93c5fd'}}>
            <h4 style={{marginTop: 0, color: '#1e40af'}}>🎓 Next Steps</h4>
            <p style={{color: '#374151', lineHeight: '1.6', marginBottom: 0}}>
              Great job completing the introduction challenges! You've learned how to find hidden information in comments, decode Base64 and hexadecimal data, and analyze debug logs. Ready for more? Select a topic from the sidebar to continue your penetration testing journey.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Introduction;