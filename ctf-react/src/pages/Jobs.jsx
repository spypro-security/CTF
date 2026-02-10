import React from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();

  const jobs = [
    {
      id: 1,
      title: "Java Full Stack Developer",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["React", "CSS", "JavaScript"],
      salary: "₹40,000 - ₹60,000",
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
      description: "Work on cutting-edge AI and ML projects",
    },
    
    {
      id: 4,
      title: "Cyber Security Analyst",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["Networking", "Ethical Hacking", "SIEM", "Linux"],
      salary: "₹30,000 - ₹45,000",
      description:
        "Monitor systems, analyze threats, and secure networks from cyber attacks",
    },
    {
      id: 5,
      title: "Python Full Stack Developer",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["Python", "Django", "React"],
      salary: "₹40,000 - ₹60,000",
      description: "Build modern web applications with Python and React",
    },
    {
      id:6,
      title: "DevOps Engineer",
      company: "Spypro Security Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      salary: "₹35,000 - ₹50,000",
      description:
        "Design and implement scalable infrastructure and automate deployment pipelines",

        
    }
  ];

  const handleApplyClick = (job) => {
    navigate("/job-detail", { state: { job, allJobs: jobs } });
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
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 30px;
        }

        .job-card {
          background: #fff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          transition: 0.3s ease;
        }

        .job-card:hover {
          transform: translateY(-6px);
        }

        .job-card-header {
          margin-bottom: 20px;
        }

        .job-card-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
        }

        .job-card-header p {
          color: #667eea;
          font-weight: 600;
        }

        .skills-wrapper {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin: 16px 0;
        }

        .skill-badge {
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(102,126,234,0.1);
          color: #667eea;
          font-size: 0.85rem;
        }

        .apply-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>

      <div className="jobs-page-wrapper">
        <div className="content-wrapper">
          <div className="page-header">
            <h1>Find Your Dream Job</h1>
            <p>Explore exciting opportunities and take the next step in your career</p>
          </div>

          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                </div>

                <p>{job.description}</p>

                <div className="skills-wrapper">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="skill-badge">{skill}</span>
                  ))}
                </div>

                <p><b>Salary:</b> {job.salary}</p>

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