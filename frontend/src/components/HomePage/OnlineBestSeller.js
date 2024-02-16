import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import "./SwiperButton.css";
import axios from "axios";
import { Badge } from 'flowbite-react';

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
          "http://localhost:1337/api/courses?populate=image&filters[study_type][$eq]=Online&sort=amount:desc&pagination[pageSize]=10"
        );
        console.log("dedasdadsdadsda", onlineSellingResponse);
        const onlineSellingData = onlineSellingResponse.data.data.map(
          (course) => ({
            id: course.id,
            title: course.attributes.title,
            price: course.attributes.price,
            amount: course.attributes.amount,
            description: course.attributes.description,
            image:"http://localhost:1337" + course.attributes.image.data.attributes.url,
          })
        );
        setOnlineSelling(onlineSellingData);
        console.log("fdfee", onlineSellingData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  console.log("redasdasda", onlineSelling);

  return (
    <div className="w-4/5 mx-auto h-full">
     <p className="font-medium mx-auto mt-20 text-3xl">คอร์สออนไลน์ยอดนิยม</p>
      <div className="swiper-container">
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          navigation={true}
          slidesPerView={3}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {onlineSelling?.map((course) => (
            <SwiperSlide key={course.id}>
              <div className="bg-white rounded-lg shadow-lg border border-gray-100 w-full cursor-pointer mx-auto mt-10 my-20 hover:translate-y-[-10px] transition-transform duration-300 h-full py-auto" onClick={() => handleCardClick(course.id)}>
                <div className="relative h-40">
                  <img src={course.image} alt={course.title} className="absolute w-full h-full object-cover rounded-t-lg" />
                </div>
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-yellow-300 text-xs mb-2">ONLINE COURSE</p>   
                    <p className="font-medium">{course.title}</p>
                    <p className="font-light text-sm text-gray-500 overflow-hidden h-20 mt-1">{course.description}</p>
                  </div>

                    <p className="my-5 mb-1">จำนวนยอดสั่งซื้อ {course.amount} คอร์ส</p>
                  <div className="flex gap-2 mt-4">
                    <Badge color="warning">BESTSELLER</Badge>
                    <Badge color="failure">PROMOTION</Badge>
                  </div>

                  <hr className="mt-6"/>
                  <p className="text-right mr-1 mt-3 font-semibold">{course.price} บาท </p>
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
