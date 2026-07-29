import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerLogo from "../../ulits/assets/header-logo.png";
import Modal from "react-bootstrap/Modal";
import user_icon from "../../ulits/assets/user_icon.png";
import search_icon from "../../ulits/assets/search-icon.svg";
import { ReactComponent as SearchIcon } from "../../ulits/assets/search-icon.svg";
import LanguageModal from "../../Component/LanguageModal";
import { gsap } from "gsap";
import { useSettings } from "../../context/SettingsContext";

const pages = [
  { label: "Home",       path: "/",          desc: "Welcome to Inteshape" },
  { label: "About",      path: "/about",     desc: "About us, our team and story" },
  { label: "Portfolio",  path: "/portfolio", desc: "Our work and projects showcase" },
  { label: "Blog",       path: "/blog",      desc: "Latest articles and news" },
  { label: "Projects",   path: "/projects",  desc: "Development projects" },
  { label: "Contact",    path: "/contact",   desc: "Get in touch with us" },
  { label: "My Profile", path: "/profile",   desc: "User profile page" },
];

const Sun = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    {Array.from({ length: 8 }).map((_, i) => (
      <line
        key={i}
        x1="12"
        y1="2"
        x2="12"
        y2="5"
        stroke="currentColor"
        strokeWidth="2"
        transform={`rotate(${45 * i} 12 12)`}
      />
    ))}
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M20 14.5A8.5 8.5 0 1 1 9.5 4
             a7 7 0 1 0 10.5 10.5z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="16.8" cy="6.2" r="0.8" fill="currentColor" />
    <circle cx="18.6" cy="8.2" r="0.6" fill="currentColor" />
  </svg>
);

