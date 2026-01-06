import React from "react";
import { useNavigate } from "react-router-dom";
import "./badges.css";

function CTF() {
  const navigate = useNavigate();

  const challenges = [
    {name:"Introduction", count: "0 / 4", path: "introduction" },
    { name: "Basic Reversing", count: "0 / 4", path: "basic-rev" },
    { name: "Forensics", count: "0 / 4", path: "forensics" },
    { name: "Web Exploitation", count: "0 / 4", path: "web" },
    { name: "Crypto", count: "0 / 4", path: "crypto" },
    { name: "Pwn", count: "0 / 4", path: "pwn" }
  ];

  return (
    <div className="badges-container">
      <div className="badges-sidebar">
        <h3>CTF Challenges</h3>

        {challenges.map((c, i) => (
          <div
            key={i}
            className="badge-item"
            onClick={() => navigate(`/practice/ctf/${c.path}`)}
          >
            <span>{c.name}</span>
            <span className="badge-count">{c.count}</span>
          </div>
        ))}
      </div>

      <div className="badges-content">
        <h2>Select a challenge</h2>
      </div>
    </div>
  );
}

export default CTF;
