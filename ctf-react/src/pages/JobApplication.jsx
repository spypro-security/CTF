import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    passedOutYear: "",
    experience: "",
    currentCompany: "",
    currentRole: "",
    currentCTC: "",
    expectedCTC: "",
    portfolio: "",
    coverLetter: "",
    resume: null
  });

  if (!job) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>No job selected</p>
        <button onClick={() => navigate('/jobs')}>Go Back to Jobs</button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('college_name', formData.collegeName);
    formDataToSend.append('passed_out_year', formData.passedOutYear);

    formDataToSend.append('experience', formData.experience || '0');
    formDataToSend.append('current_company', formData.currentCompany);
    formDataToSend.append('current_role', formData.currentRole);
    formDataToSend.append('current_ctc', formData.currentCTC);
    formDataToSend.append('expected_ctc', formData.expectedCTC);

    formDataToSend.append('portfolio', formData.portfolio);
    formDataToSend.append('cover_letter', formData.coverLetter);

    // Job details
    formDataToSend.append('job_id', job.id);
    formDataToSend.append('job_title', job.title);
    formDataToSend.append('company', job.company);
    formDataToSend.append('location', job.location);
    formDataToSend.append('salary', job.salary);
    formDataToSend.append('job_type', job.type);

    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }

    try {
      const response = await fetch('http://localhost:8000/api/applications/jobs/submit/', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (response.ok && data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          collegeName: "",
          passedOutYear: "",
          experience: "",
          currentCompany: "",
          currentRole: "",
          currentCTC: "",
          expectedCTC: "",
          portfolio: "",
          coverLetter: "",
          resume: null
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        const resultState = {
          status: "success",
          email: formData.email,
          job: job.title,
          application: data.data || null
        };
        navigate('/application-result', { state: resultState });
        return;
      } else if (data.already_applied) {
        const dateObj = new Date(data.application_date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const resultState = {
          status: 'already',
          email: formData.email,
          job: job.title,
          appliedDate: formattedDate,
          application: data.application || null
        };
        navigate('/application-result', { state: resultState });
        return;
      } else {
        let errorMessage = "Failed to submit application:\n\n";

        if (data.errors) {
          Object.keys(data.errors).forEach(field => {
            const fieldName = field.replace('_', ' ').toUpperCase();
            const errors = Array.isArray(data.errors[field]) ? data.errors[field] : [data.errors[field]];
            errorMessage += `${fieldName}: ${errors.join(', ')}\n`;
          });
        } else {
          errorMessage += data.message || "Unknown error occurred";
        }

        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please check if the backend server is running on http://localhost:8000");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/job-detail', { state: { job } });
  };

  const showExperienceFields = formData.experience && formData.experience !== "" && formData.experience !== "0";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
            overflow: hidden;
          }
          to {
            opacity: 1;
            max-height: 600px;
            overflow: visible;
          }
        }
        
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
        
        .job-application-wrapper {
          min-height: 100vh;
          background: #ffffff;
          padding: 60px 30px;
        }
        
        .application-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .top-navigation {
          margin-bottom: 40px;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #334155;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .back-link:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .page-title {
          font-size: 42px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }
        
        .page-subtitle {
          font-size: 18px;
          color: #64748b;
          font-weight: 500;
        }
        
        .job-details-bar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px 40px;
          border-radius: 12px;
          margin-bottom: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .job-info-left h2 {
          font-size: 26px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
        }
        
        .job-info-left p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .job-info-right {
          text-align: right;
        }
        
        .job-salary {
          font-size: 24px;
          font-weight: 800;
          color: white;
          margin-bottom: 4px;
        }
        
        .job-type {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
        }
        
        .main-application-form {
          background: white;
        }
        
        .form-section-container {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 40px;
          margin-bottom: 30px;
        }
        
        .section-heading-text {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 3px solid #667eea;
        }
        
        .input-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }
        
        .input-wrapper {
          display: flex;
          flex-direction: column;
        }
        
        .input-wrapper.span-full {
          grid-column: 1 / -1;
        }
        
        .input-label-text {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 10px;
          letter-spacing: 0.3px;
        }
        
        .asterisk-required {
          color: #ef4444;
        }
        
        .text-input,
        .select-input,
        .textarea-input {
          width: 100%;
          padding: 14px 18px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #0f172a;
          font-size: 15px;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        
        .text-input:focus,
        .select-input:focus,
        .textarea-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .text-input::placeholder,
        .textarea-input::placeholder {
          color: #94a3b8;
        }
        
        .select-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 20px;
          padding-right: 45px;
        }
        
        .textarea-input {
          min-height: 140px;
          resize: vertical;
          line-height: 1.6;
        }
        
        .experience-conditional-section {
          margin-top: 30px;
          padding-top: 30px;
          border-top: 2px dashed #cbd5e1;
          animation: slideDown 0.4s ease-out;
        }
        
        .alert-info-box {
          padding: 18px 24px;
          background: #dbeafe;
          border-left: 4px solid #3b82f6;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        
        .alert-info-text {
          font-size: 15px;
          color: #1e40af;
          font-weight: 500;
        }
        
        .file-upload-container {
          position: relative;
        }
        
        .file-input-hidden {
          position: absolute;
          opacity: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
          z-index: 2;
        }
        
        .file-drop-area {
          border: 3px dashed #cbd5e1;
          border-radius: 8px;
          padding: 50px 30px;
          text-align: center;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .file-drop-area:hover {
          border-color: #667eea;
          background: #f8fafc;
        }
        
        .file-upload-text-main {
          font-size: 17px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 8px;
        }
        
        .file-upload-text-sub {
          font-size: 14px;
          color: #64748b;
        }
        
        .file-selected-name {
          margin-top: 15px;
          padding: 15px 20px;
          background: #f0fdf4;
          border: 2px solid #86efac;
          border-radius: 8px;
          color: #166534;
          font-weight: 600;
          font-size: 15px;
        }
        
        .form-submit-area {
          display: flex;
          gap: 20px;
          margin-top: 40px;
          justify-content: flex-end;
        }
        
        .button-cancel {
          padding: 16px 40px;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          color: #64748b;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .button-cancel:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        
        .button-submit {
          padding: 16px 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .button-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.35);
        }
        
        .button-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: rotate 0.8s linear infinite;
          margin-left: 10px;
        }
        
        @media (max-width: 968px) {
          .job-details-bar {
            flex-direction: column;
            text-align: center;
            gap: 20px;
          }
          
          .job-info-right {
            text-align: center;
          }
        }
        
        @media (max-width: 768px) {
          .job-application-wrapper {
            padding: 40px 20px;
          }
          
          .page-title {
            font-size: 32px;
          }
          
          .form-section-container {
            padding: 25px;
          }
          
          .input-grid {
            grid-template-columns: 1fr;
          }
          
          .form-submit-area {
            flex-direction: column;
          }
          
          .button-cancel,
          .button-submit {
            width: 100%;
          }
        }
      `}</style>

      <div className="job-application-wrapper page-top-cover">
        <div className="application-content">
          <div className="top-navigation">
            <button className="back-link" onClick={handleBack}>
              <span>←</span>
              <span>Back to Job Details</span>
            </button>
          </div>

          <div className="page-header">
            <h1 className="page-title">Job Application</h1>
            <p className="page-subtitle">Complete the form below to apply for this position</p>
          </div>

          <div className="job-details-bar">
            <div className="job-info-left">
              <h2>{job.title}</h2>
              <p>{job.company} • {job.location}</p>
            </div>
            <div className="job-info-right">
              <div className="job-salary">{job.salary}</div>
              <div className="job-type">{job.type}</div>
            </div>
          </div>

          <form className="main-application-form" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="form-section-container">
              <h3 className="section-heading-text">Personal Information</h3>
              
              <div className="input-grid">
                <div className="input-wrapper">
                  <label className="input-label-text">
                    Full Name <span className="asterisk-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label-text">
                    Email Address <span className="asterisk-required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label-text">
                    Phone Number <span className="asterisk-required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label-text">
                    Portfolio/LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="https://your-portfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="form-section-container">
              <h3 className="section-heading-text">Education Details</h3>
              
              <div className="input-grid">
                <div className="input-wrapper">
                  <label className="input-label-text">
                    College/University <span className="asterisk-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="text-input"
                    placeholder="Your college or university name"
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label className="input-label-text">
                    Year of Graduation <span className="asterisk-required">*</span>
                  </label>
                  <select
                    name="passedOutYear"
                    value={formData.passedOutYear}
                    onChange={handleInputChange}
                    className="select-input"
                    required
                  >
                    <option value="">Select graduation year</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="form-section-container">
              <h3 className="section-heading-text">Professional Experience</h3>
              
              <div className="input-wrapper">
                <label className="input-label-text">
                  Total Years of Experience <span className="asterisk-required">*</span>
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="select-input"
                  required
                >
                  <option value="">Select your experience level</option>
                  <option value="0">Fresher (No Experience)</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                  <option value="6">6 Years</option>
                  <option value="7">7 Years</option>
                  <option value="8">8 Years</option>
                  <option value="9">9 Years</option>
                  <option value="10+">10+ Years</option>
                </select>
              </div>

              {showExperienceFields && (
                <div className="experience-conditional-section">
                  <div className="alert-info-box">
                    <p className="alert-info-text">
                      Please provide details about your current employment
                    </p>
                  </div>

                  <div className="input-grid">
                    <div className="input-wrapper">
                      <label className="input-label-text">
                        Current Company Name <span className="asterisk-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentCompany"
                        value={formData.currentCompany}
                        onChange={handleInputChange}
                        className="text-input"
                        placeholder="Company name"
                        required
                      />
                    </div>

                    <div className="input-wrapper">
                      <label className="input-label-text">
                        Current Job Role <span className="asterisk-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleInputChange}
                        className="text-input"
                        placeholder="Your current position"
                        required
                      />
                    </div>

                    <div className="input-wrapper">
                      <label className="input-label-text">
                        Current CTC (Annual) <span className="asterisk-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="currentCTC"
                        value={formData.currentCTC}
                        onChange={handleInputChange}
                        className="text-input"
                        placeholder="e.g., ₹5,00,000"
                        required
                      />
                    </div>

                    <div className="input-wrapper">
                      <label className="input-label-text">
                        Expected CTC (Annual) <span className="asterisk-required">*</span>
                      </label>
                      <input
                        type="text"
                        name="expectedCTC"
                        value={formData.expectedCTC}
                        onChange={handleInputChange}
                        className="text-input"
                        placeholder="e.g., ₹7,00,000"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cover Letter */}
            <div className="form-section-container">
              <h3 className="section-heading-text">Cover Letter</h3>
              
              <div className="input-wrapper span-full">
                <label className="input-label-text">
                  Why are you interested in this position? <span className="asterisk-required">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  className="textarea-input"
                  placeholder="Tell us about your skills, experience, and what makes you a great fit for this role..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="form-section-container">
              <h3 className="section-heading-text">Resume Upload</h3>
              
              <div className="input-wrapper span-full">
                <label className="input-label-text">
                  Upload Your Resume <span className="asterisk-required">*</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <div className="file-drop-area">
                    <div className="file-upload-text-main">Click to select a file or drag and drop</div>
                    <div className="file-upload-text-sub">Supported formats: PDF, DOC, DOCX (Maximum size: 5MB)</div>
                  </div>
                  {formData.resume && (
                    <div className="file-selected-name">
                      ✓ Selected file: {formData.resume.name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-submit-area">
              <button
                type="button"
                className="button-cancel"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Submitting Application
                    <span className="loading-spinner"></span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default JobApplication;