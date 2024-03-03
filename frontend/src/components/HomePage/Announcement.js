import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination ,Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperButton.css";
import { Link } from "react-router-dom";
export default function Announcements({ data }) {
  console.log("gay = ",data)
  return (
    <div>
      <div className="mx-auto h-full w-full spacing-under-header">
        <Swiper
          spaceBetween={20}
          modules={[Navigation, Pagination ,Autoplay]}
          navigation={true}
          loop={true}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
          }}
          initialSlide={0}
        >
          {data?.map((announcement) => (
            <SwiperSlide key={announcement.id}>
              <Link to={`/promotion/${announcement.id}`}>
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
