import React from "react";
// import "./BlogCard.scss";

const BlogCard = ({ post }) => {
  return (
    <div className="blog-card">
      {/* Date Badge */}
      <div className="date-badge">
        <span className="day">{post.date.day}</span>
        <span className="month">{post.date.month}</span>
      </div>

      {/* Blog Image */}
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
      </div>

      {/* Meta Info */}
      <div className="blog-meta">
        By {post.author} - {post.comments} Comments
      </div>

      {/* Title */}
      <h3 className="blog-title">{post.title}</h3>

      {/* Read More */}
      <a href={post.link} className="read-more">
        VIEW MORE
      </a>
    </div>
  );
};

export default BlogCard;
