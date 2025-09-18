import React, { useState } from "react";
import picimg4 from "../../ulits/assets/pic_img4.jpg";
import pic_img6 from "../../ulits/assets/pic_img6.jpg";
import pic_img7 from "../../ulits/assets/pic_img7.jpg";
import pic_img5 from "../../ulits/assets/pic_img5.jpg";
import pic_img8 from "../../ulits/assets/pic_img8.jpg";
import pic_img9 from "../../ulits/assets/pic_img9.jpg";
import pic_img10 from "../../ulits/assets/pic_img10.jpg";
import pic_img11 from "../../ulits/assets/pic_img11.jpg";
import pic_img12 from "../../ulits/assets/pic_img4.jpg";
import view_icon from "../../ulits/assets/view_icon.png";
import ScrollButtons from "../../Component/ScrollButtons";

const categories = [
    "All",
    "Architecture",
    "Decore",
    "Outdoor",
    "Interiors",
    "Residential",
];

const portfolioItems = [
    {
        id: 1,
        category: "Architecture",
        title: "Modern Bathroom",
        desc: "We provide a range of architectural 3D modeling services to our customers...",
        src: pic_img5,
    },
    {
        id: 2,
        category: "Residential",
        title: "Dream House",
        desc: "Landscape plans for drainage problems may also entail planting.",
        src: pic_img6,
    },
    {
        id: 3,
        category: "Interiors",
        title: "Living Room Design",
        desc: "Stylish and modern living room interiors with natural light.",
        src: pic_img7,
    },
    {
        id: 4,
        category: "Decore",
        title: "Office Space",
        desc: "Creative workspace with modern decoration ideas.",
        src: pic_img8,
    },
    {
        id: 5,
        category: "Outdoor",
        title: "Garden View",
        desc: "Beautifully landscaped outdoor spaces.",
        src: pic_img9,
    },
    {
        id: 6,
        category: "Architecture",
        title: "Glass Building",
        desc: "Contemporary architecture with glass exteriors.",
        src: pic_img10,
    },
    {
        id: 7,
        category: "Residential",
        title: "Luxury Apartment",
        desc: "Modern residential apartment with smart interiors.",
        src: pic_img11,
    },
    {
        id: 8,
        category: "Interiors",
        title: "Kitchen Design",
        desc: "Functional and stylish modular kitchen designs.",
        src: pic_img12,
    },
    {
        id: 9,
        category: "Outdoor",
        title: "Pool Side",
        desc: "Luxury swimming pool with seating area.",
        src: pic_img5,
    },
    {
        id: 10,
        category: "Decore",
        title: "Conference Room",
        desc: "Elegant conference room design with lighting.",
        src: pic_img6,
    },
    {
        id: 11,
        category: "Architecture",
        title: "Modern Office",
        desc: "Architectural design for commercial office spaces.",
        src: pic_img7,
    },
    {
        id: 12,
        category: "Residential",
        title: "Family House",
        desc: "Spacious family house with cozy interiors.",
        src: pic_img8,
    },
];

function Portfolio() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
        setLoading(true);

        setTimeout(() => {
            setVisibleCount((prev) => prev + 3);
            setLoading(false);
        }, 1000);
    };

    const handleOpen = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handleClose = () => setIsOpen(false);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? filteredItems.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === filteredItems.length - 1 ? 0 : prev + 1
        );
    };

    const filteredItems =
        activeCategory === "All"
            ? portfolioItems
            : portfolioItems.filter((item) => item.category === activeCategory);
    return (
        <>
            <div className="main-wrapper">
                <div className="portfolio-page">
                    <div className="portfolio-section">
                        <div className="sx-bnr-inr overlay-wraper bg-parallax bg-top-center">
                            <div className="overlay-main bg-black opacity-07">
                                <img src={picimg4} alt="" />
                            </div>

                            <div className="sx-bnr-inr-entry">
                                <div className="banner-title-outer">
                                    <div className="banner-title-name">
                                        <h2 className="m-tb0">Masonry 3 Columns No Gap</h2>
                                        <p>
                                            The essence of interior design will always be about people
                                            and how they live. It is about the realities of what makes
                                            for an attractive, civilized.
                                        </p>
                                    </div>
                                    <div>
                                        <ul className="sx-breadcrumb breadcrumb-style-2">
                                            <li>
                                                <a href="/home">Home</a>
                                            </li>
                                            <li>/ Project-Masonry</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portfolio-section-inner">
                        <section className="portfolio-section">
                            <div className="portfolio-tabs">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        className={activeCategory === cat ? "active" : ""}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="portfolio-grid">
                                {filteredItems.slice(0, visibleCount).map((item, index) => (
                                    <div className="portfolio-card" key={item.id}>
                                        <div className="card-image">
                                            <img
                                                src={item.src}
                                                alt={item.title}
                                                onClick={() => handleOpen(index)}
                                            />
                                            <div
                                                className="image-overlay"
                                                onClick={() => handleOpen(index)}
                                            >
                                                <span className="view-icon">
                                                    <img src={view_icon} alt="View Icon" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Modal */}
                            {isOpen && (
                                <div className="modal-overlay" onClick={handleClose}>
                                    <div
                                        className="modal-content"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button className="prev-btn" onClick={handlePrev}></button>
                                        <button className="close-btn" onClick={handleClose}>
                                            ✖
                                        </button>

                                        <img
                                            src={filteredItems[currentIndex].src}
                                            alt={filteredItems[currentIndex].title}
                                            className="modal-img"
                                        />
                                        <div className="counter">
                                            {currentIndex + 1} of {filteredItems.length}
                                        </div>

                                        <button className="next-btn" onClick={handleNext}></button>
                                    </div>
                                </div>
                            )}
                            {/* <div className="text-center load-more-btn-outer">
                                <button className="site-button">
                                    Load More
                                </button>
                            </div> */}
                            {visibleCount < filteredItems.length && (
                                <div className="text-center load-more-btn-outer">
                                    <button
                                        className={`site-button ${loading ? "loading-btn" : "site-button"}`}
                                        onClick={handleLoadMore}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Load More"}
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
             <ScrollButtons />
        </>
    );
}

export default Portfolio;
