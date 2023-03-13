import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Navigation, Pagination } from "swiper";

export const SwiperProduct = () => {
  return (
    <div>
      {/* <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        autoplay={true}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
      </Swiper> */}

      <Swiper navigation speed={500} slidesPerView={3} spaceBetween={20}>
        <SwiperSlide><img src="/img/banner-index.jpeg" alt="" /></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </Swiper>
    </div>
  );
};
