import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Search */}
      <div className="sidebar-section">
        <h3>Search</h3>
        <input type="text" placeholder="Search..." />
      </div>

      {/* Recent Posts */}
      <div className="sidebar-section">
        <h3>Recent Posts</h3>
        <ul>
          <li>Don’t forget your dreams</li>
          <li>Modern office design</li>
          <li>Quality home interiors</li>
        </ul>
      </div>

      {/* Categories */}
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul>
          <li>News (12)</li>
          <li>Design (8)</li>
          <li>Architecture (14)</li>
          <li>Business (5)</li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="sidebar-section">
        <h3>Newsletter</h3>
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>

      {/* Gallery */}
      <div className="sidebar-section gallery">
        <h3>Our Gallery</h3>
        <div className="gallery-grid">
          <img src="/images/gallery1.jpg" alt="Gallery" />
          <img src="/images/gallery2.jpg" alt="Gallery" />
          <img src="/images/gallery3.jpg" alt="Gallery" />
        </div>
      </div>

      {/* Tag Cloud */}
      <div className="sidebar-section">
        <h3>Tag Cloud</h3>
        <div className="tags">
          <span>Design</span>
          <span>Modern</span>
          <span>Architecture</span>
          <span>Office</span>
          <span>Business</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
