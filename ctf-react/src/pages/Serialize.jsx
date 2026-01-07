import React, { useState } from "react";
import "./ctf.css";

const EXPECTED = { ch1: "flag{serialize_1}", ch2: "flag{serialize_2}", ch3: "flag{serialize_3}" };

function Serialize() {
  const [answers, setAnswers] = useState({ ch1: "", ch2: "", ch3: "" });
  const [results, setResults] = useState({ ch1: null, ch2: null, ch3: null });

  const handleChange = (k, v) => setAnswers((s) => ({ ...s, [k]: v }));
  const handleSubmit = (k) => setResults((r) => ({ ...r, [k]: (answers[k] || "").trim() === EXPECTED[k] }));

  return (
    <div className="ctf-container">
      <h1 className="ctf-title">Serialize</h1>
      <p className="ctf-subtitle">Serialization-based challenges (e.g. deserialization). Replace content below.</p>

      <div className="ctf-list">
        <section className="ctf-challenge">
          <h3>CHALLENGE 1</h3>
          <div className="ctf-meta">Source: obj.bin</div>
          <pre className="ctf-code">{`# Placeholder content`}</pre>
          <input className="ctf-input" placeholder="Enter flag (e.g. flag{...})" value={answers.ch1} onChange={(e)=>handleChange('ch1', e.target.value)} />
          <div className="ctf-actions">
            <button className="ctf-submit" onClick={()=>handleSubmit('ch1')} disabled={!answers.ch1.trim()}>Submit</button>
            {results.ch1 !== null && (
              <div className={`ctf-result ${results.ch1 ? "ok" : "bad"}`}>
                {results.ch1 ? "Correct!" : (<>Incorrect — correct: <span className="ctf-correct-flag">{EXPECTED.ch1}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section className="ctf-challenge">
          <h3>CHALLENGE 2</h3>
          <div className="ctf-meta">Source: payload.dat</div>
          <pre className="ctf-code">{`# Placeholder`}</pre>
          <input className="ctf-input" placeholder="Enter flag (e.g. flag{...})" value={answers.ch2} onChange={(e)=>handleChange('ch2', e.target.value)} />
          <div className="ctf-actions">
            <button className="ctf-submit" onClick={()=>handleSubmit('ch2')} disabled={!answers.ch2.trim()}>Submit</button>
            {results.ch2 !== null && (
              <div className={`ctf-result ${results.ch2 ? "ok" : "bad"}`}>
                {results.ch2 ? "Correct!" : (<>Incorrect — correct: <span className="ctf-correct-flag">{EXPECTED.ch2}</span></>)}
              </div>
            )}
          </div>
        </section>

        <section className="ctf-challenge">
          <h3>CHALLENGE 3</h3>
          <div className="ctf-meta">Source: sample.ser</div>
          <pre className="ctf-code">{`# Placeholder`}</pre>
          <input className="ctf-input" placeholder="Enter flag (e.g. flag{...})" value={answers.ch3} onChange={(e)=>handleChange('ch3', e.target.value)} />
          <div className="ctf-actions">
            <button className="ctf-submit" onClick={()=>handleSubmit('ch3')} disabled={!answers.ch3.trim()}>Submit</button>
            {results.ch3 !== null && (
              <div className={`ctf-result ${results.ch3 ? "ok" : "bad"}`}>
                {results.ch3 ? "Correct!" : (<>Incorrect — correct: <span className="ctf-correct-flag">{EXPECTED.ch3}</span></>)}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Serialize;
