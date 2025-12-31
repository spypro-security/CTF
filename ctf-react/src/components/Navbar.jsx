import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar" style={styles.navbar}>
      {/* Logo + Company Name */}
      <div style={styles.brand}>
        <img src="/logo.png" alt="SpyPro Logo" style={styles.logo} />
        <h3 style={styles.companyName}>
          SpyPro Security Solutions Pvt. Ltd.
        </h3>
      </div>

      <ul style={styles.menu}>
        <li><a href="/">Home</a></li>
        <li><a href="/internships">Internships</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/competitions">Competitions</a></li>
        <li><a href="/practice">Practice</a></li>
        <li><a href="/Workshop">Workshop</a></li>
        
      </ul>

      <button className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><a href="/" onClick={toggleMenu}>Home</a></li>
          <li><a href="/internships" onClick={toggleMenu}>Internships</a></li>
          <li><a href="/jobs" onClick={toggleMenu}>Jobs</a></li>
          <li><a href="/competitions" onClick={toggleMenu}>Competitions</a></li>
          <li><a href="/practice" onClick={toggleMenu}>Practice</a></li>
          <li><a href="/Workshop" onClick={toggleMenu}>Workshop</a></li>
        </ul>
        <button className="login-btn">Log In</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 28px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    width: "40px",
    height: "40px",
  },
  companyName: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#1d4ed8",
    margin: 0,
  },
  menu: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    listStyle: "none",
  },
};

export default Navbar;
