import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { ContextProvider } from "../context/Auth.context";
export default function HistoryPage() {
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coursebooked, setCoursebooked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            "/users/me?populate[bookings][populate][course][populate]=image"
        );
        console.log(response);
        const filterDatas = response.data.bookings.filter(
          (item) => item.status !== "cart"
        );
        setCoursebooked(filterDatas);
        console.log(filterDatas);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateDaysAgo = (timestamp) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const paymentDate = new Date(timestamp);
    const diffDays = Math.round(Math.abs((currentDate - paymentDate) / oneDay));
    return diffDays;
  };

  return (
    <>
    <ContextProvider>
      <Navbar />
      <div className="background-image py-20">
        <head>
          <link
            rel="stylesheet"
            href="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/css/main.d7f96858.css"
          />
        </head>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>ประวัติการสั่งซื้อ</title>
        </Helmet>
        <div className="h-screen flex flex-col justify-center items-center pt-4">
          <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-5/6  h-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[55%] mx-auto p-4 mt-20 sm:mt-0 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
            <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                History
              </div>
              <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base md:text-sm font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                See all
              </button>
            </div>
            {coursebooked.map((item) => (
              <div
                key={item.course.id}
                className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] md:py-4 transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-auto  w-4/6 md:w-48 items-center justify-center">
                    <img
                      className="object-cover w-full h-full md:h-auto md:w-full rounded-t-lg md:rounded-none md:rounded-s-lg"
                      src={"http://localhost:1337" + item.course.image.url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-sm sm:text-base font-bold text-navy-700 dark:text-white">
                      {item.course.title}
                    </h5>
                    <p className="mt-1 text-xs sm:text-sm md:text-xs font-normal text-gray-600">
                      {item.course.description}
                    </p>
                  </div>
                </div>
                <div className="mt-1 flex items-center justify-between w-1/3 md:w-auto text-navy-700 dark:text-white">
                  <div className="flex items-center">
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

                    <div className="ml-1 flex items-center text-xs md:text-xs font-bold text-navy-700 dark:text-white">
                      {item.course.price}
                      <p className="ml-1">Bath</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs md:text-xs font-normal sm:ml-5 text-gray-600 dark:text-white">
                    <p>{calculateDaysAgo(item.createdAt)}d ago</p>
                  </div>
                  {item.status === "success" ? (
                    <div className="flex items-center text-xs md:text-xs font-normal  sm:ml-4 text-green-600">
                      {item.status}
                    </div>
                  ) : (
                    <div className="flex items-center text-xs md:text-xs font-normal  sm:ml-4 text-orange-600">
                      in {item.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ContextProvider>
    </>
  );
}
