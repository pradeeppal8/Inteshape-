import React from "react";

const CustomLoader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default CustomLoader;
