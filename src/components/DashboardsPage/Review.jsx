'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/components/DashboardsPage/Review.css';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '@/lib/axiosCommon';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import ReactStars from "react-rating-stars-component";

const Review = () => {
  const axiosCommon = useAxiosCommon();
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

  // get All reviews
  const { data: allReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosCommon.get('/api/reviews');
      return res.data;
    },
    initialData: [],
  });

  return (
    <section className="px-4 grid items-center grid-cols-1 md:grid-cols-8 gap-5 md:gap-20 container mx-auto pb-[90px]">
      <div className="col-span-5 md:col-span-3 text-center md:text-left">
        <h2 className="text-[35px] md:text-[45px] mb-4 font-extrabold text-black dark:text-white ">
          Why customers <br /> love using our Dashboards
        </h2>

      </div>
      <div className="col-span-5">
        <Slider {...settings}>
          {allReviews.slice(0,6).map((review, index) => (
            <div
              key={review._id}
              className="bg-gradient-to-b from-[#6161FF] to-[#6161FF] my-14 md:my-16  py-16 px-12 shadow-[#6161FF] rounded-xl shadow-2xl"
            >
              <blockquote className="font-light text-white text-[25px]">{review.message}</blockquote>
              <p className="text-white font-light text-[14px] my-5">
                {review.name} | {review?.reviewDate?.slice(0, 10)}
              </p>
              <div className="text-[28px] flex items-center gap-2 text-yellow-500 ">
                <span className="text-xl font-bold">
                  {/* <Rating style={{ maxWidth: 180 }} value={review.reviewRating} /> */}
                  <ReactStars
                   count={5}
                   value={review?.reviewRating}
                   edit={false}
                    size={40}
                    readonly={true}
                    activeColor="#ffd700"
                  />
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Review;
