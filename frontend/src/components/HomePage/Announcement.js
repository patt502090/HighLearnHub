import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./SwiperButton.css";
export default function Announcements({ data }) {
  console.log(data);
  return (
    <div>
      <div className="flex justify-between container mx-auto px-5 mt-3">
        <h2 className="mt-2"> 105 รายการ</h2>
        <div className="order-last">
          <button
            type="button"
            className="flex text-black justify-items-end bg-neutral-400 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <svg
              class="w-5 h-5 text-black dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z" />
            </svg>
            เรียงตามราคา
          </button>
        </div>
      </div>
      <hr
        className="border-t-4 border-black border-solid my-1"
        style={{ borderColor: "#000000" }}
      />
      <div className="mx-auto h-full w-full mt-10 swiper-container">
        <Swiper
          spaceBetween={1}
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
          {data &&
            data.map((announcement) => (
              <SwiperSlide key={announcement.id}>
                <img
                  className="mx-auto"
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
