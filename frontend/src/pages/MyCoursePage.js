import React, { useEffect, useState, useContext } from "react";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import { Link } from "react-router-dom";
import { Progress } from "flowbite-react";
import { AuthContext, ContextProvider } from "../context/Auth.context";
import { Helmet } from "react-helmet";

function calculatePercentage(watchTime, totalDuration) {
  if (watchTime === 0) {
    return 0;
  }
  const percentage = (watchTime / totalDuration) * 100;
  return Math.min(Math.round(percentage), 100);
}

export default function MyCoursePage() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state: ContextState } = useContext(AuthContext);
  const { user } = ContextState || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await ax.get(
          `${conf.apiUrlPrefix}/users/me?populate[bookings][populate][course][populate]=image&populate[bookings][populate][course][populate]=videos`
        );
        const bookings = userDataResponse.data.bookings;

        const filteredBookings = bookings.filter(
          (booking) => booking.payment_status === true
        );

        const coursesPromises = filteredBookings.map(async (booking) => {
          const totalDuration = booking.course.videos.reduce(
            (total, video) => total + video.duration,
            0
          );

          const watchTimeResponse = await ax.get(
            `${conf.apiUrlPrefix}/watch-times?populate=member&[filters][member][id][$eq]=${user.id}&[filters][course][id][$eq]=${booking.course.id}`
          );
          const totalWatchTime = watchTimeResponse.data.data.reduce(
            (total, watchTime) => total + watchTime.attributes.watch_time,
            0
          );

          const percentage = calculatePercentage(totalWatchTime, totalDuration);

          return {
            id: booking.course.id,
            title: booking.course.title,
            description: booking.course.description,
            image: `${conf.urlPrefix}${booking.course.image.url}`,
            percentage: percentage,
          };
        });

        const courses = await Promise.all(coursesPromises);

        setCourseData(courses);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <ContextProvider>
      <div className="h-screen md:h-screen background-image">
        <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>คอร์สของฉัน</title>
        </Helmet>
        <Navbar />
        <div className="mx-10 lg:mx-auto flex flex-col items-center justify-items-center w-auto mt-4 sm:w-full">
          <div className="h-auto w-full xl:w-2/3 2xl:w-1/2 p-10 sm:p-20 2xl:p-16 bg-white shadow-lg rounded-lg ">
            <p className="text-2xl font-medium text-center mb-3 md:mb-8">
              คอร์สของฉัน
            </p>
            <hr className="mb-6" />
            {isLoading ? (
              <p className="text-center">กำลังโหลด...</p>
            ) : courseData.length === 0 ? (
              <div className="text-center text-lg mb-4">
                <p>
                  ยังไม่มีคอร์ส{" "}
                  <Link to="/" className="text-yellow-500">
                    ลองดูคอร์สที่น่าสนใจ
                  </Link>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseData.map((course) => (
                  <Link
                    to={`/mycourse/${course.id}`}
                    key={course.id}
                    title="ดูคลิปวิดิโอ"
                  >
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:translate-y-[-2px] transition-transform duration-300 ">
                      <div className="h-30 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="object-cover w-full h-30 md:h-36 mb-3 hover:opacity-50 rounded-t-lg"
                        />
                      </div>
                      <h2 className="text-sm md:text-lg font-semibold my-3 ">
                        {course.title}
                      </h2>
                      <p className="text-xs md:text-sm text-slate-500 mb-4 md:mb-2 overflow-hidden h-15 md:h-20 font-light">
                        {course.description}
                      </p>
                      <div className="mt-auto">
                        <div className="text-xs md:text-sm font-base text-yellow-700 mb-1">
                          เรียนไปแล้วทั้งหมด {course.percentage} %
                        </div>

                        <Progress
                          progress={course.percentage}
                          color="yellow"
                          size="sm"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ContextProvider>
  );
}
