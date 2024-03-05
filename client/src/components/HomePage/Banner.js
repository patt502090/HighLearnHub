import React, { useEffect, useState } from "react";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import { Link } from "react-router-dom";
const BannerComponent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [footerData,setFooterData] = useState([])
  const handleDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const responseStreak = await ax.get(
          `${conf.apiUrlPrefix}/footer-announcements`
        );
        setFooterData(responseStreak?.data?.data[0]?.attributes)
        console.log("FFr",responseStreak?.data?.data[0]?.attributes)
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };

    fetchStreak();
  }, []);

  return (
    <>
      {isVisible && new Date() >= new Date(footerData.start_date) && new Date() <= new Date(footerData.expiry_date) && footerData.status === "enable" &&
      (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-3 sm:px-3.5 before:flex-1 mt-16 z-9999">
          <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            ></div>
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            ></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
              <strong className="font-semibold">HighLearnHub</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1" />
              
              </svg>
            {footerData.title}
            </p>
            <Link
              to="/promotion"
              className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              สนใจ <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-start">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={handleDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className="h-5 w-5 text-gray-900"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BannerComponent;
