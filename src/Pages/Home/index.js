import { useState, useEffect, useRef } from "react";
import CustomLoader from "../../Component/CustomeLoader";
import ScrollButtons from "../../Component/ScrollButtons";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import mainbanner2 from "../../ulits/assets/main-banner2.jpg";
import bg5 from "../../ulits/assets/bg5.jpg";
import pic1 from "../../ulits/assets/pic1.jpg";
import pic2 from "../../ulits/assets/pic2.jpg";
import pic3 from "../../ulits/assets/pic3.jpg";
import slide1 from "../../ulits/assets/slide1.jpg";
import slide2 from "../../ulits/assets/slide2.jpg";
import slide3 from "../../ulits/assets/slide3.jpg";
import pic_img12 from "../../ulits/assets/pic_img12.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { gsap } from "gsap";

const slides = [
  {
    number: "01",
    eyebrow: "VARIETY",
    title: ["Flooring for Any Interior site"],
    desc: "Right design and right ideas matter a lot in interior design business. a style that makes a statement.",
    cta: "READ MORE",
    image: {
      src: slide1,
      alt: "Image 1",
    },
  },
  {
    number: "02",
    eyebrow: "RELIABLE",
    title: ["Professionals you can rely on"],
    desc: "Right design and right ideas matter a lot in interior design business. a style that makes a statement.",
    cta: "READ MORE",
    image: {
      src: pic_img12,
      alt: "Image 2",
    },
  },
  {
    number: "03",
    eyebrow: "DESIGN",
    title: ["Minimalist vibes with natural light"],
    desc: "Bring calm to your space with clean lines and warm textures for everyday living.",
    cta: "READ MORE",
    image: {
      src: slide2,
      alt: "Image 3",
    },
  },
  {
    number: "04",
    eyebrow: "STYLE",
    title: ["Scandi chairs and soft plants"],
    desc: "Balanced contrast for spaces that feel curated yet livable.",
    cta: "READ MORE",
    image: {
      src: slide3,
      alt: "Image 4",
    },
  },
];


function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  // const [value, setValue] = useState(null);
  // const [hoverDate, setHoverDate] = useState(null);
  // const [isHovering, setIsHovering] = useState(false);


  // const handleMouseEnter = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovering(false);
  // };

  useEffect(() => {
    if (loaded && contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll(".slide-content > *"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, [loaded]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="main-wrapper">
          <div className="homepage">
            {/* {loading ? (
            <Skeleton width={308} height={50} borderRadius={8} baseColor="#ebebeb"
              highlightColor="#f5f5f5" />
          ) : (
            <button className="primary-btn sm mt-0">Reserve a table</button>
          )}
          {loading ? (
            <Skeleton
              width={308}
              height={50}
              borderRadius={8}
              baseColor="#ebebeb"
              highlightColor="#f5f5f5"
            />
          ) : (
            <div className="title">About Us</div>
          )} */}
            <div className="page-content">
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
                        {!loaded && <div className="skeleton absolute top-0 left-0 w-full h-full"></div>}
                        <img
                          src={s.image.src}
                          alt={s.image.alt}
                          className={`h-full w-full object-cover ${loaded ? "opacity-100" : "opacity-0"
                            }`}
                          onLoad={() => setLoaded(true)}
                          loading="lazy"
                        />
                        <div className="overlay"></div>
                        {!loaded ? (
                          <div className="slider_content absolute inset-0 flex items-center">
                            <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                              <div className="slide-content w-full">
                                <div className="h-3 w-24 bg-gray-600/30 animate-pulse mb-2 rounded"></div>
                                <div className="h-8 w-64 bg-gray-600/30 animate-pulse mb-3 rounded"></div>
                                <div className="h-4 w-80 bg-gray-600/30 animate-pulse mb-2 rounded"></div>
                                <div className="h-10 w-32 bg-gray-600/30 animate-pulse rounded"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="slider_content absolute inset-0 flex items-center"
                            ref={el => (contentRef.current = el)}
                          >
                            <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                              <div className="slide-content text-white">
                                <h3 className="number mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing">
                                  {s.number}
                                </h3>
                                <p className="eyebrow mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing">
                                  {s.eyebrow}
                                </p>
                                <h2 className="title text-4xl leading-[1.05] font-extrabold md:text-6xl">
                                  {s.title[0]} <br className="hidden md:block" />
                                  {s.title[1]}
                                </h2>
                                <p className="desc mt-4 max-w-xl text-sm md:text-base opacity-90">
                                  {s.desc}
                                </p>
                                <button className="read-more-btn">{s.cta}</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="section-full mobile-page-padding">
                <div className="section-content">
                  <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-12 ">
                      <div className="home-2-about bg-bottom-left">
                        <img src={bg5} alt="" />
                      </div>
                    </div>

                    <div className="col-xl-7 col-lg-7 col-md-12">
                      <div className="about-home-2">
                        <h3 className="m-t0 sx-tilte">Our floors are designed to <br></br> last a lifetime</h3>
                        <p>Since 1999, we have been providing great flooring solutions and customer service for homeowners and commercial clients.
                          among flooring materials, none is more elegant and luxurious than natural stone.</p>
                        <div className="text-left">
                          <a href="#." className="site-button-link">Read More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-full-about mobile-page-padding">
                <div className="section-content">
                  <div class="section-head">
                    <div class="sx-separator-outer separator-left">
                      <div class="sx-separator bg-white bg-moving bg-repeat-x">
                        <h3 class="sep-line-one">About us</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="section-full-what">
                <div class="section-head">
                  <div class="sx-separator-outer separator-left">
                    <div class="sx-separator">
                      <h3 class="sep-line-one">What We do</h3>
                    </div>
                  </div>
                </div>
                <div class="section-content">
                  <div class="row number-block-one-outer justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-6 m-b30">

                      <div class="number-block-one animate-in-to-top">
                        <img src={pic1} alt="" />
                        <div class="figcaption text-center p-a20">
                          <h4 class="m-a0">Interior Design</h4>
                        </div>
                        <div class="figcaption-number text-center sx-text-primary animate-in-to-top-content">
                          <span>01</span>
                        </div>
                      </div>

                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-6 m-b30">

                      <div class="number-block-one animate-in-to-top">
                        <img src={pic2} alt="" />
                        <div class="figcaption text-center p-a20">
                          <h4 class="m-a0">Architectur</h4>
                        </div>
                        <div class="figcaption-number text-center sx-text-primary animate-in-to-top-content">
                          <span>02</span>
                        </div>
                      </div>

                    </div>

                    <div class="col-lg-4 col-md-6 col-sm-6 m-b30">
                      <div class="number-block-one animate-in-to-top">
                        <img src={pic3} alt="" />
                        <div class="figcaption text-center p-a20">
                          <h4 class="m-a0">Floor Plan</h4>
                        </div>
                        <div class="figcaption-number text-center sx-text-primary animate-in-to-top-content">
                          <span>03</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ScrollButtons />
    </>
  );
}

export default Home;
