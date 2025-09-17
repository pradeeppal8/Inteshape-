import React, { useState } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../ulits/assets/header-logo.png";
import { FaTelegramPlane } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");

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
            <Link to="/home">
              <img src={headerLogo} alt="Running Shoes" />
            </Link>
          </div>
          <p>
            7X Theme is a html template for interior and architecture purpose.
            Today we can tell you, thanks to your passion.
          </p>
          <div className="brand__social">
            <Link to="https://www.facebook.com/pradeep.baghel" target="_blank">
              <div className="fab_facebook"></div>
              <span class="title">Facebook</span>
            </Link>
            <Link to="https://www.twitter.com" target="_blank">
              <div className="fab_twitter"></div>
              <span class="title">Twitter</span>
            </Link>
            <Link to="https://www.instagram.com/rockey_star_615" target="_blank">
              <div className="fab_instagram"></div>
              <span class="title">Instagram</span>
            </Link>
            <Link to="https://www.linkedin.com/in/pradeep-baghel-569083244" target="_blank">
              <div className="fab_linkedin"></div>
              <span class="title">Linkedin</span>
            </Link>
          </div>
        </div>
        <div className="footer__col posts">
          <h4>Resent Post</h4>
          <ul>
            <li>
              {/* <div className="date">15 <span>OCT 2019</span></div> */}
              <p>On these beams, we’re.</p>
            </li>
            <li>
              {/* <div className="date">17 <span>OCT 2019</span></div> */}
              <p>We’ll be a sensation for</p>
            </li>
            <li>
              {/* <div className="date">18 <span>OCT 2019</span></div> */}
              <p>We’ll be a sensation for</p>
            </li>
          </ul>
        </div>

        <div className="footer__col links">
          <h4>Useful links</h4>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>Services</li>
            <li>Projects</li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col contact">
          <h4>Contact Us</h4>
          <p>756 Livingston Street, Brooklyn, NY 11201, United State</p>
          <p>7xthemedemo@gmail.com</p>
          <p>(+298) 012–3456–789</p>
          <p>(+298) 146–6543–480</p>
        </div>
        <div className="footer__subscribe">
          <h4>Subscribe</h4>
          <p>
            Never Miss Anything From 7xtheme By Signing Up To Our Newsletter.
          </p>
          <div className="subscribe__form">
            <div style={{display: "flex"}}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL"
              />
              <button
                onClick={handleSend}
              >
                <FaTelegramPlane className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Your Company. Designed By 7xtheme.</p>
      </div>
    </footer>
  );
}

export default Footer;
