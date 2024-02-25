import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "./SwiperButton.css";
import axios from "axios";
import { Badge } from "flowbite-react";
import { HiClock } from "react-icons/hi";

const OnlineBestSeller = () => {
  const [onlineSelling, setOnlineSelling] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onlineSellingResponse = await axios.get(
          "http://localhost:1337/api/courses?populate=image&filters[study_type][$eq]=Online&sort=amount:desc&pagination[pageSize]=10&populate=videos"
        );
        // console.log("ข้อมูลหลังเรียก API ของ OnlineSelling", onlineSellingResponse);
        const onlineSellingData = onlineSellingResponse.data.data.map(
          (course) => {
            const totalDurationSeconds = course.attributes.videos.data.reduce(
              (totalDuration, video) =>
                totalDuration + video.attributes.duration,
              0
            );

            const minutes = Math.floor(totalDurationSeconds / 60);
            const seconds = Math.floor(totalDurationSeconds % 60);

            return {
              id: course.id,
              title: course.attributes.title,
              price: course.attributes.price,
              amount: course.attributes.amount,
              description: course.attributes.description,
              image:
                "http://localhost:1337" +
                course.attributes.image.data.attributes.url,
              duration: { minutes, seconds },
            };
          }
        );

        // console.log("ข้อมูลหลังจากการกรอง API ของ OnlineSelling", onlineSellingData);
        setOnlineSelling(onlineSellingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" w-full md:w-4/5 mx-auto h-full">
      <p className="font-medium mx-auto mt-20 text-center md:text-left text-2xl md:text-3xl">
        คอร์สออนไลน์ยอดนิยม
      </p>
      <div>
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          navigation={true}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 5,
            },
          }}
        >
          {onlineSelling?.map((course) => (
            <SwiperSlide key={course.id}>
              <div
                className="bg-white rounded-lg shadow-lg border border-gray-10 w-2/3 md:w-full cursor-pointer mx-auto mt-10 my-5 hover:translate-y-[-10px] transition-transform duration-300 h-full py-auto"
                onClick={() => handleCardClick(course.id)}
              >
                <div className="relative h-40">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="absolute w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between h-full overflow-auto">
                  <div className="h-[120px] md:h-[140px]">
                    <p className="text-yellow-300 text-xs mb-2">
                      ONLINE COURSE
                    </p>
                    <p className="font-medium max-w-md">{course.title}</p>
                    <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">
                      {course.description}
                    </p>
                  </div>

                  <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-red-500">
                    จำนวนยอดสั่งซื้อ{" "}
                    <a className="hover:underline decoration-red-500/30 ">
                      {course.amount}
                    </a>{" "}
                    คอร์ส
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge color="warning">BESTSELLER</Badge>
                    <Badge color="failure">PROMOTION</Badge>
                  </div>

                  <hr className="mt-6" />
                  <div className="flex flex-wrap gap-2 justify-between">
                    <Badge
                      color="gray"
                      icon={HiClock}
                      className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal"
                    >
                      {course.duration.minutes >= 60 && (
                        <>
                          {Math.floor(course.duration.minutes / 60)} ชั่วโมง{" "}
                          {course.duration.minutes % 60 > 0 &&
                            `${course.duration.minutes % 60} นาที`}{" "}
                          {course.duration.seconds} วินาที
                        </>
                      )}
                      {course.duration.minutes < 60 && (
                        <>
                          {course.duration.minutes} นาที {course.duration.seconds}{" "}
                          วินาที
                        </>
                      )}
                    </Badge>

                    <p className="text-right mt-3 font-semibold">
                      {course.price} บาท{" "}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OnlineBestSeller;
