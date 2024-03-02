import React, { useState } from "react";
import backgroundImage from "../assets/background.png";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import conf from "../conf/main";
import ax from "../conf/ax";


export default function PromotiPage() {
    const [promotionpack, setPromotionpack] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            "/promotions?populate[announcement][populate]=image&populate=courses")
        console.log("gay is real :",response);

        setPromotionpack(response.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="container mx-auto max-w-screen-lg">
        <div>
          <div className="container mx-auto px-6">
            <div
              className="h-64 rounded-md overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1577655197620-704858b270ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=144')",
              }}
            >
              <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div className="px-10 max-w-xl">
                  <h2  className="text-2xl text-white font-semibold">
                    Promotion
                  </h2>
                  <p className="mt-2 text-gray-400">
                    พบกับโปรโมชั่นพิเศษที่ไม่ควรพลาด!
                    สั่งซื้อสินค้าและบริการต่างๆ
                    ที่เรามีให้แล้ววันนี้
                  </p>
                  <a href="#promotion-course-pack">
                  <button className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                  </a>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                    alt="mockup"
                  />
                </div>
              </div>
            </div>
              
              <div  className="bg-white">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">


            {console.log("gat 2 :",promotionpack)}
            {promotionpack.data?.map((item) => (
                <div id={item.id} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={conf.urlPrefix + item.attributes.announcement.data.attributes.image.data.attributes.url}
                        alt="Front of men's Basic Tee in black."
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            ></span>

                            {item.attributes.Describtion}
                          </a>
                        </h3>
                        ประกอบด้วยวิชา
                        <h2>
                        {item.attributes.courses?.data?.map(course =>(course.attributes.title))}
                        </h2>
            
                      </div>
                        <h2>
                      <p className="text-sm font-medium text-gray-900">{item.attributes.special_price} บาท</p>
                        </h2>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
