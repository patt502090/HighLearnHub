import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperButton.css";
import { Link } from "react-router-dom";
export default function Announcements({ data }) {
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
              <Link>
                <img
                  className="mx-auto border rounded-3xl shadow hover:scale-105 transition duration-500 cursor-pointer"
                  src={announcement.image}
                  alt={announcement.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
