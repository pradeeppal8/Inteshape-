import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerLogo from "../../ulits/assets/header-logo.png";
import Modal from "react-bootstrap/Modal";
// import { useTheme } from "../ThemeProvider";
import user_icon from "../../ulits/assets/user_icon.png";
import search_icon from "../../ulits/assets/search-icon.svg";
import LanguageModal from "../../Component/LanguageModal";
import { gsap } from "gsap";
// import LanguageSelect from "../../LanguageSelect";

const sampleData = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Strawberry",
  "Watermelon",
  "Grapes",
  "Blueberry",
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



  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    setSearchTerm("");
  };
  const filteredResults = sampleData.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );



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
  const menuItems = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    {
      path: "/portfolio",
      label: "Portfolio",
      children: [
        {
          path: "/portfolio/design",
          label: "Design",
          children: [
            { path: "/portfolio/design/ui", label: "UI Design" },
            { path: "/portfolio/design/ux", label: "UX Design" },
            { path: "/portfolio/design/web", label: "Web Design" },
          ],
        },
        { path: "/portfolio/development", label: "Development" },
        { path: "/portfolio/photography", label: "Photography" },
      ],
    },
    { path: "/blog", label: "Blog" },
    { path: "/shop", label: "Shop" },
    { path: "/buy", label: "Buy Theme!" },
  ];
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
            <img src={headerLogo} alt="Logo" />
          </Link>
        </div>

        <nav className="nav-links">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(index)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
                {item.children && <span className="ml-2">▸</span>}
              </Link>

              {/* Dropdown menu */}
              {(hoveredMenu === index ||
                (item.children &&
                  item.children.some((child) =>
                    location.pathname.startsWith(child.path)
                  ))) && (
                  <ul className="sub-menu">
                    {item.children.map((child, cIndex) => (
                      <li key={cIndex} className="relative group">
                        <Link
                          to={child.path}
                          className={`block px-4 py-2 hover:bg-gray-200 ${location.pathname === child.path
                              ? "bg-gray-300 text-gray-900"
                              : "text-gray-800"
                            }`}
                        >
                          {child.label}
                          {child.children && <span className="ml-2">▸</span>}
                        </Link>

                        {/* Recursive sub-sub-menu */}
                        {child.children && (
                          <ul className="sub-menu nested">
                            {child.children.map((subChild, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  to={subChild.path}
                                  className={`block px-4 py-2 hover:bg-gray-200 ${location.pathname === subChild.path
                                      ? "bg-gray-300 text-gray-900"
                                      : "text-gray-800"
                                    }`}
                                >
                                  {subChild.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
            </li>
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
                <img src={search_icon} alt="" />
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
                  <img src={search_icon} alt="Search" />
                </span>
                {/* Display Filtered Results */}
              </div>
              {searchTerm && (
                <ul className="search-results">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))
                  ) : (
                    <li className="no-results">No results found</li>
                  )}
                </ul>
              )}
            </div>
          )}
          <div className="dce-padding_small" onClick={() => setShow(true)}>
            <img src={user_icon} alt="" />
          </div>
        </div>
        <div className="sidebars">
          <button
            className={`menu-button ${isOpen == true ? "open" : ""}`}
            onClick={ToggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
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
                  <span className="text-gray-700">Sign In</span>
                </div>
              </div>
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
              <span className="text-gray-700">Sign In</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
