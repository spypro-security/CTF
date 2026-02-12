import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InternshipDetail({ internship, onBack, allInternships, onSelectInternship }) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [selectedCurriculumPath, setSelectedCurriculumPath] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    passedOutYear: "",
    domain: internship?.title || "",
    resume: null
  });

  const remainingInternships = allInternships && internship 
    ? allInternships.filter((item) => item.id !== internship.id)
    : [];

  useEffect(() => {
    if (showForm) {
      setFormData(prev => ({ ...prev, domain: internship?.title || prev.domain }));
    }
  }, [showForm, internship]);

  const navigate = useNavigate();

  if (!internship) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>No internship selected</p>
        <button onClick={onBack}>Go Back</button>
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

  const handleCurriculumClick = (e, path) => {
    e.preventDefault();
    setSelectedCurriculumPath(path);
    setShowCurriculum(true);
  };

  const handleCloseCurriculum = () => {
    setShowCurriculum(false);
    setSelectedCurriculumPath("");
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
    formDataToSend.append('domain', formData.domain);
    
    if (formData.resume) {
      formDataToSend.append('resume', formData.resume);
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/applications/submit/', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          collegeName: "",
          passedOutYear: "",
          domain: internship.title,
          resume: null
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        navigate('/application-result', { state: {
          status: "success",
          email: formData.email,
          internship: internship.title,
          application: data.application || null
        }});
        return;
      } else if (data.already_applied) {
        const dateObj = new Date(data.application_date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        navigate('/application-result', { state: {
          status: 'already',
          email: formData.email,
          internship: internship.title,
          appliedDate: formattedDate,
          application: data.application || null
        }});
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

  // If curriculum is being viewed, show the PDF viewer with back button
  if (showCurriculum) {
    return (
      <>
        <style>{`
          .curriculum-viewer-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #1e293b;
            z-index: 10000;
            display: flex;
            flex-direction: column;
          }

          .curriculum-header {
            background: #0f172a;
            padding: 16px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #334155;
          }

          .curriculum-back-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: #667eea;
            border: none;
            border-radius: 8px;
            color: #fff;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .curriculum-back-btn:hover {
            background: #764ba2;
            transform: translateX(-4px);
          }

          .curriculum-title {
            color: #fff;
            font-size: 18px;
            font-weight: 600;
          }

          .curriculum-content {
            flex: 1;
            overflow: hidden;
            position: relative;
          }

          .curriculum-iframe {
            width: 100%;
            height: 100%;
            border: none;
          }

          @media (max-width: 768px) {
            .curriculum-header {
              padding: 12px 16px;
            }
            
            .curriculum-title {
              font-size: 14px;
            }
            
            .curriculum-back-btn {
              padding: 8px 16px;
              font-size: 13px;
            }
          }
        `}</style>

        <div className="curriculum-viewer-wrapper">
          <div className="curriculum-header">
            <button className="curriculum-back-btn" onClick={handleCloseCurriculum}>
              <span>←</span>
              <span>Back to Internship Details</span>
            </button>
            <div className="curriculum-title">
              {internship.title} - Curriculum
            </div>
          </div>
          <div className="curriculum-content">
            <iframe 
              src={selectedCurriculumPath}
              className="curriculum-iframe"
              title="Curriculum PDF"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .page-wrapper {
          min-height: calc(100vh - var(--nav-height));
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
        
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 32px;
          animation: fadeUp 0.6s ease-out;
        }
        
        .hero-section {
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
        
        .hero-content { position: relative; z-index: 1; }
        
        .hero-top {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 32px;
        }
        
        .hero-icon {
          width: 90px; height: 90px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .hero-icon img {
          width: 50px; height: 50px;
          object-fit: contain;
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
          grid-template-columns: repeat(4, 1fr);
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

        .curriculum-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .curriculum-button {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
        }

        .curriculum-button:hover {
          background: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .curriculum-button svg {
          width: 14px;
          height: 14px;
        }
        
        .content-card {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }
        
        .section-block { margin-bottom: 40px; }
        .section-block:last-child { margin-bottom: 0; }
        
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
        
        .tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .tag-item {
          padding: 10px 20px;
          background: rgba(102, 126, 234, 0.15);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 100px;
          color: #667eea;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .tag-item:hover {
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
        
        .check-type {
          background: rgba(102, 126, 234, 0.2);
          color: #667eea;
          border: 1px solid rgba(102, 126, 234, 0.3);
        }
        
        .arrow-type {
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
        
        .sidebar-item {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 20px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .sidebar-item:hover {
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
        }
        
        .sidebar-icon img {
          width: 26px;
          height: 26px;
          object-fit: contain;
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

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 24px;
          animation: fadeUp 0.3s ease-out;
        }

        .modal-box {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 28px;
          padding: 40px;
          max-width: 560px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .modal-head {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 2px solid #e9ecef;
        }

        .modal-heading {
          font-size: 28px;
          font-weight: 800;
          color: #212529;
          margin-bottom: 8px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .modal-subhead {
          font-size: 14px;
          color: #6c757d;
        }

        .form-field {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .required-mark {
          color: #667eea;
        }

        .field-input, .field-select {
          width: 100%;
          padding: 14px 16px;
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          color: #212529;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .field-input:focus, .field-select:focus {
          outline: none;
          background: #fff;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .field-input::placeholder {
          color: #adb5bd;
        }

        .field-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #e9ecef;
        }

        .field-select {
          cursor: pointer;
        }

        .file-field {
          width: 100%;
          padding: 14px 16px;
          background: #f8f9fa;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          color: #64748b;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .file-field:hover {
          background: #e9ecef;
          border-color: #667eea;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }

        .btn-cancel {
          flex: 1;
          padding: 14px;
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          color: #64748b;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-cancel:hover {
          background: #f8f9fa;
          border-color: #cbd5e1;
        }

        .btn-submit {
          flex: 1;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .load-spin {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-left: 8px;
        }

        @media (max-width: 1200px) {
          .main-grid { grid-template-columns: 1fr; }
          .sidebar-cards { display: grid; grid-template-columns: repeat(2, 1fr); }
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 768px) {
          .content-wrapper { padding: 24px 16px; }
          .hero-section { padding: 32px 24px; }
          .hero-top { flex-direction: column; text-align: center; }
          .hero-text h1 { font-size: 32px; }
          .hero-stats { grid-template-columns: 1fr; }
          .content-card { padding: 28px; }
          .sidebar-cards { grid-template-columns: 1fr; }
          .modal-box { padding: 28px; }
          .form-actions { flex-direction: column; }
        }
        
        @media (max-width: 480px) {
          .hero-text h1 { font-size: 26px; }
          .modal-heading { font-size: 22px; }
        }
      `}</style>
      
      <div className="page-wrapper page-top-cover">
        <div className="bg-pattern"></div>
        <div className="grid-bg"></div>
        
        <div className="content-wrapper">
          <button className="back-nav" onClick={onBack}>
            <span>←</span>
            <span>Back to Programs</span>
          </button>

          <div className="main-grid">
            <div>
              <div className="hero-section">
                <div className="hero-pattern"></div>
                <div className="hero-content">
                  <div className="hero-top">
                    <div className="hero-icon">
                      <img src={internship.image} alt={internship.title} />
                    </div>
                    <div className="hero-text">
                      <h1>{internship.title}</h1>
                      <p>{internship.description}</p>
                    </div>
                  </div>
                  
                  <div className="hero-stats">
                    <div className="stat-box">
                      <div className="stat-label">Duration</div>
                      <div className="stat-value" style={{ whiteSpace: 'pre-wrap' }}>{internship.duration}</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-label">Mode</div>
                      <div className="stat-value">{internship.mode}</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-label">Stipend</div>
                      <div className="stat-value">{internship.stipend}</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-label">Curriculum</div>
                      <div className="curriculum-links">
                        <button 
                          onClick={(e) => handleCurriculumClick(e, internship.curriculum.threeMonth)}
                          className="curriculum-button"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          3 Months
                        </button>
                        <button 
                          onClick={(e) => handleCurriculumClick(e, internship.curriculum.sixMonth)}
                          className="curriculum-button"
                        >
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          6 Months
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-card">
                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">About the Program</h3>
                  </div>
                  <p className="section-text">{internship.fullDescription}</p>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Key Skills</h3>
                  </div>
                  <div className="tags-wrapper">
                    {internship.skills && internship.skills.map((skill, i) => (
                      <div key={i} className="tag-item">{skill}</div>
                    ))}
                  </div>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">Requirements</h3>
                  </div>
                  <div className="list-wrapper">
                    {internship.requirements && internship.requirements.map((req, i) => (
                      <div key={i} className="list-row">
                        <div className="list-icon check-type">✓</div>
                        <div className="list-text">{req}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section-block">
                  <div className="section-header">
                    <div className="section-dot"></div>
                    <h3 className="section-title">What You'll Learn</h3>
                  </div>
                  <div className="list-wrapper">
                    {internship.learningOutcomes && internship.learningOutcomes.map((outcome, i) => (
                      <div key={i} className="list-row">
                        <div className="list-icon arrow-type">→</div>
                        <div className="list-text">{outcome}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="cta-button" onClick={() => setShowForm(true)}>
                  <span>Apply Now</span>
                </button>
              </div>
            </div>

            <div className="sidebar-wrapper">
              <h3 className="sidebar-title">Other Programs</h3>
              <div className="sidebar-cards">
                {remainingInternships.map((item) => (
                  <div key={item.id} className="sidebar-item" onClick={() => onSelectInternship(item)}>
                    <div className="sidebar-top">
                      <div className="sidebar-icon">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="sidebar-name">{item.title}</div>
                    </div>
                    <div className="sidebar-desc">{item.description}</div>
                    <div className="sidebar-tags">
                      {item.skills && item.skills.slice(0, 2).map((skill, i) => (
                        <div key={i} className="sidebar-tag">{skill}</div>
                      ))}
                      {item.skills && item.skills.length > 2 && (
                        <div className="sidebar-tag">+{item.skills.length - 2}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="modal-backdrop" onClick={() => !isSubmitting && setShowForm(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="modal-heading">Apply for {internship.title}</h2>
              <p className="modal-subhead">Fill in your details to apply for this internship</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="field-label">
                  Full Name <span className="required-mark">*</span>
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="field-input" placeholder="Enter your full name" required />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Email Address <span className="required-mark">*</span>
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="field-input" placeholder="your.email@example.com" required />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Phone Number <span className="required-mark">*</span>
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="field-input" placeholder="+91 1234567890" required />
              </div>

              <div className="form-field">
                <label className="field-label">
                  College Name <span className="required-mark">*</span>
                </label>
                <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange} className="field-input" placeholder="Enter your college name" required />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Year of Passing <span className="required-mark">*</span>
                </label>
                <select name="passedOutYear" value={formData.passedOutYear} onChange={handleInputChange} className="field-select" required>
                  <option value="">Select year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2024">2024 (Passed)</option>
                  <option value="2023">2023 (Passed)</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">
                  Domain Interested <span className="required-mark">*</span>
                </label>
                <input type="text" name="domain" value={formData.domain} readOnly disabled className="field-input" required />
              </div>

              <div className="form-field">
                <label className="field-label">
                  Upload Resume (Optional)
                </label>
                <input type="file" name="resume" onChange={handleFileChange} className="file-field" accept=".pdf,.doc,.docx" />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Submitting...<span className="load-spin"></span></>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default InternshipDetail; 