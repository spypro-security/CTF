import React from "react";
import { useNavigate } from "react-router-dom";
import "./practice.css";

function Practice() {
  const navigate = useNavigate();

  return (
    <div className="practice-container">
      <h1>Practice Labs</h1>
      <p>Select a practice area</p>

      <div className="practice-grid">
        <div className="practice-card">
          <h2>Penetration Testing</h2>
          <p>Hands-on penetration testing practice</p>
          <button onClick={() => navigate("/practice/badges")}>
            Start Practice
          </button>
        </div>

        <div className="practice-card">
          <h2>Capture The Flag (CTF)</h2>
          <p>Solve CTF challenges</p>
          <button onClick={() => navigate("/practice/badges")}>
            Start Practice
          </button>
        </div>
      </div>
    </div>
  );
}

export default Practice;
