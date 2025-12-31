import React from "react";

function Workshops() {
  const workshops = [
    {
      id: 1,
      title: "Ethical Hacking Workshop",
      status: "Upcoming",
      date: "25 Jan 2026",
      desc: "Learn penetration testing & real-world attack methods",
      skills: ["Kali Linux", "Networking", "Pentesting"],
      highlight: false,
    },
    {
      id: 2,
      title: "AI for Cyber Security",
      status: "Upcoming",
      date: "10 Feb 2026",
      desc: "Work on AI-driven threat detection systems",
      skills: ["Python", "ML", "Security"],
      highlight: true, // center card highlight
    },
    {
      id: 3,
      title: "CTF Beginner Workshop",
      status: "Completed",
      date: "22 Nov 2025",
      desc: "Hands-on Capture The Flag challenges",
      skills: ["CTF", "Linux", "OSINT"],
      highlight: false,
    },
    {
      id: 4,
      title: "Web Security Basics",
      status: "Completed",
      date: "10 Dec 2025",
      desc: "Understand OWASP Top 10 vulnerabilities",
      skills: ["OWASP", "Web", "Security"],
      highlight: false,
    },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Explore Our Workshops</h1>
      <p style={styles.subText}>
        Learn practical skills with hands-on workshops from Spypro Security Solutions
      </p>

      <div style={styles.grid}>
        {workshops.map((item) => (
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
                  backgroundColor:
                    item.status === "Upcoming" ? "#e8f5e9" : "#fcebea",
                  color: item.status === "Upcoming" ? "#2e7d32" : "#c62828",
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

            {item.status === "Upcoming" ? (
              <button style={styles.button}>Register Now</button>
            ) : (
              <button style={{ ...styles.button, opacity: 0.6 }} disabled>
                Completed
              </button>
            )}
          </div>
        ))}
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
