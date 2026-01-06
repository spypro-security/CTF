import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((s) => !s);
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <img src="/logo.png" alt="SpyPro Logo" className="brand-logo" />
        <h3 className="company-name">SpyPro Security Solutions Pvt.Ltd.</h3>
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/internships">Internships</a></li>
        <li><a href="/jobs">Jobs</a></li>
        <li><a href="/competitions">Competitions</a></li>
        <li><a href="/practice">Practice</a></li>
        <li><a href="/workshop">Workshop</a></li>
      </ul>

      <button className="hamburger" aria-label="Toggle menu" onClick={toggleMenu}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li><a href="/" onClick={toggleMenu}>Home</a></li>
          <li><a href="/internships" onClick={toggleMenu}>Internships</a></li>
          <li><a href="/jobs" onClick={toggleMenu}>Jobs</a></li>
          <li><a href="/competitions" onClick={toggleMenu}>Competitions</a></li>
          <li><a href="/practice" onClick={toggleMenu}>Practice</a></li>
          <li><a href="/workshop" onClick={toggleMenu}>Workshop</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
