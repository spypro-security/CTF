import React from "react";
import { useNavigate } from "react-router-dom";
import "./badges.css";

function Badges() {
  const navigate = useNavigate();

  const topics = [
    { name: "Introduction", count: "0 / 4", path: "introduction" },
    { name: "Unix", count: "0 / 35", path: "unix" },
    { name: "Essential", count: "0 / 60", path: "essential" },
    { name: "PCAP badge", count: "0 / 35", path: "pcap" },
    { name: "HTTP", count: "0 / 43", path: "http" },
    { name: "White", count: "0 / 6", path: "white" },
    { name: "Serialize", count: "0 / 5", path: "serialize" },
    { name: "Yellow", count: "0 / 7", path: "yellow" },
    { name: "Blue", count: "0 / 11", path: "blue" },
    { name: "Green", count: "0 / 16", path: "green" },
    { name: "Orange", count: "0 / 15", path: "orange" },
    { name: "Intercept", count: "0 / 5", path: "intercept" },
    { name: "Authentication / Authorization", count: "0 / 25", path: "auth" },
    { name: "Android", count: "0 / 8", path: "android" },
    { name: "Capture-The-Flag", count: "0 / 6", path: "ctf" }
  ];

  return (
    <div className="badges-container">
      <div className="badges-sidebar">
        <h3>Badges</h3>

        {topics.map((topic, index) => (
          <div
            key={index}
            className="badge-item"
            onClick={() => navigate(`/practice/${topic.path}`)}
          >
            <span>{topic.name}</span>
            <span className="badge-count">{topic.count}</span>
          </div>
        ))}
      </div>

      <div className="badges-content">
        <h2>Select a topic</h2>
      </div>
    </div>
  );
}

export default Badges;
