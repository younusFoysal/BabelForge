'use client';
import { FaStar } from 'react-icons/fa6';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/components/DashboardsPage/Review.css';

const Review = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: false,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    arrows: false,
    appendDots: dots => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul className="review_dots" style={{ margin: '0px' }}>
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <section className="px-4 grid items-center grid-cols-1 md:grid-cols-8 gap-5 md:gap-20 container mx-auto pb-[90px]">
      <div className="col-span-5 md:col-span-3 text-center md:text-left">
        <h2 className="text-[35px] md:text-[45px] mb-4 font-extrabold text-[#333]">
          Why customers <br /> love using our dashboards
        </h2>
        <p className="text-[#333] text-[16px] md:text-[20px] font-light">Based on 6000+ reviews on G2</p>
      </div>
      <div className="col-span-5">
        <Slider {...settings}>
          <div className="bg-gradient-to-b from-[#6161FF] to-[#6161FF] my-14 md:my-16  py-16 px-12 shadow-[#6161FF] rounded-xl shadow-2xl">
            <blockquote className="font-light text-white text-[25px]">
              “ Within minutes we can create dashboards to give a high-level, detailed view of where effort is being spent, and keep track
              of time which simplifies follow-up and review.”
            </blockquote>
            <p className="text-white font-light text-[14px] my-5">Ray A. | Director of Customer Experience | Reviewed on G2 Crowd</p>
            <div className="text-[28px] flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#6161FF] to-[#6161FF] my-14 md:my-16  py-16 px-12 shadow-[#6161FF] rounded-xl shadow-2xl">
            <blockquote className="font-light text-white text-[25px]">
              “ BabelForge is a versatile project management tool, combining the best of Jira and Trello. It offers intuitive kanban boards,
              time tracking, and detailed reporting”
            </blockquote>
            <p className="text-white font-light text-[14px] my-5">Ray A. | Director of Customer Experience | Reviewed on G2 Crowd</p>
            <div className="text-[28px] flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
              <FaStar className="text-yellow-500" />
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Review;
