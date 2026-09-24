import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">📺 TvShowFinder</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/#browse" onClick={() => setMenuOpen(false)}>Browse</Link>
        <button className="contact-btn">CONTACT</button>
        <button id="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;