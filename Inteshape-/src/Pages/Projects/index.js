import React from "react";
import thum1 from "../../ulits/assets/thum1.jpg";
import mainbanner3 from "../../ulits/assets/main-banner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

function Projects () {
  return (
    <div className="slider-container">
      <Swiper
        modules={[ Pagination, Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-content">
            <div className="overlay"></div>
            <img
              src={thum1}
              alt="Interior Design"
              className="slide-image"
            />
            <div className="slide-text">
              <h1>CREATIVE</h1>
              <p>
                RIGHT DESIGN AND RIGHT IDEAS MATTER A LOT IN INTERIOR DESIGN
                BUSINESS. A STYLE THAT MAKES A STATEMENT.
              </p>
              <button>READ MORE</button>
            </div>
          </div>
        </SwiperSlide>

       
        <SwiperSlide>
          <div className="slide-content">
            <div className="overlay"></div>
            <img
              src={mainbanner3}
              alt="Modern Design"
              className="slide-image"
            />
            <div className="slide-text">
              <h1>INNOVATIVE</h1>
              <p>
                BRINGING NEW IDEAS TO LIFE WITH BEAUTIFUL INTERIOR SPACES AND
                CREATIVE DESIGN.
              </p>
              <button>READ MORE</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Projects;
