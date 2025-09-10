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


const slides = [
    {
        eyebrow: "VARIETY",
        title: ["Flooring for Any", "Interior site"],
        desc:
            "Right design and right ideas matter a lot in interior design business. a style that makes a statement.",
        cta: "READ MORE",
        image: {
            src: slide1,
            alt: "Image 1",
        },
    },
    {
        eyebrow: "DESIGN",
        title: ["Minimalist vibes", "with natural light"],
        desc:
            "Bring calm to your space with clean lines and warm textures for everyday living.",
        cta: "EXPLORE",
        image: {
            src: slide2,
            alt: "Image 2",
        },
    },
    {
        eyebrow: "STYLE",
        title: ["Scandi chairs", "and soft plants"],
        desc:
            "Balanced contrast for spaces that feel curated yet livable.",
        cta: "DISCOVER",
        image: {
            src: slide3,
            alt: "Image 3",
        },
    },
];

function Blog() {
    const [loading, setLoading] = useState(true);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

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

                                    <div
                                        className="full_slider_img"

                                    >
                                        <img src={s.image.src} alt={s.image.alt} className={`h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"}`}
                                            onLoad={() => setLoaded(true)}
                                            loading="lazy" />
                                        <div className="overlay"></div>

                                        <div className="slider_content">
                                            <div className="mx-auto flex h-full max-w-7xl items-center px-6">

                                                <div className="max-w-2xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.35)]">
                                                    {!loaded && (<p className="mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing">
                                                        {s.eyebrow}
                                                    </p>)}

                                                    <h2 className="text-4xl leading-[1.05] font-extrabold md:text-6xl">
                                                        {s.title[0]} <br className="hidden md:block" />
                                                        {s.title[1]}
                                                    </h2>

                                                    <p className="mt-4 max-w-xl text-sm md:text-base opacity-90">
                                                        {s.desc}
                                                    </p>

                                                    <button className="mt-6 inline-flex items-center gap-2 rounded bg-[#e5a882] px-6 py-3 text-sm font-bold tracking-widest text-black">
                                                        {s.cta}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 flex items-stretch">
                                                <div className=" md:flex min-h-[64px] flex-1 items-center gap-10 bg-[#e9eaec] px-6 text-[12px] tracking-[0.4em] text-black/80">
                                                    <a href="#" className="hover:opacity-70">LINKEDIN</a>
                                                    <a href="#" className="hover:opacity-70">TWITTER</a>
                                                    <a href="#" className="hover:opacity-70">FACEBOOK</a>
                                                </div>
                                                <div className="flex min-h-[64px] items-center gap-2 bg-[#e9eaec] px-2">
                                                    <button
                                                        ref={prevRef}
                                                        aria-label="Previous slide"
                                                        className="grid h-12 w-12 place-content-center rounded bg-[#1f1f26] text-white"
                                                    >
                                                        ‹
                                                    </button>
                                                    <button
                                                        ref={nextRef}
                                                        aria-label="Next slide"
                                                        className="grid h-12 w-12 place-content-center rounded bg-[#1f1f26] text-white"
                                                    >
                                                        ›
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <ScrollButtons />
        </>
    )
}

export default Blog