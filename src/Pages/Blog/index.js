import { useState, useEffect, useRef } from "react";
import ScrollButtons from "../../Component/ScrollButtons";
import CustomLoader from "../../Component/CustomeLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slide1 from "../../ulits/assets/slide1.jpg";
import slide2 from "../../ulits/assets/slide2.jpg";
import slide3 from "../../ulits/assets/slide3.jpg";
import thum1 from "../../ulits/assets/thum1.jpg";
import thum2 from "../../ulits/assets/thum2.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import pic_img1 from "../../ulits/assets/pic_img1.jpg";
import pic_img2 from "../../ulits/assets/pic_img2.jpg";
import pic_img3 from "../../ulits/assets/pic_img3.jpg";

const slides = [
    {
        eyebrow: "VARIETY",
        title: ["Flooring for Any", "Interior site"],
        desc: "Right design and right ideas matter a lot in interior design business. a style that makes a statement.",
        cta: "READ MORE",
        image: {
            src: slide1,
            alt: "Image 1",
        },
    },
    {
        eyebrow: "DESIGN",
        title: ["Minimalist vibes", "with natural light"],
        desc: "Bring calm to your space with clean lines and warm textures for everyday living.",
        cta: "READ MORE",
        image: {
            src: slide2,
            alt: "Image 2",
        },
    },
    {
        eyebrow: "STYLE",
        title: ["Scandi chairs", "and soft plants"],
        desc: "Balanced contrast for spaces that feel curated yet livable.",
        cta: "READ MORE",
        image: {
            src: slide3,
            alt: "Image 3",
        },
    },
];

const blogPosts = [
    {
        id: 1,
        date: { day: "05", month: "SEP" },
        src: pic_img1,
        author: "John Smith",
        comments: 5,
        title: "We’ll nail your next project, because...",
        link: "#",
    },
    {
        id: 2,
        date: { day: "25", month: "SEP" },
        src: pic_img2,
        author: "Mary Johnson",
        comments: 5,
        title: "Helping you and your house become...",
        link: "#",
    },
    {
        id: 3,
        date: { day: "05", month: "SEP" },
        src: pic_img3,
        author: "Robert Brown",
        comments: 5,
        title: "Creating quality urban lifestyles, building...",
        link: "#",
    },
    {
        id: 4,
        date: { day: "10", month: "OCT" },
        src: pic_img1,
        author: "Jane Williams",
        comments: 3,
        title: "A modern approach to home construction...",
        link: "#",
    },
    {
        id: 5,
        date: { day: "18", month: "NOV" },
        src: pic_img2,
        author: "Mike Davis",
        comments: 8,
        title: "Eco-friendly building materials explained...",
        link: "#",
    },
    {
        id: 6,
        date: { day: "12", month: "DEC" },
        src: pic_img3,
        author: "Anna Miller",
        comments: 6,
        title: "Sustainable architecture trends for 2025...",
        link: "#",
    },
    {
        id: 7,
        date: { day: "20", month: "JAN" },
        src: pic_img1,
        author: "Tom Wilson",
        comments: 4,
        title: "Top 10 urban planning mistakes to avoid...",
        link: "#",
    },
    {
        id: 8,
        date: { day: "02", month: "FEB" },
        src: pic_img2,
        author: "Emily Moore",
        comments: 7,
        title: "Innovative design concepts in modern homes...",
        link: "#",
    },
    {
        id: 9,
        date: { day: "15", month: "MAR" },
        src: pic_img3,
        author: "John Taylor",
        comments: 5,
        title: "The future of smart homes and automation...",
        link: "#",
    },
    {
        id: 10,
        date: { day: "08", month: "APR" },
        src: pic_img1,
        author: "Mike Anderson",
        comments: 9,
        title: "Renovating vs building new: What to choose?",
        link: "#",
    },
    {
        id: 11,
        date: { day: "22", month: "MAY" },
        src: pic_img2,
        author: "Jane Thomas",
        comments: 3,
        title: "Choosing the right materials for your home...",
        link: "#",
    },
    {
        id: 12,
        date: { day: "14", month: "JUN" },
        src: pic_img3,
        author: "Anna Jackson",
        comments: 6,
        title: "How to maximize space in small apartments...",
        link: "#",
    },
    {
        id: 13,
        date: { day: "30", month: "JUL" },
        src: pic_img1,
        author: "Tom White",
        comments: 5,
        title: "Outdoor landscaping ideas for modern homes...",
        link: "#",
    },
    {
        id: 14,
        date: { day: "11", month: "AUG" },
        src: pic_img2,
        author: "Emily Harris",
        comments: 8,
        title: "The role of natural light in home design...",
        link: "#",
    },
    {
        id: 15,
        date: { day: "07", month: "SEP" },
        src: pic_img3,
        author: "John Martin",
        comments: 7,
        title: "How to improve home energy efficiency...",
        link: "#",
    },
    {
        id: 16,
        date: { day: "23", month: "OCT" },
        src: pic_img1,
        author: "Jane Lee",
        comments: 2,
        title: "Best sustainable building certifications...",
        link: "#",
    },
    {
        id: 17,
        date: { day: "05", month: "NOV" },
        src: pic_img2,
        author: "Mike Perez",
        comments: 4,
        title: "Modern minimalist home design explained...",
        link: "#",
    },
    {
        id: 18,
        date: { day: "16", month: "DEC" },
        src: pic_img3,
        author: "Anna Clark",
        comments: 3,
        title: "Top architectural trends of the year...",
        link: "#",
    },
    {
        id: 19,
        date: { day: "28", month: "JAN" },
        src: pic_img1,
        author: "Tom Lewis",
        comments: 5,
        title: "How to choose the perfect color palette...",
        link: "#",
    },
    {
        id: 20,
        date: { day: "09", month: "FEB" },
        src: pic_img2,
        author: "Emily Walker",
        comments: 6,
        title: "Balancing form and function in home design...",
        link: "#",
    },
];

