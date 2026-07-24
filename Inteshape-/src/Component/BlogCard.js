import React from "react";

function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <img src={post.image} alt={post.title} />
      <div className="blog-content">
        <p className="date">{post.date} | {post.comments} Comments</p>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <button className="read-more">Read More</button>
      </div>
    </div>
  );
}

export default BlogCard;
