import React from "react";
import { useNavigate } from "react-router-dom";

function Workshops() {
  const navigate = useNavigate();

  const workshops = [
    {
      id: 1,
      title: "CyberSecurity Workshop",
      status: "Upcoming",
      date: "25 Jan 2026",
      desc: "Learn penetration testing & real-world attack methods",
      skills: ["Kali Linux", "Networking", "Pentesting"],
      highlight: false,
    },
    {
      id: 2,
      title: "IoT Integrated with AI Workshop",
      status: "Upcoming",
      date: "15 Feb 2026",
      desc: "Hands-on IoT projects using AI for smart solutions",
      skills: ["IoT", "AI", "Python"],
      highlight: true,
    },
    {
      id: 3,
      title: "IoT Integrated with ML Workshop",
      status: "Upcoming",
      date: "20 Feb 2026",
      desc: "Learn machine learning applications in IoT environments",
      skills: ["IoT", "ML", "Python"],
      highlight: false,
    },
    {
      id: 4,
      title: "Python Full Stack Development Workshop",
      status: "Upcoming",
      date: "10 Mar 2026",
      desc: "Build dynamic web applications using Python frameworks",
      skills: ["Python", "Django", "Flask"],
      highlight: false,
    },
    {
      id: 5,
      title: "Java Full Stack Development Workshop",
      status: "Upcoming",
      date: "05 Apr 2026",
      desc: "Create robust web applications with Java technologies",
      skills: ["Java", "Spring", "Hibernate"],
      highlight: false,
    },
    {
      id: 6,
      title: "Power BI with Gen AI Workshop",
      status: "Upcoming",
      date: "15 Apr 2026",
      desc: "Master data visualization and business intelligence with Power BI",
      skills: ["Power BI", "Data Visualization", "DAX"],
      highlight: false,
    },
    {
      id: 7,
      title: "Ethical Hacking Workshop",
      status: "Upcoming",
      date: "20 Apr 2026",
      desc: "Learn ethical hacking techniques and security testing",
      skills: ["Ethical Hacking", "Security Testing", "Penetration Testing"],
      highlight: false,
    }
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Explore Our Workshops</h1>
      <p style={styles.subText}>
        Learn practical skills with hands-on workshops from Spypro Security Solutions
      </p>

      <div style={styles.grid}>
        {workshops.map((item) => {
          const isUpcoming = item.status.toLowerCase() === "upcoming";

          return (
            <div
              key={item.id}
              style={{
                ...styles.card,
                border: item.highlight ? "2px solid #6c63ff" : "none",
                transform: item.highlight ? "scale(1.03)" : "none",
              }}
            >
              <h2 style={styles.title}>{item.title}</h2>
              <p style={styles.company}>Spypro Security Solutions Pvt. Ltd.</p>

              <div style={styles.badges}>
                <span style={styles.badge}>📅 {item.date}</span>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: isUpcoming ? "#e8f5e9" : "#fcebea",
                    color: isUpcoming ? "#2e7d32" : "#c62828",
                  }}
                >
                  {item.status}
                </span>
              </div>

              <p style={styles.desc}>{item.desc}</p>

              <div style={styles.skills}>
                {item.skills.map((skill, i) => (
                  <span key={i} style={styles.skill}>
                    {skill}
                  </span>
                ))}
              </div>

              {isUpcoming ? (
                <button
                  style={styles.button}
                  onClick={() => navigate("/workshop-curriculum")}
                >
                  Register Now
                </button>
              ) : (
                <button style={{ ...styles.button, opacity: 0.6 }} disabled>
                  Completed
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "linear-gradient(180deg, #f5f7ff, #ffffff)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "42px",
    textAlign: "center",
    color: "#6c63ff",
  },
  subText: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#6b7280",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "auto",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },
  title: {
    fontSize: "22px",
    marginBottom: "5px",
  },
  company: {
    color: "#6c63ff",
    fontWeight: "600",
    marginBottom: "15px",
  },
  badges: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#f1f3f9",
    fontSize: "14px",
  },
  desc: {
    color: "#6b7280",
    marginBottom: "15px",
  },
  skills: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  skill: {
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#eef2ff",
    color: "#4f46e5",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(90deg, #6c63ff, #7f56d9)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Workshops;
