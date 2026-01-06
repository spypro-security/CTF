import React from "react";
import { useNavigate } from "react-router-dom";
import "./badges.css";

function Badges() {
  const navigate = useNavigate();

  const topics = [
    { name: "Introduction", count: "0 / 4", path: "introduction" },
    { name: "Unix", count: "0 /4", path: "unix" },
    { name: "Essential", count: "0 /4", path: "essential" },
    { name: "PCAP badge", count: "0 /4", path: "pcap" },
    { name: "HTTP", count: "0 / 4", path: "http" },
   
    { name: "Serialize", count: "0 / 4", path: "serialize" },
  
    { name: "Intercept", count: "0 / 4", path: "intercept" },
    { name: "Authentication / Authorization", count: "0 / 4", path: "auth" },
    { name: "Android", count: "0 / 4", path: "android" },
   
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
