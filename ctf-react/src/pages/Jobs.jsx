import React from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["React", "CSS", "JavaScript"],
      salary: "₹40,000 - ₹60,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=frontend",
      description: "Build modern web applications with React",
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["Python", "Pandas", "Machine Learning"],
      salary: "₹25,000 - ₹35,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=data",
      description: "Work on cutting-edge AI and ML projects",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["Node.js", "Express", "MongoDB"],
      salary: "₹45,000 - ₹65,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=backend",
      description: "Design scalable server-side applications",
    },
  ];

  const handleApplyClick = (job) => {
    navigate('/job-detail', { state: { job, allJobs: jobs } });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .jobs-page-wrapper {
          min-height: calc(100vh - var(--nav-height, 0px));
          background: #f8f9fa;
          position: relative;
          overflow-x: hidden;
        }
        
        .bg-pattern {
          position: fixed;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .grid-bg {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }
        
        .content-wrapper {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeUp 0.6s ease-out;
        }
        
        .page-header h1 {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .page-header p {
          font-size: 1.2rem;
          color: #6c757d;
        }
        
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
          animation: fadeUp 0.6s ease-out 0.2s both;
        }
        
        .job-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 24px;
          padding: 32px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          position: relative;
          overflow: hidden;
        }
        
        .job-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .job-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.15);
          border-color: #667eea;
        }
        
        .job-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .job-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        
        .job-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .job-title-group h3 {
          font-size: 1.5rem;
          color: #212529;
          font-weight: 700;
          margin-bottom: 4px;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .company-name {
          color: #667eea;
          font-size: 1rem;
          font-weight: 600;
        }
        
        .job-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        
        .meta-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #f8f9fa;
          border-radius: 100px;
          font-size: 0.9rem;
          color: #495057;
          border: 1px solid #e9ecef;
        }
        
        .job-description {
          color: #6c757d;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .skills-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .skill-badge {
          padding: 8px 16px;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 100px;
          color: #667eea;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .skill-badge:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
        }
        
        .salary-text {
          color: #212529;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .apply-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 24px 16px;
          }
          
          .page-header h1 {
            font-size: 2.5rem;
          }
          
          .jobs-grid {
            grid-template-columns: 1fr;
          }
          
          .job-card {
            padding: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .page-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="jobs-page-wrapper page-top-cover">
        <div className="bg-pattern"></div>
        <div className="grid-bg"></div>

        <div className="content-wrapper">
          <div className="page-header">
            <h1>Find Your Dream Job</h1>
            <p>Explore exciting opportunities and take the next step in your career</p>
          </div>

          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-icon">
                    <img src={job.image} alt={job.title} />
                  </div>
                  <div className="job-title-group">
                    <h3>{job.title}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                </div>

                <div className="job-meta">
                  <div className="meta-badge">
                    <span>📍</span>
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-badge">
                    <span>💼</span>
                    <span>{job.type}</span>
                  </div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="skills-wrapper">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>

                <p className="salary-text">
                  <span>💰</span>
                  <span>{job.salary}</span>
                </p>

                <button 
                  className="apply-btn"
                  onClick={() => handleApplyClick(job)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobs;