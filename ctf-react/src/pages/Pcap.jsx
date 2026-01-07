import React, { useState } from "react";

const EXPECTED = { 
  ch1: "PL{192.168.56.103}", 
  ch2: "PL{9e107d9d372bb6826bd81d3542a419d6}", 
  ch3: "PL{10.10.14.8}",
  ch4: "PL{15:22:41}"
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

function Pcap() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false, ch4: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PCAP Badge - Medium Level</h1>
      <p style={styles.subtitle}>Network security incident analysis challenges using Wireshark.</p>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: First Compromised Host</h3>
          <p style={styles.description}>During a network security incident, multiple internal hosts generated traffic. Analyze the PCAP to determine which internal IP address initiated suspicious communication earliest in the timeline.</p>
          <div style={styles.meta}>Source: PentesterLab - PCAP Badge (Traffic Timeline Analysis)</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Hint" : "Show Hint"}
          </button>
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>Practical Method:</strong>
              <pre style={styles.code}>{`1. Open the PCAP file in Wireshark
2. Navigate to: Statistics → Conversations → IPv4
3. Sort conversations by Start Time
4. Identify the earliest internal IP that:
   - Communicates with an external IP
   - Uses suspicious protocols such as HTTP or DNS
   - Correlate with abnormal traffic volume`}</pre>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. PL{...})" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
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
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Malware File Hash</h3>
          <p style={styles.description}>Hashing downloaded malware is essential for threat intelligence, detection, and incident correlation. Calculate the MD5 hash of the malicious file identified in the PCAP.</p>
          <div style={styles.meta}>Source: PentesterLab - File Analysis Labs</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Hint" : "Show Hint"}
          </button>
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>Practical Method:</strong>
              <pre style={styles.code}>{`1. Export the file from Wireshark
2. Use Linux terminal:
   md5sum updater.exe
3. Record the output hash value`}</pre>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. PL{...})" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
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
          <h3 style={styles.challengeTitle}>CHALLENGE 3: Brute Force Attacker IP</h3>
          <p style={styles.description}>Repeated authentication attempts from the same source often indicate a brute force attack. Analyze the PCAP to identify the source IP address responsible for the brute force attempt.</p>
          <div style={styles.meta}>Source: PentesterLab - Authentication Attack Labs</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Hint" : "Show Hint"}
          </button>
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>Practical Method:</strong>
              <pre style={styles.code}>{`1. Filter login requests:
   http.request.method == "POST"
2. Identify repeated authentication attempts
3. Observe the same source IP sending multiple login requests
4. Confirm attack pattern`}</pre>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. PL{...})" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
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
          <h3 style={styles.challengeTitle}>CHALLENGE 4: Successful Login Timestamp</h3>
          <p style={styles.description}>After brute force attempts, attackers usually succeed once correct credentials are found. Determine the exact timestamp when authentication was successful.</p>
          <div style={styles.meta}>Source: PentesterLab - PCAP Timeline Analysis</div>
          <button style={styles.hintBtn} onClick={() => toggleHint('ch4')}>
            {showHints.ch4 ? "Hide Hint" : "Show Hint"}
          </button>
          {showHints.ch4 && (
            <div style={styles.hint}>
              <strong>Practical Method:</strong>
              <pre style={styles.code}>{`1. Continue analyzing HTTP POST traffic
2. Compare response codes:
   - Failed: 401, 403
   - Successful: 200, 302
3. Note timestamp of the first successful response`}</pre>
            </div>
          )}
          <input style={styles.input} placeholder="Enter flag (e.g. PL{...})" value={answers.ch4} onChange={(e)=>handleChange('ch4', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch4.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch4')} disabled={!answers.ch4.trim()}>Submit</button>
            {results.ch4 !== null && (
              <div style={{...styles.result, ...(results.ch4 ? styles.resultOk : styles.resultBad)}}>
                {results.ch4 ? "Correct!" : (<>Incorrect — correct: <span style={styles.correctFlag}>{EXPECTED.ch4}</span></>)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Pcap;