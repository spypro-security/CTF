import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./badges.css";

const questions = [
  {
    id: "q1",
    title: "CTF 1 – Base64 Decode",
    category: "Cryptography",
    text: "Decode the following Base64 string and submit the decoded value as the flag:",
    payload: "MTIzNDU2Nzg5MA==",
    answers: ["1234567890"],
  },
  {
    id: "q2",
    title: "CTF 2 – Caesar Cipher",
    category: "Cryptography",
    text: "Decrypt the following Caesar cipher text (shift = 4):",
    payload: "5678",
    answers: ["1234"],
  },
  {
    id: "q3",
    title: "CTF 3 – Hex Decode",
    category: "Cryptography",
    text: "Decode the following hexadecimal string to obtain the flag:",
    payload: "343536373839",
    answers: ["456789"],
  },
  {
    id: "q4",
    title: "CTF 4 – Binary to Decimal",
    category: "General",
    text: "Convert the following binary value to decimal:",
    payload: "11000011010100000",
    answers: ["100000"],
  },
];

function CTFIntroduction() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (id, value) => {
    setAnswers((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    const details = questions.map((q) => {
      const user = (answers[q.id] || "").trim().toLowerCase();
      const ok = q.answers.some((a) => user === a || user === a.replace(/^\./, ""));
      if (ok) correct += 1;
      return { id: q.id, text: q.text, ok, expected: q.answers[0] };
    });

    setResult({ correct, total: questions.length, details });
  };

  return (
    <div className="badges-container ctf-quiz">
      <div className="badges-sidebar">
        <h3>CTF Introduction</h3>
      </div>

      <div className="badges-content">
        <h2>Introduction -Questions</h2>

        <form onSubmit={handleSubmit} className="ctf-form">
          {questions.map((q) => (
            <div key={q.id} className="question-card">
              <div className="question-header">
                <div className="q-title">{q.title}</div>
                <div className="q-category">{q.category}</div>
              </div>

              <div className="q-text">{q.text}</div>
              <pre className="q-payload">{q.payload}</pre>

              <input
                type="text"
                value={answers[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
                className="q-input"
                placeholder="Enter flag here"
              />
            </div>
          ))}

          <div className="ctf-actions">
            <button className="btn submit" type="submit">
              Submit Answers
            </button>
            <button
              type="button"
              className="btn cancel"
              onClick={() => navigate("/practice/ctf")}
            >
              Back to CTF
            </button>
          </div>
        </form>

        {result && (
          <div className="ctf-results">
            <h3>Results: {result.correct} / {result.total}</h3>
            <ul>
              {result.details.map((d) => (
                <li key={d.id} className={d.ok ? "ok" : "bad"}>
                  <strong>{d.ok ? "✓" : "✗"}</strong> {d.text}
                  {!d.ok && (
                    <div className="expected">Expected: {d.expected}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <style>{`
          .ctf-form { max-width: 900px; }
          .question-card { background:#fff; border-radius:8px; padding:16px; margin-bottom:14px; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
          .question-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
          .q-title { font-weight:700; }
          .q-category { font-size:12px; color:#666; background:#f1f1f1; padding:6px 10px; border-radius:999px; }
          .q-text { margin-bottom:8px; }
          .q-payload { background:#0f172a; color:#fff; padding:10px; border-radius:6px; overflow:auto; }
          .q-input { width:100%; padding:8px 10px; border-radius:6px; border:1px solid #ddd; margin-top:10px }
          .ctf-actions { display:flex; gap:10px; margin-top:12px }
          .ctf-results { margin-top:18px }
          .ctf-results ul { padding-left:18px }
          .ctf-results li.ok { color:green }
          .ctf-results li.bad { color:#c0392b }
          .expected { color:#666; margin-left:18px }
        `}</style>
      </div>
    </div>
  );
}

export default CTFIntroduction;
