import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EXPECTED = { 
  ch1: "flag{country}", 
  ch2: "flag{backend}", 
  ch3: "flag{cms}",
  ch4: "flag{hosting}"
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
  const location = useLocation();
  const level = location.state?.level || "Beginner";
  
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "", ch4: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null, ch4: null });
  const [showHints, setShowHints] = useState({ ch1: false, ch2: false, ch3: false, ch4: false });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => {
    const given = (answers[k] || "").trim().toLowerCase();
    const flagRegex = /^flag\{.+\}$/;
    const ok = flagRegex.test(given);
    setResults((r) => ({ ...r, [k]: ok }));
  };
  const toggleHint = (k) => setShowHints((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Essential Concepts - {level}</h1>
      <p style={styles.subtitle}>Understand essential cybersecurity concepts through {level.toLowerCase()} level Capture The Flag challenges.</p>

      {level === "Beginner" ? (
        <div>
          <div style={styles.conceptsBox}>
        <h3 style={styles.conceptTitle}>🎯 OSINT Reconnaissance Skills</h3>
        <ul style={styles.conceptList}>
          <li><strong>Shodan Search Engine</strong> - Find Internet-connected devices and identify server locations</li>
          <li><strong>Technology Fingerprinting</strong> - Identify backend web servers, CMS platforms, and frameworks</li>
          <li><strong>Infrastructure Analysis</strong> - Detect CDN providers, hosting companies, and DNS information</li>
          <li><strong>Passive Reconnaissance</strong> - Gather information without directly attacking the target</li>
        </ul>
        
        <div style={styles.securityBox}>
          <div style={styles.securityTitle}>🔐 Tools Used</div>
          <ul style={{...styles.conceptList, marginBottom: 0}}>
            <li><strong>Shodan.io</strong> - Search engine for Internet-connected devices</li>
            <li><strong>Wappalyzer</strong> - Browser extension for technology detection</li>
            <li><strong>BuiltWith</strong> - Website technology profiler</li>
            <li><strong>curl & dig</strong> - Command-line tools for HTTP headers and DNS queries</li>
          </ul>
        </div>
      </div>

      <div>
        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 1: Country Identification</h3>
          <p style={styles.description}>
            Using Shodan search engine, identify the country where a server is located. Geographical information helps attackers narrow down their target and understand infrastructure distribution.
          </p>
          <div style={styles.meta}>Tool: Shodan.io</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch1')}>
            {showHints.ch1 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch1 && (
            <div style={styles.hint}>
              <strong>💡 OSINT Technique: Geolocation via Shodan</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Shodan is a search engine specifically designed for finding Internet-connected devices and servers. It provides geolocation information, open ports, and other metadata.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Steps to identify country:</strong>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Visit <strong>Shodan.io</strong> and create a free account</li>
                <li>Search for a domain or IP address</li>
                <li>Look at the search results for "Location" information</li>
                <li>The country will be displayed in the geolocation data</li>
              </ul>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Try searching for any popular website like "amazon.com" and check the location information in results.
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{COUNTRY})" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch1.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch1')} disabled={!answers.ch1.trim()}>Submit</button>
            {results.ch1 !== null && (
              <div style={{...styles.result, ...(results.ch1 ? styles.resultOk : styles.resultBad)}}>
                {results.ch1 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 2: Backend Technology Detection</h3>
          <p style={styles.description}>
            Identify the backend web server technology powering a website. Different web servers (Nginx, Apache, IIS) have known vulnerabilities that attackers can exploit.
          </p>
          <div style={styles.meta}>Tools: Wappalyzer, BuiltWith, HTTP Headers</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch2')}>
            {showHints.ch2 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch2 && (
            <div style={styles.hint}>
              <strong>💡 OSINT Technique: Technology Fingerprinting</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Web servers often reveal their identity through HTTP response headers, error pages, or distinctive patterns in responses.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Methods to identify backend technology:</strong>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Install <strong>Wappalyzer</strong> browser extension</li>
                <li>Use <strong>BuiltWith</strong> online tool at builtwith.com</li>
                <li>Check HTTP headers: <code>curl -I website.com</code></li>
                <li>Common backends: <strong>Nginx, Apache, IIS, Node.js</strong></li>
              </ul>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Visit any website and use Wappalyzer to see the technology stack revealed instantly.
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{NGINX})" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch2.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch2')} disabled={!answers.ch2.trim()}>Submit</button>
            {results.ch2 !== null && (
              <div style={{...styles.result, ...(results.ch2 ? styles.resultOk : styles.resultBad)}}>
                {results.ch2 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 3: CMS Detection</h3>
          <p style={styles.description}>
            Identify the Content Management System (CMS) used by a website. Popular CMS platforms like WordPress have numerous plugins and known vulnerabilities.
          </p>
          <div style={styles.meta}>Tool: Wappalyzer</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch3')}>
            {showHints.ch3 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch3 && (
            <div style={styles.hint}>
              <strong>💡 OSINT Technique: CMS Fingerprinting</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                WordPress, Drupal, Joomla, and other CMSs have distinctive file structures and patterns that make them easy to identify.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Methods to identify CMS:</strong>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Install <strong>Wappalyzer</strong> browser extension</li>
                <li>Check for CMS-specific URLs: <code>/wp-admin/, /admin/, /index.php?</code></li>
                <li>Look for common CMS files and directories</li>
                <li>Common CMSs: <strong>WordPress, Drupal, Joomla, Magento</strong></li>
              </ul>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Many websites use WordPress. Try checking any popular blog or news site with Wappalyzer.
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{WORDPRESS})" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch3.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch3')} disabled={!answers.ch3.trim()}>Submit</button>
            {results.ch3 !== null && (
              <div style={{...styles.result, ...(results.ch3 ? styles.resultOk : styles.resultBad)}}>
                {results.ch3 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <h3 style={styles.challengeTitle}>CHALLENGE 4: Hosting Provider Identification</h3>
          <p style={styles.description}>
            Identify the hosting provider or Content Delivery Network (CDN) used by a website. Different providers have different infrastructure and security practices.
          </p>
          <div style={styles.meta}>Tool: BuiltWith</div>
          
          <button style={styles.hintBtn} onClick={() => toggleHint('ch4')}>
            {showHints.ch4 ? "Hide Hint" : "Show Hint"}
          </button>
          
          {showHints.ch4 && (
            <div style={styles.hint}>
              <strong>💡 OSINT Technique: Infrastructure Analysis</strong>
              <p style={{marginTop: '8px', fontSize: '0.875rem', color: '#374151'}}>
                Hosting providers and CDNs can be identified through DNS records, IP address ownership, and service headers.
              </p>
              <strong style={{display: 'block', marginTop: '12px'}}>Methods to identify hosting:</strong>
              <ul style={{fontSize: '0.875rem', color: '#6b7280', marginLeft: '20px'}}>
                <li>Use <strong>BuiltWith</strong> tool at builtwith.com</li>
                <li>Use <strong>Wappalyzer</strong> browser extension</li>
                <li>Use WHOIS lookup with <code>whois domain.com</code></li>
                <li>Common CDNs: <strong>Cloudflare, AWS, Akamai, Fastly</strong></li>
              </ul>
              <p style={{marginTop: '10px', fontSize: '0.875rem', color: '#6b7280'}}>
                <strong>Hint:</strong> Many websites use Cloudflare for DDoS protection. Check any site with BuiltWith tool.
              </p>
            </div>
          )}
          
          <input style={styles.input} placeholder="Enter flag (e.g. flag{CLOUDFLARE})" value={answers.ch4} onChange={(e)=>handleChange('ch4', e.target.value)} />
          <div style={styles.actions}>
            <button style={answers.ch4.trim() ? styles.submit : styles.submitDisabled} onClick={()=>handleSubmit('ch4')} disabled={!answers.ch4.trim()}>Submit</button>
            {results.ch4 !== null && (
              <div style={{...styles.result, ...(results.ch4 ? styles.resultOk : styles.resultBad)}}>
                {results.ch4 ? "Correct! ✅" : "Incorrect"}
              </div>
            )}
          </div>
        </section>

        <section style={styles.challenge}>
          <div style={{background: '#eff6ff', padding: '15px', borderRadius: '6px', border: '1px solid #93c5fd'}}>
            <h4 style={{marginTop: 0, color: '#1e40af'}}>📚 Conclusion</h4>
            <p style={{color: '#374151', lineHeight: '1.6', marginBottom: 0}}>
              You've mastered essential OSINT reconnaissance techniques! Using tools like Shodan, Wappalyzer, and BuiltWith, you can identify server locations, technology stacks, CMS platforms, and hosting infrastructure without ever directly attacking the target. These passive reconnaissance skills are crucial for understanding your target before launching any offensive security assessment.
            </p>
          </div>
        </section>
        </div>
        </div>
      ) : level === "Intermediate" ? (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Intermediate Challenges Coming Soon</h3>
          <p>Intermediate-level Essential challenges are under development.</p>
        </div>
      ) : (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Advanced Challenges Coming Soon</h3>
          <p>Advanced-level Essential challenges are under development.</p>
        </div>
      )}
    </div>
  );
}

export default Essential;