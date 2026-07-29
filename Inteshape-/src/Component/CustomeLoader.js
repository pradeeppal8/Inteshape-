import React from "react";
import fallbackFavicon from "../ulits/assets/favicon9.png";
import { useSettings } from "../context/SettingsContext";

const CustomLoader = () => {
  const { favicon } = useSettings();
  const logo = favicon || fallbackFavicon;

  return (
    <div className="loader-overlay">
      <div className="logo-loader">
        {/* Outer spinning ring */}
        <svg className="logo-loader__ring" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeOpacity="0.15"
          />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="80 260"
            className="logo-loader__arc"
          />
        </svg>

        {/* Inner spinning dashes ring */}
        <svg className="logo-loader__ring logo-loader__ring--reverse" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="44"
            fill="none"
            stroke="var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="12 22"
            strokeOpacity="0.45"
            className="logo-loader__dashes"
          />
        </svg>

        {/* Logo in center */}
        <div className="logo-loader__center">
          <img src={logo} alt="Loading..." className="logo-loader__img" />
        </div>

        {/* Orbiting dot */}
        <div className="logo-loader__orbit">
          <div className="logo-loader__dot" />
        </div>
      </div>

      <p className="logo-loader__text">Loading<span className="logo-loader__dots" /></p>
    </div>
  );
};

export default CustomLoader;

