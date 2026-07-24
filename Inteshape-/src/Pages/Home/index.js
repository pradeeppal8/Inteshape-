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
import slide4 from "../../ulits/assets/slide4.jpg";
import slide5 from "../../ulits/assets/slide5.jpg";
import slide6 from "../../ulits/assets/slide6.jpg";
import slide7 from "../../ulits/assets/slide7.jpg";
import slide8 from "../../ulits/assets/slide8.jpg";
import pic_img12 from "../../ulits/assets/pic_img12.jpg";
import pic_img1 from "../../ulits/assets/pic_img1.jpg";
import pic_img2 from "../../ulits/assets/pic_img2.jpg";
import pic_img3 from "../../ulits/assets/pic_img3.jpg";
import pic_img5 from "../../ulits/assets/pic_img5.jpg";
import pic_img6 from "../../ulits/assets/pic_img6.jpg";
import pic_img7 from "../../ulits/assets/pic_img7.jpg";
import pic_img8 from "../../ulits/assets/pic_img8.jpg";
import pic_img9 from "../../ulits/assets/pic_img9.jpg";
import pic_img10 from "../../ulits/assets/pic_img10.jpg";
import pic_img11 from "../../ulits/assets/pic_img11.jpg";
import mainbanner1 from "../../ulits/assets/main-banner1.jpg";
// import abi from "../../ulits/assets/abi.jpg";
// import pradeep from "../../ulits/assets/pradeep.jpg";
// import rocky_bhai from "../../ulits/assets/rocky_bhai.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import abc from "../../ulits/assets/1-ab.jpg";
// import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

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
    number: "05",
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

const swiperSlide = [
  { id: 1, image: { src: slide4, alt: "Slide 1" } },
  { id: 2, image: { src: slide5, alt: "Slide 2" } },
  { id: 3, image: { src: slide6, alt: "Slide 3" } },
  { id: 4, image: { src: slide7, alt: "Slide 4" } },
  { id: 5, image: { src: slide8, alt: "Slide 5" } },
];

