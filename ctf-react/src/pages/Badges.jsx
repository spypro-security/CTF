import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./badges.css";

function Badges() {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

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

  const levels = [
    { name: "Beginner", description: "Basic concepts and fundamental skills" },
    { name: "Intermediate", description: "Advanced techniques and deeper understanding" },
    { name: "Advanced", description: "Expert-level challenges and complex scenarios" }
  ];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleLevelClick = (level) => {
    navigate(`/practice/${selectedTopic.path}`, { state: { level: level.name } });
  };

  const handleBackClick = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="badges-container">
      <div className="badges-sidebar">
        <h3>Badges</h3>
        {selectedTopic && (
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Topics
          </button>
        )}

        {!selectedTopic ? (
          topics.map((topic, index) => (
            <div
              key={index}
              className="badge-item"
              onClick={() => handleTopicClick(topic)}
            >
              <span>{topic.name}</span>
              <span className="badge-count">{topic.count}</span>
            </div>
          ))
        ) : (
          <div className="levels-section">
            <h4>{selectedTopic.name} Levels</h4>
            {levels.map((level, index) => (
              <div
                key={index}
                className="level-item"
                onClick={() => handleLevelClick(level)}
              >
                <span>{level.name}</span>
                <span className="level-description">{level.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="badges-content">
        {!selectedTopic ? (
          <h2>Select a topic</h2>
        ) : (
          <div>
            <h2>{selectedTopic.name}</h2>
            <p>Select a difficulty level to start practicing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Badges;
