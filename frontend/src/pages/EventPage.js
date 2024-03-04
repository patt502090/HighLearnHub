import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Badge } from "flowbite-react";
import { HiClock } from "react-icons/hi";
import conf from "../conf/main";
import ax from "../conf/ax";
import backgroundImage from "../assets/background.png";

export default function EventPage() {
  const [onlineSelling, setOnlineSelling] = useState([]);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/course/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onlineSellingResponse = await ax.get(
          `${conf.apiUrlPrefix}/courses?populate=image&filters[study_type][$eq]=Online&sort=amount:desc&pagination[pageSize]=10&populate=videos`
        );
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

        setOnlineSelling(onlineSellingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <section
        className="bg-white dark:bg-gray-900 bg-center bg-cover h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-3xl px-6 py-12 mx-auto text-center flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            เทศกาลลดราคา
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300" >
            พบกับการลดราคาพิเศษที่ไม่ควรพลาดในงาน "Spring Sales 2024"
            ที่จะเปิดขายสินค้าและบริการหลากหลายจากผู้ผลิตและธุรกิจชั้นนำ
            ร่วมกับโปรโมชั่นพิเศษและส่วนลดที่น่าตื่นเต้น
            เตรียมพบกับโอกาสในการอัพเกรดสินค้าหรือบริการที่คุณต้องการในราคาที่ย่อมเหลือใจ
            รีบเข้าร่วมกับเทศกาลแห่งความประทับใจนี้ก่อนที่โปรโมชั่นจะสิ้นสุด!
          </p>
          <a
            href="#shopping-section"
            className="inline-flex items-center justify-center px-8 py-4 mt-8 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Shopping
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <img
          src="https://png.pngtree.com/png-clipart/20210310/original/pngtree-cartoon-thai-songkran-festival-characters-and-elephant-illustration-png-image_5936860.png"
          alt="คำอธิบายรูปภาพ"
          className="mt-8 max-w-full float-right"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </section>

      <section id="shopping-section" className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {onlineSelling.slice(0, 3).map((course) => (
              <SwiperSlide key={course.id}>
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-yellow-400 text-xs mb-2">
                      ONLINE COURSE
                    </p>
                    <p className="font-semibold text-lg mb-2">{course.title}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <Badge color="warning" className="mr-2">
                          BESTSELLER
                        </Badge>
                        <Badge color="failure">Event Promotion</Badge>
                      </div>
                      <p className="text-gray-800 font-semibold">
                        {course.price} บาท
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Badge
                        color="gray"
                        icon={HiClock}
                        className="text-xs font-normal"
                      >
                        {course.duration.minutes >= 60
                          ? `${Math.floor(
                              course.duration.minutes / 60
                            )} ชั่วโมง ${course.duration.minutes % 60} นาที ${
                              course.duration.seconds
                            } วินาที`
                          : `${course.duration.minutes} นาที ${course.duration.seconds} วินาที`}
                      </Badge>
                      <button
                        onClick={() => handleCardClick(course.id)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
                      >
                        ดูรายละเอียด
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
