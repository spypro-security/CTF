import React, { useState } from "react";
import "./ctf.css";

const EXPECTED = {
  ch1: "flag{hidden_in_comments}",
  ch2: "flag{base64_decoded}",
  ch3: "flag{log_leaked}",
};

function Introduction() {
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
      <h1 className="ctf-title">Introduction</h1>
      <p className="ctf-subtitle">Welcome to the practice introduction. Select a topic from the sidebar to begin. Below are three simple penetration-testing style questions to try.</p>

      <div className="ctf-list">
        <section className="ctf-challenge">
          <h3>CHALLENGE 1</h3>
          <div className="ctf-meta">Source: ch1_note.txt</div>
          <pre className="ctf-code">{`Welcome to Neon Corp Internal Network.
All systems are operational.
No secrets are stored here.

/*
flag{hidden_in_comments}
*/`}</pre>
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
                {results.ch1 ? (
                  "Correct!"
                ) : (
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
          <h3>CHALLENGE 2 – Base Trouble</h3>
          <div className="ctf-meta">Source: ch2_script.js</div>
          <pre className="ctf-code">{`const secret = "ZmxhZ3tiYXNlNjRfZGVjb2RlZH0=";`}</pre>
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
                {results.ch2 ? (
                  "Correct!"
                ) : (
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
          <h3>CHALLENGE 3 – Leaked Logs</h3>
          <div className="ctf-meta">Source: ch3_logs.txt</div>
          <pre className="ctf-code">{`[DEBUG] Generated token: 666c61677b6c6f675f6c65616b65647d`}</pre>
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
                {results.ch3 ? (
                  "Correct!"
                ) : (
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
    </div>
  );
}

export default Introduction;
