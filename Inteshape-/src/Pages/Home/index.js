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
import abi from "../../ulits/assets/abi.jpg";
import pradeep from "../../ulits/assets/pradeep.jpg";
import rocky from "../../ulits/assets/rocky_bhai.jpg";
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
  const testimPrevRef = useRef(null);
  const testimNextRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [dynamicSlides, setDynamicSlides] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/banners')
      .then(r => r.json())
      .then(d => { if (d.success) setDynamicSlides(d.data.filter(b => b.active)); })
      .catch(() => {});

    // SSE for real-time banner updates
    const es = new EventSource('http://localhost:5000/api/settings/stream');
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'bannersUpdated') {
          setDynamicSlides(data.banners.filter(b => b.active));
        }
      } catch {}
    };
    return () => es.close();
  }, []);
  const [visible, setVisible] = useState(6);
  const [loadings, setLoadings] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [experts, setExperts] = useState([]);
  const [socialLinks, setSocialLinks] = useState({ facebookLink: '', twitterLink: '', instagramLink: '', linkedinLink: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/experts')
      .then(r => r.json())
      .then(d => { if (d.success) setExperts(d.data.filter(e => e.active)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/navigation')
      .then(r => r.json())
      .then(d => { if (d.success && d.data.socialMediaLinks) setSocialLinks(d.data.socialMediaLinks); })
      .catch(() => {});
  }, []);

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
  const testimonials = [
    {
      id: 1,
      image: pic1,
      role: "Interior designer",
      name: "Barney Smith",
      review: "Great theme, just what we were looking for. Easy to install, easy to navigate. Well documented. Really enjoyed the support.",
    },
    {
      id: 2,
      image: rocky,
      role: "Architect",
      name: "Rosalina D. William",
      review: "Amazing fast and reliable customer support! The team of willing to go mile for customer service! Thanks!",
    },
    {
      id: 3,
      image: abi,
      role: "Interior Stylist",
      name: "Abi Johnson",
      review: "Incredible design quality and attention to detail. The team was very professional and delivered beyond our expectations.",
    },
    {
      id: 4,
      image: pradeep,
      role: "Project Manager",
      name: "Pradeep Kumar",
      review: "Outstanding work on our office renovation. The design blended functionality and aesthetics beautifully. Highly recommended!",
    },
    {
      id: 5,
      image: pic2,
      role: "Home Owner",
      name: "Maria Collins",
      review: "We are so pleased with the result. The team listened to our vision and turned it into a stunning living space.",
    },
    {
      id: 6,
      image: pic3,
      role: "Real Estate Developer",
      name: "James Hartley",
      review: "Exceptional professionalism and creativity. They transformed a plain space into something extraordinary. 10 out of 10!",
    },
  ];

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
                  {(dynamicSlides.length > 0 ? dynamicSlides : slides).map((s, i) => (
                    <SwiperSlide key={s.id || i}>
                      <div className="full_slider_img">
                        <img
                          src={s.image ? (typeof s.image === 'string' ? s.image : s.image.src) : (s.image?.src || '')}
                          alt={typeof s.image === 'string' ? s.title : (s.image?.alt || s.title)}
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
                                {Array.isArray(s.title) ? s.title[0] : s.title}
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

              {/* ===== All Services Section ===== */}
              <div className="section-full-services">
                <div className="services-vertical-text">SERVICES</div>
                <div className="services-inner">
                  <div className="section-head">
                    <h2 className="services-title">All Services <span>–</span></h2>
                  </div>
                  <div className="section-content">
                    <div className="row">
                      {[
                        {
                          id: "01",
                          icon: "fas fa-drafting-compass",
                          title: "Plans and Projects",
                          desc: "We provide a range of architectural 3D modeling services to our customers to aid the design, planning and...",
                        },
                        {
                          id: "02",
                          icon: "fas fa-couch",
                          title: "Interior",
                          desc: "Analysis and planning services that help both the client and architects to work out the forthcoming project...",
                        },
                        {
                          id: "03",
                          icon: "fas fa-building",
                          title: "Exterior",
                          desc: "We offer comprehensive Architectural Engineering Services including interior design, Master planning, 3D modeling...",
                        },
                        {
                          id: "04",
                          icon: "fas fa-city",
                          title: "Architecture",
                          desc: "Project management is the process by which our team plans and executes your project. We will develop it...",
                        },
                        {
                          id: "05",
                          icon: "fas fa-chair",
                          title: "Furniture",
                          desc: "Our team also provides consultations on all architectural issues, even if you need specific info about working...",
                        },
                        {
                          id: "06",
                          icon: "fas fa-paint-brush",
                          title: "Decoration",
                          desc: "We combine interior and Exterior Design services and often provide them as a single solution. It helps us...",
                        },
                      ].map((service) => (
                        <div key={service.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                          <div className="service-card">
                            <div className="service-number">– {service.id}</div>
                            <div className="service-icon">
                              <i className={service.icon}></i>
                            </div>
                            <h4 className="service-card-title">{service.title}</h4>
                            <p className="service-card-desc">{service.desc}</p>
                            <a href="#." className="service-read-more">READ MORE</a>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      {experts.slice(0, visibleCount).map((item, index) => (
                        <div
                          key={index}
                          className="col-lg-4 col-md-6 col-sm-12 m-b30"
                        >
                          <div className="our-team-3">
                            <div className="our-team-info">
                              <img src={item.image || pic1} alt={item.title} />
                              <div className="our-team-content">
                                <h4 className="sx-team-name">
                                  <a href="#.">{item.title}</a>
                                </h4>
                                <span className="sx-team-position text-white">
                                  {item.location}
                                </span>

                                <div className="social-icon">
                                  {[
                                    { key: 'facebookLink',  cls: 'fab_facebook',  title: 'Facebook'  },
                                    { key: 'twitterLink',   cls: 'fab_twitter',   title: 'Twitter'   },
                                    { key: 'instagramLink', cls: 'fab_instagram', title: 'Instagram' },
                                    { key: 'linkedinLink',  cls: 'fab_linkedin',  title: 'Linkedin'  },
                                  ].map(({ key, cls, title }) =>
                                    socialLinks[key] ? (
                                      <a key={key} href={socialLinks[key]} target="_blank" rel="noopener noreferrer">
                                        <div className={cls}></div>
                                      </a>
                                    ) : null
                                  )}
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
                    {!isLoading && visibleCount < experts.length && (
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
              {/* ===== Testimonial Section ===== */}
              <div className="section-full-testimonial">
                <div className="section-head">
                  <div className="sx-separator-outer separator-center">
                    <div className="sx-separator bg-white bg-moving bg-repeat-x">
                      <h3 className="sep-line-one">Testimonial</h3>
                    </div>
                  </div>
                </div>
                <div className="testimonial-slider-wrap">
                  <button ref={testimPrevRef} className="testim-nav testim-prev">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={2}
                    spaceBetween={24}
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    onInit={(swiper) => {
                      swiper.params.navigation.prevEl = testimPrevRef.current;
                      swiper.params.navigation.nextEl = testimNextRef.current;
                      swiper.navigation.init();
                      swiper.navigation.update();
                    }}
                    breakpoints={{
                      0:   { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                    }}
                    className="testim-swiper"
                  >
                    {testimonials.map((t) => (
                      <SwiperSlide key={t.id}>
                        <div className="testim-card">
                          <div className="testim-quote">&#10077;</div>
                          <img src={t.image} alt={t.name} className="testim-avatar" />
                          <p className="testim-role">{t.role}</p>
                          <h5 className="testim-name">{t.name}</h5>
                          <p className="testim-review">{t.review}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button ref={testimNextRef} className="testim-nav testim-next">
                    <i className="fas fa-chevron-right"></i>
                  </button>
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
