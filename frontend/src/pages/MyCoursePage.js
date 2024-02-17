import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
          image: `${conf.urlPrefix}` + booking.course.image.url,
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
    <div>
      <Navbar />
      <div className="bg-gray-200 h-screen">
        <div className="flex items-center justify-center">
          <div className="container w-3/4 p-8 bg-white shadow-lg rounded-lg mt-20">
            <p className="text-2xl font-medium mr-5 text-right mb-8">
              คอร์สของฉัน
            </p>
            <hr className="mb-10" />
            <div className="w-full">
              {isLoading ? (
                <p>Loading...</p>
              ) : courseData.length === 0 ? (
                <div>
                  <p className="text-center text-xs md:text-lg">
                    ยังไม่มีคอร์ส{" "}
                    <Link to="/" className="text-yellow-500 ">
                      ลองดูคอร์สที่น่าสนใจ
                    </Link>
                  </p>
                </div>
              ) : (
                courseData.map((course) => (
                  <Link
                    to={`/mycourse/${course.id}`}
                    key={course.id}
                    title="ดูคลิปวิดิโอ"
                  >
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:translate-y-[-10px] transition-transform duration-300  w-full md:w-1/4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="mx-auto mb-4 hover:opacity-40 hover:relative"
                        style={{ position: "relative" }}
                      />
                      <span
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                      >
                        ดูคลิปวิดิโอ
                      </span>

                      <h2 className="text-lg font-semibold mb-2">
                        {course.title}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {course.description}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
