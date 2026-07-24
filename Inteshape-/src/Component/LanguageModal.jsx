import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const languages = [
  "Argentina - Español",
  "Australia - English",
  "Belgique - Français",
  "Bolivia - Español",
  "Brasil - Português",
  "Canada - English",
  "Canada - Français",
  "Chile - Español",
  "Colombia - Español",
  "Deutschland - Deutsch",
  "Ecuador - Español",
  "España - Español",
  "France - Français",
  "India - English",
  "Ireland - English",
  "Italia - Italiano",
  "México - Español",
  "Netherlands - English",
  "New Zealand - English",
  "Paraguay - Español",
  "Perú - Español",
  "United Kingdom - English",
  "United States - English",
  "Uruguay - Español",
  "Venezuela - Español",
  "Österreich - Deutsch",
  "中国 - 简体中文",
  "台灣 - 繁體中文",
  "日本 - 日本語",
  "香港特別行政區 - 繁體中文",
  "대한민국 - 한국어",
];

const LanguageSelect = ({ selectedLang, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-h-screen" ref={wrapperRef}>
      <input
        type="text"
        value={search || selectedLang}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control"
        placeholder="Select language..."
      />
      {isOpen && (
        <div className="absolute left-0 right-0 max-h-48 overflow-y-auto z-50 modal-show">
          <div className="title-top">
            <h2>
              Select a Country/Region and Language
            </h2>
            <button
              className="close_btn"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 max-h-[60vh] overflow-y-auto">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(lang);
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className="cursor-pointer hover:underline text-gray-800"
                >
                  {lang}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400">No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
