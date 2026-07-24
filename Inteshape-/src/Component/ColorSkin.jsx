import { useEffect, useRef, useState } from "react";
import facebook from "../ulits/assets/Facebook_icon.svg";
// import twitter from "../ulits/assets/Twitter_icon.svg";
import { Link } from "react-router-dom";
import instagram from "../ulits/assets/Instagram_icon.svg";
// import "./color-dock.css";

const COLORS = [
  "#10BFA7",
  "#33C3F0",
  "#F2C20C",
  "#EA4C89",
  "#1E55C4",
  "#FF1D1D",
  "#F57224",
  "#C97A44",
];

export default function ColorSkin() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const [brand, setBrand] = useState(COLORS[0]);
  const onGearClick = () => setOpen((o) => !o);

  // load + apply brand
  useEffect(() => {
    const saved = localStorage.getItem("brandColor");
    if (saved) setBrand(saved);
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--brand", brand);
    localStorage.setItem("brandColor", brand);
  }, [brand]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !e.target.closest(".dock-btn")
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <>
      <div className="color-dock">
        <button
          className={`dock-btn ${open ? "open" : "close"}`}
          onClick={onGearClick}
          aria-expanded={open}
          aria-label="Color settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.62l-1.92-3.32a.5.5 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.5.5 0 0 0-.49-.42h-3.84a.5.5 0 0 0-.49.42l-.36 2.54c-.59.24-1.12.56-1.62.94l-2.39-.96a.5.5 0 0 0-.59.22L2.71 8.86a.5.5 0 0 0 .12.62l2.03 1.58c-.04.3-.06.62-.06.94s.02.64.06.94l-2.03 1.58a.5.5 0 0 0-.12.62l1.92 3.32c.12.21.37.3.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.03.24.24.42.49.42h3.84c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.12-.56 1.62-.94l2.39.96c.22.09.47-.01.59-.22l1.92-3.32a.5.5 0 0 0-.12-.62l-2.03-1.58ZM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
          </svg>
          <div
            ref={panelRef}
            className={`dock-panel ${open ? "open" : ""}`}
            role="dialog"
            aria-label="Pick color"
          >
            <div className="bg_color">
              <div className="swatches">
                <Link to="https://www.facebook.com">
                  <div className="fab_facebook"></div>
                </Link>
                <Link to="https://www.twitter.com">
                  <div className="fab_twitter"></div>
                </Link>
                <Link to="https://www.linkedin.com">
                  <div className="fab_linkedin"></div>
                </Link>
                <Link to="https://www.instagram.com">
                  <div className="fab_instagram"></div>
                </Link>
                <Link to="https://www.whatsapp.com">
                  <div className="fab_whatsapp"></div>
                </Link>
                <Link to="https://www.copylink.com">
                  <div className="fab_copylink"></div>
                </Link>
                <Link to="https://www.sharethis.com">
                  <div className="fab_sharethis"></div>
                </Link>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
