import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

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
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/#browse">Browse</Link>
        <button className="contact-btn">CONTACT</button>
        <button id="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;