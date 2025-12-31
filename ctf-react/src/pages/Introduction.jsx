import React, { useState } from "react";

function Introduction() {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
  });

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Answers submitted successfully!");
  };

  return (
    <>
      <style>{`
        .topic-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .topic-container h1 {
          margin-bottom: 30px;
          text-align: center;
        }

        .question-box {
          margin-bottom: 25px;
        }

        .question-box p {
          font-weight: bold;
          margin-bottom: 8px;
        }

        .question-box textarea {
          width: 100%;
          min-height: 90px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          resize: vertical;
        }

        .submit-btn {
          display: block;
          margin: 30px auto 0;
          padding: 12px 30px;
          background-color: #6a5acd;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .submit-btn:hover {
          background-color: #5848c2;
        }
      `}</style>

      <div className="topic-container">
        <h1>Introduction</h1>

        <div className="question-box">
          <p>1. What is Cyber Security?</p>
          <textarea
            name="q1"
            value={answers.q1}
            onChange={handleChange}
            placeholder="Write your answer here..."
          />
        </div>

        <div className="question-box">
          <p>2. What is Ethical Hacking?</p>
          <textarea
            name="q2"
            value={answers.q2}
            onChange={handleChange}
            placeholder="Write your answer here..."
          />
        </div>

        <div className="question-box">
          <p>3. Difference between Hacker and Ethical Hacker?</p>
          <textarea
            name="q3"
            value={answers.q3}
            onChange={handleChange}
            placeholder="Write your answer here..."
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Answers
        </button>
      </div>
    </>
  );
}

export default Introduction;
