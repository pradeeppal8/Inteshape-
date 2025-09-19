import { useState, useEffect } from "react";

const ScrollButtons = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <>
      {showButtons && (
        <div className="scroll-buttons">
          <button onClick={scrollToTop} className="scroll-btn top">↑</button>
          <button onClick={scrollToBottom} className="scroll-btn bottom">↓</button>
        </div>
      )}
    </>
  );
};

export default ScrollButtons;

