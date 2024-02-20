import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import { Link } from "react-router-dom";
import { Progress } from 'flowbite-react';

export default function MyCoursePage() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await ax.get(
          `${conf.apiUrlPrefix}/users/me?populate[bookings][populate][course][populate]=image`
        );
        const bookings = userDataResponse.data.bookings;

        const filteredBookings = bookings.filter(
          (booking) => booking.payment_status === true
        );

        const courses = filteredBookings.map((booking) => ({
          id: booking.course.id,
          title: booking.course.title,
          description: booking.course.description,
          image: `${conf.urlPrefix}${booking.course.image.url}`,
        }));

        setCourseData(courses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-gray-200">
      <Navbar />
      <div className="flex flex-col items-center justify-items-center mt-8 w-80 sm:w-full mx-auto ">
        <div className="w-full md:w-2/3 lg:w-1/2 p-8  bg-white shadow-lg rounded-lg ">
          <p className="text-2xl font-medium text-center mb-8">คอร์สของฉัน</p>
          <hr className="mb-6" />
          {isLoading ? (
            <p className="text-center">กำลังโหลด...</p>
          ) : courseData.length === 0 ? (
            <div className="text-center text-lg mb-4">
              <p>ยังไม่มีคอร์ส <Link to="/" className="text-yellow-500">ลองดูคอร์สที่น่าสนใจ</Link></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.map((course) => (
                <Link to={`/mycourse/${course.id}`} key={course.id} title="ดูคลิปวิดิโอ">
                  <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:translate-y-[-2px] transition-transform duration-300 w-full">
                    <div className="h-30 overflow-hidden">
                      <img src={course.image} alt={course.title} className="object-cover w-full h-36 mb-3 hover:opacity-50 rounded-t-lg" />
                    </div>
                    <h2 className="text-lg font-semibold my-2 ">{course.title}</h2>
                    <p className="text-sm text-gray-600 mb-2 overflow-hidden h-28">{course.description}</p>
                    <div className="mt-auto">
                      <div className="text-sm font-base text-yellow-700 mb-1">เรียนไปแล้ว 45%</div>
                      <Progress progress={45} color="yellow" size="sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
