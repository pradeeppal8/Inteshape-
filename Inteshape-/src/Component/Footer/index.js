import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../ulits/assets/header-logo.png";
import { FaTelegramPlane } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSettings } from "../../context/SettingsContext";

function Footer({ }) {
  const { footerLogo, headerLogo: dynHeaderLogo } = useSettings();
  const dynamicLogo = footerLogo || dynHeaderLogo;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [footerLinks, setFooterLinks] = useState([
    { path: "/about", label: "About" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact Us" },
  ]);
  const [socialLinks, setSocialLinks] = useState({
    facebookLink: '', twitterLink: '', instagramLink: '', linkedinLink: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/navigation')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          if (Array.isArray(d.data.footer)) {
            const active = d.data.footer
              .filter(item => item.active)
              .map(item => ({ path: item.path, label: item.label }));
            if (active.length > 0) setFooterLinks(active);
          }
          if (d.data.socialMediaLinks) {
            setSocialLinks(d.data.socialMediaLinks);
          }
        }
      })
      .catch(() => {});
  }, []);

  const theme = "light";
  const baseColor = theme === "light" ? "#e8ebee" : "#2a2a2a";
  const highlightColor = theme === "light" ? "#f1f1f1" : "#3a3a3a";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!email.trim()) {
      alert("Please enter your email first!");
      return;
    }

    const telegramUsername = "yourusername";
    const message = encodeURIComponent(`My email is: ${email}`);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${message}`;

    window.open(telegramUrl, "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__col brand">
          <div className="brand__logo">
            {loading ? (
              <div className="skeleton-thumb" style={{ width: "150px", height: "58px" }}>
                <svg
                  width="150"
                  height="58"
                  viewBox="0 0 150 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="shimmerGradient">
                      <stop offset="0%" stopColor="#e8ebee">
                        <animate
                          attributeName="offset"
                          values="-2; 1"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="50%" stopColor="#dfe6ea">
                        <animate
                          attributeName="offset"
                          values="-1.5; 1.5"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#e8ebee">
                        <animate
                          attributeName="offset"
                          values="0; 2"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>
                  </defs>

                  <rect width="150" height="58" fill="url(#shimmerGradient)" rx="4" />


                  <circle cx="25" cy="29" r="8" fill="#f9fafb" />
                  <path
                    d="M0 45 
           C 40 40, 70 55, 100 42 
           S 130 45, 150 48 
           V58 H0 Z"
                    fill="#f9fafb"
                  />
                </svg>
              </div>
            ) : (
              <Link to="/">
                <img src={dynamicLogo || headerLogo} alt="Running Shoes" width="150" height="58" />
              </Link>
            )}

          </div>
          {loading ? (
            <Skeleton
              width={"100%"}
              height={25}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          ) : (
            <p>
              7X Theme is a html template for interior and architecture purpose.
              Today we can tell you, thanks to your passion.
            </p>
          )}

          <div className="brand__social">
            {
              // [1,2,3,4].map(i => (
              //   <Skeleton key={i} width={45} height={45} borderRadius={30} baseColor={baseColor} highlightColor={highlightColor} />
              // ))
              // <></>
              [
                { key: 'facebookLink',  cls: 'fab_facebook',  title: 'Facebook'  },
                { key: 'twitterLink',   cls: 'fab_twitter',   title: 'Twitter'   },
                { key: 'instagramLink', cls: 'fab_instagram', title: 'Instagram' },
                { key: 'linkedinLink',  cls: 'fab_linkedin',  title: 'Linkedin'  },
              ].map(({ key, cls, title }) =>
                socialLinks[key] ? (
                  <Link key={key} to={socialLinks[key]} target="_blank" rel="noopener noreferrer">
                    <div className={cls}></div>
                    <span className="title">{title}</span>
                  </Link>
                ) : null
              )
            }
          </div>
        </div>
        <div className="footer__col posts">
          {loading ? (
            <Skeleton
              width={'100%'}
              height={30}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <h4>Resent Post</h4>
          )}
          <ul>
            {loading ? (
              <Skeleton
                width={'100%'}
                height={20}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <li>
                <p>On these beams, we’re.</p>
              </li>
            )}
            {loading ? (
              <Skeleton
                width={'100%'}
                height={20}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <li>
                <p>We’ll be a sensation for</p>
              </li>
            )}
            {loading ? (
              <Skeleton
                width={'100%'}
                height={20}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <li>
                <p>We’ll be a sensation for</p>
              </li>
            )}


          </ul>
        </div>

        <div className="footer__col links">
          {loading ? (
            <Skeleton
              width={'100%'}
              height={30}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <h4>Useful links</h4>
          )}
          <ul>
            {loading ? (
              <Skeleton width={'100%'} height={20} borderRadius={30} baseColor={baseColor} highlightColor={highlightColor} style={{ marginBottom: "10px" }} count={5} />
            ) : (
              footerLinks.map((link, i) => (
                <li key={i}><Link to={link.path}>{link.label}</Link></li>
              ))
            )}
          </ul>
        </div>

        <div className="footer__col contact">
          {loading ? (
            <Skeleton
              width={'100%'}
              height={30}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <h4>Contact Us</h4>
          )}
          {loading ? (
            <Skeleton
              width={'100%'}
              height={20}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <p>756 Livingston Street, Brooklyn, Ahmedabad 380001, United State</p>)}
          {loading ? (
            <Skeleton
              width={'100%'}
              height={20}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <p>demo@gmail.com</p>
          )}
          {loading ? (
            <Skeleton
              width={'100%'}
              height={20}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <p>(+91) 9522900862</p>)}
          {loading ? (
            <Skeleton
              width={'100%'}
              height={20}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px" }}
            />
          ) : (
            <p>(+91) 9098670251</p>)}
        </div>
        <div className="footer__subscribe">
          {loading ? (
            <Skeleton
              width={'100%'}
              height={30}
              borderRadius={30}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          ) : (
            <h4>Subscribe</h4>
          )}
          {loading ? (
            <Skeleton
              width={'100%'}
              height={60}
              borderRadius={3}
              baseColor={baseColor}
              highlightColor={highlightColor}
              style={{ marginBottom: "10px", marginTop: "20px" }}
            />
          ) : (
            <p>
              Never Miss Anything From Ahmedabad By Signing Up To Our Newsletter.
            </p>
          )}

          <div className="subscribe__form">
            {loading ? (
              <Skeleton
                width={250}
                height={50}
                borderRadius={0}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            ) : (
              <div style={{ display: "flex" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL"
                />
                <button onClick={handleSend}>
                  <FaTelegramPlane className="text-white text-xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        {loading ? (
          <Skeleton
            width={"40%"}
            height={25}
            borderRadius={30}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        ) : (
          <p>© {new Date().getFullYear()} Your Company. Designed By Pradeep.</p>
        )}
      </div>
    </footer>
  );
}

export default Footer;