function Header() {
  const { headerLogo: dynamicLogo } = useSettings();
  const [showHeader, setShowHeader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lightMode, setLightMode] = useState(true);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iconRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLang, setSelectedLang] = useState("United States - English");
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [menuItems, setMenuItems] = useState([
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/blog", label: "Blog" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact Us" },
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/navigation')
      .then(r => r.json())
      .then(d => {
        if (d.success && Array.isArray(d.data.header)) {
          const active = d.data.header
            .filter(item => item.active)
            .map(item => ({ path: item.path, label: item.label }));
          if (active.length > 0) setMenuItems(active);
        }
      })
      .catch(() => {});
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setSearchTerm("");
  };
  const filteredResults = pages.filter((p) =>
    p.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchSelect = (path) => {
    navigate(path);
    setIsModalOpen(false);
    setSearchTerm("");
  };



  useEffect(() => {
    // Continuous left-right animation
    gsap.to(iconRef.current, {
      x: 20,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const getInitial = () =>
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const goToLogin = () => navigate("/");
  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "pradeep@gmail.com") {
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is Required";

    setErrors(newErrors);
  };
  const ToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLanguageChange = (lang) => {
    console.log('Selected language:', lang);
    // Add additional logic as needed
  };
  const [mode, setMode] = useState(getInitial);
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);
  const isDark = mode === "dark";

  return (
    <>
      <header
        className={`main-header ${showHeader ? "show" : "hide"} ${location.pathname === "/" ? "home-header" : "other-header"
          }`}
      >
        <div className="logo">
          <Link to="/">
            <img src={dynamicLogo || headerLogo} alt="Logo" />
          </Link>
        </div>

        <nav className="nav-links">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={ToggleSidebar}
              className={
                location.pathname === item.path ? "active" : ""
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="dark-mode">
          {/* <button
            className="login-signup-btn"
            to="/profile"
            onClick={() => navigate("/profile")}
          >
            Profile
          </button> */}
          <div class="extra-nav">
            <div class="extra-cell">
              <a href="#." onClick={toggleModal}>
                {/* <SearchIcon /> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path id="Path_27753" data-name="Path 27753" d="M24.639,22.9l-4.154-4.142a9.677,9.677,0,0,0,2.065-5.987,9.775,9.775,0,1,0-9.775,9.775,9.677,9.677,0,0,0,5.987-2.065L22.9,24.639A1.227,1.227,0,1,0,24.639,22.9ZM5.444,12.775a7.331,7.331,0,1,1,7.331,7.331,7.331,7.331,0,0,1-7.331-7.331Z" transform="translate(-3 -3)" fill="var(--primary-color)"></path></svg>
              </a>
            </div>
          </div>
          {isModalOpen && (
            <div className="overlay">
              <div className="close-btn" onClick={toggleModal}>
                &times;
              </div>
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Type to search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span
                  ref={iconRef}
                  className="search-icon"
                  onMouseEnter={() =>
                    gsap.to(iconRef.current, { x: 0, repeat: -1, yoyo: true, duration: 1 })
                  }
                  onMouseLeave={() =>
                    gsap.to(iconRef.current, { x: -12, repeat: -1, yoyo: true, duration: 1 })
                  }
                >
                  {/* <SearchIcon /> */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path id="Path_27753" data-name="Path 27753" d="M24.639,22.9l-4.154-4.142a9.677,9.677,0,0,0,2.065-5.987,9.775,9.775,0,1,0-9.775,9.775,9.677,9.677,0,0,0,5.987-2.065L22.9,24.639A1.227,1.227,0,1,0,24.639,22.9ZM5.444,12.775a7.331,7.331,0,1,1,7.331,7.331,7.331,7.331,0,0,1-7.331-7.331Z" transform="translate(-3 -3)" fill="var(--primary-color)"></path></svg>
                </span>
                {/* Display Filtered Results */}
              </div>
              {searchTerm && (
                <ul className="search-results">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((page) => (
                      <li key={page.path} onClick={() => handleSearchSelect(page.path)}
                        style={{ cursor: 'pointer' }}>
                        <span className="sr-label">{page.label}</span>
                        <span className="sr-desc">{page.desc}</span>
                      </li>
                    ))
                  ) : (
                    <li className="no-results">No pages found</li>
                  )}
                </ul>
              )}
            </div>
          )}
          {/* <div className="dce-padding_small" onClick={() => setShow(true)}>
            <img src={user_icon} alt="" />
          </div> */}
        </div>
        {/* {isOpen && <div className="overlays" onClick={ToggleSidebar}></div>} */}
        <div className="sidebars">
          <button
            className={`menu-button ${isOpen == true ? "open" : ""}`}
            onClick={ToggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
            {isOpen && <div className="overlays" onClick={ToggleSidebar}></div>}
          </button>
          <nav className={`menu ${isOpen == true ? "open" : ""}`}>
            <div className="sd-header">
              <Link to="/">{/* <img src={headerLogo} alt="Logo" /> */}</Link>
              <div className="menu-close" onClick={ToggleSidebar}>
                {/* <img src={arrowwhite} alt="Close Menu" /> */}
              </div>
            </div>
            <div className="hide-desk">
              <div className="meno-menu">
                <nav className="nav-links">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={ToggleSidebar}
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <button
                  className="login-signup-btn"
                  to="/profile"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
              </div>
              {/* <div className="dark-mode">
                <div className={`switch ${isDark ? "dark" : "light"}`}>
                  <span className="title">
                    {mode === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                  <div
                    className={`switch-toggle ${isDark ? "dark" : "light"}`}
                    onClick={() => setMode(isDark ? "light" : "dark")}
                  >
                    <span className="thumb" aria-hidden="true">
                      <span className="thumb-inner">
                        {isDark ? <Moon /> : <Sun />}
                      </span>
                    </span>
                    <div
                      className={`switch-toggle-slider ${lightMode ? "translate-x-6" : "translate-x-0"
                        }`}
                    ></div>
                  </div>
                </div>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <span className="text-gray-700">{selectedLang}</span>
                  <LanguageModal
                    selectedLang={selectedLang}
                    onSelect={(lang) => setSelectedLang(lang)}
                  />
                </div>
                <div className="px-3 py-2 hover:bg-gray-100 rounded-b-xl cursor-pointer">
                  <span className="text-gray-700">Sign In</span>
                </div>
              </div> */}
            </div>
          </nav>
        </div>
      </header>
      <Modal show={show} onHide={handleClose} className="dark-modal">
        <Modal.Body>
          <div className="dark-mode">
            <div className={`switch ${isDark ? "dark" : "light"}`}>
              <span className="title">
                {mode === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
              <div
                className={`switch-toggle ${isDark ? "dark" : "light"}`}
                onClick={() => setMode(isDark ? "light" : "dark")}
              >
                <span className="thumb" aria-hidden="true">
                  <span className="thumb-inner">
                    {isDark ? <Moon /> : <Sun />}
                  </span>
                </span>
                <div
                  className={`switch-toggle-slider ${lightMode ? "translate-x-6" : "translate-x-0"
                    }`}
                ></div>
              </div>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              {/* <span className="text-gray-700">{selectedLang}</span> */}
              <LanguageModal
                selectedLang={selectedLang}
                onSelect={(lang) => setSelectedLang(lang)}
              />
            </div>
            <div className="px-3 py-2 hover:bg-gray-100 rounded-b-xl cursor-pointer">
              <span className="text-gray-700 cursor-pointer">Sign Out</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