function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(6);
  const [loadings, setLoadings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);

  const blocks = [
    {
      id: 1,
      title: "Architecture",
      text: "We combine Interior and Exterior Design services and often provide them as a single solution.",
    },
    {
      id: 2,
      title: "Planning",
      text: "Landscape plans for drainage problems may also entail planting beds away from the home’s foundation.",
    },
    {
      id: 3,
      title: "Exterior",
      text: "We offer comprehensive Architectural Engineering Services including Interior design, Master planning.",
    },
    {
      id: 4,
      title: "Decoration",
      text: "We provide a range of architectural 3D modeling services to aid the design, planning.",
    },
    {
      id: 5,
      title: "Interior Planning",
      text: "Project management is the process by which our team plans and executes your project.",
    },
    {
      id: 6,
      title: "Style Selection",
      text: "Our team also provides consultations on all architectural issues.",
    },
    {
      id: 7,
      title: "Landscape Design",
      text: "Creating functional and aesthetic landscapes with sustainability in mind.",
    },
    {
      id: 8,
      title: "Renovation",
      text: "Transforming old structures into modern, efficient, and beautiful spaces.",
    },
    {
      id: 9,
      title: "3D Visualization",
      text: "Bringing your designs to life with high-quality 3D rendering and modeling.",
    },
    {
      id: 10,
      title: "Smart Homes",
      text: "Integrating modern technology with design for convenience and efficiency.",
    },
    {
      id: 11,
      title: "Sustainable Design",
      text: "Eco-friendly solutions that minimize environmental impact and maximize efficiency.",
    },
    {
      id: 12,
      title: "Furniture Design",
      text: "Custom-made furniture solutions tailored to your space and style.",
    },
    {
      id: 13,
      title: "Lighting Design",
      text: "Perfect lighting solutions to highlight spaces and create atmosphere.",
    },
    {
      id: 14,
      title: "Urban Planning",
      text: "Designing organized and functional layouts for city development.",
    },
    {
      id: 15,
      title: "Commercial Spaces",
      text: "Creative solutions for offices, retail, and hospitality environments.",
    },
    {
      id: 16,
      title: "Residential Spaces",
      text: "Personalized home designs that reflect your lifestyle and needs.",
    },
    {
      id: 17,
      title: "Cultural Projects",
      text: "Architectural services for museums, art galleries, and cultural spaces.",
    },
    {
      id: 18,
      title: "Healthcare Design",
      text: "Designing hospitals and clinics with comfort, safety, and efficiency.",
    },
    {
      id: 19,
      title: "Educational Spaces",
      text: "Schools, colleges, and institutions designed for better learning environments.",
    },
    {
      id: 20,
      title: "Sports Facilities",
      text: "Functional and innovative designs for stadiums and recreational areas.",
    },
  ];

  const blogPosts = [
    {
      image: pic1,
      title: "Interior Work Avroko",
      location: "Muscat, Sultanate of Oman",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic2,
      title: "Qatar Pavilion",
      location: "Muscat, Sultanate of Oman",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic3,
      title: "House Bluprint",
      location: "Muscat, Sultanate of Oman",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img1,
      title: "Modern Villa Design",
      location: "Dubai, UAE",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img2,
      title: "Luxury Apartment",
      location: "Doha, Qatar",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img3,
      title: "Office Interior Concept",
      location: "Abu Dhabi, UAE",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img5,
      title: "Resort Landscape",
      location: "Bali, Indonesia",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img6,
      title: "Commercial Mall Design",
      location: "Riyadh, Saudi Arabia",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img7,
      title: "Restaurant Interior",
      location: "Mumbai, India",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img8,
      title: "Beach House",
      location: "Goa, India",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img9,
      title: "Exhibition Pavilion",
      location: "Shanghai, China",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img10,
      title: "Corporate Office HQ",
      location: "London, UK",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img11,
      title: "Skyline Towers",
      location: "New York, USA",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: pic_img12,
      title: "Art Gallery Design",
      location: "Paris, France",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
    {
      image: mainbanner1,
      title: "Smart City Project",
      location: "Singapore",
      socials: [
        {
          icon: "fab fa-facebook-f",
          link: "https://facebook.com/rockey.bhai.909800",
        },
        { icon: "fab fa-twitter", link: "https://twitter.com" },
        {
          icon: "fab fa-instagram",
          link: "https://instagram.com/rockey_star_615",
        },
        {
          icon: "fab fa-pinterest",
          link: "https://pinterest.com/pradeepbaghel",
        },
        {
          icon: "fab fa-linkedin",
          link: "https://linkedin.com/in/pradeep-baghel-569083244",
        },
      ],
    },
  ];

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const handleLoadMore = () => {
    setLoadings(true);
    setTimeout(() => {
      setVisible((prev) => prev + 3);
      setLoadings(false);
    }, 800);
  };
  const handleLoadMoreCount = () => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
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
                  onSlideChange={() => AOS.refresh()} // re-trigger animations
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
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="overlay"></div>
                        <div className="slider_content absolute inset-0 flex items-center">
                          <div className="mx-auto flex h-full max-w-7xl items-center px-6">
                            <div
                              className="slide-content text-white"
                              data-aos="fade-down"
                              data-aos-duration="1000"
                            >
                              <h3
                                className="number mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing"
                                data-aos="fade-down"
                                data-aos-delay="100"
                              >
                                {s.number}
                              </h3>
                              <p
                                className="eyebrow mb-2 text-xs tracking-[0.28em] font-semibold opacity-90 md:text-sm letter-spacing"
                                data-aos="fade-down"
                                data-aos-delay="200"
                              >
                                {s.eyebrow}
                              </p>
                              <h2
                                className="title text-4xl leading-[1.05] font-extrabold md:text-6xl"
                                data-aos="fade-down"
                                data-aos-delay="400"
                              >
                                {s.title[0]} <br className="hidden md:block" />
                                {s.title[1]}
                              </h2>
                              <p
                                className="desc mt-4 max-w-xl text-sm md:text-base opacity-90"
                                data-aos="fade-down"
                                data-aos-delay="600"
                              >
                                {s.desc}
                              </p>
                              <button
                                className="read-more-btn"
                                data-aos="fade-down"
                                data-aos-delay="1000"
                              >
                                {s.cta}
                              </button>
                            </div>
                          </div>
                        </div>
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
                        <h3 className="m-t0 sx-tilte">
                          Our floors are designed to <br></br> last a lifetime
                        </h3>
                        <p>
                          Since 1999, we have been providing great flooring
                          solutions and customer service for homeowners and
                          commercial clients. among flooring materials, none is
                          more elegant and luxurious than natural stone.
                        </p>
                        <div className="text-left">
                          <a href="#." className="site-button-link">
                            Read More
                          </a>
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
                  <div className="section-contents">
                    <div className="row">
                      <div className="col-lg-5 col-md-12 col-sm-12">
                        <div className="about-home-left">
                          <h3 className="m-t0 sx-tilte">
                            We are competitive in architecture solutions developing
                            practical
                          </h3>
                          <p>
                            Landscape design is a process of developing
                            practical and pleasing outdoor living space. there
                            are six principles of design that have been used by
                            artists for centuries throughout all art forms,
                            painting and floral design. Landscape design is a
                            process of developing practical and pleasing outdoor
                            living space.
                          </p>
                          <div className="text-left">
                            <button
                              className="read-more-btn aos-init aos-animate"
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-12 col-sm-12">
                        <div className="about-home-right">
                          <div className="swiper-container">
                            <Swiper
                              modules={[Navigation, Autoplay]}
                              navigation
                              autoplay={{ delay: 3000 }}
                              loop={true}
                              className="mySwiper"
                              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
                            >
                              {swiperSlide.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                  <img
                                    src={slide.image.src}
                                    alt={slide.image.alt}
                                    className="w-full h-[500px] object-cover"
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                            <div className="absolute bottom-4 right-4 bg-black/60 text-black px-1 py-1 rounded count-text">
                              {currentSlide} / {swiperSlide.length}
                            </div>
                          </div>
                          <div className="about-home-before">
                            <img src={abc} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="section-full-what">
                <div class="section-head">
                  <div class="sx-separator-outer separator-left">
                    <div class="sx-separator bg-white bg-moving bg-repeat-x">
                      <h3 class="sep-line-one">What We Do</h3>
                    </div>
                  </div>
                </div>
                <div class="section-content">
                  <div className="row number-block-two-outer">
                    {blocks.slice(0, visible).map((block) => (
                      <div
                        key={block.id}
                        className="col-lg-4 col-md-6 col-sm-12 m-b30"
                      >
                        <div className="number-block-two animate-in-to-top bdr-gray-light bdr-solid bdr-1">
                          <div className="figcaption bg-white p-a30">
                            <h4 className="m-t0">{block.title}</h4>
                            <p>{block.text}</p>
                            <a href="#." className="site-button-link">
                              Read More
                            </a>
                            <div className="figcaption-number text-black animate-in-to-top-content">
                              <span>{String(block.id).padStart(2, "0")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {visible < blocks.length && (
                      <div className="text-center load-more-btn-outer sx-separator bg-white bg-moving bg-repeat-x">
                        <button
                          className="site-button"
                          onClick={handleLoadMore}
                          disabled={loadings}
                        >
                          {loadings ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="section-full-about mobile-page-padding our-experts">
                <div className="section-content">
                  <div class="section-head">
                    <div class="sx-separator-outer separator-left">
                      <div class="sx-separator bg-white bg-moving bg-repeat-x">
                        <h3 class="sep-line-one">Our Experts</h3>
                      </div>
                    </div>
                  </div>
                  <div class="section-contents">
                    <div class="row">
                      {blogPosts.slice(0, visibleCount).map((item, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 m-b30"
                        >
                          <div className="our-team-3">
                            <div className="our-team-info">
                              <img src={item.image} alt={item.title} />
                              <div className="our-team-content">
                                <h4 className="sx-team-name">
                                  <a href="#.">{item.title}</a>
                                </h4>
                                <span className="sx-team-position text-white">
                                  {item.location}
                                </span>

                                <div className="social-icon">
                                  {item.socials.map((social, i) => (
                                    <a
                                      key={i}
                                      href={social.link}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <i className={social.icon}></i>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Loader */}
                    {isLoading && (
                      <div className="text-center loader">
                        <span className="loader-115">Loading</span>
                      </div>
                    )}

                    {/* Load More Button */}
                    {!isLoading && visibleCount < blogPosts.length && (
                      <div className="text-center load-more-btn-outer sx-separator bg-white bg-moving bg-repeat-x">
                        <button
                          className="site-button"
                          onClick={handleLoadMoreCount}
                        >
                          Load More
                        </button>
                      </div>
                    )}
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
