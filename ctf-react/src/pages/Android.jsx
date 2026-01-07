import React, { useState } from "react";

const EXPECTED = { 
  ch1: "flag{hardcoded_key_in_strings}", 
  ch2: "flag{sqlite_database_key}"
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
  const [answers, setAnswers] = useState({ ch1: "", ch2: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Android Application Analysis</h1>
      <p style={styles.subtitle}>Android reverse engineering challenges from PentesterLab - Learn APK analysis and mobile security.</p>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: Extracting Hardcoded Key from APK Resources</h3>
          <p style={styles.description}>
            In this challenge, an Android application (Android01.apk) was provided for analysis. The objective is to decompile the APK file and identify a hardcoded key hidden within the application's configuration files. This exercise introduces the basics of Android reverse engineering and demonstrates how sensitive information can be improperly stored in application resources.
          </p>
          <div style={styles.meta}>Source: Android01.apk → res/values/strings.xml</div>
          
          <div style={styles.toolsList}>
            <strong>🛠️ Tools Required:</strong> Kali Linux, apktool
          </div>

          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Methodology" : "Show Methodology"}
          </button>
          
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>📋 Step-by-Step Methodology:</strong>
              <ol style={styles.methodologyList}>
                <li>Download the APK file from PentesterLab</li>
                <li>Install and verify apktool in Kali Linux</li>
                <li>Decompile the APK using the command:
                  <pre style={styles.code}>apktool d Android01.apk</pre>
                </li>
                <li>Explore the generated directory to understand the application structure</li>
                <li>Navigate to the res/values directory</li>
                <li>Examine the strings.xml file:
                  <pre style={styles.code}>cat Android01/res/values/strings.xml</pre>
                </li>
                <li>Look for hardcoded keys stored in plaintext within the XML file</li>
              </ol>
              
              <div style={styles.securityNote}>
                <strong>🔐 Security Observation:</strong> Storing sensitive information such as keys in resource files makes Android applications vulnerable to reverse engineering. Such data should be stored securely on the server side or protected using encryption mechanisms.
              </div>
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
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Extracting Key from Embedded SQLite Database</h3>
          <p style={styles.description}>
            In this challenge, an Android application was provided that requires a PIN code to reveal a key. However, no PIN code was configured. The goal is to decompile the APK file, locate embedded database files, and extract the key stored within them. This challenge highlights the risks of storing sensitive information in unprotected local databases within mobile applications.
          </p>
          <div style={styles.meta}>Source: Android02.apk → assets/*.db or res/raw/*.sqlite</div>
          
          <div style={styles.toolsList}>
            <strong>🛠️ Tools Required:</strong> Kali Linux, apktool, sqlite3
          </div>

          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Methodology" : "Show Methodology"}
          </button>
          
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>📋 Step-by-Step Methodology:</strong>
              <ol style={styles.methodologyList}>
                <li>Download the APK file from PentesterLab</li>
                <li>Decompile the APK using apktool:
                  <pre style={styles.code}>apktool d Android02.apk</pre>
                </li>
                <li>Search for database files in the extracted directory:
                  <pre style={styles.code}>find . -name "*.db" -o -name "*.sqlite"</pre>
                </li>
                <li>Verify database names by examining AndroidManifest.xml</li>
                <li>Open the database file using sqlite3:
                  <pre style={styles.code}>sqlite3 database_name.db</pre>
                </li>
                <li>List available tables:
                  <pre style={styles.code}>.tables</pre>
                </li>
                <li>Query the tables to retrieve the key:
                  <pre style={styles.code}>SELECT * FROM table_name;</pre>
                </li>
              </ol>
              
              <div style={styles.securityNote}>
                <strong>🔐 Security Observation:</strong> Sensitive data stored in unencrypted SQLite databases can be easily extracted by attackers through APK reverse engineering. Proper encryption and secure storage practices (like Android KeyStore) are essential for protecting application data.
              </div>
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
          <div style={{background: '#eff6ff', padding: '15px', borderRadius: '6px', border: '1px solid #93c5fd'}}>
            <h4 style={{marginTop: 0, color: '#1e40af'}}>✅ Learning Outcomes</h4>
            <ul style={{...styles.methodologyList, marginBottom: 0}}>
              <li>Understanding APK structure and components</li>
              <li>Using apktool for Android reverse engineering</li>
              <li>Identifying insecure data storage practices in mobile apps</li>
              <li>Extracting information from SQLite databases</li>
              <li>Recognizing common Android security vulnerabilities</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Android;