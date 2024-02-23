import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import Navbar from "../components/Navbar";
import conf from "../conf/main";
import backgroundImage from "../assets/background.png";

export default function HistoryPage() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coursebooked, setCoursebooked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            "/courses?populate[bookings][filters][payment_status][$eq]=false&populate=image"
        );
        console.log(response);
        const filterDatas = response.data.data.filter(
          (item) => item.attributes.bookings.data.length !== 0
        );
        setCoursebooked(filterDatas);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <head>
          <link
            rel="stylesheet"
            href="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/css/main.d7f96858.css"
          />
        </head>
        <div className="flex flex-col justify-center items-center h-[60vh] pt-4">
          <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                History
              </div>
              <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                See all
              </button>
            </div>
            {coursebooked.map((course) => (
              <div
                key={course.id}
                className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center">
                    <img
                      className="object-cover w-full h-[100px] rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={
                        "http://localhost:1337" +
                        course.attributes.image.data.attributes.url
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white">
                      {course.attributes.title}
                    </h5>
                    <p className="mt-1 text-sm font-normal text-gray-600">
                      {course.attributes.description}
                    </p>
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                  <div>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
                    </svg>
                  </div>
                  <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                    {course.attributes.price}
                    <p className="ml-1">Bath</p>
                  </div>
                  <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                    <p>5d</p>
                    <p className="ml-1">ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