function Blog({ post }) {
    const [loading, setLoading] = useState(true);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [tagsBoxCount, setTagsBoxCount] = useState(1);

    const handleLoadMore = () => {
        setIsLoading(true);

        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 3);
            setIsLoading(false);
        }, 1000);
    };
    const handleNextArticle = () => {
        if (tagsBoxCount < 5) {
            setTagsBoxCount(prevCount => prevCount + 1);
        }
    };

    const handlePrevArticle = () => {
        if (tagsBoxCount > 0) {
            setTagsBoxCount(prevCount => prevCount - 1);
        }
    };

    const tagList = [
        "Kitchen",
        "Food",
        "Planning",
        "Bedroom",
        "Chair",
        "Loan",
        "Table",
        "Maintenance",
        "Room",
        "Landscape",
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <CustomLoader loading />;

    return (
        <>
            <div className="main-wrapper">
                <div id="blog_page">
                    <div className="relative w-full">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay, EffectFade]}
                            effect="fade"
                            speed={800}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            loop
                            onInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }}
                            className="h-screen w-full"
                        >
                            {slides.map((s, i) => (
                                <SwiperSlide key={i}>
                                    <div className="full_slider_img">
                                        <img
                                            src={s.image.src}
                                            alt={s.image.alt}
                                            className={`h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"
                                                }`}
                                            onLoad={() => setLoaded(true)}
                                            loading="lazy"
                                        />
                                        <div className="overlay"></div>

                                        <div className="slider_content">
                                            <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                                                <div className="max-w-2xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.35)]">
                                                    <p className="mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing">
                                                        {s.eyebrow}
                                                    </p>

                                                    <h2 className="text-4xl leading-[1.05] font-extrabold md:text-6xl">
                                                        {s.title[0]} <br className="hidden md:block" />
                                                        {s.title[1]}
                                                    </h2>

                                                    <p className="mt-4 max-w-xl text-sm md:text-base opacity-90">
                                                        {s.desc}
                                                    </p>

                                                    <button className="read-more-btn">{s.cta}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="blog-container">
                        <div className="blog-hero">
                            <img src={thum1} alt="Blog Hero" />
                        </div>

                        <div className="blog-content">
                            <p className="meta">20 October 2019 • By Admin • Architecture</p>
                            <h1 className="title">
                                Blog post with image slider there are many variations of
                                passages.
                            </h1>

                            <p className="paragraph">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                            </p>

                            <p className="paragraph">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse
                                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                cupidatat non proident.
                            </p>

                            <div className="quote-box">
                                <blockquote>
                                    We let our quality work and commitment to customer
                                    satisfaction be our slogan. Quality you deserve and
                                    dependability you can count on.
                                </blockquote>
                                <p className="author">
                                    Jessica Mcdade <span>Interior Designer</span>
                                </p>
                            </div>

                            <div className="gallery">
                                <img src={thum1} alt="Blog Hero" />
                                <img src={thum2} alt="Blog Hero" />
                            </div>

                            <p className="paragraph">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry’s standard dummy
                                text ever since the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen book.
                            </p>

                            {[...Array(tagsBoxCount)].map((_, idx) => (
                                <div key={idx} className="tags-box">
                                    <h3>Tags</h3>
                                    <div className="tags">
                                        {tagList.map((tag, index) => (
                                            <span key={index} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="share-box">
                                        <h3>Share this Post:</h3>
                                        <div className="social-icons">
                                            <a href="https://www.facebook.com/pradeep.baghel" target="_blank" rel="noreferrer">
                                                <i className="fab fa-facebook-f"></i>
                                            </a>
                                            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                            <a href="https://www.instagram.com/rockey_star_615" target="_blank" rel="noreferrer">
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                            <a href="https://www.pinterest.com/pradeepbaghel" target="_blank" rel="noreferrer">
                                                <i className="fab fa-pinterest"></i>
                                            </a>
                                            <a href="https://www.linkedin.com/in/pradeep-baghel-569083244" target="_blank" rel="noreferrer">
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="pagination">
                                <button className="prev" onClick={handlePrevArticle} disabled={tagsBoxCount === 0}>
                                    Prev Article
                                </button>
                                <button className="next" onClick={handleNextArticle} disabled={tagsBoxCount === 5}>
                                    Next Article
                                </button>
                            </div>
                        </div>
                        <div className="blog-list-container">
                            <h2 className="section-title">Blog -</h2>

                            <div className="blog-grid">
                                {blogPosts.slice(0, visibleCount).map((index) => (
                                    <div key={index.id} className="blog-card">
                                        <img
                                            src={index.src}
                                            alt={index.title}
                                            className="blog-image"
                                        />
                                        <div className="blog-date">
                                            <span className="day">{index.date.day}</span>
                                            <span className="month">{index.date.month}</span>
                                        </div>
                                        <div className="blog-meta">
                                            <span>By {index.author}</span> |{" "}
                                            <span>{index.comments} Comments</span>
                                        </div>

                                        <h3 className="blog-title">
                                            <a href={index.link}>{index.title}</a>
                                        </h3>
                                        <a href={index.link} className="site-button-link">
                                            VIEW MORE
                                        </a>
                                    </div>
                                ))}
                            </div>

                            {isLoading && (
                                <div className="text-center loader">
                                    <span className="loader-115">Loading</span>
                                </div>
                            )}

                            {!isLoading && visibleCount < blogPosts.length && (
                                <div className="text-center load-more-btn-outer">
                                    <button className="site-button" onClick={handleLoadMore}>
                                        Load More
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ScrollButtons />
        </>
    );
}

export default Blog;
