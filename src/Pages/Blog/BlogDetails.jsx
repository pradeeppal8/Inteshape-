import React from "react";
import { useLocation } from "react-router-dom";

function BlogDetails() {
  const location = useLocation();
  const index = location.state?.index;

  if (!index) {
    return <p>No blog data available.</p>;
  }

  return (
    <div className="main-wrapper">
      <div className="blog-details">
        <img src={index.src} alt={index.title} className="blog-image" />
        <div className="content">
            <h1>{index.title}</h1>
            <p>{index.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
