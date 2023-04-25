import "../Styles/Slider1.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay , } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import Image
import Image1 from "../Images/Landing/slide-top-1.png";
import Image2 from "../Images/Landing/slide-top-2.png";
import Image3 from "../Images/Landing/slide-top-3.png";

const Slider = () => {
  return (
    <div className="slider-top">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        
      >
        <SwiperSlide>
          <img src={Image1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Slider;
