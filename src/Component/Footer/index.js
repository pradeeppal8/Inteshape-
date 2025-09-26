import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../ulits/assets/header-logo.png";
import { FaTelegramPlane } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Footer({ }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  //  const [theme, setTheme] = useState("light");

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
              <Link to="/home">
                <img src={headerLogo} alt="Running Shoes" width="150" height="58" />
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
            {loading ? (
              <Skeleton
                width={45}
                height={45}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            ) : (
              <Link
                to="https://www.facebook.com/rockey.bhai.909800"
                target="_blank"
              >
                <div className="fab_facebook"></div>
                <span class="title">Facebook</span>
              </Link>
            )}
            {loading ? (
              <Skeleton
                width={45}
                height={45}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            ) : (
              <Link to="https://www.twitter.com" target="_blank">
                <div className="fab_twitter"></div>
                <span class="title">Twitter</span>
              </Link>
            )}
            {loading ? (
              <Skeleton
                width={45}
                height={45}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            ) : (
              <Link
                to="https://www.instagram.com/rockey_star_615"
                target="_blank"
              >
                <div className="fab_instagram"></div>
                <span class="title">Instagram</span>
              </Link>
            )}
            {loading ? (
              <Skeleton
                width={45}
                height={45}
                borderRadius={30}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            ) : (
              <Link
                to="https://www.linkedin.com/in/pradeep-baghel-569083244"
                target="_blank"
              >
                <div className="fab_linkedin"></div>
                <span class="title">Linkedin</span>
              </Link>
            )}
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
                <Link to="/about">About</Link>
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
                <Link to="/portfolio">Portfolio</Link>
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
                <Link to="/projects">Projects</Link>
              </li>)}
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
                <Link to="/blog">Blog</Link>
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
                <Link to="/contact">Contact Us</Link>
              </li>
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
