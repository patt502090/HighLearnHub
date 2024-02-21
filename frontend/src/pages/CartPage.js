import React, { useEffect, useState } from "react";
import ax from "../conf/ax";
import conf from "../conf/main";
import { Link } from "react-router-dom";

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
    return totalPrice;
  };

  console.log(coursebooked);
  return (
    <div className="flex flex-col items-center mt-6">
      <h className="text-xl font-bold">Mycart</h>
      <div className="flex flex-col items-center mt-6">
        <section className="py-17 bg-gray-100 font-poppins dark:bg-gray-700">
          <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
            <div>
              <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
                Your Cart
              </h2>
              <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 border-gray-800">
                
                <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                  {coursebooked?.map((item) => (
                    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <img
                        class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                        src={
                          "http://localhost:1337" +
                          item.attributes.image.data.attributes.url
                        }
                        alt=""
                      ></img>
                      <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
                    ราคาทั้งหมด :
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </section>
        <div className="flex items-center justify-between ">
            <Link Link to="/payment">
              <button className="block w-full py-5 px-11 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
               style={{ marginTop: "20px" ,marginBottom:"20px"}}
              >
                Checkout
              </button>
            </Link>
          </div>
      </div>
    </div>
  );
  
}
