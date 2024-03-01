import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { AuthContext, ContextProvider } from "../../context/Auth.context";
import { Progress } from "flowbite-react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


function calculatePercentage(watchTime, totalDuration) {
  if (watchTime === 0) {
    return 0;
  }
  const percentage = (watchTime / totalDuration) * 100;
  return Math.min(Math.round(percentage), 100);
}

export default function MyCourseOnHome() {
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

          const watchTimeResponse = await ax.post(
            `${conf.apiUrlPrefix}/mycourse`,
            {
              data: {
                id: booking.course.id,
              },
            }
          );
          console.log(watchTimeResponse);
          const totalWatchTime = watchTimeResponse.data.reduce(
            (total, watchTime) => total + watchTime.watch_time,
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
      {courseData.length > 0 ? (
        <div className="w-full md:w-4/5 mx-auto h-full">
          <p className="font-medium mx-auto mt-20 mb-10 text-center md:text-left text-2xl md:text-3xl">
            คอร์สที่คุณกำลังเรียน
            <Link
              to="/mycourse"
              className="float-right flex items-center text-xl text-slate-900"
            >
              {" "}
              คอร์สเรียนของฉัน <MdOutlineKeyboardArrowRight  className="ml-2" />
            </Link>
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
              {courseData.map((course) => (
                <SwiperSlide key={course.id}>
                  <Link to={`/mycourse/${course.id}`} title="ดูคลิปวิดิโอ">
                    <div className="p-2 bg-gray-100 rounded-lg  hover:translate-y-[-2px] transition-transform duration-300 ">
                      <div className="h-30 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="object-cover w-full  mb-4 hover:opacity-50 rounded-lg"
                        />
                      </div>
                      <div className="mt-auto">
                        <Progress
                          progress={course.percentage}
                          color="yellow"
                          size="sm"
                        />
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : null}
    </ContextProvider>
  );
}
