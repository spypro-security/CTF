import React, { useState } from "react";

const EnrollForm = ({ onClose, workshopType }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Successfully Enrolled!\n\nWorkshop: ${workshopType}\nName: ${formData.fullName}\nEmail: ${formData.email}\nContact: ${formData.contact}`
    );
    onClose(); // Close the form after submission
  };

  return (
    <>
      <div className="enroll-overlay">
        <div className="enroll-container">
          <h2>Enroll for {workshopType} Workshop</h2>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <div className="button-group">
              <button type="submit" className="btn submit">
                Submit
              </button>
              <button
                type="button"
                className="btn cancel"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .enroll-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .enroll-container {
          background: #fff;
          padding: 30px 40px;
          border-radius: 12px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .enroll-container h2 {
          text-align: center;
          margin-bottom: 20px;
          color: #5b5be0;
        }
        form label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }
        form input {
          width: 100%;
          padding: 10px 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
        }
        .button-group {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .btn.submit {
          background: #6366f1;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn.cancel {
          background: #fff;
          color: #6366f1;
          border: 2px solid #6366f1;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
};

export default EnrollForm;
