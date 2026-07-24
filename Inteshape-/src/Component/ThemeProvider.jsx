// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeCtx = createContext({ theme: "light", toggle: () => {} });

// export function ThemeProvider({ children }) {
//   const getInitial = () => {
//     const stored = localStorage.getItem("theme");
//     if (stored) return stored;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   };

//   const [theme, setTheme] = useState(getInitial);

//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

//   return (
//     <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeCtx);

// ThemeProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext({
  mode: "light",
  isDark: false,
  toggle: () => {},
});
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const getInitial = () =>
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  const [mode, setMode] = useState(getInitial);

  useEffect(() => {
    // <body> class
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(mode); // <-- now body gets 'light' or 'dark'

    // Optional: also on <html> for data-theme targeting
    document.documentElement.setAttribute("data-theme", mode);

    localStorage.setItem("theme", mode);
  }, [mode]);

  // (optional) react to OS theme changes while user hasn't chosen
  useEffect(() => {
    const mm = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("theme")) setMode(e.matches ? "dark" : "light");
    };
    mm.addEventListener?.("change", handler);
    return () => mm.removeEventListener?.("change", handler);
  }, []);

  const value = {
    mode,
    isDark: mode === "dark",
    toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
  };
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
