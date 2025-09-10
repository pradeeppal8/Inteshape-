import React from "react";

const ScrollButtons = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <div className="scroll-buttons">
      <button onClick={scrollToTop} className="scroll-btn top">↑</button>
      <button onClick={scrollToBottom} className="scroll-btn bottom">↓</button>
    </div>
  );
}

export default ScrollButtons
