import { useState, useEffect } from "react";
import CustomLoader from "../../Component/CustomeLoader";
import ScrollButtons from "../../Component/ScrollButtons";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import mainbanner2 from "../../ulits/assets/main-banner2.jpg";
import bg5 from "../../ulits/assets/bg5.jpg";
import pic1 from "../../ulits/assets/pic1.jpg";
import pic2 from "../../ulits/assets/pic2.jpg";
import pic3 from "../../ulits/assets/pic3.jpg";


function Home() {
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
    // fake API loading delay
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
              <div className="sx-bnr-inr overlay-wraper bg-parallax bg-top-center">
                <div className="overlay-main bg-black opacity-07">
                  <img src={mainbanner2} alt="" />
                </div>

                <div className="sx-bnr-inr-entry">
                  <div className="banner-title-outer">
                    <div className="banner-title-name">
                      <h2 className="m-tb0">home Company</h2>                                <p>
                        The essence of interior design will always be about people and how they live. It is
                        about the realities of what makes for an attractive, civilized.
                      </p>
                    </div>
                    <div>
                      <ul className="sx-breadcrumb breadcrumb-style-2">
                        <li><a href="/">Home</a></li>
                        <li>/ About Us</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                          <a href="javascript:;" className="site-button-link">Read More</a>
                        </div>
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
                        <div class="figcaption bg-white text-center p-a20">
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
                        <div class="figcaption bg-white text-center p-a20">
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
                        <div class="figcaption bg-white text-center p-a20">
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
