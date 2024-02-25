import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Progessbar from "../components/Progessbar";
import backgroundImage from "../assets/background.png";

export default function CartPage() {
  const [coursebooked, setCoursebooked] = useState();
  

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

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    coursebooked?.forEach((item) => {
      
      totalPrice +=
        item.attributes.price * item.attributes.bookings.data.length;
        
    });
    return totalPrice.toLocaleString();
  };
  const DeleteCourseBooked = async (id) => {
    try {
      console.log("id =", id)
      const response = await ax.delete(
        conf.apiUrlPrefix +
        `/bookings/${id}`
      );

      setCoursebooked(coursebooked.filter(course => course.attributes.bookings.data[0].id != id))
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  console.log(coursebooked);
  return (
    <>
      <Navbar />
      <Progessbar></Progessbar>
      <div className="flex flex-col items-center mt-6" style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <h className="text-4xl font-bold">Mycart</h>
        <div className="flex flex-col items-center mt-6">
          <section className="py-17 bg-gray-100 font-poppins dark:bg-gray-700">
            <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
              <div>
                <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
                  Your Cart
                </h2>
                <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800">
                <h1>สินค้าทั้งหมด {coursebooked?.length} ชิ้น </h1>
                <div className="py-4 mb-10 border-t border-b border-gray-200 dark:border-gray-700">
                    {coursebooked?.map((item) => (
                    
                      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={item.id}>
                        <img
                          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                          src={"http://localhost:1337" + item.attributes.image.data.attributes.url}
                          alt=""
                        />
                        <div className="flex flex-col justify-between p-4 relative w-full">
                          <button
                            type="button"
                            className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 rounded-full p-2 inline-flex items-center text-white hover:text-white-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            style={{ width: "30px", height: "30px" }}
                            onClick={() => DeleteCourseBooked(item.attributes.bookings.data[0].id)}
                          >
                            <span className="sr-only">Close menu</span>
                            <svg
                              className="h-6 w-6"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item.attributes.title}
                          </h5>
                          <p>{item.attributes.description}</p>
                          <hr className="mt-6 " />
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-between">
                            <span>ราคา {item.attributes.price} บาท,</span>
                            <span>x{item.attributes.bookings.data.length}</span>

                          </p>
                        </div>
                      </div>
                    ))}
                    </div>

                  <div className="flex flex-wrap justify-between">
                    <div className="w-full px-4 mb-4 lg:w-1/2 ">
                      ราคาทั้งหมด : {calculateTotalPrice()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
          <div className="flex items-center justify-between ">
            <Link Link to="/payment">
              <button className="block w-full py-5 px-11 font-bold text-center text-gray-100 uppercase bg-green-400 rounded-md hover:bg-blue-600"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                ชำระเงิน
              </button>
            </Link>
          </div>
          <div >
          </div>
        </div>
      </div>
    </>
  );

}
