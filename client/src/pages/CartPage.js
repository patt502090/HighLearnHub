import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Progessbar from "../components/Progessbar";
import { IoTrashOutline } from "react-icons/io5";
import { Helmet } from "react-helmet";
import { ContextProvider } from "../context/Auth.context";
export default function CartPage() {
  const [coursebooked, setCoursebooked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ax.get(
          conf.apiUrlPrefix +
            "/users/me?populate[bookings][filters][status][$eq]=cart&populate[bookings][populate][course][populate]=image"
        );
        console.log(response);

        setCoursebooked(response.data.bookings);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    coursebooked.forEach((item) => {
      totalPrice += item.course.price;
    });
    return totalPrice.toLocaleString();
  };

  const deleteCourseBooked = async (id) => {
    try {
      console.log("id =", id);
      await ax.delete(conf.apiUrlPrefix + `/bookings/${id}`);

      setCoursebooked(coursebooked.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  console.log(coursebooked);

  return (
    <>
      <ContextProvider>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>

        <div className={coursebooked.length > 0 ? "h-full" : "h-screen"}>
          <div className="background-image">
            <Navbar />
            <div className="mx-auto">
              <div className="px-4">
                <Progessbar></Progessbar>
                <title>ตะกร้าของฉัน</title>
                <div className="flex flex-col items-center ">
                  <h className="text-xl font-bold mt-5">ตะกร้าของฉัน</h>
                  <div className="flex flex-col w-4/5 items-center mt-6">
                    <section
                      className={
                        coursebooked.length > 0
                          ? "py-3 sm:py-15 w-full bg-gray-100 font-poppins dark:bg-gray-700"
                          : "py-3 sm:py-15 w-full  bg-gray-100 font-poppins dark:bg-gray-700"
                      }
                    >
                      <div className="px-4 py-4 sm:py-6 mx-auto max-w-7xl lg:py-4 md:px-full">
                        <div>
                          <div className="p-5 sm:p-6 mb-2sm:mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800">
                            <h1>สินค้าทั้งหมด {coursebooked.length} ชิ้น </h1>
                            <div className="py-4 mb-5 sm:mb-10  border-t border-b border-gray-200 dark:border-gray-700">
                              {coursebooked.length > 0 ? (
                                coursebooked.map((item) => (
                                  <div
                                    className="flex flex-col gap-1 mb-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                                    key={item.id}
                                  >
                                    <img
                                      className="object-cover w-full sm:w-4/12 h-1/2 sm:h-auto rounded-t-lg md:rounded-none md:rounded-s-lg"
                                      src={
                                        conf.urlPrefix +
                                        item.course.image.url
                                      }
                                      alt=""
                                    />
                                    <div className="flex flex-col justify-between p-4 relative w-full">
                                      <button
                                        type="button"
                                        className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 rounded-full p-2 inline-flex items-center text-white hover:text-white-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        onClick={() =>
                                          deleteCourseBooked(item.id)
                                        }
                                      >
                                        <IoTrashOutline />
                                      </button>
                                      <h5 className="mb-2 text-md sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {item.course.title}
                                      </h5>
                                      <p className="max-lg:hidden">
                                        {item.course.description}
                                      </p>
                                      <hr className="mt-6 " />
                                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                                        {item.course.discount?(
                
                <p className="text-md text-center font-bold text-red-700 sm:text-2xl mb-4">
               <p className="text-gray-500 line-through">
                          {(item.course.price).toFixed(2)} บาท
                        </p>
                        <p className=" text-red-500 font-semibold">
                          {(item.course.price*((100-item.course.discount)/100)).toFixed(2)} บาท
                        </p>
              </p>
                  ):(<p className="text-md text-center font-bold text-grey-700 sm:text-2xl mb-4">
                  <span class="text-3xl font-bold text-slate-900">{(item.attributes.price).toFixed(2)} บาท </span>
                </p>)}
                                        <span>x1</span>
                                      </p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div>
                                  <p
                                    className="text-center"
                                    style={{
                                      fontSize: "20px",
                                      fontFamily: "sans-serif",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    ไม่มีสินค้า
                                  </p>
                                  <div className="flex flex-col items-center"></div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap justify-between">
                              <div className="w-full px-4 mb-4 lg:w-1/2">
                                ราคาทั้งหมด : {calculateTotalPrice()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <div className="flex items-center justify-between ">
                      <Link Link to="/payment">
                        <button
                          className="block w-full py-5 px-11 font-bold text-center text-gray-100 uppercase bg-green-400 rounded-md hover:bg-blue-600"
                          style={{ marginTop: "20px", marginBottom: "30px" }}
                        >
                          ชำระเงิน
                        </button>
                      </Link>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContextProvider>
    </>
  );
}
