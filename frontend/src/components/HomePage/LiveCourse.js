import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "./SwiperButton.css";
import { Badge } from "flowbite-react";
import { FaCalendarDays } from "react-icons/fa6";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LiveCourse = () => {
  const [liveCourse, setliveCourse] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveCourseResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&filters[study_type][$eq]=Live&sort=amount:desc&pagination[pageSize]=10&populate=videos`
        );
        const liveCourseData = liveCourseResponse.data.data.map((course) => ({
          id: course.id,
          title: course.attributes.title,
          price: course.attributes.price,
          amount: course.attributes.amount,
          description: course.attributes.description,
          maxamount: course.attributes.maxamount,
          image:
            "http://localhost:1337" +
            course.attributes.image.data.attributes.url,
          date: course.attributes.schedule_text,
        }));
        setliveCourse(liveCourseData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
    AOS.init();
  }, []);



  return (

    <div className="w-full md:w-4/5 mx-auto h-full mb:20"  data-aos="fade-right">
      <p className="font-medium mx-auto mt-20 text-center md:text-left text-2xl md:text-3xl">
        คอร์สเรียนสดออนไลน์แนะนำ
      </p>
      <p className="font-base mx-auto mt-5 text-center md:text-left text-1xl">
        พัฒนาทักษะอย่างใกล้ชิดกับผู้สอน
      </p>
      <div className="swiper-container">
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
          {liveCourse?.map((course) => (
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
                <div className="p-4 flex flex-col justify-between h-full">
                  <div className="h-[120px] md:h-[140px]">
                    <p className="text-red-500 text-xs mb-2">LIVE COURSE</p>
                    <p className="font-medium">{course.title}</p>
                    <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">
                      {course.description}
                    </p>
                  </div>

                  <p className="my-5 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    จำนวนผู้ลงสมัคร{" "}
                    <a
                      className={`hover:underline ${
                        course.amount >= course.maxamount ? "text-red-500" : ""
                      }`}
                    >
                      {course.amount}/{course.maxamount}
                    </a>{" "}
                    {course.amount >= course.maxamount ? <span className="text-md  text-red-700">(เต็ม)</span>: "คน"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Badge color="red">LIVE</Badge>
                    <Badge color="purple">RECOMMEND</Badge>
                  </div>
                  <hr className="mt-6" />
                  <div className="flex flex-wrap gap-2 justify-between">
                    <Badge
                      color="gray"
                      icon={FaCalendarDays}
                      className="mt-2 text-[10px] md:text-xs mx-3 md:mx-0 font-normal"
                    >
                      <>{course.date}</>
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

export default LiveCourse;
