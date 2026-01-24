import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ctf.css";

const EXPECTED = {
  ch1: "flag{unix_placeholder_1}",
  ch2: "flag{unix_placeholder_2}",
  ch3: "flag{unix_placeholder_3}",
};

function Unix() {
  const location = useLocation();
  const level = location.state?.level || "Beginner";
  
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null });

  const handleChange = (key, value) => {
    setAnswers((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (key) => {
    const given = (answers[key] || "").trim();
    const ok = given === EXPECTED[key];
    setResults((r) => ({ ...r, [key]: ok }));
  };

  return (
    <div className="ctf-container">
      <h1 className="ctf-title">Unix - {level}</h1>
      <p className="ctf-subtitle">Unix fundamentals practice - {level.toLowerCase()} level. {level === "Beginner" ? "Replace the placeholders below with real challenges." : "Advanced Unix challenges coming soon."}</p>

      {level === "Beginner" ? (
        <div className="ctf-list">
          <section className="ctf-challenge">
          <h3>CHALLENGE 1</h3>
          <div className="ctf-meta">Source: ch1_unix.txt</div>
          <pre className="ctf-code">{`# Example: list files and find hidden flag
ls -la`}</pre>
          <input
            className="ctf-input"
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch1}
            onChange={(e) => handleChange("ch1", e.target.value)}
          />
          <div className="ctf-actions">
            <button
              className="ctf-submit"
              onClick={() => handleSubmit("ch1")}
              disabled={!answers.ch1.trim()}
            >
              Submit
            </button>
            {results.ch1 !== null && (
              <div className={`ctf-result ${results.ch1 ? "ok" : "bad"}`}>
                {results.ch1 ? "Correct!" : (
                  <>
                    Incorrect — correct:
                    <span className="ctf-correct-flag">{EXPECTED.ch1}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="ctf-challenge">
          <h3>CHALLENGE 2</h3>
          <div className="ctf-meta">Source: ch2_unix.sh</div>
          <pre className="ctf-code">{`# Example placeholder`}</pre>
          <input
            className="ctf-input"
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch2}
            onChange={(e) => handleChange("ch2", e.target.value)}
          />
          <div className="ctf-actions">
            <button
              className="ctf-submit"
              onClick={() => handleSubmit("ch2")}
              disabled={!answers.ch2.trim()}
            >
              Submit
            </button>
            {results.ch2 !== null && (
              <div className={`ctf-result ${results.ch2 ? "ok" : "bad"}`}>
                {results.ch2 ? "Correct!" : (
                  <>
                    Incorrect — correct:
                    <span className="ctf-correct-flag">{EXPECTED.ch2}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="ctf-challenge">
          <h3>CHALLENGE 3</h3>
          <div className="ctf-meta">Source: ch3_unix.log</div>
          <pre className="ctf-code">{`# Placeholder log`}</pre>
          <input
            className="ctf-input"
            placeholder="Enter flag (e.g. flag{...})"
            value={answers.ch3}
            onChange={(e) => handleChange("ch3", e.target.value)}
          />
          <div className="ctf-actions">
            <button
              className="ctf-submit"
              onClick={() => handleSubmit("ch3")}
              disabled={!answers.ch3.trim()}
            >
              Submit
            </button>
            {results.ch3 !== null && (
              <div className={`ctf-result ${results.ch3 ? "ok" : "bad"}`}>
                {results.ch3 ? "Correct!" : (
                  <>
                    Incorrect — correct:
                    <span className="ctf-correct-flag">{EXPECTED.ch3}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
        </div>
      ) : level === "Intermediate" ? (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Intermediate Challenges Coming Soon</h3>
          <p>Intermediate-level Unix challenges are under development.</p>
        </div>
      ) : (
        <div style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', textAlign: 'center'}}>
          <h3>Advanced Challenges Coming Soon</h3>
          <p>Advanced-level Unix challenges are under development.</p>
        </div>
      )}
    </div>
  );
}

export default Unix;
