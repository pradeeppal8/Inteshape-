import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import picimg1 from "../../ulits/assets/pic_img1.jpg";

function BlogDetails() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const index = location.state?.index;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const items = [
    {
      id: 1,
      src: picimg1,
      title: "Item Image 1",
      description: "Short description for item 1.",
    },
    {
      id: 2,
      src: picimg1,
      title: "Item Image 2",
      description: "Short description for item 2.",
    },
    {
      id: 3,
      src: picimg1,
      title: "Item Image 3",
      description: "Short description for item 2.",
    },
  ];

  if (!index) {
    return <p>No blog data available.</p>;
  }

  return (
    <div className="main-wrapper">
      <div className="blog-details">
        <div className="blog-images">
          {loading ? (
            <div className="skeleton-thumb">
              <svg
                width="100%"
                height="1024"
                viewBox="0 0 1536 1024"
                // preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  borderRadius: "0px",
                  backgroundColor: "#fff",
                  position: "relative",
                  zIndex: "9",
                }}
              >
                <defs>
                  <linearGradient id="shimmerGradient">
                    <stop offset="0%" stopColor="#e8ebee">
                      <animate
                        attributeName="offset"
                        values="-2; 1"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="#dfe6ea">
                      <animate
                        attributeName="offset"
                        values="-1.5; 1.5"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="#e8ebee">
                      <animate
                        attributeName="offset"
                        values="0; 2"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                </defs>

                <rect
                  width="100%"
                  height="100%"
                  fill="url(#shimmerGradient)"
                  rx="0"
                />
                <circle cx="290" cy="330" r="78" fill="#f9fafb" />
                <path
                  d="M0 825 
    C 290 660, 507 991, 725 743 
    S 1159 743, 1536 825 
    V1024 H0 Z"
                  fill="#f9fafb"
                />
              </svg>
            </div>
          ) : (
            <img src={index.src} alt={index.title} className="blog-image" />
          )}
        </div>

        <div className="content">
          {loading ? (
            <Skeleton
              width={"100%"}
              height={25}
              borderRadius={30}
              baseColor="#ebebeb"
              highlightColor="#f5f5f5"
            />
          ) : (
            <h1>Blog List Style</h1>
          )}
          {loading ? (
            <Skeleton
              width={"100%"}
              height={20}
              borderRadius={30}
              baseColor="#ebebeb"
              highlightColor="#f5f5f5"
            />
          ) : (
            <p>
              The essence of interior design will always be about people and how
              they live. It is about the realities of what makes for an
              attractive, civilized.
            </p>
          )}

          <div>
            {loading ? (
              <Skeleton
                width={"100%"}
                height={15}
                borderRadius={30}
                baseColor="#ebebeb"
                highlightColor="#f5f5f5"
              />
            ) : (
              <ul className="sx-breadcrumb breadcrumb-style-2">
                <li>
                  <a href="/blog">Blog /</a>
                </li>
                <li>{index.title}</li>
              </ul>
            )}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="blog-grid m-b30">
              {items.map(({ src, title, description }) => (
                <div className="list-item">
                  {loading ? (
                    <div className="skeleton-thumb">
                      <svg
                        width="300"
                        height="200"
                        viewBox="0 0 212 124"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          border: "1px solid white",
                          borderRadius: "6px",
                        }}
                      >
                        <defs>
                          <linearGradient id="shimmerGradient">
                            <stop offset="0%" stopColor="#e8ebee">
                              <animate
                                attributeName="offset"
                                values="-2; 1"
                                dur="1.5s"
                                repeatCount="indefinite"
                              />
                            </stop>
                            <stop offset="50%" stopColor="#dfe6ea">
                              <animate
                                attributeName="offset"
                                values="-1.5; 1.5"
                                dur="1.5s"
                                repeatCount="indefinite"
                              />
                            </stop>
                            <stop offset="100%" stopColor="#e8ebee">
                              <animate
                                attributeName="offset"
                                values="0; 2"
                                dur="1.5s"
                                repeatCount="indefinite"
                              />
                            </stop>
                          </linearGradient>
                        </defs>

                        <rect
                          width="300"
                          height="200"
                          fill="url(#shimmerGradient)"
                          rx="6"
                        />
                        <circle cx="40" cy="40" r="10" fill="#f9fafb" />
                        <path
                          d="M0 100 
      C 40 80, 70 120, 100 90 
      S 160 90, 212 100 
      V124 H0 Z"
                          fill="#f9fafb"
                        />
                      </svg>
                    </div>
                  ) : (
                    <img src={src} alt={title} className="item-image" />
                  )}
                  <div className="item-content">
                    {loading ? (
                      <Skeleton
                        width={"100%"}
                        height={25}
                        borderRadius={30}
                        baseColor="#ebebeb"
                        highlightColor="#f5f5f5"
                      />
                    ) : (
                      <h3>{title}</h3>
                    )}
                    {loading ? (
                      <Skeleton
                        width={"100%"}
                        height={20}
                        borderRadius={30}
                        baseColor="#ebebeb"
                        highlightColor="#f5f5f5"
                      />
                    ) : (
                      <p>{description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
