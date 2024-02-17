import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperButton.css";
export default function Announcements({ data }) {
  console.log(data);
  return (
    <div>
      
      <div className="mx-auto h-full w-full mt-10">
        <Swiper
          spaceBetween={20}
          modules={[Navigation, Pagination]}
          centeredSlides={true}
          navigation={true}
          loop={true}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.map((announcement) => (
              <SwiperSlide key={announcement.id}>
                <img
                  className="mx-auto border rounded-3xl shadow"
                  src={announcement.image}
                  alt={announcement.title}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
