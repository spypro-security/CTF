import React, { useState } from "react";
import EnrollForm from "./EnrollForm";

const WorkshopCurriculum = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  const handleEnrollClick = (workshopType) => {
    setSelectedWorkshop(workshopType);
    setShowForm(true);
  };

  return (
    <>
      {/* CSS inside same file */}
      <style>{`
        .workshop-container {
          padding: 40px;
          background: #f7f9fc;
          min-height: 100vh;
        }
        .title {
          text-align: center;
          font-size: 32px;
          color: #5b5be0;
          margin-bottom: 40px;
        }
        .cards {
          display: flex;
          gap: 30px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          width: 420px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        .pdf-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 20px;
          color: #444;
        }
        .button-group {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn {
          background: #6366f1;
          color: #fff;
          border: none;
          padding: 12px 18px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
          text-align: center;
        }
        .btn:hover {
          background: #4f46e5;
        }
        .btn.outline {
          background: #fff;
          color: #6366f1;
          border: 2px solid #6366f1;
        }
        .btn.outline:hover {
          background: #eef2ff;
        }
        .btn.full {
          width: 100%;
          margin-top: 20px;
        }
      `}</style>

      <div className="workshop-container">
        <h1 className="title">Workshop Curriculum</h1>

        <div className="cards">
          {/* 5 Days Workshop */}
          <div className="card">
            <h2>📘 5 Days Workshop</h2>
            <p className="pdf-title">
              Core & Software Solutions Workshop Program
            </p>

            <div className="button-group">
              <a
                href="/Core%20Solutions/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Core Workshop PDF
              </a>

              <a
                href="/Software%20Solutions/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn outline"
              >
                Software Workshop PDF
              </a>

              <button
                className="btn full"
                onClick={() => handleEnrollClick("5 Days")}
              >
                Enroll for 5 Days
              </button>
            </div>
          </div>

          {/* 3 Days Workshop */}
          <div className="card">
            <h2>📗 3 Days Workshop</h2>
            <p className="pdf-title">
              Core & Software Solutions Workshop Program
            </p>

            <div className="button-group">
              <a
                href="/3-day-core.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Core Workshop PDF
              </a>

              <a
                href="/3-day-software.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn outline"
              >
                Software Workshop PDF
              </a>

              <button
                className="btn full"
                onClick={() => handleEnrollClick("3 Days")}
              >
                Enroll for 3 Days
              </button>
            </div>
          </div>
        </div>

        {/* Enroll Form Modal */}
        {showForm && (
          <EnrollForm
            workshopType={selectedWorkshop}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </>
  );
};

export default WorkshopCurriculum;
