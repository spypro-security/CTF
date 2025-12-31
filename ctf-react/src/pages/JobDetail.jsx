import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job, allJobs } = location.state || {};

  if (!job) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>No job selected</p>
        <button onClick={() => navigate('/jobs')}>Go Back to Jobs</button>
      </div>
    );
  }

  const jobsData = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Pvt. Ltd.",
      location: "Hyderabad, India",
      type: "Full-Time",
      skills: ["React", "CSS", "JavaScript"],
      salary: "₹40,000 - ₹60,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=frontend",
      description: "Build modern web applications with React",
      fullDescription: "Join our innovative team as a Frontend Developer where you'll create cutting-edge web applications using the latest technologies. You'll work on exciting projects that impact millions of users while collaborating with talented designers and backend engineers.",
      responsibilities: [
        "Develop responsive web applications using React.js",
        "Collaborate with UI/UX designers to implement pixel-perfect designs",
        "Optimize applications for maximum speed and scalability",
        "Write clean, maintainable code following best practices",
        "Participate in code reviews and mentor junior developers"
      ],
      requirements: [
        "3+ years of experience in frontend development",
        "Strong proficiency in React, JavaScript (ES6+), HTML5, CSS3",
        "Experience with state management (Redux, Context API)",
        "Understanding of RESTful APIs and async operations",
        "Excellent problem-solving and communication skills"
      ],
      benefits: [
        "Competitive salary and performance bonuses",
        "Health insurance for you and your family",
        "Flexible working hours and remote work options",
        "Professional development and training opportunities",
        "Modern office with latest tech and amenities"
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "AI Labs",
      location: "Bangalore, India",
      type: "Internship",
      skills: ["Python", "Pandas", "Machine Learning"],
      salary: "₹25,000 - ₹35,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=data",
      description: "Work on cutting-edge AI and ML projects",
      fullDescription: "Dive into the world of artificial intelligence and machine learning with our experienced team. This internship offers hands-on experience with real-world datasets, advanced ML algorithms, and the opportunity to contribute to innovative AI solutions.",
      responsibilities: [
        "Analyze complex datasets to extract actionable insights",
        "Build and train machine learning models for various use cases",
        "Create compelling data visualizations and reports",
        "Collaborate with data engineers and product teams",
        "Document methodologies and present findings to stakeholders"
      ],
      requirements: [
        "Currently pursuing or completed degree in CS, Statistics, or related field",
        "Strong knowledge of Python and data science libraries",
        "Understanding of ML algorithms and statistical methods",
        "Experience with Pandas, NumPy, Scikit-learn",
        "Excellent analytical and problem-solving abilities"
      ],
      benefits: [
        "Hands-on experience with real-world AI projects",
        "Mentorship from experienced data scientists",
        "Access to cutting-edge tools and technologies",
        "Certificate upon successful completion",
        "Potential for full-time conversion based on performance"
      ]
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "CodeHub",
      location: "Remote",
      type: "Full-Time",
      skills: ["Node.js", "Express", "MongoDB"],
      salary: "₹45,000 - ₹65,000",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=backend",
      description: "Design scalable server-side applications",
      fullDescription: "We're seeking a skilled Backend Developer to architect, develop, and maintain robust server-side applications. Work with modern technologies to build scalable systems that power our platform, serving thousands of users daily.",
      responsibilities: [
        "Design and implement RESTful APIs and microservices",
        "Develop server-side logic using Node.js and Express",
        "Integrate with MongoDB and optimize database queries",
        "Implement security measures and data protection protocols",
        "Monitor application performance and troubleshoot issues",
        "Write comprehensive tests and documentation"
      ],
      requirements: [
        "4+ years of backend development experience",
        "Expert-level knowledge of Node.js, Express, and MongoDB",
        "Strong understanding of database design and optimization",
        "Experience with version control systems (Git)",
        "Knowledge of microservices architecture",
        "Excellent debugging and problem-solving skills"
      ],
      benefits: [
        "100% remote work from anywhere",
        "Competitive compensation package",
        "Annual performance bonuses",
        "Learning and development budget",
        "Work-life balance with flexible hours",
        "Latest tech stack and modern development tools"
      ]
    },
  ];

  // Find the complete job data
  const selectedJob = jobsData.find(j => j.id === job.id) || job;
  const remainingJobs = jobsData.filter(j => j.id !== selectedJob.id);

  const handleBackToJobs = () => {
    navigate('/jobs');
  };

  const handleSelectJob = (newJob) => {
    navigate('/job-detail', { state: { job: newJob, allJobs: jobsData } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyNow = () => {
    navigate('/job-application', { state: { job: selectedJob } });
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
        
        .page-wrapper {
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
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        
        .back-nav {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 100px;
          color: #212529;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .back-nav:hover {
          background: #fff;
          border-color: #667eea;
          transform: translateX(-4px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
        }
        
        .detail-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          animation: fadeUp 0.6s ease-out;
        }
        
        .hero-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          margin-bottom: 24px;
        }
        
        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.5;
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
        }
        
        .hero-top {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .hero-icon {
          width: 90px;
          height: 90px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
        }
        
        .hero-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .hero-text h1 {
          font-size: 42px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 8px;
          line-height: 1.2;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .hero-text p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        
        .stat-box {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 20px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
        }
        
        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .stat-value {
          font-size: 20px;
          color: #fff;
          font-weight: 700;
        }
        
        .detail-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
        
        .section-block {
          margin-bottom: 40px;
        }
        
        .section-block:last-child {
          margin-bottom: 0;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .section-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #212529;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .section-text {
          font-size: 15px;
          line-height: 1.8;
          color: #495057;
        }
        
        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .detail-tag {
          padding: 10px 20px;
          background: rgba(102, 126, 234, 0.15);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 100px;
          color: #667eea;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .detail-tag:hover {
          background: rgba(102, 126, 234, 0.25);
          transform: translateY(-2px);
        }
        
        .list-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .list-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
        }
        
        .list-row:hover {
          background: #fff;
          border-color: #dee2e6;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .list-icon {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        
        .check-icon {
          background: rgba(102, 126, 234, 0.2);
          color: #667eea;
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .arrow-icon {
          background: rgba(118, 75, 162, 0.2);
          color: #764ba2;
          border: 1px solid rgba(118, 75, 162, 0.3);
        }
        
        .list-text {
          flex: 1;
          color: #495057;
          font-size: 14px;
          line-height: 1.6;
        }
        
        .cta-button {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 32px;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
        }
        
        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }
        
        .cta-button span {
          position: relative;
          z-index: 1;
        }
        
        .sidebar-wrapper {
          animation: fadeUp 0.6s ease-out 0.2s both;
        }
        
        .sidebar-title {
          font-size: 18px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 20px;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        .sidebar-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .sidebar-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 20px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .sidebar-card:hover {
          background: #fff;
          border-color: #667eea;
          transform: translateX(-4px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.15);
        }
        
        .sidebar-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }
        
        .sidebar-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        
        .sidebar-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .sidebar-name {
          font-size: 16px;
          font-weight: 700;
          color: #212529;
          line-height: 1.3;
        }
        
        .sidebar-desc {
          font-size: 13px;
          color: #6c757d;
          line-height: 1.5;
          margin-bottom: 12px;
        }
        
        .sidebar-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .sidebar-tag {
          padding: 4px 10px;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 6px;
          color: rgba(102, 126, 234, 0.9);
          font-size: 11px;
          font-weight: 600;
        }
        
        @media (max-width: 1200px) {
          .detail-layout {
            grid-template-columns: 1fr;
          }
          
          .sidebar-cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 24px 16px;
          }
          
          .hero-banner {
            padding: 32px 24px;
          }
          
          .hero-top {
            flex-direction: column;
            text-align: center;
          }
          
          .hero-text h1 {
            font-size: 32px;
          }
          
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .detail-card {
            padding: 28px;
          }
          
          .sidebar-cards {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .hero-text h1 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="page-wrapper page-top-cover">
        <div className="bg-pattern"></div>
        <div className="grid-bg"></div>

        <div className="content-wrapper">
          <button className="back-nav" onClick={handleBackToJobs}>
            <span></span>
            <span>Back to All Jobs</span>
          </button>

          <div className="detail-layout">
            <div>
              <div className="hero-banner">
                <div className="hero-pattern"></div>
                <div className="hero-content">
                  <div className="hero-top">
                    <div className="hero-icon">
                      <img src={selectedJob.image} alt={selectedJob.title} />
                    </div>
                    <div className="hero-text">
                      <h1>{selectedJob.title}</h1>
                      <p>{selectedJob.company}</p>
                    </div>
                  </div>
                  
                  <div className="hero-stats">
                    <div className="stat-box">
                      <div className="stat-label">Location</div>
                      <div className="stat-value">{selectedJob.location}</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-label">Type</div>
                      <div className="stat-value">{selectedJob.type}</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-label">Salary</div>
                      <div className="stat-value">{selectedJob.salary}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detail-card">
                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">About the Role</h3>
                  </div>
                  <p className="section-text">{selectedJob.fullDescription}</p>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Required Skills</h3>
                  </div>
                  <div className="detail-tags">
                    {selectedJob.skills.map((skill, i) => (
                      <div key={i} className="detail-tag">{skill}</div>
                    ))}
                  </div>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Responsibilities</h3>
                  </div>
                  <div className="list-wrapper">
                    {selectedJob.responsibilities.map((item, i) => (
                      <div key={i} className="list-row">
                        <div className="list-icon check-icon">✓</div>
                        <div className="list-text">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Requirements</h3>
                  </div>
                  <div className="list-wrapper">
                    {selectedJob.requirements.map((item, i) => (
                      <div key={i} className="list-row">
                        <div className="list-icon arrow-icon">→</div>
                        <div className="list-text">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Benefits</h3>
                  </div>
                  <div className="list-wrapper">
                    {selectedJob.benefits.map((item, i) => (
                      <div key={i} className="list-row">
                        <div className="list-icon check-icon">✓</div>
                        <div className="list-text">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="cta-button" onClick={handleApplyNow}>
                  <span>Apply for this Position</span>
                </button>
              </div>
            </div>

            <div className="sidebar-wrapper">
              <h3 className="sidebar-title">Other Opportunities</h3>
              <div className="sidebar-cards">
                {remainingJobs.map((j) => (
                  <div 
                    key={j.id} 
                    className="sidebar-card"
                    onClick={() => handleSelectJob(j)}
                  >
                    <div className="sidebar-top">
                      <div className="sidebar-icon">
                        <img src={j.image} alt={j.title} />
                      </div>
                      <div className="sidebar-name">{j.title}</div>
                    </div>
                    <div className="sidebar-desc">{j.description}</div>
                    <div className="sidebar-tags">
                      {j.skills.slice(0, 2).map((skill, i) => (
                        <div key={i} className="sidebar-tag">{skill}</div>
                      ))}
                      {j.skills.length > 2 && (
                        <div className="sidebar-tag">+{j.skills.length - 2}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetail;